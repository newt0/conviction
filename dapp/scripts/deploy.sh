#!/bin/bash
# Deployment script for DeFAI Platform

set -e

# Configuration
PROJECT_NAME="defai-platform"
REGISTRY="ghcr.io"
NAMESPACE="defai"
ENVIRONMENTS=("staging" "production")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    if ! command -v kubectl &> /dev/null; then
        error "kubectl is not installed"
    fi
    
    if ! command -v jq &> /dev/null; then
        error "jq is not installed"
    fi
    
    log "Prerequisites check passed"
}

# Build Docker image
build_image() {
    local tag=$1
    log "Building Docker image: $tag"
    
    docker build \
        --build-arg NEXT_PUBLIC_SUI_NETWORK=${SUI_NETWORK:-testnet} \
        --build-arg NEXT_PUBLIC_RPC_URL="${RPC_URL}" \
        --build-arg NEXT_PUBLIC_ANALYTICS_ENDPOINT="${ANALYTICS_ENDPOINT}" \
        -t "$tag" .
    
    log "Image built successfully: $tag"
}

# Push image to registry
push_image() {
    local tag=$1
    log "Pushing image to registry: $tag"
    
    docker push "$tag"
    
    log "Image pushed successfully: $tag"
}

# Deploy to Kubernetes
deploy_k8s() {
    local environment=$1
    local image_tag=$2
    
    log "Deploying to $environment environment..."
    
    # Create namespace if it doesn't exist
    kubectl create namespace "$NAMESPACE-$environment" --dry-run=client -o yaml | kubectl apply -f -
    
    # Update image in deployment
    envsubst < k8s/deployment.yaml | \
        sed "s|ghcr.io/your-org/convictionfi-dapp:latest|$image_tag|g" | \
        kubectl apply -n "$NAMESPACE-$environment" -f -
    
    # Wait for rollout
    kubectl rollout status deployment/defai-app -n "$NAMESPACE-$environment" --timeout=300s
    
    log "Deployment to $environment completed successfully"
}

# Run health checks
health_check() {
    local environment=$1
    log "Running health checks for $environment..."
    
    # Get service URL
    local service_url
    if [ "$environment" = "production" ]; then
        service_url="https://defai.com"
    else
        service_url="https://staging.defai.com"
    fi
    
    # Wait for service to be ready
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$service_url/health" > /dev/null; then
            log "Health check passed for $environment"
            return 0
        fi
        
        warn "Health check attempt $attempt/$max_attempts failed, retrying in 10s..."
        sleep 10
        ((attempt++))
    done
    
    error "Health check failed for $environment after $max_attempts attempts"
}

# Rollback deployment
rollback() {
    local environment=$1
    warn "Rolling back deployment in $environment..."
    
    kubectl rollout undo deployment/defai-app -n "$NAMESPACE-$environment"
    kubectl rollout status deployment/defai-app -n "$NAMESPACE-$environment" --timeout=300s
    
    log "Rollback completed for $environment"
}

# Main deployment function
deploy() {
    local environment=$1
    local git_sha=${GITHUB_SHA:-$(git rev-parse HEAD)}
    local image_tag="$REGISTRY/$PROJECT_NAME:$git_sha"
    
    log "Starting deployment to $environment"
    log "Git SHA: $git_sha"
    log "Image tag: $image_tag"
    
    # Load environment-specific configuration
    if [ -f ".env.$environment" ]; then
        log "Loading environment configuration for $environment"
        export $(cat ".env.$environment" | grep -v '^#' | xargs)
    fi
    
    # Build and push image
    build_image "$image_tag"
    push_image "$image_tag"
    
    # Deploy to Kubernetes
    deploy_k8s "$environment" "$image_tag"
    
    # Run health checks
    if ! health_check "$environment"; then
        rollback "$environment"
        error "Deployment failed, rolled back to previous version"
    fi
    
    log "Deployment to $environment completed successfully!"
}

# Cleanup old images
cleanup() {
    log "Cleaning up old Docker images..."
    
    # Remove images older than 7 days
    docker image prune -a --filter "until=168h" -f
    
    log "Cleanup completed"
}

# Main script
main() {
    local command=${1:-help}
    local environment=${2:-staging}
    
    case $command in
        "deploy")
            if [[ ! " ${ENVIRONMENTS[@]} " =~ " ${environment} " ]]; then
                error "Invalid environment: $environment. Valid options: ${ENVIRONMENTS[*]}"
            fi
            
            check_prerequisites
            deploy "$environment"
            ;;
        "rollback")
            if [[ ! " ${ENVIRONMENTS[@]} " =~ " ${environment} " ]]; then
                error "Invalid environment: $environment. Valid options: ${ENVIRONMENTS[*]}"
            fi
            
            rollback "$environment"
            ;;
        "health-check")
            health_check "$environment"
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            echo "DeFAI Platform Deployment Script"
            echo ""
            echo "Usage: $0 <command> [environment]"
            echo ""
            echo "Commands:"
            echo "  deploy <env>      Deploy to specified environment (staging|production)"
            echo "  rollback <env>    Rollback deployment in specified environment"
            echo "  health-check <env> Run health check for specified environment"
            echo "  cleanup           Clean up old Docker images"
            echo "  help              Show this help message"
            echo ""
            echo "Environments: ${ENVIRONMENTS[*]}"
            echo ""
            echo "Examples:"
            echo "  $0 deploy staging"
            echo "  $0 deploy production"
            echo "  $0 rollback staging"
            echo "  $0 health-check production"
            ;;
    esac
}

# Run main function with all arguments
main "$@"
/**
 * Analytics and Monitoring System for DeFAI Platform
 * 
 * @fileoverview Comprehensive analytics tracking for user behavior, transaction monitoring,
 * performance metrics, and business intelligence for the DeFAI Agent minting platform.
 */

// Type definitions for analytics events
export interface AnalyticsEvent {
  eventName: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
  walletAddress?: string;
}

export interface TransactionMetrics {
  transactionId: string;
  type: 'mint' | 'retry' | 'cancel';
  status: 'initiated' | 'pending' | 'success' | 'failed';
  duration: number;
  gasUsed?: string;
  gasPrice?: string;
  errorCode?: string;
  errorMessage?: string;
  retryCount?: number;
  strategy: string;
  mintPrice: number;
  priority: string;
  timestamp: number;
  walletAddress: string;
}

export interface UserBehaviorEvent {
  action: string;
  component: string;
  value?: string | number;
  metadata?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  pageUrl: string;
  userAgent: string;
}

export interface PerformanceMetrics {
  metricName: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count';
  timestamp: number;
  additionalData?: Record<string, any>;
}

export interface BusinessMetrics {
  totalMints: number;
  totalVolume: number;
  averageMintPrice: number;
  successRate: number;
  popularStrategies: { strategy: string; count: number }[];
  dailyActiveUsers: number;
  conversionRate: number;
  timestamp: number;
}

// Analytics configuration
const ANALYTICS_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
  batchSize: 10,
  flushInterval: 5000, // 5 seconds
  maxRetries: 3,
  apiEndpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || '/api/analytics',
};

// Event queue for batching
let eventQueue: AnalyticsEvent[] = [];
let sessionId: string | null = null;

/**
 * Initializes the analytics system
 * 
 * @example
 * ```typescript
 * initializeAnalytics();
 * ```
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') return;
  
  sessionId = generateSessionId();
  
  // Track page load
  trackEvent('page_loaded', {
    page: window.location.pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
  });
  
  // Set up periodic flush
  setInterval(flushEvents, ANALYTICS_CONFIG.flushInterval);
  
  // Flush on page unload
  window.addEventListener('beforeunload', flushEvents);
  
  if (ANALYTICS_CONFIG.debug) {
    console.log('Analytics initialized with session:', sessionId);
  }
}

/**
 * Tracks a custom analytics event
 * 
 * @param eventName - Name of the event to track
 * @param properties - Event properties and metadata
 * @param userId - Optional user identifier
 * @param walletAddress - Optional wallet address
 * 
 * @example
 * ```typescript
 * trackEvent('mint_initiated', {
 *   strategy: 'SUI_MAXIMIZER',
 *   mintPrice: 1000,
 *   priority: 'fast'
 * }, undefined, walletAddress);
 * ```
 */
export function trackEvent(
  eventName: string,
  properties: Record<string, any> = {},
  userId?: string,
  walletAddress?: string
): void {
  if (!ANALYTICS_CONFIG.enabled && !ANALYTICS_CONFIG.debug) return;
  if (!sessionId) sessionId = generateSessionId();
  
  const event: AnalyticsEvent = {
    eventName,
    properties,
    timestamp: Date.now(),
    sessionId,
    userId,
    walletAddress,
  };
  
  eventQueue.push(event);
  
  if (ANALYTICS_CONFIG.debug) {
    console.log('Event tracked:', event);
  }
  
  // Flush immediately for critical events
  const criticalEvents = ['mint_success', 'mint_failed', 'security_violation'];
  if (criticalEvents.includes(eventName)) {
    flushEvents();
  }
}

/**
 * Tracks transaction-specific metrics
 * 
 * @param metrics - Transaction metrics to track
 * 
 * @example
 * ```typescript
 * trackTransaction({
 *   transactionId: 'tx_123',
 *   type: 'mint',
 *   status: 'success',
 *   duration: 2500,
 *   gasUsed: '0.005 SUI',
 *   strategy: 'SUI_MAXIMIZER',
 *   mintPrice: 1000,
 *   priority: 'fast',
 *   timestamp: Date.now(),
 *   walletAddress: address
 * });
 * ```
 */
export function trackTransaction(metrics: TransactionMetrics): void {
  trackEvent('transaction_metrics', {
    transaction: metrics,
    category: 'blockchain',
  });
  
  // Track specific transaction events
  trackEvent(`transaction_${metrics.status}`, {
    transactionId: metrics.transactionId,
    type: metrics.type,
    duration: metrics.duration,
    strategy: metrics.strategy,
    mintPrice: metrics.mintPrice,
    priority: metrics.priority,
    gasUsed: metrics.gasUsed,
    errorCode: metrics.errorCode,
    retryCount: metrics.retryCount,
  }, undefined, metrics.walletAddress);
}

/**
 * Tracks user behavior events
 * 
 * @param event - User behavior event to track
 * 
 * @example
 * ```typescript
 * trackUserBehavior({
 *   action: 'strategy_selected',
 *   component: 'strategy_selector',
 *   value: 'SUI_MAXIMIZER',
 *   metadata: { previousStrategy: 'BTC_HODLER' },
 *   timestamp: Date.now(),
 *   sessionId: getCurrentSessionId(),
 *   pageUrl: window.location.href,
 *   userAgent: navigator.userAgent
 * });
 * ```
 */
export function trackUserBehavior(event: UserBehaviorEvent): void {
  trackEvent('user_behavior', {
    behavior: event,
    category: 'ux',
  });
}

/**
 * Tracks performance metrics
 * 
 * @param metrics - Performance metrics to track
 * 
 * @example
 * ```typescript
 * trackPerformance({
 *   metricName: 'page_load_time',
 *   value: 1250,
 *   unit: 'ms',
 *   timestamp: Date.now(),
 *   additionalData: { component: 'mint_page' }
 * });
 * ```
 */
export function trackPerformance(metrics: PerformanceMetrics): void {
  trackEvent('performance_metrics', {
    performance: metrics,
    category: 'performance',
  });
}

/**
 * Tracks mint flow funnel events
 * 
 * @param step - Funnel step name
 * @param properties - Additional properties for the step
 * 
 * @example
 * ```typescript
 * trackMintFunnel('wallet_connected', { walletType: 'Sui Wallet' });
 * trackMintFunnel('strategy_selected', { strategy: 'SUI_MAXIMIZER' });
 * trackMintFunnel('configuration_completed', { valid: true });
 * trackMintFunnel('transaction_initiated', { gasEstimate: '0.005 SUI' });
 * trackMintFunnel('mint_completed', { success: true, nftId: '1337' });
 * ```
 */
export function trackMintFunnel(
  step: string,
  properties: Record<string, any> = {}
): void {
  trackEvent('mint_funnel', {
    step,
    ...properties,
    category: 'funnel',
  });
}

/**
 * Tracks error events with detailed context
 * 
 * @param error - Error object or message
 * @param context - Additional context about the error
 * @param severity - Error severity level
 * 
 * @example
 * ```typescript
 * trackError(new Error('Transaction failed'), {
 *   component: 'mint_store',
 *   action: 'mint_agent',
 *   walletAddress: address,
 *   gasEstimate: '0.005 SUI'
 * }, 'high');
 * ```
 */
export function trackError(
  error: Error | string,
  context: Record<string, any> = {},
  severity: 'low' | 'medium' | 'high' = 'medium'
): void {
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  trackEvent('error_occurred', {
    error: errorMessage,
    stack: errorStack,
    severity,
    context,
    category: 'error',
  });
  
  // Send to error reporting service in production
  if (ANALYTICS_CONFIG.enabled && severity === 'high') {
    // Integration with error reporting service (e.g., Sentry, Bugsnag)
    console.error('High severity error:', { error, context, severity });
  }
}

/**
 * Generates business metrics from tracked data
 * 
 * @returns Current business metrics
 */
export function generateBusinessMetrics(): BusinessMetrics {
  // This would typically query a database or analytics service
  // For now, we'll return mock data structure
  return {
    totalMints: 0,
    totalVolume: 0,
    averageMintPrice: 0,
    successRate: 0,
    popularStrategies: [],
    dailyActiveUsers: 0,
    conversionRate: 0,
    timestamp: Date.now(),
  };
}

/**
 * Measures and tracks the performance of a function
 * 
 * @param name - Name of the operation being measured
 * @param fn - Function to measure
 * @returns Result of the function execution
 * 
 * @example
 * ```typescript
 * const result = await measurePerformance('mint_transaction', async () => {
 *   return await mintAgent();
 * });
 * ```
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = await fn();
    const duration = performance.now() - startTime;
    
    trackPerformance({
      metricName: name,
      value: Math.round(duration),
      unit: 'ms',
      timestamp: Date.now(),
      additionalData: { status: 'success' },
    });
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    trackPerformance({
      metricName: name,
      value: Math.round(duration),
      unit: 'ms',
      timestamp: Date.now(),
      additionalData: { status: 'error', error: error instanceof Error ? error.message : String(error) },
    });
    
    throw error;
  }
}

/**
 * Creates a timer for long-running operations
 * 
 * @param name - Timer name
 * @returns Timer object with stop function
 * 
 * @example
 * ```typescript
 * const timer = startTimer('wallet_connection');
 * // ... perform operation
 * timer.stop(); // Automatically tracks the duration
 * ```
 */
export function startTimer(name: string): { stop: () => void } {
  const startTime = performance.now();
  
  return {
    stop: () => {
      const duration = performance.now() - startTime;
      trackPerformance({
        metricName: name,
        value: Math.round(duration),
        unit: 'ms',
        timestamp: Date.now(),
      });
    },
  };
}

/**
 * Flushes all queued events to the analytics endpoint
 */
async function flushEvents(): Promise<void> {
  if (eventQueue.length === 0) return;
  
  const eventsToSend = [...eventQueue];
  eventQueue = [];
  
  if (ANALYTICS_CONFIG.debug) {
    console.log('Flushing events:', eventsToSend);
    return;
  }
  
  if (!ANALYTICS_CONFIG.enabled) return;
  
  try {
    const response = await fetch(ANALYTICS_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events: eventsToSend }),
    });
    
    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send analytics events:', error);
    // Re-queue events for retry (with limit)
    if (eventsToSend.length < ANALYTICS_CONFIG.batchSize * ANALYTICS_CONFIG.maxRetries) {
      eventQueue.unshift(...eventsToSend);
    }
  }
}

/**
 * Generates a unique session identifier
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

/**
 * Gets the current session ID
 */
export function getCurrentSessionId(): string {
  if (!sessionId) {
    sessionId = generateSessionId();
  }
  return sessionId;
}

/**
 * Tracks page view events
 * 
 * @param page - Page identifier
 * @param properties - Additional page properties
 */
export function trackPageView(page: string, properties: Record<string, any> = {}): void {
  trackEvent('page_view', {
    page,
    url: typeof window !== 'undefined' ? window.location.href : '',
    title: typeof document !== 'undefined' ? document.title : '',
    ...properties,
    category: 'navigation',
  });
}

/**
 * Tracks conversion events
 * 
 * @param conversionType - Type of conversion
 * @param value - Conversion value
 * @param properties - Additional conversion properties
 */
export function trackConversion(
  conversionType: string,
  value: number,
  properties: Record<string, any> = {}
): void {
  trackEvent('conversion', {
    type: conversionType,
    value,
    ...properties,
    category: 'business',
  });
}

// Initialize analytics when module loads (client-side only)
if (typeof window !== 'undefined') {
  // Delay initialization to ensure DOM is ready
  setTimeout(initializeAnalytics, 100);
}
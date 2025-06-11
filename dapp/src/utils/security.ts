/**
 * Security utilities for input sanitization, validation, and protection
 * 
 * @fileoverview Provides comprehensive security functions for user input handling,
 * CSRF protection, rate limiting, and general security measures for the DeFAI platform.
 */

import DOMPurify from 'isomorphic-dompurify';
import { rateLimit } from 'express-rate-limit';

// Type definitions for security validation
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export interface RateLimitState {
  count: number;
  resetTime: number;
  blocked: boolean;
}

export interface SecurityConfig {
  maxAgentNameLength: number;
  maxDescriptionLength: number;
  minMintPrice: number;
  maxMintPrice: number;
  allowedStrategies: string[];
  rateLimitWindow: number;
  rateLimitMax: number;
}

// Security configuration constants
export const SECURITY_CONFIG: SecurityConfig = {
  maxAgentNameLength: 50,
  maxDescriptionLength: 200,
  minMintPrice: 100,
  maxMintPrice: 100000,
  allowedStrategies: [
    'SUI_MAXIMIZER',
    'BTC_HODLER', 
    'STABLE_OPTIMIZER',
    'DEFI_ARBITRAGE',
    'TREND_FOLLOWER',
    'MULTICHAIN_BRIDGE'
  ],
  rateLimitWindow: 60000, // 1 minute
  rateLimitMax: 5, // 5 requests per minute
};

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitState>();

/**
 * Sanitizes user input to prevent XSS and injection attacks
 * 
 * @param input - Raw user input string
 * @param options - Sanitization options
 * @returns Sanitized string safe for display and storage
 * 
 * @example
 * ```typescript
 * const safeInput = sanitizeInput(userInput, { 
 *   allowHtml: false, 
 *   maxLength: 100 
 * });
 * ```
 */
export function sanitizeInput(
  input: string, 
  options: { 
    allowHtml?: boolean; 
    maxLength?: number;
    trimWhitespace?: boolean;
  } = {}
): string {
  const { allowHtml = false, maxLength, trimWhitespace = true } = options;
  
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Trim whitespace if requested
  let sanitized = trimWhitespace ? input.trim() : input;
  
  // Remove or escape HTML if not allowed
  if (!allowHtml) {
    sanitized = DOMPurify.sanitize(sanitized, { 
      ALLOWED_TAGS: [], 
      ALLOWED_ATTR: [] 
    });
  } else {
    sanitized = DOMPurify.sanitize(sanitized);
  }
  
  // Enforce maximum length
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Validates agent name input with security checks
 * 
 * @param agentName - Agent name to validate
 * @returns Validation result with sanitized value
 */
export function validateAgentName(agentName: string): ValidationResult {
  const sanitized = sanitizeInput(agentName, { 
    maxLength: SECURITY_CONFIG.maxAgentNameLength 
  });
  
  // Check for empty input (allowed)
  if (!sanitized) {
    return { isValid: true, sanitizedValue: '' };
  }
  
  // Check length
  if (sanitized.length > SECURITY_CONFIG.maxAgentNameLength) {
    return { 
      isValid: false, 
      error: `Agent name must be ${SECURITY_CONFIG.maxAgentNameLength} characters or less` 
    };
  }
  
  // Check for invalid characters (only alphanumeric, spaces, hyphens, underscores)
  const validPattern = /^[a-zA-Z0-9\s\-_]+$/;
  if (!validPattern.test(sanitized)) {
    return { 
      isValid: false, 
      error: 'Agent name can only contain letters, numbers, spaces, hyphens, and underscores' 
    };
  }
  
  // Check for profanity or inappropriate content (basic filter)
  const inappropriateWords = ['admin', 'root', 'system', 'null', 'undefined'];
  const lowerName = sanitized.toLowerCase();
  if (inappropriateWords.some(word => lowerName.includes(word))) {
    return { 
      isValid: false, 
      error: 'Agent name contains restricted words' 
    };
  }
  
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates agent description with security checks
 * 
 * @param description - Description to validate
 * @returns Validation result with sanitized value
 */
export function validateAgentDescription(description: string): ValidationResult {
  const sanitized = sanitizeInput(description, { 
    maxLength: SECURITY_CONFIG.maxDescriptionLength 
  });
  
  // Check for empty input (allowed)
  if (!sanitized) {
    return { isValid: true, sanitizedValue: '' };
  }
  
  // Check length
  if (sanitized.length > SECURITY_CONFIG.maxDescriptionLength) {
    return { 
      isValid: false, 
      error: `Description must be ${SECURITY_CONFIG.maxDescriptionLength} characters or less` 
    };
  }
  
  // Check for excessive special characters (potential injection attempt)
  const specialCharCount = (sanitized.match(/[<>{}[\]\\\/]/g) || []).length;
  if (specialCharCount > 3) {
    return { 
      isValid: false, 
      error: 'Description contains too many special characters' 
    };
  }
  
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates mint price with security and business rules
 * 
 * @param mintPrice - Price string to validate
 * @returns Validation result with sanitized numeric value
 */
export function validateMintPrice(mintPrice: string): ValidationResult {
  const sanitized = sanitizeInput(mintPrice);
  
  // Check if empty
  if (!sanitized) {
    return { isValid: false, error: 'Mint price is required' };
  }
  
  // Check if numeric
  const numericValue = parseFloat(sanitized);
  if (isNaN(numericValue)) {
    return { isValid: false, error: 'Mint price must be a valid number' };
  }
  
  // Check minimum value
  if (numericValue < SECURITY_CONFIG.minMintPrice) {
    return { 
      isValid: false, 
      error: `Minimum mint price is ${SECURITY_CONFIG.minMintPrice} USDC` 
    };
  }
  
  // Check maximum value
  if (numericValue > SECURITY_CONFIG.maxMintPrice) {
    return { 
      isValid: false, 
      error: `Maximum mint price is ${SECURITY_CONFIG.maxMintPrice} USDC` 
    };
  }
  
  // Check decimal places (max 2 for currency)
  const decimalPlaces = (sanitized.split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return { 
      isValid: false, 
      error: 'Mint price can have at most 2 decimal places' 
    };
  }
  
  return { isValid: true, sanitizedValue: numericValue.toString() };
}

/**
 * Validates strategy selection
 * 
 * @param strategy - Strategy to validate
 * @returns Validation result
 */
export function validateStrategy(strategy: string): ValidationResult {
  const sanitized = sanitizeInput(strategy);
  
  if (!sanitized) {
    return { isValid: false, error: 'Strategy selection is required' };
  }
  
  if (!SECURITY_CONFIG.allowedStrategies.includes(sanitized)) {
    return { isValid: false, error: 'Invalid strategy selected' };
  }
  
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Rate limiting implementation for mint requests
 * 
 * @param identifier - Unique identifier (wallet address, IP, etc.)
 * @returns Rate limit state
 */
export function checkRateLimit(identifier: string): RateLimitState {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);
  
  // No previous record
  if (!existing) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + SECURITY_CONFIG.rateLimitWindow,
      blocked: false
    });
    return { count: 1, resetTime: now + SECURITY_CONFIG.rateLimitWindow, blocked: false };
  }
  
  // Reset window has passed
  if (now > existing.resetTime) {
    const newState = {
      count: 1,
      resetTime: now + SECURITY_CONFIG.rateLimitWindow,
      blocked: false
    };
    rateLimitStore.set(identifier, newState);
    return newState;
  }
  
  // Within rate limit window
  const newCount = existing.count + 1;
  const blocked = newCount > SECURITY_CONFIG.rateLimitMax;
  
  const newState = {
    count: newCount,
    resetTime: existing.resetTime,
    blocked
  };
  
  rateLimitStore.set(identifier, newState);
  return newState;
}

/**
 * Generates a CSRF token for form protection
 * 
 * @returns CSRF token string
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates a CSRF token
 * 
 * @param token - Token to validate
 * @param expectedToken - Expected token value
 * @returns Whether token is valid
 */
export function validateCSRFToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) {
    return false;
  }
  
  // Constant-time comparison to prevent timing attacks
  if (token.length !== expectedToken.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Validates Sui wallet address format
 * 
 * @param address - Wallet address to validate
 * @returns Validation result
 */
export function validateSuiAddress(address: string): ValidationResult {
  const sanitized = sanitizeInput(address);
  
  if (!sanitized) {
    return { isValid: false, error: 'Wallet address is required' };
  }
  
  // Sui address format: 0x followed by 64 hexadecimal characters
  const suiAddressPattern = /^0x[a-fA-F0-9]{64}$/;
  if (!suiAddressPattern.test(sanitized)) {
    return { 
      isValid: false, 
      error: 'Invalid Sui wallet address format' 
    };
  }
  
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Comprehensive validation for all mint parameters
 * 
 * @param params - All mint parameters to validate
 * @returns Validation results for each parameter
 */
export function validateMintParameters(params: {
  agentName: string;
  description: string;
  strategy: string;
  mintPrice: string;
  walletAddress: string;
  riskTolerance: string;
  transactionPriority: string;
}): { [key: string]: ValidationResult } {
  return {
    agentName: validateAgentName(params.agentName),
    description: validateAgentDescription(params.description),
    strategy: validateStrategy(params.strategy),
    mintPrice: validateMintPrice(params.mintPrice),
    walletAddress: validateSuiAddress(params.walletAddress),
    riskTolerance: validateRiskTolerance(params.riskTolerance),
    transactionPriority: validateTransactionPriority(params.transactionPriority),
  };
}

/**
 * Validates risk tolerance setting
 */
function validateRiskTolerance(riskTolerance: string): ValidationResult {
  const allowedValues = ['low', 'medium', 'high'];
  const sanitized = sanitizeInput(riskTolerance.toLowerCase());
  
  if (!allowedValues.includes(sanitized)) {
    return { isValid: false, error: 'Invalid risk tolerance value' };
  }
  
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates transaction priority setting
 */
function validateTransactionPriority(priority: string): ValidationResult {
  const allowedValues = ['standard', 'fast', 'instant'];
  const sanitized = sanitizeInput(priority.toLowerCase());
  
  if (!allowedValues.includes(sanitized)) {
    return { isValid: false, error: 'Invalid transaction priority value' };
  }
  
  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Logs security events for monitoring and analysis
 * 
 * @param event - Security event details
 */
export function logSecurityEvent(event: {
  type: 'validation_failure' | 'rate_limit_exceeded' | 'suspicious_input' | 'csrf_violation';
  details: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp?: number;
}): void {
  const logEntry = {
    ...event,
    timestamp: event.timestamp || Date.now(),
    severity: getSeverityLevel(event.type),
  };
  
  // In production, send to logging service (e.g., DataDog, Sentry)
  console.warn('Security Event:', logEntry);
  
  // Could also trigger alerts for high-severity events
  if (logEntry.severity === 'high') {
    // Alert security team or automatically block IP
  }
}

/**
 * Gets severity level for security events
 */
function getSeverityLevel(eventType: string): 'low' | 'medium' | 'high' {
  switch (eventType) {
    case 'validation_failure':
      return 'low';
    case 'rate_limit_exceeded':
      return 'medium';
    case 'suspicious_input':
      return 'high';
    case 'csrf_violation':
      return 'high';
    default:
      return 'medium';
  }
}
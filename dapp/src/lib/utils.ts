import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines clsx and tailwind-merge for optimal className handling
 * Server Component compatible utility function
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Type-safe environment variable getter
 * App Router optimized for server-side usage
 */
export function getEnvVar(key: string, fallback?: string): string {
  if (typeof window !== 'undefined') {
    throw new Error(`getEnvVar() should only be called on the server. Use process.env.NEXT_PUBLIC_${key} for client-side.`);
  }
  
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  
  return value || fallback!;
}

/**
 * Client-safe environment variable getter
 * Only works with NEXT_PUBLIC_ prefixed variables
 */
export function getPublicEnvVar(key: string, fallback?: string): string {
  const publicKey = key.startsWith('NEXT_PUBLIC_') ? key : `NEXT_PUBLIC_${key}`;
  const value = process.env[publicKey];
  
  if (!value && !fallback) {
    throw new Error(`Public environment variable ${publicKey} is required but not set`);
  }
  
  return value || fallback!;
}

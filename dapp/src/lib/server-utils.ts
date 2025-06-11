/**
 * Server-only utilities for Next.js App Router
 * These functions should only be imported in Server Components or Server Actions
 */

import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import type { Metadata } from 'next';

/**
 * Get request headers in Server Components
 */
export async function getRequestHeaders() {
  const headersList = await headers();
  return headersList;
}

/**
 * Get user agent information in Server Components
 */
export async function getUserAgent() {
  const headersList = await headers();
  const ua = headersList.get('user-agent');
  if (!ua) return null;
  
  return userAgent({
    headers: new Headers({
      'user-agent': ua
    })
  });
}

/**
 * Generate dynamic metadata with social data
 * Optimized for App Router metadata API
 */
export function generateSocialMetadata(options: {
  title: string;
  description: string;
  images?: string[];
  creator?: string;
  baseUrl: string;
}): Metadata {
  const { title, description, images = ['/og-image.png'], creator, baseUrl } = options;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      images: images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title,
      })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
      ...(creator && { creator }),
    },
  };
}

/**
 * Server-side analytics data preparation
 * Safe to use in Server Components
 */
export function prepareAnalyticsData(params: {
  page: string;
  userId?: string;
  metadata?: Record<string, string | number>;
}) {
  return {
    timestamp: new Date().toISOString(),
    ...params,
  };
}
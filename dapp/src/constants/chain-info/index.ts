// Re-export all chain info constants for easy importing
export * from './arweave-ao';
export * from './arweave';
export * from './evm';
export * from './solana';
export * from './sui';

// Type-safe chain info aggregation
export type ChainType = 'sui' | 'solana' | 'evm' | 'arweave' | 'arweave-ao';

// Server-side helper for dynamic imports (App Router optimized)
export const getChainInfo = async (chainType: ChainType) => {
  switch (chainType) {
    case 'sui':
      return import('./sui');
    case 'solana':
      return import('./solana');
    case 'evm':
      return import('./evm');
    case 'arweave':
      return import('./arweave');
    case 'arweave-ao':
      return import('./arweave-ao');
    default:
      throw new Error(`Unsupported chain type: ${chainType}`);
  }
};
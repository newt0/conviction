/**
 * Comprehensive Testing Utilities for DeFAI Platform
 * 
 * @fileoverview Testing utilities, mocks, and helpers for unit tests, integration tests,
 * and E2E testing of the DeFAI Agent minting platform.
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { act } from '@testing-library/react';

// Mock Sui Provider for testing
export interface MockSuiProviderProps {
  children: ReactNode;
  mockWalletConnected?: boolean;
  mockWalletAddress?: string;
  mockNetwork?: 'devnet' | 'testnet' | 'mainnet';
}

/**
 * Mock Sui Provider for testing wallet interactions
 * 
 * @param props - Mock provider props
 * @returns Mock provider component
 * 
 * @example
 * ```tsx
 * render(
 *   <MockSuiProvider mockWalletConnected={true} mockWalletAddress="0x123...">
 *     <MintPage />
 *   </MockSuiProvider>
 * );
 * ```
 */
export function MockSuiProvider({
  children,
  mockWalletConnected = false,
  mockWalletAddress = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  mockNetwork = 'testnet',
}: MockSuiProviderProps) {
  // Mock context values for testing
  const mockContextValue = {
    currentAccount: mockWalletConnected ? { address: mockWalletAddress } : null,
    isConnected: mockWalletConnected,
    isConnecting: false,
    network: mockNetwork,
    wallets: [
      {
        name: 'Mock Sui Wallet',
        icon: 'mock-icon.png',
        version: '1.0.0',
      },
    ],
    connect: jest.fn(),
    disconnect: jest.fn(),
    signAndExecuteTransactionBlock: jest.fn(),
  };

  return (
    <div data-testid="mock-sui-provider" data-wallet-connected={mockWalletConnected}>
      {children}
    </div>
  );
}

/**
 * Custom render function with providers
 * 
 * @param ui - React element to render
 * @param options - Render options including custom providers
 * @returns Render result with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions & {
    mockWalletConnected?: boolean;
    mockWalletAddress?: string;
    mockNetwork?: 'devnet' | 'testnet' | 'mainnet';
  } = {}
) {
  const {
    mockWalletConnected,
    mockWalletAddress,
    mockNetwork,
    ...renderOptions
  } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MockSuiProvider
        mockWalletConnected={mockWalletConnected}
        mockWalletAddress={mockWalletAddress}
        mockNetwork={mockNetwork}
      >
        {children}
      </MockSuiProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Mock transaction result for testing
 */
export const mockTransactionResult = {
  digest: '0x9d2f847b5e3c1a6f8d94e2a7b3c5d6e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
  effects: {
    status: { status: 'success' },
    created: [
      {
        reference: {
          objectId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        },
        owner: {
          AddressOwner: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        },
      },
    ],
    gasUsed: {
      computationCost: '1000000',
      storageCost: '2000000',
    },
  },
};

/**
 * Mock failed transaction result for testing
 */
export const mockFailedTransactionResult = {
  digest: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  effects: {
    status: { 
      status: 'failure',
      error: 'Insufficient gas for transaction',
    },
  },
};

/**
 * Mock agent configuration for testing
 */
export const mockAgentConfig = {
  agentName: 'Test Agent',
  description: 'Test agent description',
  strategy: 'SUI_MAXIMIZER',
  mintPrice: '1000',
  riskTolerance: 'medium' as const,
  autoRebalance: true,
  transactionPriority: 'standard' as const,
};

/**
 * Mock wallet addresses for testing
 */
export const mockWalletAddresses = {
  valid: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  invalid: '0x123',
  empty: '',
};

/**
 * Mock strategy options for testing
 */
export const mockStrategyOptions = [
  {
    value: 'SUI_MAXIMIZER',
    label: 'SUI Maximizer',
    description: 'Aggressive SUI ecosystem accumulation',
    riskLevel: 'High',
    expectedAPY: '15-25%',
  },
  {
    value: 'BTC_HODLER',
    label: 'BTC Hodler',
    description: 'Long-term Bitcoin accumulation',
    riskLevel: 'Medium',
    expectedAPY: '8-15%',
  },
];

/**
 * Creates a mock mint store for testing
 * 
 * @param overrides - Store state overrides
 * @returns Mock store object
 */
export function createMockMintStore(overrides: Partial<any> = {}) {
  return {
    // Initial state
    walletAddress: null,
    isWalletConnected: false,
    mintingState: 'idle',
    mintedNftId: null,
    transactionHash: null,
    errorMessage: null,
    gasEstimate: null,
    blockHeight: null,
    explorerUrl: null,
    nftUrl: null,
    suiPrice: null,
    gasUsdEquivalent: null,
    selectedStrategy: '',
    mintPrice: '1000',
    agentName: '',
    agentDescription: '',
    riskTolerance: 'medium',
    autoRebalance: true,
    useRealTransactions: false,
    retryCount: 0,
    maxRetries: 3,
    transactionPriority: 'standard',
    batchMintCount: 1,

    // Mock actions
    mintAgent: jest.fn(),
    retryMint: jest.fn(),
    updateConfig: jest.fn(),
    updateAdvancedConfig: jest.fn(),
    resetMintState: jest.fn(),
    setWalletConnection: jest.fn(),
    estimateGas: jest.fn(),
    fetchPriceData: jest.fn(),
    toggleTransactionMode: jest.fn(),

    // Apply overrides
    ...overrides,
  };
}

/**
 * Creates a mock Sui client for testing
 */
export function createMockSuiClient() {
  return {
    getBalance: jest.fn().mockResolvedValue({
      totalBalance: '1000000000000', // 1000 SUI in MIST
    }),
    dryRunTransactionBlock: jest.fn().mockResolvedValue({
      effects: {
        status: { status: 'success' },
        gasUsed: {
          computationCost: '1000000',
          storageCost: '2000000',
        },
      },
    }),
    executeTransactionBlock: jest.fn().mockResolvedValue(mockTransactionResult),
  };
}

/**
 * Simulates user input events for testing
 */
export const userEvents = {
  /**
   * Simulates typing in an input field
   */
  type: async (element: HTMLElement, text: string) => {
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(element, { target: { value: text } });
  },

  /**
   * Simulates clicking an element
   */
  click: async (element: HTMLElement) => {
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.click(element);
  },

  /**
   * Simulates selecting an option
   */
  selectOption: async (element: HTMLElement, value: string) => {
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(element, { target: { value } });
  },
};

/**
 * Test utilities for async operations
 */
export const asyncUtils = {
  /**
   * Waits for an async operation to complete
   */
  waitFor: async (callback: () => void | Promise<void>, timeout = 5000) => {
    const { waitFor } = await import('@testing-library/react');
    return waitFor(callback, { timeout });
  },

  /**
   * Waits for an element to appear
   */
  waitForElement: async (getElement: () => HTMLElement | null, timeout = 5000) => {
    const { waitFor } = await import('@testing-library/react');
    return waitFor(() => {
      const element = getElement();
      if (!element) throw new Error('Element not found');
      return element;
    }, { timeout });
  },

  /**
   * Advances timers in tests
   */
  advanceTimers: (ms: number) => {
    act(() => {
      jest.advanceTimersByTime(ms);
    });
  },
};

/**
 * Mock data generators for testing
 */
export const mockDataGenerators = {
  /**
   * Generates a random wallet address
   */
  walletAddress: () => {
    const hex = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 64; i++) {
      address += hex[Math.floor(Math.random() * hex.length)];
    }
    return address;
  },

  /**
   * Generates a random transaction hash
   */
  transactionHash: () => {
    const hex = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += hex[Math.floor(Math.random() * hex.length)];
    }
    return hash;
  },

  /**
   * Generates random agent configuration
   */
  agentConfig: () => ({
    agentName: `Test Agent ${Math.floor(Math.random() * 1000)}`,
    description: `Test description ${Math.floor(Math.random() * 1000)}`,
    strategy: mockStrategyOptions[Math.floor(Math.random() * mockStrategyOptions.length)].value,
    mintPrice: (Math.floor(Math.random() * 10000) + 100).toString(),
    riskTolerance: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as const,
    autoRebalance: Math.random() > 0.5,
    transactionPriority: ['standard', 'fast', 'instant'][Math.floor(Math.random() * 3)] as const,
  }),
};

/**
 * Test assertions for common scenarios
 */
export const assertions = {
  /**
   * Asserts that an element is visible
   */
  expectVisible: (element: HTMLElement | null) => {
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  },

  /**
   * Asserts that an element is not visible
   */
  expectNotVisible: (element: HTMLElement | null) => {
    if (element) {
      expect(element).not.toBeVisible();
    }
  },

  /**
   * Asserts that a function was called with specific arguments
   */
  expectCalledWith: (mockFn: jest.Mock, ...args: any[]) => {
    expect(mockFn).toHaveBeenCalledWith(...args);
  },

  /**
   * Asserts that an error was thrown
   */
  expectError: async (fn: () => Promise<any>, errorMessage?: string) => {
    await expect(fn()).rejects.toThrow(errorMessage);
  },
};

/**
 * Mock browser APIs for testing
 */
export const mockBrowserAPIs = {
  /**
   * Mocks the fetch API
   */
  mockFetch: (response: any) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
  },

  /**
   * Mocks localStorage
   */
  mockLocalStorage: () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    return localStorageMock;
  },

  /**
   * Mocks crypto API
   */
  mockCrypto: () => {
    Object.defineProperty(global, 'crypto', {
      value: {
        getRandomValues: jest.fn().mockImplementation((arr: any) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 256);
          }
          return arr;
        }),
      },
    });
  },
};

/**
 * Integration test helpers
 */
export const integrationHelpers = {
  /**
   * Simulates a complete mint flow
   */
  simulateMintFlow: async (config = mockAgentConfig) => {
    // This would simulate the complete user journey
    const steps = [
      'wallet_connection',
      'agent_configuration',
      'transaction_confirmation',
      'transaction_execution',
      'completion',
    ];
    
    return steps;
  },

  /**
   * Simulates wallet connection
   */
  simulateWalletConnection: async (address = mockWalletAddresses.valid) => {
    return { connected: true, address };
  },

  /**
   * Simulates transaction execution
   */
  simulateTransactionExecution: async (shouldSucceed = true) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
    
    if (shouldSucceed) {
      return mockTransactionResult;
    } else {
      throw new Error('Transaction failed');
    }
  },
};

/**
 * Performance testing utilities
 */
export const performanceUtils = {
  /**
   * Measures component render time
   */
  measureRenderTime: async (renderFn: () => any) => {
    const start = performance.now();
    const result = await renderFn();
    const end = performance.now();
    return { result, renderTime: end - start };
  },

  /**
   * Measures async operation time
   */
  measureAsyncTime: async (asyncFn: () => Promise<any>) => {
    const start = performance.now();
    const result = await asyncFn();
    const end = performance.now();
    return { result, executionTime: end - start };
  },
};

// Export commonly used testing libraries
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
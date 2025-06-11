export interface WalletState {
  address: string | null;
  chain: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export interface NFTData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  attributes?: Record<string, any>;
  owner: string;
  collection?: string;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
}

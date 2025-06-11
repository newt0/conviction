import { useWalletStore } from "../stores/walletStore";
import { useNFTStore } from "../stores/nftStore";
import { useUIStore } from "../stores/uiStore";

/**
 * 全ストアをリセットする統合関数
 * ログアウト時やエラー復旧時に使用
 */
export const resetAllStores = () => {
  useWalletStore.getState().setWalletDisconnected();
  useNFTStore.getState().clearStore();
  useUIStore.getState().clearNotifications();
};

/**
 * ストアの状態をデバッグ用に出力
 */
export const debugStores = () => {
  console.group("ConvictionFi Store Debug");
  console.log("Wallet Store:", useWalletStore.getState());
  console.log("NFT Store:", useNFTStore.getState());
  console.log("UI Store:", useUIStore.getState());
  console.groupEnd();
};

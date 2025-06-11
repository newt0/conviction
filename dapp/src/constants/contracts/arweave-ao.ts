export interface ArweaveAOContracts {
  convictionProcess: string; // Conviction NFTなどのプロセス
  agentProcess: string; // AI Agentの自律実行プロセス
  storageProcess?: string; // 永続ストレージ用途のAOプロセス
  [key: string]: string | undefined;
}

// 実環境のAOプロセスID
export const ARWEAVE_AO_PROCESSES: ArweaveAOContracts = {
  convictionProcess: "arweave-txid-1",
  agentProcess: "arweave-txid-2",
  storageProcess: "arweave-txid-3",
};

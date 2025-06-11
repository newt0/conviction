"use client";

import {
  WalletConnection,
  AgentConfiguration,
  CostSummary,
  MintingProgress,
  SuccessDisplay,
} from "@/features/mint";
import { useMintStore } from "@/stores/mintStore";


export default function MintPage() {
  const { mintingState } = useMintStore();

  if (mintingState === "success") {
    return <SuccessDisplay />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#011829] mb-4">
              Mint Your DeFAI Agent
            </h1>
            <p className="text-lg text-[#030F1C]">
              Configure your autonomous trading agent and transform your
              conviction into action.
            </p>
          </div>

          <div className="space-y-8">
            <WalletConnection />
            <AgentConfiguration />
            <CostSummary />
            <MintingProgress />
          </div>
        </div>
      </div>
    </div>
  );
}

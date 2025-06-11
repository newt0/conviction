import { useEffect } from "react";
import { useMintStore } from "@/stores/mintStore";
import { AgentConfig } from "../types";
import { strategyOptions } from "../utils";

export const useMintForm = () => {
  const {
    selectedStrategy,
    mintPrice,
    agentName,
    agentDescription,
    riskTolerance,
    autoRebalance,
    transactionPriority,
    isWalletConnected,
    mintingState,
    gasEstimate,
    updateConfig,
    updateAdvancedConfig,
    estimateGas,
    fetchPriceData,
  } = useMintStore();

  // Estimate gas when configuration is complete
  useEffect(() => {
    if (isWalletConnected && selectedStrategy && mintPrice && mintingState === "idle") {
      estimateGas();
    }
  }, [isWalletConnected, selectedStrategy, mintPrice, mintingState, estimateGas]);

  // Fetch price data on mount
  useEffect(() => {
    fetchPriceData();
  }, [fetchPriceData]);

  const handleConfigChange = (field: keyof AgentConfig, value: string) => {
    updateConfig({ [field]: value });
  };

  const selectedStrategyOption = strategyOptions.find(
    (s) => s.value === selectedStrategy
  );

  const isFormValid = selectedStrategy && mintPrice && isWalletConnected;

  const mintingFee = 10;
  const totalCost = Number.parseInt(mintPrice || "0") + mintingFee;

  return {
    // Form state
    selectedStrategy,
    mintPrice,
    agentName,
    agentDescription,
    riskTolerance,
    autoRebalance,
    transactionPriority,
    selectedStrategyOption,
    
    // Computed values
    isFormValid,
    mintingFee,
    totalCost,
    gasEstimate,
    
    // Actions
    handleConfigChange,
    updateAdvancedConfig,
  };
};
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bot, User, FileText, Settings } from "lucide-react";
import { StrategySelector } from "./StrategySelector";
import { useMintForm } from "../hooks";
import { useMintStore } from "@/stores/mintStore";

export const AgentConfiguration = () => {
  const {
    selectedStrategy,
    mintPrice,
    agentName,
    agentDescription,
    riskTolerance,
    autoRebalance,
    transactionPriority,
    selectedStrategyOption,
    handleConfigChange,
    updateAdvancedConfig,
  } = useMintForm();

  const { suiPrice, useRealTransactions, toggleTransactionMode } = useMintStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#011829] flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          Agent Configuration
        </CardTitle>
        <CardDescription>
          Define your agent&apos;s strategy, capital, and risk parameters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Name */}
        <div className="space-y-2">
          <Label
            htmlFor="agentName"
            className="text-[#011829] font-medium flex items-center"
          >
            <User className="mr-2 h-4 w-4" />
            Agent Name (Optional)
          </Label>
          <Input
            id="agentName"
            value={agentName}
            onChange={(e) => handleConfigChange("agentName", e.target.value)}
            placeholder="Enter a name for your DeFAI agent"
            maxLength={50}
          />
          <p className="text-xs text-gray-500">{agentName.length}/50 characters</p>
        </div>

        {/* Agent Description */}
        <div className="space-y-2">
          <Label
            htmlFor="agentDescription"
            className="text-[#011829] font-medium flex items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            Description (Optional)
          </Label>
          <textarea
            id="agentDescription"
            value={agentDescription}
            onChange={(e) => handleConfigChange("description", e.target.value)}
            placeholder="Describe your agent's purpose or goals"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4DA2FF] focus:border-transparent"
            rows={3}
            maxLength={200}
          />
          <p className="text-xs text-gray-500">
            {agentDescription.length}/200 characters
          </p>
        </div>

        {/* Strategy Selection */}
        <StrategySelector
          selectedStrategy={selectedStrategy}
          onStrategyChange={(value) => handleConfigChange("strategy", value)}
          selectedStrategyOption={selectedStrategyOption}
        />

        {/* Mint Price */}
        <div className="space-y-2">
          <Label htmlFor="mintPrice" className="text-[#011829] font-medium">
            Mint Price (USDC)
          </Label>
          <Input
            id="mintPrice"
            type="number"
            value={mintPrice}
            onChange={(e) => handleConfigChange("mintPrice", e.target.value)}
            placeholder="1000"
            min="100"
            step="100"
          />
          <p className="text-sm text-[#030F1C]">
            This is the total budget your AI agent will manage.
          </p>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4 border-t pt-4">
          <Label className="text-[#011829] font-medium flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Advanced Options
          </Label>

          {/* Transaction Priority */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Transaction Priority</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["standard", "fast", "instant"] as const).map((priority) => (
                <Button
                  key={priority}
                  variant={transactionPriority === priority ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateAdvancedConfig({ transactionPriority: priority })}
                  className="text-xs capitalize"
                >
                  {priority === "standard" && "🐌"} 
                  {priority === "fast" && "🏃"}
                  {priority === "instant" && "⚡"}
                  {" "}{priority}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Higher priority means faster confirmation but higher gas costs
            </p>
          </div>

          {/* Risk Tolerance */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Risk Tolerance</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["low", "medium", "high"] as const).map((risk) => (
                <Button
                  key={risk}
                  variant={riskTolerance === risk ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateAdvancedConfig({ riskTolerance: risk })}
                  className="text-xs capitalize"
                >
                  {risk === "low" && "🛡️"} 
                  {risk === "medium" && "⚖️"}
                  {risk === "high" && "🎯"}
                  {" "}{risk}
                </Button>
              ))}
            </div>
          </div>

          {/* Auto Rebalance */}
          <div className="flex items-center justify-between">
            <Label className="text-sm text-gray-700">Auto Rebalancing</Label>
            <Button
              variant={autoRebalance ? "default" : "outline"}
              size="sm"
              onClick={() => updateAdvancedConfig({ autoRebalance: !autoRebalance })}
              className="text-xs"
            >
              {autoRebalance ? "✅ Enabled" : "❌ Disabled"}
            </Button>
          </div>
        </div>

        {/* Transaction Mode Toggle */}
        <div className="space-y-2 border-t pt-4">
          <Label className="text-[#011829] font-medium flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Transaction Mode
          </Label>
          <div className="flex items-center space-x-3">
            <Button
              variant={useRealTransactions ? "outline" : "default"}
              size="sm"
              onClick={() => toggleTransactionMode(false)}
              className="text-xs"
            >
              🧪 Mock Mode
            </Button>
            <Button
              variant={useRealTransactions ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTransactionMode(true)}
              className="text-xs"
            >
              🚀 Real Transactions
            </Button>
          </div>
          <p className="text-xs text-[#030F1C]">
            {useRealTransactions 
              ? "Real blockchain transactions will be executed" 
              : "Mock transactions for testing (no actual cost)"}
          </p>
          {suiPrice && (
            <p className="text-xs text-gray-500">
              Current SUI price: ${suiPrice.toFixed(4)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
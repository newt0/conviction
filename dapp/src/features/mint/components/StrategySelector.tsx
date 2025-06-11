import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { strategyOptions, getRiskColor } from "../utils";
import { StrategyOption } from "../types";

interface StrategySelectorProps {
  selectedStrategy: string;
  onStrategyChange: (value: string) => void;
  selectedStrategyOption?: StrategyOption;
}

export const StrategySelector = ({
  selectedStrategy,
  onStrategyChange,
  selectedStrategyOption,
}: StrategySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="strategy"
        className="text-[#011829] font-medium flex items-center"
      >
        Strategy Archetype
        <HelpCircle className="ml-1 h-3 w-3 text-gray-400" />
      </Label>
      <Select value={selectedStrategy} onValueChange={onStrategyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose your trading strategy" />
        </SelectTrigger>
        <SelectContent>
          {strategyOptions.map((strategy) => (
            <SelectItem key={strategy.value} value={strategy.value}>
              <div className="flex items-center">
                <strategy.icon className="mr-2 h-4 w-4" />
                <div>
                  <div className="font-medium">{strategy.label}</div>
                  <div className="text-sm text-gray-500">
                    {strategy.description}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedStrategyOption && (
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Badge className={selectedStrategyOption.color}>
              {selectedStrategyOption.label}
            </Badge>
            <Badge
              className={`text-xs ${getRiskColor(
                selectedStrategyOption.riskLevel
              )}`}
            >
              Risk: {selectedStrategyOption.riskLevel}
            </Badge>
          </div>
          <p className="text-sm text-[#030F1C] mb-2">
            {selectedStrategyOption.description}
          </p>
          <p className="text-xs text-gray-600 mb-2">
            {selectedStrategyOption.details}
          </p>
          <div className="flex justify-between text-xs">
            <span className="text-green-600">
              Expected APY: {selectedStrategyOption.expectedAPY}
            </span>
            <span className="text-gray-500">
              Risk Level: {selectedStrategyOption.riskLevel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
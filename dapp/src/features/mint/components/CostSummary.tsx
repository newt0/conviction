import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMintForm } from "../hooks";
import { useMintStore } from "@/stores/mintStore";

export const CostSummary = () => {
  const { mintPrice, mintingFee, totalCost } = useMintForm();
  const { gasEstimate } = useMintStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#011829]">Cost Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-[#030F1C]">
            <span>Mint Price:</span>
            <span>{mintPrice || "0"} USDC</span>
          </div>
          <div className="flex justify-between text-[#030F1C]">
            <span>Minting Fee:</span>
            <span>{mintingFee} USDC</span>
          </div>
          <div className="flex justify-between text-[#030F1C]">
            <span>Estimated Gas:</span>
            <span>{gasEstimate || "Estimating..."}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-[#011829]">
            <span>Total Cost:</span>
            <span>{totalCost} USDC + gas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
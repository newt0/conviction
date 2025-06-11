import { Button } from "@/components/ui/button";
import { Bot, Zap } from "lucide-react";
import { useMintStore } from "@/stores/mintStore";
import { useMintForm } from "../hooks";

export const MintingProgress = () => {
  const {
    mintingState,
    errorMessage,
    retryCount,
    maxRetries,
    gasEstimate,
    mintAgent,
    retryMint,
    resetMintState,
  } = useMintStore();

  const { isFormValid } = useMintForm();

  const handleMint = async () => {
    await mintAgent();
  };

  return (
    <div className="space-y-4">
      {/* Mint Button */}
      <Button
        onClick={handleMint}
        disabled={!isFormValid || mintingState === "minting"}
        className="w-full bg-[#011829] hover:bg-[#022a3d] text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mintingState === "minting" ? (
          <>
            <Zap className="mr-2 h-5 w-5 animate-spin" />
            Minting DeFAI Agent NFT...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-5 w-5" />
            Mint DeFAI Agent
          </>
        )}
      </Button>

      {/* Form Validation Message */}
      {!isFormValid && mintingState !== "error" && (
        <div className="text-center text-sm text-gray-500">
          Complete all configuration fields to mint
        </div>
      )}

      {/* Error State */}
      {mintingState === "error" && errorMessage && (
        <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-600 font-medium mb-2">
            Minting Failed {retryCount > 0 && `(Attempt ${retryCount}/${maxRetries})`}
          </div>
          <div className="text-sm text-red-500 mb-3">{errorMessage}</div>
          <div className="flex gap-2 justify-center">
            {retryCount < maxRetries && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => retryMint()}
                className="text-orange-600 border-orange-300 hover:bg-orange-50"
              >
                <Zap className="mr-1 h-3 w-3" />
                Retry ({maxRetries - retryCount} left)
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={resetMintState}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Reset & Start Over
            </Button>
          </div>
        </div>
      )}

      {/* Minting Progress */}
      {mintingState === "minting" && gasEstimate && (
        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-600">🔄 Processing transaction...</div>
          <div className="text-xs text-blue-500 mt-1">
            Estimated gas: {gasEstimate}
          </div>
        </div>
      )}
    </div>
  );
};
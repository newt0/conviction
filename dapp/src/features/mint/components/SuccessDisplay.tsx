import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Bot, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMintStore } from "@/stores/mintStore";
import { useMintForm } from "../hooks";
import {
  formatTransactionHash,
  formatTimestamp,
  formatBlockHeight,
  formatGasEstimate,
} from "../utils";

export const SuccessDisplay = () => {
  const {
    mintedNftId,
    transactionHash,
    blockHeight,
    explorerUrl,
    resetMintState,
  } = useMintStore();

  const { selectedStrategyOption, mintPrice, gasEstimate } = useMintForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="h-14 w-14 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#011829] mb-4 leading-tight">
              🎉 Agent Successfully Deployed!
            </h1>
            <p className="text-lg md:text-xl text-[#030F1C] max-w-2xl mx-auto">
              Your conviction has been transformed into an autonomous AI trading agent.
            </p>
          </div>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-[#011829] flex items-center flex-1 min-w-0">
                  <Bot className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 text-[#4DA2FF] flex-shrink-0" />
                  <span className="truncate">Agent NFT #{mintedNftId}</span>
                </CardTitle>
                <Badge className="bg-green-100 text-green-700 px-3 py-1 text-sm font-medium self-start sm:self-center flex-shrink-0">
                  ✅ Active
                </Badge>
              </div>
              <CardDescription className="text-sm sm:text-base text-[#030F1C] mt-2 leading-relaxed">
                Your autonomous trading agent is now live and ready to execute your strategy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-[#011829] uppercase tracking-wide">
                    Strategy
                  </Label>
                  <div className="flex items-center mt-2 p-3 bg-blue-50 rounded-lg">
                    {selectedStrategyOption && (
                      <selectedStrategyOption.icon className="mr-3 h-5 w-5 text-[#4DA2FF]" />
                    )}
                    <span className="text-[#030F1C] font-medium">
                      {selectedStrategyOption?.label}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-[#011829] uppercase tracking-wide">
                    Mint Price
                  </Label>
                  <div className="mt-2 p-3 bg-green-50 rounded-lg">
                    <p className="text-[#030F1C] font-bold text-lg">
                      {mintPrice} USDC
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-[#011829] uppercase tracking-wide">
                    Status
                  </Label>
                  <div className="flex items-center mt-2 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-[#030F1C] font-medium">Agent Deployed</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-[#011829] uppercase tracking-wide">
                    Agent ID
                  </Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg min-w-0">
                    <p className="text-[#030F1C] font-mono font-bold truncate" title={`#${mintedNftId}`}>
                      #{mintedNftId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="mb-4">
                  <Label className="text-lg font-semibold text-[#011829] flex items-center gap-3">
                    Transaction Details
                    <Badge className="bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
                      ✅ Confirmed
                    </Badge>
                  </Label>
                </div>

                <div className="space-y-4 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm font-medium text-[#030F1C]">
                      Transaction Hash:
                    </span>
                    <button 
                      className="font-mono text-sm text-[#4DA2FF] hover:text-[#3d8ae6] transition-colors cursor-pointer bg-white px-3 py-1 rounded-md border hover:border-[#4DA2FF] max-w-[180px] sm:max-w-[200px] truncate text-left min-w-0"
                      onClick={() => navigator.clipboard.writeText(transactionHash || "0x9d2f...e34a")}
                      title={`Click to copy: ${transactionHash || "0x9d2f...e34a"}`}
                    >
                      {formatTransactionHash(transactionHash)}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm font-medium text-[#030F1C]">Timestamp:</span>
                    <span className="font-mono text-sm text-[#030F1C] bg-white px-3 py-1 rounded-md min-w-0 truncate text-right sm:text-left">
                      {formatTimestamp()}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm font-medium text-[#030F1C]">
                      Block Height:
                    </span>
                    <span className="font-mono text-sm text-[#030F1C] bg-white px-3 py-1 rounded-md min-w-0 truncate">
                      {formatBlockHeight(blockHeight)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm font-medium text-[#030F1C]">Gas Used:</span>
                    <span className="font-mono text-sm text-[#030F1C] bg-white px-3 py-1 rounded-md min-w-0 truncate">
                      {formatGasEstimate(gasEstimate)}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    {explorerUrl ? (
                      <a 
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-[#4DA2FF] hover:text-[#3d8ae6] transition-colors font-medium hover:underline"
                      >
                        View on Sui Explorer →
                      </a>
                    ) : (
                      <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-default">
                        View on Sui Explorer →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/dashboard" className="flex flex-1">
                  <Button className="flex-1 bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    View Agent Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={resetMintState}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Mint Another Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
              <p className="text-base text-[#030F1C] mb-4 leading-relaxed">
                Your agent will begin trading based on your conviction. You can monitor its performance and evolution in the dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="text-[#4DA2FF] hover:text-[#3d8ae6] hover:bg-blue-50 px-6 py-2 font-medium"
                  >
                    Return to Homepage
                  </Button>
                </Link>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <Link href="/marketplace">
                  <Button
                    variant="ghost"
                    className="text-[#4DA2FF] hover:text-[#3d8ae6] hover:bg-blue-50 px-6 py-2 font-medium"
                  >
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
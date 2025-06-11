import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, CheckCircle, Zap } from "lucide-react";
import { useMintWallet } from "../hooks";
import { formatWalletAddress } from "../utils";

export const WalletConnection = () => {
  const { walletAddress, isWalletConnected, isConnecting, handleWalletConnect } = useMintWallet();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#011829] flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your Sui wallet to proceed with minting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleWalletConnect}
          disabled={isConnecting}
          className={`w-full ${
            isWalletConnected
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#4DA2FF] hover:bg-[#3d8ae6]"
          } text-white disabled:opacity-50`}
        >
          {isConnecting ? (
            <>
              <Zap className="mr-2 h-5 w-5 animate-spin" />
              Connecting...
            </>
          ) : isWalletConnected ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5" />
              Wallet Connected
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-5 w-5" />
              Connect Sui Wallet
            </>
          )}
        </Button>
        {isWalletConnected && walletAddress && (
          <div className="mt-3 text-sm text-[#030F1C] text-center">
            Connected: {formatWalletAddress(walletAddress)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
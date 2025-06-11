"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Bot,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface TransactionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  agentConfig: {
    agentName: string;
    strategy: string;
    mintPrice: string;
    description: string;
    riskTolerance: string;
    autoRebalance: boolean;
    transactionPriority: string;
  };
  transactionDetails: {
    gasEstimate: string;
    totalCost: string;
    networkFee: string;
    estimatedTime: string;
  };
  isConfirming?: boolean;
}

/**
 * Transaction Confirmation Modal Component
 * 
 * Provides a secure confirmation dialog before executing mint transactions.
 * Includes detailed transaction preview, security warnings, and user confirmation.
 * 
 * @component
 * @example
 * ```tsx
 * <TransactionConfirmationModal
 *   isOpen={showConfirmation}
 *   onClose={() => setShowConfirmation(false)}
 *   onConfirm={handleConfirmTransaction}
 *   onCancel={handleCancelTransaction}
 *   agentConfig={agentConfig}
 *   transactionDetails={transactionDetails}
 * />
 * ```
 */
export function TransactionConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  agentConfig,
  transactionDetails,
  isConfirming = false,
}: TransactionConfirmationModalProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!userConfirmed) {
      return;
    }
    onConfirm();
  };

  const handleCancel = () => {
    setUserConfirmed(false);
    setShowDetails(false);
    onCancel();
  };

  const handleClose = () => {
    setUserConfirmed(false);
    setShowDetails(false);
    onClose();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "instant": return "⚡";
      case "fast": return "🏃";
      case "standard": return "🐌";
      default: return "⚡";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="mr-2 h-6 w-6 text-blue-600" />
            Confirm Transaction
          </DialogTitle>
          <DialogDescription>
            Please review the details below before confirming your DeFAI Agent mint transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Security Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Security Notice</p>
                <p className="text-amber-700">
                  This transaction will create an NFT and charge the specified amount. 
                  Once confirmed, this action cannot be undone. Please verify all details carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Agent Configuration Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Bot className="mr-2 h-5 w-5 text-blue-600" />
              Agent Configuration
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Agent Name:</span>
                <span className="text-sm text-gray-700">
                  {agentConfig.agentName || "Unnamed Agent"}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Strategy:</span>
                <Badge variant="outline">{agentConfig.strategy}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget:</span>
                <span className="text-sm font-semibold text-green-600">
                  {agentConfig.mintPrice} USDC
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Risk Tolerance:</span>
                <Badge className={getRiskColor(agentConfig.riskTolerance)}>
                  {agentConfig.riskTolerance.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Auto Rebalancing:</span>
                <Badge variant={agentConfig.autoRebalance ? "default" : "outline"}>
                  {agentConfig.autoRebalance ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              {agentConfig.description && (
                <div className="pt-2 border-t">
                  <span className="text-sm font-medium">Description:</span>
                  <p className="text-sm text-gray-600 mt-1">{agentConfig.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                Transaction Details
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs"
              >
                {showDetails ? (
                  <>
                    <EyeOff className="mr-1 h-3 w-3" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <Eye className="mr-1 h-3 w-3" />
                    Show Details
                  </>
                )}
              </Button>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mint Price:</span>
                <span className="text-sm">{agentConfig.mintPrice} USDC</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Network Fee:</span>
                <span className="text-sm">{transactionDetails.networkFee}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gas Estimate:</span>
                <span className="text-sm">{transactionDetails.gasEstimate}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Priority:</span>
                <span className="text-sm">
                  {getPriorityIcon(agentConfig.transactionPriority)} {agentConfig.transactionPriority}
                </span>
              </div>

              {showDetails && (
                <>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Estimated Time:
                    </span>
                    <span className="text-sm">{transactionDetails.estimatedTime}</span>
                  </div>
                </>
              )}

              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span className="text-sm">Total Cost:</span>
                <span className="text-sm text-blue-600">{transactionDetails.totalCost}</span>
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={userConfirmed}
                onChange={(e) => setUserConfirmed(e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isConfirming}
              />
              <div className="text-sm">
                <p className="font-medium text-gray-900 mb-1">
                  I confirm that I have reviewed all details
                </p>
                <p className="text-gray-600">
                  I understand that this transaction is irreversible and will charge the specified amount from my wallet.
                </p>
              </div>
            </label>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isConfirming}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!userConfirmed || isConfirming}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isConfirming ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm & Sign
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
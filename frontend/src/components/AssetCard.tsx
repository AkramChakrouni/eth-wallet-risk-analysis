
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type Asset = {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  balanceUsd: number;
  price: number;
  change24h: number;
  riskLevel: "low" | "medium" | "high";
  riskScore: number;
};

interface AssetCardProps {
  asset: Asset;
}

const getRiskColor = (riskLevel: "low" | "medium" | "high") => {
  switch (riskLevel) {
    case "low":
      return "bg-crypto-risk-low";
    case "medium":
      return "bg-crypto-risk-medium";
    case "high":
      return "bg-crypto-risk-high";
    default:
      return "bg-gray-400";
  }
};

const getRiskBadge = (riskLevel: "low" | "medium" | "high") => {
  switch (riskLevel) {
    case "low":
      return "risk-badge risk-badge-low";
    case "medium":
      return "risk-badge risk-badge-medium";
    case "high":
      return "risk-badge risk-badge-high";
    default:
      return "";
  }
};

const AssetCard = ({ asset }: AssetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border border-border/50 transition-all duration-300",
        isHovered ? "shadow-lg shadow-primary/5 border-primary/20 translate-y-[-2px]" : "shadow-sm hover:shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4 pb-0 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={cn(
            "rounded-full w-10 h-10 flex items-center justify-center font-mono text-lg transition-colors duration-300",
            isHovered ? "bg-primary/5" : "bg-muted/50"
          )}>
            {asset.symbol.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium">{asset.name}</h3>
            <p className="text-sm text-muted-foreground">{asset.symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-medium">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className={`text-xs ${asset.change24h >= 0 ? "text-crypto-risk-low" : "text-crypto-risk-high"}`}>
            {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
          </span>
        </div>
      </CardHeader>
      <CardContent className={cn("p-4 transition-all duration-300", isHovered ? "bg-card/50" : "")}>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Balance:</span>
            <span className="font-mono">
              {parseFloat(asset.balance).toFixed(4)} {asset.symbol.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Value:</span>
            <span className="font-mono">${asset.balanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Risk Score:</span>
              <span className={cn(
                getRiskBadge(asset.riskLevel),
                "transition-all duration-300",
                isHovered ? "scale-110" : ""
              )}>
                {asset.riskLevel.toUpperCase()}
              </span>
            </div>
            <Progress 
              value={asset.riskScore} 
              className="h-2"
              indicatorClassName={cn(
                getRiskColor(asset.riskLevel),
                "transition-all duration-500"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;

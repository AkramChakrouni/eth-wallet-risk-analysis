
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import RiskMeter from "./RiskMeter";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WalletHeaderProps {
  address: string;
  balance: number;
  riskScore: number;
}

const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const WalletHeader = ({ address, balance, riskScore }: WalletHeaderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <Card 
      className={cn(
        "p-4 mb-6 border border-border/50 transition-all duration-300",
        isHovered ? "shadow-md border-primary/20" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow"></span>
            Connected Wallet
          </p>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-mono">{truncateAddress(address)}</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "h-7 text-xs transition-all duration-300",
                    isHovered ? "bg-primary/5 hover:bg-primary/10" : ""
                  )}
                  onClick={copyAddress}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy wallet address</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className={cn(
            "space-y-1 w-full md:w-auto transition-all duration-300 p-2 rounded-md",
            isHovered ? "bg-card/50" : ""
          )}>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-lg font-semibold">${balance.toLocaleString()}</p>
          </div>
          
          <div className={cn(
            "space-y-1 w-full md:w-40 transition-all duration-300 p-2 rounded-md",
            isHovered ? "bg-card/50" : ""
          )}>
            <p className="text-sm text-muted-foreground">Portfolio Risk</p>
            <RiskMeter score={riskScore} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletHeader;

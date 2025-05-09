
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const WalletForm = () => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  useEffect(() => {
    setIsValid(isValidEthereumAddress(address));
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error("Please enter a valid Ethereum address");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, we would connect to the blockchain here
    // For demo purposes, we'll simulate a delay then navigate to the dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/dashboard/${address}`);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <div className="relative">
          <Input
            placeholder="Enter your Ethereum wallet address (0x...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={cn(
              "h-12 text-base transition-all duration-300 pr-12",
              address && !isValid ? "border-red-500 focus-visible:ring-red-500" : "",
              isValid ? "border-green-500 focus-visible:ring-green-500" : ""
            )}
          />
          {address && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className={cn(
                "transition-all duration-300 h-5 w-5 rounded-full flex items-center justify-center",
                isValid ? "bg-green-500" : "bg-red-500"
              )}>
                <span className={cn(
                  "text-white text-xs",
                  isValid ? "" : "rotate-45"
                )}>
                  {isValid ? "✓" : "×"}
                </span>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Example: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
        </p>
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !isValid}
        size="lg"
        className={cn(
          "w-full transition-all duration-300",
          isLoading ? "animate-pulse" : "",
          isValid ? "bg-crypto-navy hover:bg-crypto-blue" : "bg-muted"
        )}
      >
        <span className="relative">
          {isLoading && (
            <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          )}
          <span className={isLoading ? "opacity-0" : ""}>
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </span>
        </span>
      </Button>
    </form>
  );
};

export default WalletForm;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetCard, { Asset } from "@/components/AssetCard";
import AlertCard, { Alert } from "@/components/AlertCard";
import WalletHeader from "@/components/WalletHeader";
import { MOCK_ASSETS, MOCK_ALERTS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { address } = useParams<{ address: string }>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [portfolioRisk, setPortfolioRisk] = useState(0);
  const [activeTab, setActiveTab] = useState("assets");

  useEffect(() => {
    // In a real app, we would fetch data from an API here
    const loadData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set mock data
      setAssets(MOCK_ASSETS);
      setAlerts(MOCK_ALERTS);
      
      // Calculate total balance and portfolio risk
      const totalBalance = MOCK_ASSETS.reduce((sum, asset) => sum + asset.balanceUsd, 0);
      
      // For the portfolio risk, we'll use a weighted average of the asset risk scores
      const weightedRisk = MOCK_ASSETS.reduce((sum, asset) => {
        const weight = asset.balanceUsd / totalBalance;
        return sum + (asset.riskScore * weight);
      }, 0);
      
      setWalletBalance(totalBalance);
      setPortfolioRisk(Math.round(weightedRisk));
      setIsLoading(false);
    };
    
    loadData();
  }, [address]);

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b py-4 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-semibold">CryptoSentry</h1>
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WalletHeader 
            address={address || ""} 
            balance={walletBalance} 
            riskScore={portfolioRisk} 
          />
        </motion.div>

        <Tabs 
          defaultValue="assets" 
          className="space-y-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger 
              value="assets"
              className={cn("transition-all duration-300", activeTab === "assets" ? "bg-primary" : "")}
            >
              Assets
            </TabsTrigger>
            <TabsTrigger 
              value="alerts"
              className={cn("transition-all duration-300", activeTab === "alerts" ? "bg-primary" : "")}
            >
              Alerts
              {alerts.filter(alert => !alert.isRead).length > 0 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="ml-2 bg-crypto-risk-high text-white text-xs rounded-full px-1.5 py-0.5"
                >
                  {alerts.filter(alert => !alert.isRead).length}
                </motion.span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assets" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Your Assets</h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {assets.map((asset) => (
                  <motion.div key={asset.id} variants={item}>
                    <AssetCard asset={asset} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Risk Alerts</h2>
              <motion.div 
                className="space-y-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <motion.div key={alert.id} variants={item}>
                      <AlertCard 
                        alert={alert} 
                        onClick={() => markAlertAsRead(alert.id)}
                      />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No alerts at this time.</p>
                )}
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-4 bg-muted/30 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 CryptoSentry. All rights reserved. This is a demo application.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

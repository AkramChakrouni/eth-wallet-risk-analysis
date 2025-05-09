
import { Button } from "@/components/ui/button";
import WalletForm from "@/components/WalletForm";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container flex items-center justify-between">
          <motion.h1 
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            CryptoSentry
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button variant="outline" size="sm">About</Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-2xl w-full text-center space-y-8 relative">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-crypto-navy via-primary to-crypto-lightBlue bg-clip-text text-transparent">
              Real-time risk monitoring for your crypto assets
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Track your portfolio with advanced risk analysis and get alerts for unusual activities
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center space-y-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-border/50 w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-medium">Connect your wallet</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your Ethereum address to start monitoring</p>
              </div>
              <WalletForm />
            </div>
            
            <motion.div
              className="absolute w-40 h-40 rounded-full bg-primary/10 blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We don't store your private keys. This is a read-only connection.
            </motion.p>
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-4 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 CryptoSentry. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;

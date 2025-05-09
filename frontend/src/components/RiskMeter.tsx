
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface RiskMeterProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: boolean;
  animated?: boolean;
}

const getRiskColor = (score: number) => {
  if (score <= 30) return "bg-crypto-risk-low";
  if (score <= 70) return "bg-crypto-risk-medium";
  return "bg-crypto-risk-high";
};

const getRiskLabel = (score: number) => {
  if (score <= 30) return "Low Risk";
  if (score <= 70) return "Medium Risk";
  return "High Risk";
};

const getLabelColor = (score: number) => {
  if (score <= 30) return "text-crypto-risk-low";
  if (score <= 70) return "text-crypto-risk-medium";
  return "text-crypto-risk-high";
};

const RiskMeter = ({ 
  score, 
  size = "md", 
  label = true, 
  animated = true 
}: RiskMeterProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const height = size === "sm" ? "h-1" : size === "md" ? "h-2" : "h-3";
  
  useEffect(() => {
    if (!animated) {
      setAnimatedScore(score);
      return;
    }
    
    // Animate the score from 0 to the actual score
    let start = 0;
    const step = score / 40; // Animate in ~40 steps
    
    const animateScore = () => {
      if (start < score) {
        start = Math.min(start + step, score);
        setAnimatedScore(start);
        requestAnimationFrame(animateScore);
      }
    };
    
    requestAnimationFrame(animateScore);
  }, [score, animated]);
  
  return (
    <div className="space-y-1">
      <Progress 
        value={animatedScore} 
        className={cn(height, "overflow-hidden backdrop-blur-sm")}
        indicatorClassName={cn(
          getRiskColor(score),
          "transition-all duration-500 ease-out"
        )}
      />
      {label && (
        <div className="flex justify-between text-xs">
          <span className={cn(
            getLabelColor(score), 
            "transition-colors duration-300 font-medium"
          )}>
            {getRiskLabel(score)}
          </span>
          <span className="font-mono">{Math.round(animatedScore)}/100</span>
        </div>
      )}
    </div>
  );
};

export default RiskMeter;

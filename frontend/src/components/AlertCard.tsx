
import { AlertTriangle, Info, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type AlertSeverity = "info" | "warning" | "danger" | "success";

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  asset: string;
  timestamp: Date;
  isRead: boolean;
}

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

const getSeverityIcon = (severity: AlertSeverity) => {
  switch (severity) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-crypto-risk-medium" />;
    case "danger":
      return <ShieldAlert className="h-5 w-5 text-crypto-risk-high" />;
    case "success":
      return <ShieldCheck className="h-5 w-5 text-crypto-risk-low" />;
    default:
      return <Info className="h-5 w-5" />;
  }
};

const getSeverityClass = (severity: AlertSeverity) => {
  switch (severity) {
    case "info":
      return "border-l-blue-500";
    case "warning":
      return "border-l-crypto-risk-medium";
    case "danger":
      return "border-l-crypto-risk-high";
    case "success":
      return "border-l-crypto-risk-low";
    default:
      return "";
  }
};

const AlertCard = ({ alert, onClick }: AlertCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "border-l-4 transition-all duration-300 cursor-pointer",
        getSeverityClass(alert.severity),
        !alert.isRead && "bg-muted/30",
        isHovered ? "shadow-md translate-x-1 bg-card/80" : "hover:shadow-md"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4 pb-0 flex flex-row items-start space-y-0 gap-2">
        <div className={cn(
          "mt-0.5 transition-transform duration-300",
          isHovered ? "scale-110" : ""
        )}>
          {getSeverityIcon(alert.severity)}
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{alert.title}</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription className="text-xs">{alert.asset}</CardDescription>
            <CardDescription className="text-xs">
              {new Date(alert.timestamp).toLocaleTimeString()} {new Date(alert.timestamp).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pl-11">
        <p className={cn(
          "text-sm transition-all duration-300",
          isHovered ? "text-foreground" : ""
        )}>
          {alert.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default AlertCard;

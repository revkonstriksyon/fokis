import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertType = {
  title: string;
  description: string;
  type: "siklòn" | "grangou" | "ijans";
};

const MOCK_ALERTS: AlertType[] = [
  {
    title: "Alèt Meteyo",
    description: "Preparasyon pou sezon siklòn lan. Swiv konsèy prevansyon yo.",
    type: "siklòn",
  },
];

export function AlertBanner() {
  if (MOCK_ALERTS.length === 0) return null;

  return (
    <div className="space-y-4 py-4">
      {MOCK_ALERTS.map((alert, index) => (
        <Alert key={index} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

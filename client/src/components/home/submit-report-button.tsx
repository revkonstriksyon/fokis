import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Link } from "wouter";

export function SubmitReportButton() {
  return (
    <div className="flex justify-center py-8">
      <Button asChild size="lg" className="gap-2">
        <Link href="/submit-report">
          <Send className="h-5 w-5" />
          Soumèt Rapò
        </Link>
      </Button>
    </div>
  );
}

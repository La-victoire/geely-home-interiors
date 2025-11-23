import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message
}: ErrorStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-5 rounded-2xl shadow-sm flex flex-col items-center max-w-md">
        <AlertTriangle className="h-10 w-10 mb-3" />

        <p className="text-lg font-semibold mb-2">
          Oops! A glitch in the matrix.
        </p>

        <p className="text-sm text-red-700 mb-6">
          {message}
        </p>

          <Button
            onClick={()=> location.reload(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </Button>
        
      </div>
    </div>
  );
}


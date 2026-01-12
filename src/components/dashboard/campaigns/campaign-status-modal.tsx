"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader } from "lucide-react"

interface CampaignStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  status: "sending" | "success" | "failed"
  stats: {
    totalRecipients: number
    successful: number
    failed: number
  }
}

export function CampaignStatusModal({ open, onOpenChange, status, stats }: CampaignStatusModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader className="flex flex-col items-center text-center">
          {status === "sending" && (
            <>
              <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <DialogTitle>Sending Campaign</DialogTitle>
              <DialogDescription>Your campaign is being processed. Please wait...</DialogDescription>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <DialogTitle>Campaign Sent Successfully</DialogTitle>
              <DialogDescription>Your email campaign has been delivered to recipients.</DialogDescription>
            </>
          )}

          {status === "failed" && (
            <>
              <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
              <DialogTitle>Campaign Send Failed</DialogTitle>
              <DialogDescription>There was an issue sending your campaign. Please try again.</DialogDescription>
            </>
          )}
        </DialogHeader>

        {(status === "success" || status === "failed") && (
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-left my-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Recipients:</span>
              <span className="font-medium">{stats.totalRecipients.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Successful:</span>
              <span className="font-medium text-green-600">{stats.successful.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Failed:</span>
              <span className="font-medium text-red-600">{stats.failed.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {status !== "sending" && (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              {status === "success" ? "Done" : "Retry"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


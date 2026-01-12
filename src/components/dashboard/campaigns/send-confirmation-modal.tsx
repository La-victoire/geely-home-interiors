"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertCircle } from "lucide-react"

interface SendConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  recipientCount: number
  campaignTitle: string
}

export function SendConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  recipientCount,
  campaignTitle,
}: SendConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Confirm Campaign Send
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 pt-4">
            <div>
              <p className="font-medium text-foreground mb-2">Campaign: {campaignTitle}</p>
              <p className="text-sm text-muted-foreground">
                This campaign will be sent to{" "}
                <span className="font-bold text-primary">{recipientCount.toLocaleString()}</span> recipients.
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">
                <span className="font-medium">Important:</span> Once sent, this campaign cannot be edited or unsent.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            Send Campaign
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}


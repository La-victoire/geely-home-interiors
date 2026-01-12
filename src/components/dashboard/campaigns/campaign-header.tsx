"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface CampaignHeaderProps {
  title: string
  subject: string
  status: "draft" | "processing" | "sent" | "failed"
  createdAt: string
  lastEdited: string
  onTitleChange: (title: string) => void
  onSubjectChange: (subject: string) => void
}

export function CampaignHeader({
  title,
  subject,
  status,
  createdAt,
  lastEdited,
  onTitleChange,
  onSubjectChange,
}: CampaignHeaderProps) {
  const statusConfig = {
    draft: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    sent: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  }

  return (
    <Card className="p-6 mb-6 border border-border/50">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-medium">
            Campaign Settings
          </h1>
          <Badge className={statusConfig[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Campaign Title</label>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Holiday Collection Launch"
            className="rounded-lg"
            disabled={status === "sent" || status === "processing"}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Email Subject Line</label>
          <Input
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="Subject that appears in inboxes"
            className="rounded-lg"
            disabled={status === "sent" || status === "processing"}
          />
        </div>
      </div>

      <div className="flex gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-medium">Created:</span> {createdAt}
        </div>
        <div>
          <span className="font-medium">Last Edited:</span> {lastEdited}
        </div>
      </div>
    </Card>
  )
}


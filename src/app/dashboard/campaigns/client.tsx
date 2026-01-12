"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CampaignHeader } from "@/components/dashboard/campaigns/campaign-header"
import { AudienceSelection } from "@/components/dashboard/campaigns/audience-selection"
import { EmailEditor } from "@/components/dashboard/campaigns/email-editor"
import { EmailPreview } from "@/components/dashboard/campaigns/email-preview"
import { ImageUploadModal } from "@/components/dashboard/campaigns/image-upload-modal"
import { SendConfirmationModal } from "@/components/dashboard/campaigns/send-confirmation-modal"
import { CampaignStatusModal } from "@/components/dashboard/campaigns/campaign-status-modal"
import type { Campaign } from "@/lib/mock-campaigns"
import { Save, Send } from "lucide-react"

interface CampaignClientProps {
  initialCampaign: Campaign
}

export function CampaignClient({ initialCampaign }: CampaignClientProps) {
  const [campaign, setCampaign] = useState(initialCampaign)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [sendStatus, setSendStatus] = useState<"sending" | "success" | "failed">("sending")
  const [customSegments, setCustomSegments] = useState([
    { id: "1", name: "High-value Customers", count: 1200, checked: false },
    { id: "2", name: "Inactive Users", count: 800, checked: false },
    { id: "3", name: "Recent Purchases", count: 2100, checked: false },
  ])

  const getRecipientCount = () => {
    if (campaign.audience.type === "all") return 12840
    if (campaign.audience.type === "subscribers") return 5420
    return customSegments.filter((s) => s.checked).reduce((sum, s) => sum + s.count, 0)
  }

  const handleImageInsert = (imageUrl: string, altText: string) => {
    const imageHtml = `<img src="${imageUrl}" alt="${altText}" style="max-width: 100%; height: auto; margin: 16px 0;" />`
    setCampaign({
      ...campaign,
      content: {
        ...campaign.content,
        htmlContent: campaign.content.htmlContent + "\n" + imageHtml,
      },
    })
  }

  const handleSend = () => {
    setConfirmModalOpen(false)
    setStatusModalOpen(true)
    setSendStatus("sending")

    // Simulate sending
    setTimeout(() => {
      setSendStatus("success")
      setCampaign({
        ...campaign,
        status: "sent",
        stats: {
          totalRecipients: getRecipientCount(),
          successful: Math.floor(getRecipientCount() * 0.99),
          failed: Math.ceil(getRecipientCount() * 0.01),
        },
      })
    }, 2000)
  }

  const isEditable = campaign.status !== "sent" && campaign.status !== "processing"

  return (
    <div className="max-w-7xl pt-20 mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl headFont font-medium">
            Email Campaign Manager
          </h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={!isEditable}
              className="flex items-center gap-2 bg-transparent"
              onClick={() => alert("Campaign saved as draft")}
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button
              size="sm"
              disabled={!isEditable || !campaign.content.htmlContent}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => setConfirmModalOpen(true)}
            >
              <Send className="w-4 h-4" />
              Send Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CampaignHeader
            title={campaign.title}
            subject={campaign.subject}
            status={campaign.status}
            createdAt={campaign.createdAt}
            lastEdited={campaign.lastEdited}
            onTitleChange={(title) => setCampaign({ ...campaign, title })}
            onSubjectChange={(subject) => setCampaign({ ...campaign, subject })}
          />

          <AudienceSelection
            selectedAudience={campaign.audience.type}
            customSegments={customSegments}
            onAudienceChange={(type) => setCampaign({ ...campaign, audience: { ...campaign.audience, type } })}
            onSegmentToggle={(id) => {
              setCustomSegments(customSegments.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s)))
            }}
          />

          <EmailEditor
            content={campaign.content.htmlContent}
            onContentChange={(html) =>
              setCampaign({
                ...campaign,
                content: { ...campaign.content, htmlContent: html },
              })
            }
            onImageUpload={() => setImageModalOpen(true)}
          />
        </div>

        <div className="lg:col-span-1">
          <EmailPreview subject={campaign.subject} content={campaign.content.htmlContent} />
        </div>
      </div>

      <ImageUploadModal open={imageModalOpen} onOpenChange={setImageModalOpen} onInsert={handleImageInsert} />

      <SendConfirmationModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleSend}
        recipientCount={getRecipientCount()}
        campaignTitle={campaign.title}
      />

      <CampaignStatusModal
        open={statusModalOpen}
        onOpenChange={setStatusModalOpen}
        status={sendStatus}
        stats={
          campaign.stats || {
            totalRecipients: getRecipientCount(),
            successful: getRecipientCount(),
            failed: 0,
          }
        }
      />
    </div>
  )
}


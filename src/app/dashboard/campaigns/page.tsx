import { mockCampaigns } from "@/lib/mock-campaigns"
import { CampaignClient } from "./client"

export const metadata = {
  title: "Email Campaigns - Admin Dashboard",
  description: "Manage and send promotional email campaigns",
}

export default function CampaignsPage() {
  // Use the first campaign as the current one being edited
  const currentCampaign = mockCampaigns[1]

  return <CampaignClient initialCampaign={currentCampaign} />
}


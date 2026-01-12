export interface CampaignAudience {
  type: "all" | "subscribers" | "custom"
  count: number
  label: string
}

export interface CampaignContent {
  title: string
  subject: string
  htmlContent: string
  plainText: string
}

export interface Campaign {
  id: string
  title: string
  subject: string
  status: "draft" | "processing" | "sent" | "failed"
  createdAt: string
  lastEdited: string
  audience: CampaignAudience
  content: CampaignContent
  stats?: {
    totalRecipients: number
    successful: number
    failed: number
  }
}

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Holiday Collection Launch",
    subject: "Discover Our Exclusive Holiday Collection",
    status: "sent",
    createdAt: "2025-01-08",
    lastEdited: "2025-01-08",
    audience: {
      type: "subscribers",
      count: 5420,
      label: "Marketing Subscribers",
    },
    content: {
      title: "Holiday Collection Launch",
      subject: "Discover Our Exclusive Holiday Collection",
      htmlContent: "<h1>Holiday Season Elegance</h1><p>Experience luxury this season with our curated collection.</p>",
      plainText: "Discover our holiday collection",
    },
    stats: {
      totalRecipients: 5420,
      successful: 5380,
      failed: 40,
    },
  },
  {
    id: "2",
    title: "New Year Sale Announcement",
    subject: "Start 2025 with 30% Off - Limited Time",
    status: "draft",
    createdAt: "2025-01-10",
    lastEdited: "2025-01-10",
    audience: {
      type: "all",
      count: 12840,
      label: "All Users",
    },
    content: {
      title: "New Year Sale Announcement",
      subject: "Start 2025 with 30% Off - Limited Time",
      htmlContent: "<h1>New Year, New Look</h1><p>Refresh your space with 30% off select items.</p>",
      plainText: "New Year Sale - 30% off",
    },
  },
]


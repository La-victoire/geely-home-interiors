import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AudienceSelectionProps {
  selectedAudience: "all" | "subscribers" | "custom"
  customSegments: { id: string; name: string; count: number; checked: boolean }[]
  onAudienceChange: (audience: "all" | "subscribers" | "custom") => void
  onSegmentToggle: (id: string) => void
}

export function AudienceSelection({
  selectedAudience,
  customSegments,
  onAudienceChange,
  onSegmentToggle,
}: AudienceSelectionProps) {
  const getRecipientCount = () => {
    if (selectedAudience === "all") return 12840
    if (selectedAudience === "subscribers") return 5420
    return customSegments.filter((s) => s.checked).reduce((sum, s) => sum + s.count, 0)
  }

  return (
    <Card className="p-6 mb-6 border border-border/50">
      <h2 className="text-xl font-medium mb-4">Audience Selection</h2>

      <div className="space-y-4 mb-6">
        {/* All Users */}
        <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
          <Checkbox checked={selectedAudience === "all"} onCheckedChange={() => onAudienceChange("all")} />
          <div className="ml-4 flex-1">
            <div className="font-medium">All Users</div>
            <div className="text-sm text-muted-foreground">12,840 total users</div>
          </div>
        </label>

        {/* Marketing Subscribers */}
        <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
          <Checkbox
            checked={selectedAudience === "subscribers"}
            onCheckedChange={() => onAudienceChange("subscribers")}
          />
          <div className="ml-4 flex-1">
            <div className="font-medium">Marketing Subscribers</div>
            <div className="text-sm text-muted-foreground">5,420 opted-in users</div>
          </div>
        </label>

        {/* Custom Segment */}
        <div>
          <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-4">
            <Checkbox checked={selectedAudience === "custom"} onCheckedChange={() => onAudienceChange("custom")} />
            <div className="ml-4">
              <div className="font-medium">Custom Segment</div>
            </div>
          </label>

          {selectedAudience === "custom" && (
            <div className="ml-8 space-y-2">
              {customSegments.map((segment) => (
                <label key={segment.id} className="flex items-center p-2 hover:bg-secondary/50 rounded cursor-pointer">
                  <Checkbox checked={segment.checked} onCheckedChange={() => onSegmentToggle(segment.id)} />
                  <span className="ml-3 text-sm">
                    {segment.name} ({segment.count})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm font-medium">Estimated Recipients</div>
        <div className="text-2xl font-bold text-primary">{getRecipientCount().toLocaleString()}</div>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          Marketing emails require verified opt-in. Ensure all recipients have consented to receive promotional content.
        </AlertDescription>
      </Alert>
    </Card>
  )
}


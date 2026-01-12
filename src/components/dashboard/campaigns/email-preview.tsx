import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Monitor } from "lucide-react"

interface EmailPreviewProps {
  subject: string
  content: string
}

export function EmailPreview({ subject, content }: EmailPreviewProps) {
  return (
    <Card className="p-6 border border-border/50">
      <h2 className="text-xl font-medium mb-4">Email Preview</h2>

      <Tabs defaultValue="desktop" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="desktop" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="desktop">
          <div className="mt-4 mx-auto bg-white rounded-lg shadow-lg overflow-hidden" style={{ maxWidth: "600px" }}>
            {/* Email Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">G</div>
                <span className="font-medium">Geely Home Interiors</span>
              </div>
            </div>

            {/* Email Subject */}
            <div className="p-6 border-b border-border">
              <div className="text-xs text-muted-foreground mb-1">Subject:</div>
              <div className="font-medium text-foreground">{subject || "Your email subject"}</div>
            </div>

            {/* Email Content */}
            <div
              className="p-6 min-h-64"
              dangerouslySetInnerHTML={{ __html: content || "<p>Your email content will appear here</p>" }}
            />

            {/* Email Footer */}
            <div className="bg-secondary/30 p-6 text-xs text-muted-foreground border-t border-border">
              <p className="mb-2">Geely Home Interiors | Luxury Furniture & Accessories</p>
              <p className="mb-2">123 Design Street, Interior City, IC 12345</p>
              <p>
                <a href="#" className="text-gold hover:underline">
                  Unsubscribe
                </a>
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mobile">
          <div className="mt-4 mx-auto bg-white rounded-lg shadow-lg overflow-hidden" style={{ maxWidth: "320px" }}>
            {/* Email Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                  G
                </div>
                <span className="text-sm font-medium">Geely</span>
              </div>
            </div>

            {/* Email Subject */}
            <div className="p-4 border-b border-border">
              <div className="text-xs text-muted-foreground mb-1">Subject:</div>
              <div className="font-medium text-sm text-foreground">{subject || "Your email subject"}</div>
            </div>

            {/* Email Content */}
            <div
              className="p-4 min-h-48 text-sm"
              dangerouslySetInnerHTML={{ __html: content || "<p>Your email content will appear here</p>" }}
            />

            {/* Email Footer */}
            <div className="bg-secondary/30 p-4 text-xs text-muted-foreground border-t border-border">
              <p className="mb-2">Geely Home Interiors</p>
              <p className="mb-2">123 Design Street</p>
              <p>
                <a href="#" className="text-gold hover:underline">
                  Unsubscribe
                </a>
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Link2, ImageIcon, Heading1, Heading2 } from "lucide-react"

interface EmailEditorProps {
  content: string
  onContentChange: (content: string) => void
  onImageUpload: () => void
}

export function EmailEditor({ content, onContentChange, onImageUpload }: EmailEditorProps) {
  const [viewMode, setViewMode] = useState<"visual" | "html">("visual")

  const insertElement = (element: string) => {
    const textarea = document.getElementById("email-editor") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = content
      const newContent = text.substring(0, start) + element + text.substring(end)
      onContentChange(newContent)
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + element.length, start + element.length)
      }, 0)
    }
  }

  return (
    <Card className="p-6 mb-6 border border-border/50">
      <h2 className="text-xl font-medium mb-4">Email Content</h2>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "visual" | "html")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visual">Visual Editor</TabsTrigger>
          <TabsTrigger value="html">HTML View</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-4">
          <div className="flex flex-wrap gap-2 p-3 border border-border/50 rounded-lg bg-secondary/30">
            <button
              onClick={() => insertElement("<h1>Heading</h1>")}
              className="p-2 hover:bg-secondary rounded"
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertElement("<h2>Subheading</h2>")}
              className="p-2 hover:bg-secondary rounded"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertElement("<b>Bold text</b>")}
              className="p-2 hover:bg-secondary rounded"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertElement("<i>Italic text</i>")}
              className="p-2 hover:bg-secondary rounded"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertElement('<a href="#">Link text</a>')}
              className="p-2 hover:bg-secondary rounded"
              title="Link"
            >
              <Link2 className="w-4 h-4" />
            </button>
            <button onClick={onImageUpload} className="p-2 hover:bg-secondary rounded" title="Insert Image">
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>

          <textarea
            id="email-editor"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter your email content here. You can use HTML tags."
            className="w-full h-64 p-4 border border-border/50 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
        </TabsContent>

        <TabsContent value="html" className="space-y-4">
          <div className="p-4 border border-border/50 rounded-lg bg-secondary/30 font-mono text-sm whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
            {content || "<p>No content yet</p>"}
          </div>
          <p className="text-xs text-muted-foreground">HTML view is read-only. Edit in Visual mode.</p>
        </TabsContent>
      </Tabs>
    </Card>
  )
}


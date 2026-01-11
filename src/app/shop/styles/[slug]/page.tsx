import { notFound } from "next/navigation"
import { DecorStyle, decorStyles } from "@/lib/decor-styles"
import StylePageClient from "./client"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const slug = (await params)?.slug
  const style = decorStyles.find((s) => s.slug === slug)
  if (!style) return {}

  return {
    title: `${style.title}`,
    description: style.description,
  }
}

export function generateStaticParams() {
  return decorStyles.map((style) => ({ slug: style.slug }))
}

export default async function StylePage({ params }: Props) {
  const slug = (await params)?.slug
  const style:DecorStyle = decorStyles.find((s) => s.slug === slug)!
  if (!style) notFound()

  return <StylePageClient style={style} />
}

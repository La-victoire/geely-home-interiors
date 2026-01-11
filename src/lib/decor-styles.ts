export interface ColorSwatch {
  name: string
  color: string
}

export interface DecorStyle {
  id: string
  slug: string
  title: string
  description: string
  vibe: string
  heroImage: string
  idealFor: string[]
  mood: string
  colors: ColorSwatch[]
  story: {
    defines: string
    mistakes: string
    combining: string
  }
}

export const decorStyles: DecorStyle[] = [
  {
    id: "luxury-contemporary",
    slug: "luxury-contemporary",
    title: "Luxury Contemporary Living",
    description:
      "Modern design layered with bold luxury accents for high-impact interiors.",
    vibe: "Bold, polished, aspirational",
    heroImage: "/images/contemporay.jpg",
    idealFor: ["Living Rooms", "Penthouses", "New Builds", "Duplexes"],
    mood: "Confident & Grand",
    colors: [
      { name: "Cream", color: "#F5F1EC" },
      { name: "Charcoal Gray", color: "#3A3A3A" },
      { name: "Gold Accent", color: "#C9A24D" },
      { name: "Marble White", color: "#FAFAFA" },
      { name: "Jet Black", color: "#1C1C1C" },
    ],
    story: {
      defines:
        "Luxury Contemporary is Nigeria’s most aspirational style. Clean modern foundations elevated with chandeliers, mirrors, and premium finishes.",
      mistakes:
        "Overdoing gold accents or mixing too many statement pieces can make the space feel loud instead of refined.",
      combining:
        "Balance bold lighting with neutral furniture. Let one or two hero pieces carry the luxury narrative.",
    },
  },

  {
    id: "modern-minimal-nigeria",
    slug: "modern-minimal-nigeria",
    title: "Modern Minimal Living",
    description:
      "A softer, more practical take on minimalism suited for Nigerian homes.",
    vibe: "Clean, practical, understated",
    heroImage: "/images/modern-minimal.jpeg",
    idealFor: ["Apartments", "Bedrooms", "Home Offices"],
    mood: "Calm & Balanced",
    colors: [
      { name: "Off White", color: "#F7F7F5" },
      { name: "Soft Taupe", color: "#D8D2C8" },
      { name: "Ash Gray", color: "#BEBEBE" },
      { name: "Natural Wood", color: "#C4A484" },
      { name: "Muted Black", color: "#2E2E2E" },
    ],
    story: {
      defines:
        "Modern Minimal Nigerian style keeps spaces clean without feeling empty. It prioritizes comfort, airflow, and easy maintenance.",
      mistakes:
        "Going too bare can make rooms feel unfinished. Nigerians generally prefer some warmth and personality.",
      combining:
        "Add texture with rugs, curtains, and wall art while keeping furniture simple and functional.",
    },
  },

  {
    id: "classic-luxury",
    slug: "classic-luxury",
    title: "Classic Luxury Home",
    description:
      "Timeless elegance built on rich materials and traditional structure.",
    vibe: "Authoritative, warm, enduring",
    heroImage: "/images/classic-luxury.jpg",
    idealFor: ["Family Homes", "Formal Living Rooms", "Large Houses"],
    mood: "Prestige & Stability",
    colors: [
      { name: "Deep Brown", color: "#4A2E1F" },
      { name: "Wine Red", color: "#6B2A2A" },
      { name: "Cream", color: "#EFE6D8" },
      { name: "Dark Green", color: "#2F4F3E" },
      { name: "Antique Gold", color: "#B89B5E" },
    ],
    story: {
      defines:
        "Classic Luxury reflects legacy and permanence. Heavy furniture, symmetry, and rich textures define this style.",
      mistakes:
        "Mixing too many modern pieces can break the timeless feel.",
      combining:
        "Use modern lighting subtly while keeping furniture and layouts traditional.",
    },
  },

  {
    id: "hotel-inspired",
    slug: "hotel-inspired",
    title: "Hotel-Inspired Comfort",
    description:
      "Clean, welcoming interiors designed for comfort and universal appeal.",
    vibe: "Neutral, cozy, polished",
    heroImage: "/images/hotel-inspired.jpeg",
    idealFor: ["Shortlets", "Airbnbs", "Guest Rooms", "Rental Properties"],
    mood: "Relaxed & Inviting",
    colors: [
      { name: "Warm White", color: "#F4F4F2" },
      { name: "Sand Beige", color: "#E3D5C5" },
      { name: "Soft Brown", color: "#A1866F" },
      { name: "Charcoal", color: "#444444" },
      { name: "Muted Blue", color: "#6E7F91" },
    ],
    story: {
      defines:
        "Hotel-inspired interiors focus on comfort, simplicity, and wide appeal. Perfect for guests and short stays.",
      mistakes:
        "Too much personalization can reduce mass appeal.",
      combining:
        "Stick to neutral palettes and layer with quality bedding, lighting, and mirrors.",
    },
  },

  {
    id: "glam-soft-life",
    slug: "glam-soft-life",
    title: "Glam Soft Life",
    description:
      "High-gloss finishes, bold lighting, and statement décor for a luxury lifestyle.",
    vibe: "Flashy, expressive, Instagram-ready",
    heroImage: "/images/glam-soft.jpg",
    idealFor: ["Living Rooms", "Influencer Homes", "Show Apartments"],
    mood: "Bold & Aspirational",
    colors: [
      { name: "Blush Pink", color: "#F1C6C6" },
      { name: "Marble White", color: "#FAFAFA" },
      { name: "Gold", color: "#D4AF37" },
      { name: "Velvet Gray", color: "#7A7A7A" },
      { name: "Mirror Silver", color: "#CFCFCF" },
    ],
    story: {
      defines:
        "Glam Soft Life is about visual drama and status. Mirrors, velvet, and lighting do the heavy lifting.",
      mistakes:
        "Overcrowding the space with too many reflective or shiny surfaces.",
      combining:
        "Let one bold area shine and keep surrounding elements neutral.",
    },
  },

  {
    id: "afro-modern",
    slug: "afro-modern",
    title: "Afro-Modern Elegance",
    description:
      "A modern foundation enriched with African textures, art, and patterns.",
    vibe: "Cultural, expressive, grounded",
    heroImage: "/images/afro-modern.jpeg",
    idealFor: ["Living Rooms", "Creative Spaces", "Statement Homes"],
    mood: "Warm & Authentic",
    colors: [
      { name: "Earth Brown", color: "#7A4A2E" },
      { name: "Terracotta", color: "#C65A3A" },
      { name: "Olive Green", color: "#6B7B4E" },
      { name: "Cream", color: "#F2E8DC" },
      { name: "Charcoal Black", color: "#2B2B2B" },
    ],
    story: {
      defines:
        "Afro-Modern blends global design with African identity through art, materials, and storytelling.",
      mistakes:
        "Overusing patterns without a neutral base can overwhelm the space.",
      combining:
        "Anchor the room with modern furniture, then layer cultural elements intentionally.",
    },
  },
]

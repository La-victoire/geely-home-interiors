import { User } from "@/lib/types";

export const CATEGORIES = [
  {
    title: "Wall Art",
    image: "/images/Wall art painting in display for sale in an empty room_20250728_045342_0000.jpg",
    description:
    "Blank walls are dead space. Bring them to life with modern, abstract, or luxury framed art that commands attention. Every piece we offer is a conversation starter,because your walls should speak volumes.",
    slug: "wall-art",
  },
  {
    title: "Furniture",
    image: "/images/A couch with a lamp and a table in display for sale in a room_20250728_045608_0000.jpg",
    description:
    "Style meets comfort with our collection of accent chairs, tables, and luxury pieces. These aren’t your average furniture items,they’re interior weapons designed to upgrade your lifestyle and your Instagram feed.",
    slug: "furniture",
  },
  {
    title: "Lighting",
    image: "/images/Image of a chandelier in display for sale_20250728_044852_0000.jpg",
    description:
      "Set the tone of your space with statement lighting that screams elegance. From grand chandeliers to minimalist floor lamps, our curated selection turns any room into a visual experience. Lighting isn't just functional,it's the jewelry of your home.",
    slug: "lighting",
  },
  {
    title: "Greenery",
    image: "/images/A vase filled with flowers_20250728_044627_0000.jpg",
    description:
      "Lush. Alive. Effortless. Our collection of realistic faux plants and elegant planters injects nature’s calm into your space,without the mess or maintenance. It’s green without the grind.",
    slug: "greenery",
  },
  {
    title: "Decorative Objects",
    image: "/images/Home Accessories in display for sale in a room_20250728_045806_0000.jpg",
    description:
      "This is where luxury lives,in the details. Sculptures, vases, trays, and conversation pieces that silently shout taste, power, and precision. If your shelf game isn’t on point, don’t worry,we’ve got the ammo.",
    slug: "decorative-objects",
  },
];

export const CLIENT_REVIEWS = [
  {
    name: "Chioma U.",
    location: "Lekki, Lagos, Nigeria",
    review:
      "The chandelier I got from Geely Home Interiors completely changed my space. It looks expensive, it feels expensive and now, so do I.",
  },
  {
    name: "James H.",
    location: "Brooklyn, New York, USA",
    review:
      "Minimalist but bold. I bought a set of framed wall art and a gold vase, they look like pieces from a gallery. You guys seriously nailed the vibe.",
  },
  {
    name: "Aisha B.",
    location: "Maitama, Abuja, Nigeria",
    review:
      "Your greenery collection is unreal. My office feels like a luxury lounge now. The faux plants look better than real ones.",
  },
  {
    name: "Isabelle M.",
    location: "Paris, France",
    review:
      "I stumbled on Geely Home Interiors through Instagram and ordered two sculptural decor pieces. The craftsmanship is stunning. Delivery to France was smooth too.",
  },
];

export const VALUE_PROPS = [
  {
    title: "Saves You Time",
    description:
      "We’ve already done the hard work of curating timeless, high-impact pieces. No browsing 50 tabs or running to the market, just click, order, and elevate.",
    icon: "🕒", // Replace with SVG or component if needed
  },
  {
    title: "Delivers More Value for Your Money",
    description:
      "Enjoy luxury looks without the luxury price tag. Our pieces offer high-end aesthetics, quality finishes, and long-term use, without breaking the bank.",
    icon: "💸",
  },
  {
    title: "Style Made Simple",
    description:
      "Not sure what matches what? We’ve got you. Every item in our store is handpicked to blend effortlessly, so you can style with confidence, not confusion.",
    icon: "🎯",
  },
  {
    title: "Fast, Safe Nationwide Delivery",
    description:
      "From Lagos to Abuja, Port Harcourt to Kano, we get your order to you safely, securely, and without delays. What you see is what shows up, in one piece.",
    icon: "🚚",
  },
];

export const Footer_Links = [
  {
    title : "Explore",
    content : [
      "About-Us","Contact","Shipping","Returns","FAQ","Privacy-Policy","Terms-of-Service"
    ]
  },
  {
    title : "Categories",
    content : [
      "Living Room","Bedroom","Dinning Room","Office","Lighting","Accessories"
    ]
  }
];
  
export const Header_Menu = [
  {
    name : "Home",
    link : "/"
  },
  {
    name : "Products",
    link : "/shop/products"
  },
  {
    name : "About Us",
    link : "/about-us"
  },
  {
    name : "Contact",
    link : "/contact"
  },
];
  
export const sideMenu = [
  {
    name : "Home",
    link : "/"
  },
  {
    name : "Products",
    link : "/shop/products"
  },
  {
    name : "Wishlist",
    link : "/shop/wishlist"
  },
  {
    name : "Cart",
    link : "/shop/cart"
  },
  {
    name : "Contact",
    link : "/contact"
  },
];

export const users: User[] = [
{
  firstname: "Jane",
  lastname: "Doe",
  email: "jane.doe@example.com",
  status: "Active",
  _createdAt: "2025-09-01T14:32:00Z",
  _updatedAt:"2025-09-01T14:32:00Z",
  role:"Client",
  _id:"euajdc1",
  cart: [],
  phone: +1-2025550178,
  passwordHash: "$2a$10$xyz...",
  addresses: [
    {
      id: "a001",
      type: "home",
      street: "123 Elm Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    // {
    //   id: "a002",
    //   type: "work",
    //   street: "456 Madison Ave",
    //   city: "New York",
    //   state: "NY",
    //   postalCode: "10022",
    //   country: "USA",
    // },
  ],
  orders: [
    {
      id: "o1001",
      date: "2025-09-01T14:32:00Z",
      status: "shipped",
      shippingAddressId: "a001",
      client:"Jane Doe",
      payment: {
        method: "credit_card",
        transactionId: "txn_7890",
        amount: 249.99,
        currency: "USD",
      },
      items: [
        {
          name: "Luxury Crystal Chandelier",
          quantity: 1,
          price: 199.99,
        },
        {
          name: "Velvet Cushion Set",
          quantity: 2,
          price: 25.0,
        },
      ],
    },
    {
      status: "pending",
      client:"Jane Doe",
      items: [
        {
          name: "Wall Art Painting",
          quantity: 1,
          price: 89.99,
        },
      ],
    } as any,
  ],
},
{
  firstname: "John",
  lastname: "Smith",
  email: "john.smith@example.com",
  phone: +1-4155550132,
  status: "Inactive",
  _id:"euajdc",
  role:"Client",
  _updatedAt:"2025-09-01T14:32:00Z",
  cart:[],
  _createdAt: "2025-09-01T14:32:00Z",
  passwordHash: "$2a$10$abc...",
  addresses: [
    {
      id: "a003",
      type: "home",
      street: "789 Pine Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94108",
      country: "USA",
    },
  ],
  orders: [],
},
];

// constants.ts
// ==========================
// Geely Home Interiors – Brand, Policy, and Meta Data
// ==========================

export const SITE_META = {
  name: "Geely Home Interiors",
  domain: "https://geelyhomeinteriors.com",
  email: "geelyinteriors@gmail.com",
  phoneNumbers: ["+234-9066824344", "+234-7049539860"],
  whatsapp: "+234-7049539860",
  location: "Lagos, Nigeria",
  jurisdiction: "Lagos State, Nigeria",
  established: "2025",
  effectiveDate: "November 11, 2025",
  tagline: "Refined interiors, accessible luxury.",
  description:
    "Geely Home Interiors curates luxury interior accessories — chandeliers, mirrors, wall art, and décor — for Lagos homes. Fast dispatch, curated quality, and elegant living.",
  socials: {
    instagram: "https://instagram.com/geelyinterior",
    facebook: "https://facebook.com/geelyinterior",
    twitter: "https://twitter.com/geelyinterior",
  },
};

export const PAYMENT_INFO = {
  methods: [
    { name: "Paystack", type: "gateway", cod: false },
    { name: "Bank Transfer", type: "manual", cod: false },
  ],
  acceptsCashOnDelivery: false,
  taxes: [{ name: "Sales Tax", rate: 0.03 }],
  processors: ["Paystack"],
};

export const SHIPPING_POLICY = {
  title: "Shipping Policy",
  effectiveDate: SITE_META.effectiveDate,
  serviceArea: "Lagos State, Nigeria",
  deliveryMethod: "Local dispatch riders",
  eta: "Up to 48 hours from dispatch",
  freeShipping: true,
  trackingAvailable: false,
  confirmationRequired: true,
  overview: [
    "Geely Home Interiors operates as an online storefront/agent coordinating purchases and deliveries via supplier partners.",
    "Delivery is available only within Lagos State, Nigeria.",
    "Orders are processed within 0–2 business days after payment confirmation.",
    "Estimated delivery time: up to 48 hours from dispatch.",
    "Shipping is free for all Lagos deliveries. Customers only pay shipping on returns.",
    "No tracking links — order details and ETA are sent by email or WhatsApp.",
    "Customer must show delivery confirmation email to dispatch rider upon arrival.",
  ],
  support: {
    email: SITE_META.email,
    whatsapp: SITE_META.whatsapp,
  },
};

export const RETURNS_POLICY = {
  title: "Returns & Refunds Policy",
  effectiveDate: SITE_META.effectiveDate,
  window: "1 day (24 hours)",
  acceptsReturns: true,
  changeOfMindAllowed: false,
  restockingFee: false,
  refundTimeline: "Within 48 hours after returned item inspection",
  conditions: [
    "Returns accepted only for defective, damaged, or incorrect items reported within 24 hours of delivery.",
    "No returns accepted for change of mind or buyer’s remorse.",
    "Pickup will be arranged via dispatch rider, Do not self-ship.",
    "Return shipping cost is covered by Geely for defective or incorrect items; For any other authorized returns (if we make a rare exception), return shipping costs will be charged to the customer.",
    "Refunds are processed to the original payment method within 48 hours after we receive and inspect the returned product. Inspection may include photos and physical verification.",
    "We do not charge restocking fees. Refunds exclude any third-party processing fees that payment providers may retain.",
    "If a replacement is available, we will dispatch a replacement item once the return is approved and the original item is collected, at no additional shipping cost to you.",
    "Items damaged after delivery through customer misuse, or products marked explicitly as non-returnable by the supplier, are not eligible for return."
  ],
  contact: {
    email: SITE_META.email,
    whatsapp: SITE_META.whatsapp,
  },
};

export const FAQS = [
  {
    q: "Where do you deliver?",
    a: "Currently, we deliver only within Lagos State, Nigeria.",
  },
  {
    q: "How long will my order take?",
    a: "Orders typically arrive within 48 hours of dispatch.",
  },
  {
    q: "Do you accept Cash on Delivery?",
    a: "No. We accept Paystack and manual bank transfers only.",
  },
  {
    q: "Can I return a product if I change my mind?",
    a: "No. Returns are accepted only for defective, damaged, or incorrect items reported within 24 hours of delivery.",
  },
  {
    q: "Do you provide tracking?",
    a: "We provide order details and ETA only, not live tracking links.",
  },
  {
    q: "How do I verify my delivery?",
    a: "Show the dispatch rider your email confirmation upon delivery.",
  },
  {
    q: "How do I leave a review?",
    a: "Email your review to geelyinteriors@gmail.com or use the review form on the site.",
  },
];

export const PRIVACY_POLICY = {
  title: "Privacy Policy",
  effectiveDate: SITE_META.effectiveDate,
  controller: SITE_META.name,
  jurisdiction: SITE_META.jurisdiction,
  contact: SITE_META.email,
  dataCollected: [
    "Account & contact data: name, email, phone number, shipping and billing address when you place an order.",
    "Transactional data: order history, payment confirmations.",
    "Authentication data: if you create an account, we use NextAuth; phone number may be used for OTP verification where implemented.",
    "Communications: support communications and reviews you submit.",
    "Technical data: IP address and basic request logs; we do not currently use analytics or advertising pixels.",
    ],
  purposes: [
    "To process and fulfill orders and manage returns.",
    "To communicate order status, delivery ETAs, and support messages.",
    "To process payments via Paystack and to reconcile manual bank transfers.",
    "To comply with legal obligations and respond to disputes and claims.",
    "To communicate order status, delivery ETAs, and support messages.",
    "To process payments via Paystack and to reconcile manual bank transfers.",
    "To comply with legal obligations and respond to disputes and claims."
  ],
  thirdParties: ["Paystack", "MongoDB", "Nodemailer", "NextAuth"],
};

export const TERMS_OF_SERVICE = {
  title: "Terms of Service",
  effectiveDate: SITE_META.effectiveDate,
  jurisdiction: SITE_META.jurisdiction,
  ageRequirement: 18,
  contact: {
    email: SITE_META.email,
    whatsapp: SITE_META.whatsapp,
  },
};

export const ABOUT_US = {
  title: "About Us",
  tagline: SITE_META.tagline,
  description:
    "Geely Home Interiors curates luxury chandeliers, mirrors, wall art, and décor for Lagos homes. We make luxury effortless — curated, affordable, and delivered within 48 hours.",
  values: [
    "Fast Lagos delivery coordination via local dispatch riders.",
    "Simple and secure checkout via Paystack or bank transfer.",
    "Responsive support and post-purchase care.",
  ],
  note: "Geely Home Interiors operates as an online platform; products and logistics are fulfilled by partner suppliers.",
  contact: {
    email: SITE_META.email,
    whatsapp: SITE_META.whatsapp,
    socials: SITE_META.socials,
  },
};

export const CONTACTS = {
  email: SITE_META.email,
  phones: SITE_META.phoneNumbers,
  whatsapp: SITE_META.whatsapp,
  location: SITE_META.location,
  socials: SITE_META.socials,
};


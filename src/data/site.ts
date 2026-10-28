/**
 * Zain Studio — site content
 * All portfolio, team and contact data preserved from the original site
 * (zainstudio.vercel.app) and reorganised for the redesign.
 */

export const SITE = {
  name: 'Zain Studio',
  url: 'https://zainstudio.vercel.app',
  tagline: 'Digital experiences that stand out.',
  email: 'contact.zainstudio@gmail.com',
  phone: '+92 313 2167 463',
  phoneRaw: '923132167463',
  location: 'Karachi, Pakistan',
  linkedin: 'https://www.linkedin.com/company/zainstudio-co/',
  emailjs: {
    serviceId: 'service_xjpx9i7',
    templateId: 'template_vkppjrr',
    publicKey: 'SrjWQ7YnOv125-X-1',
  },
  driveVideo: 'https://drive.google.com/drive/folders/1ceQeMTZuyZjawpBmv6qlzXAadVPdyehU',
  driveGraphics: 'https://drive.google.com/drive/folders/1kMxWv6oSbZZoN4NomRx0Po3UjXZeR1bx',
}

export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export interface Service {
  index: string
  slug: string
  title: string
  short: string
  description: string
  points: string[]
  image: string
  links?: { label: string; url: string }[]
}

export const SERVICES: Service[] = [
  {
    index: '01',
    slug: 'web',
    title: 'Web Development',
    short: 'Sites & platforms',
    description:
      'Conversion-first websites and web platforms with clear messaging, premium visuals and seamless performance.',
    points: ['Next.js / React', 'E-commerce', 'CMS & headless', 'Performance & SEO'],
    image: '/work/okair.jpg',
  },
  {
    index: '02',
    slug: 'app',
    title: 'App Development',
    short: 'iOS & Android',
    description:
      'Cross-platform product experiences engineered for delight, retention and growth on mobile.',
    points: ['React Native / Flutter', 'Real-time systems', 'Cloud backends', 'Store launch'],
    image: '/work/hundo.jpg',
  },
  {
    index: '03',
    slug: 'uiux',
    title: 'UI/UX Design',
    short: 'Product design',
    description:
      'Research-led interfaces and design systems that make complex products feel effortless.',
    points: ['UX research', 'Wireframes → hi-fi', 'Design systems', 'Prototyping'],
    image: '/work/grossmargin.jpg',
  },
  {
    index: '04',
    slug: 'graphic',
    title: 'Graphic Design',
    short: 'Brand & visuals',
    description:
      'Premium visual identities and campaign assets that sharpen your message and deepen brand recognition.',
    points: ['Brand identity', 'Campaign creative', 'Social assets', 'Print & packaging'],
    image: '/work/graphic.jpg',
  },
  {
    index: '05',
    slug: 'video',
    title: 'Video Production',
    short: 'Edit & motion',
    description:
      'Fast-moving, high-impact storytelling designed to stop the scroll and amplify brand recall.',
    points: ['Video editing', 'Motion graphics', 'Reels & ads', 'Post-production & VFX'],
    image: '/work/video.jpg',
  },
  {
    index: '06',
    slug: 'marketing',
    title: 'Digital Marketing',
    short: 'Growth & performance',
    description:
      'Data-driven campaigns engineered to scale reach, generate high-intent leads and maximise return on ad spend.',
    points: ['Performance ads', 'SEO & content', 'Social growth', 'Funnels & analytics'],
    image: '/work/marketing.jpg',
    links: [
      { label: 'Instagram — @flipliper', url: 'https://www.instagram.com/flipliper/' },
      { label: 'Instagram — @fliplip.studios', url: 'https://www.instagram.com/fliplip.studios/' },
    ],
  },
  {
    index: '07',
    slug: 'ai',
    title: 'AI Automation',
    short: 'Chatbots & workflows',
    description:
      'AI assistants and workflow automations that answer customers, book appointments and take routine work off your team — around the clock.',
    points: ['WhatsApp AI assistants', 'FAQ & lead automation', 'Appointment booking', 'Workflow automation'],
    image: '/work/ai.jpg',
  },
]

export interface Project {
  id: string
  title: string
  tagline: string
  category: string
  description: string
  tech: string[]
  url?: string
  image: string
  size: 'large' | 'medium' | 'small'
  year: string
}

export const PROJECTS: Project[] = [
  {
    id: 'okair',
    title: 'Okair Jewels',
    tagline: 'Full-stack e-commerce jewellery platform',
    category: 'Web Development · E-commerce',
    description:
      'A premium, fully functional e-commerce web app with custom database architecture, secure checkout, product management and a high-conversion UI.',
    tech: ['React.js', 'Node.js', 'Express', 'Tailwind CSS'],
    url: 'https://www.okair.store',
    image: '/work/okair.jpg',
    size: 'large',
    year: '2025',
  },
  {
    id: 'hundo',
    title: 'Hundo',
    tagline: 'International on-demand meal & food delivery',
    category: 'App Development',
    description:
      'A cross-platform food delivery ecosystem for overseas markets with real-time tracking, multi-currency payments and vendor dashboards.',
    tech: ['React Native', 'Cloud Backend', 'Geolocation APIs'],
    url: 'https://play.google.com/store/apps/details?id=com.hundo.app&hl=en',
    image: '/work/hundo.jpg',
    size: 'medium',
    year: '2025',
  },
  {
    id: 'grossmargin',
    title: 'The Gross Margin',
    tagline: 'E-commerce analytics & margin optimisation',
    category: 'Web Platform · UI/UX',
    description:
      'A high-performance platform that helps e-commerce operators analyse profit margins, optimise pricing and track revenue metrics.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    url: 'https://www.thegrossmargin.com/',
    image: '/work/grossmargin.jpg',
    size: 'large',
    year: '2025',
  },
  {
    id: 'royal',
    title: 'Royal Fumigation',
    tagline: 'Industrial & commercial service web app',
    category: 'Web Development',
    description:
      'A corporate service platform with dynamic service listings, a booking query engine and scalable MongoDB integration.',
    tech: ['Next.js', 'MongoDB', 'REST API'],
    url: 'https://www.royalfumigation.services/',
    image: '/work/royal.jpg',
    size: 'small',
    year: '2024',
  },
  {
    id: 'healthgru',
    title: 'HealthGru',
    tagline: 'Digital health & wellness media platform',
    category: 'Web Development · SEO',
    description:
      'A fast, SEO-optimised content platform and health blog engine engineered for performance and reader engagement.',
    tech: ['Next.js', 'Server Components', 'SEO'],
    url: 'https://www.healthgru.com/',
    image: '/work/healthgru.jpg',
    size: 'small',
    year: '2024',
  },
  {
    id: 'merigari',
    title: 'Meri Gari',
    tagline: 'Heavy logistics & transport booking',
    category: 'App Development',
    description:
      'An all-in-one commercial freight booking platform connecting businesses with loaders and heavy freight trucks for nationwide logistics.',
    tech: ['Mobile Architecture', 'Real-time Tracking', 'REST APIs'],
    url: 'https://www.merigari.com',
    image: '/work/merigari.jpg',
    size: 'medium',
    year: '2025',
  },
  {
    id: 'video',
    title: 'Video Production Reel',
    tagline: 'Campaign edits, reels, motion graphics & VFX',
    category: 'Video Editing · Motion',
    description:
      'A collection of fast-moving brand films, social reels and post-production work engineered to stop the scroll and amplify recall.',
    tech: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics'],
    url: 'https://drive.google.com/drive/folders/1ceQeMTZuyZjawpBmv6qlzXAadVPdyehU',
    image: '/work/video.jpg',
    size: 'small',
    year: '2025',
  },
  {
    id: 'graphic',
    title: 'Graphic Design Portfolio',
    tagline: 'Brand identities, campaign creative & social assets',
    category: 'Graphic Design · Branding',
    description:
      'Visual identity systems, print collateral, campaign graphics and social media creatives crafted to sharpen brand recognition.',
    tech: ['Illustrator', 'Photoshop', 'Figma', 'Brand Systems'],
    url: 'https://drive.google.com/drive/folders/1kMxWv6oSbZZoN4NomRx0Po3UjXZeR1bx',
    image: '/work/graphic.jpg',
    size: 'small',
    year: '2025',
  },
]

export const STATS = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 42, suffix: '', label: 'Brands launched' },
  { value: 96, suffix: '%', label: 'Client retention' },
  { value: 8, suffix: '+', label: 'Years of execution' },
]

export const WHY = [
  {
    index: '01',
    title: 'Creative thinking',
    text: 'Every project starts with an idea worth remembering — not a template.',
  },
  {
    index: '02',
    title: 'Modern technology',
    text: 'React, Next.js, React Native and cloud backends — built for speed and scale.',
  },
  {
    index: '03',
    title: 'Pixel-perfect design',
    text: 'Type, spacing and motion are treated as engineering, not decoration.',
  },
  {
    index: '04',
    title: 'Fast execution',
    text: 'Tight sprints, weekly demos, no black boxes. Most sites ship in 2–8 weeks.',
  },
  {
    index: '05',
    title: 'Complete digital solutions',
    text: 'Strategy, design, code, motion, marketing and launch — one team, one workflow.',
  },
]

export const PROCESS = [
  {
    index: '01',
    title: 'Discover',
    text: 'We map the opportunity, audience and business goals to shape a clear foundation.',
  },
  {
    index: '02',
    title: 'Plan',
    text: 'Insights become positioning, scope and a roadmap built to convert.',
  },
  {
    index: '03',
    title: 'Design',
    text: 'Wireframes to pixel-perfect interfaces, motion and brand systems.',
  },
  {
    index: '04',
    title: 'Develop',
    text: 'Clean, tested code across web and mobile — reviewed weekly with you.',
  },
  {
    index: '05',
    title: 'Launch',
    text: 'We ship, measure and support growth beyond day one.',
  },
]

export const TEAM = [
  {
    name: 'Zain Azad',
    role: 'Founder & Agency Director',
    focus: 'Strategy · Operations',
    initials: 'ZA',
  },
  {
    name: 'Syed Muhammad Saad',
    role: 'Lead Web & Mobile Developer',
    focus: 'React · Next.js · Architecture',
    initials: 'SS',
  },
  {
    name: 'Sheikh Muzammil',
    role: 'Lead Graphic Designer',
    focus: 'Brand · UI/UX · Visuals',
    initials: 'SM',
  },
  {
    name: 'Asadullah Iftekhar',
    role: 'Senior Video Editor',
    focus: 'Post-production · Motion · VFX',
    initials: 'AI',
  },
  {
    name: 'Hasnain Siddiqui',
    role: 'Lead Digital Marketer',
    focus: 'Performance · SEO · Growth funnels',
    initials: 'HS',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Ayesha Khan',
    role: 'Marketing Lead, Northstar',
    quote:
      'The team brought clarity, speed, and premium execution to every touchpoint. We saw better engagement within weeks of launch.',
  },
  {
    name: 'Usman Rafiq',
    role: 'Founder, Aster Labs',
    quote:
      'From vision to rollout, the strategy and design felt deeply aligned with our business goals. Everything was thoughtful and intentional.',
  },
  {
    name: 'Maham Tariq',
    role: 'Brand Manager, Vanta',
    quote:
      'The visual identity and campaign assets felt elevated and on-brand immediately. The work gave our launch a real competitive edge.',
  },
]

export const FAQ = [
  {
    q: 'What kinds of projects do you take on?',
    a: 'Brand launches, website builds, product marketing pages, mobile apps, motion content and complete visual systems for businesses that want a stronger digital presence.',
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'Most website and brand engagements run between 2 and 8 weeks. Larger product or multi-channel projects get a customised roadmap.',
  },
  {
    q: 'Can you work with an in-house team?',
    a: 'Absolutely. We regularly collaborate with founders, marketing teams and internal stakeholders to extend capacity while keeping execution aligned with your goals.',
  },
  {
    q: 'Do you handle strategy and execution together?',
    a: 'Yes. Strategy, design, development and delivery run under one workflow so the creative and technical work stay consistent from planning through launch.',
  },
]

export const MARQUEE_ITEMS = [
  'Web Development',
  'UI/UX Design',
  'App Development',
  'Graphic Design',
  'Video Production',
  'Digital Marketing',
  'AI Automation',
  'Brand Identity',
]

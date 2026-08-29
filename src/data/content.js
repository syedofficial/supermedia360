// TODO: replace with the real Google Form link — every "Get Started" /
// plan CTA button opens this in a new tab.
export const googleFormUrl = 'https://forms.google.com/REPLACE_ME'

export const philosophyPillars = [
  {
    step: '1-1',
    title: 'Strategy',
    body: 'Every campaign starts with a clear, data-driven roadmap built around your goals — not guesswork.',
    accent: 'var(--brand-red)',
  },
  {
    step: '1-2',
    title: 'Creative',
    body: 'Premium visuals, reels, and content designed to stop the scroll and spark real engagement.',
    accent: 'var(--brand-orange)',
  },
  {
    step: '1-3',
    title: 'Growth',
    body: 'From awareness to leads to conversions — we build systems that scale your brand sustainably.',
    accent: 'var(--brand-green)',
  },
]

export const services = [
  {
    key: 'social',
    title: 'Social Media Management',
    body: 'Consistent, on-brand posting across Instagram, Facebook, and more — fully managed for you.',
    accent: 'var(--brand-red)',
  },
  {
    key: 'reels',
    title: 'Reel Editing',
    body: 'Cinematic short-form video editing with trending hooks, transitions, and captions that convert.',
    accent: 'var(--sky-500)',
  },
  {
    key: 'ads',
    title: 'Meta Ads',
    body: 'Performance-driven paid campaigns on Facebook and Instagram engineered for maximum ROI.',
    accent: 'var(--brand-green)',
  },
  {
    key: 'branding',
    title: 'Branding',
    body: "Premium brand identity systems — logos, color palettes, and guidelines that command respect.",
    accent: 'var(--coin-yellow)',
  },
  {
    key: 'content',
    title: 'Content Creation',
    body: "High-quality photo and graphic content crafted to reflect your brand's premium positioning.",
    accent: 'var(--brand-orange)',
  },
  {
    key: 'leads',
    title: 'Lead Generation',
    body: 'Targeted funnels and ad strategies that fill your pipeline with qualified, ready-to-buy leads.',
    accent: 'var(--leaf-green)',
  },
]

export const whyFeatures = [
  {
    title: 'Affordable Pricing',
    body: 'Premium-quality marketing at packages designed for small and growing businesses.',
    accent: 'var(--brand-red)',
  },
  {
    title: 'Fast Communication',
    body: 'Dedicated account support with responses within hours — not days.',
    accent: 'var(--coral)',
  },
  {
    title: 'Growth-Focused Strategy',
    body: 'Every decision ties back to measurable business growth, not just aesthetics.',
    accent: 'var(--brand-green)',
  },
  {
    title: 'Real Results',
    body: 'Designed for real businesses — restaurants, boutiques, startups, and local brands.',
    accent: 'var(--coin-yellow)',
  },
]

// Placeholder figures — swap in real numbers before launch.
export const whyStats = [
  { value: 120, suffix: '+', label: 'Projects Completed', accent: 'var(--brand-red)' },
  { value: 60, suffix: '+', label: 'Brands Helped', accent: 'var(--coin-yellow)' },
  { value: 2, suffix: 'M+', label: 'Monthly Reach', accent: 'var(--sky-200)' },
  { value: 95, suffix: '%', label: 'Client Retention', accent: 'var(--brand-green)' },
]

export const packages = [
  {
    key: 'starter',
    name: 'Starter',
    tagline: 'For brands ready to get noticed.',
    price: '₹7,999/mo',
    features: [
      '12 Posts per month',
      'Basic Reel Editing',
      'Custom Captions',
      'Monthly Performance Report',
    ],
    cta: 'Get Started',
    featured: false,
    accent: 'var(--sky-500)',
  },
  {
    key: 'growth',
    name: 'Growth',
    tagline: 'For brands ready to scale fast.',
    price: '₹14,999/mo',
    badge: 'Most Popular — Recommended',
    features: [
      '20 Posts per month',
      '8 Premium Reels',
      'Strategy Support',
      'Engagement Management',
    ],
    cta: 'Start Growing',
    featured: true,
  },
  {
    key: 'premium',
    name: 'Premium',
    tagline: 'For brands ready to dominate their market.',
    price: '₹24,999/mo',
    features: [
      '30+ Content Pieces',
      'Advanced Reel Production',
      'Full Ad Campaign Setup',
      'Lead Generation System',
    ],
    cta: 'Get Premium',
    featured: false,
    accent: 'var(--ink)',
  },
]

export const portfolioProjects = [
  {
    key: 'fashion',
    name: 'Fashion Brand Campaign',
    category: 'Social & Content',
    result: 'Full content calendar + reels for a premium clothing boutique — 40K new followers in 90 days.',
    color: '#e5342b',
  },
  {
    key: 'restaurant',
    name: 'Restaurant Social Growth',
    category: 'Content Strategy',
    result: 'Mouth-watering content strategy that tripled weekend foot traffic for a fine dining client.',
    color: '#f7941d',
  },
  {
    key: 'realestate',
    name: 'Real Estate Lead Gen',
    category: 'Performance Marketing',
    result: 'Meta Ad funnels generating 200+ qualified property leads monthly for a local real estate firm.',
    color: '#2e8fe8',
  },
]

export const testimonials = [
  {
    quote:
      'SuperMedia360 completely transformed our online presence. Within 60 days our DMs were flooded with inquiries. Absolutely worth every rupee.',
    name: 'Priya S.',
    role: 'Boutique Owner',
  },
  {
    quote:
      'The reel edits and content quality are on another level. Our engagement went from dead to 10x in one month. Highly recommend the Growth package.',
    name: 'Karan M.',
    role: 'Restaurant Owner',
  },
  {
    quote:
      'Professional, fast, and results-driven. SuperMedia360 delivered a full branding package and ad strategy that generated leads on day one.',
    name: 'Arjun D.',
    role: 'Real Estate Agent',
  },
]

export const ratingCategories = [
  'Content Quality',
  'Communication',
  'Results Delivered',
  'Overall Experience',
]

export const industries = [
  { key: 'fashion', label: 'Clothing & Fashion Brands', accent: 'var(--brand-orange)' },
  { key: 'realestate', label: 'Real Estate', accent: 'var(--sky-500)' },
  { key: 'clinics', label: 'Clinics & Hospitals', accent: 'var(--brand-red)' },
  { key: 'salons', label: 'Salons & Spas', accent: 'var(--leaf-green)' },
  { key: 'education', label: 'Educational Institutes', accent: 'var(--coin-yellow)' },
  { key: 'restaurants', label: 'Restaurants & Cafés', accent: 'var(--brand-red)' },
  { key: 'ecommerce', label: 'E-commerce Stores', accent: 'var(--sky-500)' },
  { key: 'coaches', label: 'Coaches & Consultants', accent: 'var(--coin-yellow)' },
  { key: 'gyms', label: 'Gyms & Fitness Centers', accent: 'var(--brand-green)' },
  { key: 'local', label: 'Local Service Businesses', accent: 'var(--leaf-green)' },
]

export const ctaFeatures = [
  {
    title: 'Free Strategy Call',
    body: "Book a no-obligation call and get a custom growth plan for your brand.",
  },
  {
    title: 'Onboard in 48 Hours',
    body: 'Fast onboarding means your content engine starts running within days.',
  },
  {
    title: 'See Results in 30 Days',
    body: 'Track measurable growth from your very first month with SuperMedia360.',
  },
]

// Single source of truth for the header nav and the footer's Quick Links —
// both render this same list so they can never drift apart.
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

// Accents mirror the 01–04 accent order used in the "Why SuperMedia360?"
// cards, so hovering each social icon picks up a different brand color.
export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram', accent: 'var(--brand-red)' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook', accent: 'var(--sky-500)' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin', accent: 'var(--brand-green)' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube', accent: 'var(--coin-yellow)' },
]

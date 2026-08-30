// Every "Get Started" / plan CTA button opens this form in the themed
// on-site popup (see GetStartedModal) rather than a new tab.
export const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSfIGNpmCiOJ_fXtr4Z1gUINqIeOhoZ34nAKnZVKT8706CGa-Q/viewform'

// Shared by CallPicker (tel:) and WhatsAppButton (wa.me) — both team
// members should be reachable, so visitors pick which one to contact
// rather than either link guessing for them.
export const contactNumbers = ['7806929113', '8667665118']

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
    key: 'marketing',
    title: 'Digital Marketing',
    body: 'Grow your business with smart strategies, SEO, social media, and paid ads.',
    accent: 'var(--brand-red)',
  },
  {
    key: 'branding',
    title: 'Branding',
    body: 'Build a strong, memorable brand with professional design and visual identity.',
    accent: 'var(--sky-500)',
  },
  {
    key: 'social',
    title: 'Social Media Management',
    body: 'Keep your brand active and engaging across Instagram, Facebook, and more.',
    accent: 'var(--brand-green)',
  },
  {
    key: 'video',
    title: 'Video Production',
    body: 'Create engaging reels, promotional videos, corporate videos, and AI content.',
    accent: 'var(--coin-yellow)',
  },
  {
    key: 'webdev',
    title: 'Web Development',
    body: 'Build modern, AI-powered, animated, and interactive websites that engage visitors.',
    accent: 'var(--brand-orange)',
  },
  {
    key: 'photography',
    title: 'Photography',
    body: 'Capture high-quality visuals that showcase your products, people & brand.',
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

// These are social media management packages.
export const packages = [
  {
    key: 'starter',
    name: 'Starter Pack',
    tagline: 'One-time investment',
    price: '₹1,999*',
    features: [
      'Business Market Analysis & Strategy',
      'Photography',
      '1 Reel Editing',
      'Meta Ads Setup',
      'Content Writing',
      'Performance Report',
    ],
    note: 'Additionally, we can include GMB setup if negotiated on price.',
    cta: "Let's Talk",
    featured: false,
    accent: 'var(--sky-500)',
  },
  {
    key: 'growth',
    name: 'Growth Pack',
    tagline: 'Subscription Basis (1 Month)',
    price: '₹4,999*/mo',
    badge: 'Recommended',
    features: [
      'Business Market Analysis & Strategy',
      'Professional Photography',
      'Business Promotional Videography',
      '15 Business Promotional Posts',
      '3 Premium Reels Editing',
      'Instagram Auto Engagement Setup',
      'Meta Ads Setup',
      'Content Writing',
      'Monthly Performance Report',
    ],
    note: 'Additionally, we can include GMB & influencer marketing if negotiated on price.',
    cta: 'Start Growing',
    featured: true,
  },
  {
    key: 'premium',
    name: 'Premium Pack',
    tagline: 'Minimum Subscription Basis (3 Months)',
    price: '₹9,999*/mo',
    features: [
      'Account Management',
      'Business Market Analysis & Strategy',
      'Professional Photography',
      'Business Promotional Videography',
      '2 AI Promotional Video Productions',
      '25 Business Promotional Posts',
      '5 Premium Reels Editing',
      'WhatsApp Chat Integration',
      'Instagram Auto Engagement Setup',
      'Full Meta Ads Campaign Setup',
      'Influencer Marketing Promotion (1 reel)',
      'SEO (for existing client websites)',
      'Guideline Templates',
      'Content Writing',
      'Monthly Performance Report',
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
// LinkedIn and YouTube are hidden for now (no live profile yet) — re-add
// them here with a real href once those are up.
export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/supermedia360?igsi=dWY5ajZ4OWMzeTRo', icon: 'instagram', accent: 'var(--brand-red)' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594078166184', icon: 'facebook', accent: 'var(--sky-500)' },
]

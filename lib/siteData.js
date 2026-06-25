// Centralized site content & config — Brinexa Solutions

export const SITE = {
  name: "Brinexa Solutions",
  tagline: "Your Brand's New Best Friend",
  phone: "+92 317 0796913",
  phoneRaw: "923170796913",
  email: "brinexasolutions@gmail.com",
  location: "Faisalabad, Punjab, Pakistan",
  hours: "Mon-Sat, 9:00 AM - 6:00 PM PKT",
  whatsapp:
    "https://wa.me/923170796913?text=Hi%20Brinexa%20Solutions%2C%20I%27d%20like%20to%20discuss%20a%20project",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61581051916636",
    instagram: "#",
    tiktok: "#",
    linkedin: "#",
    youtube: "#",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export const SERVICES = [
  { slug: "design-branding", icon: "Palette", title: "Brand Identity & Design", short: "Logos, brand kits, and visuals that speak for you", desc: "Creative design solutions that build memorable brands - logo design, full brand identity kits, social media templates, packaging design, and beyond." },
  { slug: "web-development", icon: "Code2", title: "Web Development", short: "Fast, modern websites that convert visitors into clients", desc: "Custom websites built for speed, design, and conversions - from landing pages to full eCommerce stores." },
  { slug: "digital-marketing", icon: "TrendingUp", title: "Digital Marketing", short: "Organic growth through content, SEO & social media", desc: "Content strategy, SEO, social media management, and community building to grow your audience organically." },
  { slug: "paid-ads", icon: "Target", title: "Paid Advertising", short: "Meta, TikTok, Google, LinkedIn - ads that actually work", desc: "High-ROI campaigns on Meta, TikTok, Google, LinkedIn & Amazon PPC - managed by certified ad specialists." },
  { slug: "amazon-ecommerce", icon: "ShoppingCart", title: "Amazon & eCommerce", short: "Full account management, listings & PPC campaigns", desc: "Complete Amazon account management - product listings, A+ content, PPC campaigns, brand registry & review strategies." },
  { slug: "video-editing", icon: "Clapperboard", title: "Video Editing", short: "Scroll-stopping reels, ads & brand videos", desc: "Professional video editing for social media, ads, YouTube, and brand content - reels, short-form videos & promo ads." },
];

export const SERVICE_DETAILS = {
  "design-branding": {
    h1: "Design That Makes Your Brand Unforgettable",
    sub: "First impressions matter. We create visual identities that tell your brand's story at a glance.",
    included: ["Logo Design (Primary + Variations + Favicon)", "Brand Color Palette & Typography System", "Brand Style Guide / Brand Kit (PDF)", "Social Media Templates (Posts, Stories, Highlights)", "Packaging & Label Design", "Business Cards, Letterheads & Stationery", "Banner & Ad Creative Design", "Website UI/UX Design"],
    process: ["Discovery Call", "Brand Questionnaire", "Mood Board", "3 Concepts", "Revisions", "Final Delivery"],
    faq: [
      { q: "How long does a full brand identity take?", a: "Typically 2-3 weeks depending on scope and revision rounds." },
      { q: "How many logo concepts do I get?", a: "You'll receive 3 initial concepts, then we refine your favourite." },
      { q: "What files will I receive?", a: "Editable source files plus AI, PNG, SVG and PDF exports for every use case." },
      { q: "Do you design social media templates too?", a: "Yes - posts, stories and highlight covers are included in our kits." },
    ],
  },
  "web-development": {
    h1: "Websites That Work As Hard As You Do",
    sub: "Modern, fast, mobile-first websites built to turn visitors into paying customers.",
    included: ["Business / Portfolio Websites", "eCommerce Stores (Shopify, WooCommerce)", "Landing Pages for Lead Generation", "Custom Web Applications", "Website Redesigns & Speed Optimization", "Mobile-responsive & SEO-friendly builds", "Contact forms & Google Analytics setup", "30-day post-launch support"],
    process: ["Discovery & Planning", "Wireframe & Design", "Development", "Content & SEO", "QA & Testing", "Launch & Support"],
    faq: [
      { q: "What tech stack do you use?", a: "WordPress, Shopify, React, Next.js, WooCommerce or Webflow - chosen to fit your needs." },
      { q: "Will my site be mobile-friendly?", a: "Always. Every build is fully responsive from 320px to large desktops." },
      { q: "Do you offer post-launch support?", a: "Yes - every project includes 30 days of post-launch support." },
      { q: "Can you redesign my existing site?", a: "Absolutely. Redesigns and speed optimization are among our most-requested services." },
    ],
  },
  "digital-marketing": {
    h1: "Grow Your Audience. Build Your Brand. Without Paid Ads.",
    sub: "Sustainable, long-term growth through content, SEO, and smart social media strategy.",
    included: ["Social Media Management (Facebook, Instagram, TikTok, LinkedIn)", "Content Strategy & Monthly Calendar", "SEO - On-page, Off-page, Technical SEO", "Blog Writing & Content Marketing", "Community Management & Engagement", "Influencer Outreach & Collaboration"],
    process: ["Audit & Research", "Strategy & Calendar", "Content Creation", "Publish & Engage", "Analyze", "Optimize"],
    faq: [
      { q: "How soon will I see organic results?", a: "Organic growth compounds - most clients see meaningful traction in 2-3 months." },
      { q: "Which platforms do you manage?", a: "Facebook, Instagram, TikTok and LinkedIn, tailored to where your audience is." },
      { q: "Do you write the content too?", a: "Yes - strategy, captions, blogs and creative are all handled by our team." },
      { q: "Is SEO included?", a: "On-page, off-page and technical SEO are all part of our organic packages." },
    ],
  },
  "paid-ads": {
    h1: "Ads That Actually Convert. ROI You Can See.",
    sub: "Stop wasting budget on ineffective ads. We build, manage & optimize campaigns that deliver real results.",
    included: ["Meta Ads (Facebook & Instagram) - lead gen, eCommerce, retargeting", "TikTok Ads - short-form video ads for reach & conversions", "Google Ads - Search, Display, Shopping & YouTube", "LinkedIn Ads - B2B lead generation & sponsored content", "Amazon PPC - Sponsored Products, Brands & Display", "Campaign setup, creative & audience targeting", "A/B testing & budget optimization", "Weekly performance reports"],
    process: ["Goal & Audience Research", "Creative & Copy", "Campaign Setup", "Launch", "A/B Test & Optimize", "Report & Scale"],
    faq: [
      { q: "What ad budget do I need?", a: "We work with a range of budgets and will recommend a starting point during your consultation." },
      { q: "Which platforms do you run ads on?", a: "Meta, TikTok, Google, LinkedIn and Amazon PPC." },
      { q: "How often will I get reports?", a: "Weekly performance reports, plus a real-time view on premium plans." },
      { q: "Do you create the ad creative?", a: "Yes - ad copy and creative are included in campaign management." },
    ],
  },
  "amazon-ecommerce": {
    h1: "Sell More on Amazon. We'll Handle the Rest.",
    sub: "From listing creation to PPC management - we are your complete Amazon growth partner.",
    included: ["Amazon Account Setup & Management", "Product Listing Creation & Optimization", "A+ Content / Enhanced Brand Content", "Amazon Brand Registry", "Amazon PPC Campaign Management", "Keyword Research & Ranking Strategy", "FBA Consultation & Inventory Support", "Competitor Analysis"],
    process: ["Account Audit", "Keyword Research", "Listing Optimization", "A+ Content", "PPC Launch", "Rank & Scale"],
    faq: [
      { q: "Do you handle brand registry?", a: "Yes - we guide you through Amazon Brand Registry end to end." },
      { q: "Can you optimize my existing listings?", a: "Definitely - listing and A+ content optimization is a core service." },
      { q: "Do you manage PPC campaigns?", a: "Yes - Sponsored Products, Brands and Display, fully managed and optimized." },
      { q: "Do you offer FBA support?", a: "We provide FBA consultation and inventory support as part of our packages." },
    ],
  },
  "video-editing": {
    h1: "Video Content That Stops the Scroll.",
    sub: "From raw footage to scroll-stopping content - we edit videos that get watched, shared & remembered.",
    included: ["Instagram & TikTok Reels", "YouTube Videos (Long-form & Shorts)", "Facebook & Google Video Ads", "Brand Promo Videos", "Product Demo Videos", "Event Highlight Reels", "Color grading, captions & sound design", "Motion graphics & thumbnail design"],
    process: ["Brief & Footage", "Rough Cut", "Editing & Effects", "Color & Sound", "Revisions", "Final Export"],
    faq: [
      { q: "What's your turnaround time?", a: "Most short-form edits are delivered in 2-4 days depending on volume." },
      { q: "Do you add captions and subtitles?", a: "Yes - captions, subtitles and sound design are all included." },
      { q: "Can you export for every platform?", a: "We deliver platform-optimized exports for Reels, TikTok, YouTube and ads." },
      { q: "Do you design thumbnails too?", a: "Yes - thumbnail design is included for YouTube content." },
    ],
  },
};

export const PRICING_TIERS = [
  { name: "Starter", points: ["Social Media Management", "3 posts/week", "Basic design", "1 platform", "Monthly report"] },
  { name: "Growth", featured: true, points: ["Social + Ads", "5 posts/week", "Design + Video", "3 platforms", "Weekly report", "Ad campaigns"] },
  { name: "Premium", points: ["Full Service", "Daily content", "Design + Video + Dev", "All platforms", "Real-time dashboard", "Ads + Amazon PPC"] },
];

export const WHY_CHOOSE = [
  { icon: "Layers", title: "End-to-end support", desc: "No need to hire multiple agencies - we handle everything under one roof." },
  { icon: "MessageSquare", title: "Transparent communication", desc: "You're always in the loop, every step of the way." },
  { icon: "BarChart3", title: "Data-driven strategies", desc: "Every decision backed by real numbers, not guesses." },
  { icon: "Globe", title: "Global-standard execution", desc: "A Pakistan-based team delivering world-class quality." },
  { icon: "Wallet", title: "Affordable packages", desc: "Flexible plans for startups & growing brands." },
];

export const PROCESS = [
  { step: "01", title: "Discover", desc: "We understand your brand, goals & target audience." },
  { step: "02", title: "Strategize", desc: "We build a custom plan tailored to your needs." },
  { step: "03", title: "Execute", desc: "Our team delivers with precision & creativity." },
  { step: "04", title: "Grow", desc: "We track, optimize & scale what works." },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Brands Served", icon: "Briefcase" },
  { value: 30, suffix: "+", label: "Websites Launched", icon: "Rocket" },
  { value: 20, suffix: "+", label: "Ad Campaigns Managed", icon: "Megaphone" },
  { value: 95, suffix: "%", label: "Client Satisfaction Rate", icon: "Star" },
];

export const TESTIMONIALS = [
  { rating: 5, quote: "Brinexa completely transformed our brand. From the logo to our website to our ad campaigns - everything finally feels consistent and premium.", name: "Ayesha Khan", position: "Founder, Luxe Threads", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=faces" },
  { rating: 5, quote: "Our Amazon sales doubled within three months. Their PPC management and listing optimization is genuinely next level.", name: "Bilal Ahmed", position: "CEO, NovaGoods", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=faces" },
  { rating: 5, quote: "Finally an agency that communicates. Weekly reports, real results, and a team that actually cares about our growth.", name: "Sara Malik", position: "Marketing Lead, FitFuel", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop&crop=faces" },
];

export const VALUES = [
  { icon: "Lightbulb", title: "Creativity First", desc: "Every solution starts with original thinking." },
  { icon: "BarChart3", title: "Data Driven", desc: "We trust numbers, not guesses." },
  { icon: "Heart", title: "Client Obsessed", desc: "Your growth is our success." },
  { icon: "Rocket", title: "Always Evolving", desc: "We stay ahead of industry trends." },
  { icon: "ShieldCheck", title: "Quality Always", desc: "We never compromise on standards." },
];

export const TEAM = [
  { name: "Hamza Raza", role: "Founder & Creative Director" },
  { name: "Zoya Sheikh", role: "Head of Marketing" },
  { name: "Usman Tariq", role: "Lead Web Developer" },
  { name: "Mahnoor Ali", role: "Brand Designer" },
];

export const PORTFOLIO_FILTERS = ["All", "Branding", "Web Design", "Social Media", "Paid Ads", "Amazon", "Video"];

export const PORTFOLIO = [
  { slug: "luxe-threads-rebrand", title: "Luxe Threads Rebrand", category: "Branding", icon: "Palette", result: "+180% brand recall after full identity refresh" },
  { slug: "novagoods-store", title: "NovaGoods Store", category: "Web Design", icon: "Code2", result: "2x conversion rate on new Shopify build" },
  { slug: "fitfuel-social-growth", title: "FitFuel Social Growth", category: "Social Media", icon: "TrendingUp", result: "+45K followers in 90 days, organic" },
  { slug: "primepay-ad-engine", title: "PrimePay Ad Engine", category: "Paid Ads", icon: "Target", result: "3.2x ROAS across Meta & Google" },
  { slug: "urban-cart-on-amazon", title: "Urban Cart on Amazon", category: "Amazon", icon: "ShoppingCart", result: "Doubled monthly sales with PPC + A+ content" },
  { slug: "zenith-launch-film", title: "Zenith Launch Film", category: "Video", icon: "Clapperboard", result: "1.2M+ views on launch campaign" },
  { slug: "bloom-co-identity", title: "Bloom & Co Identity", category: "Branding", icon: "Palette", result: "Complete rebrand: logo, kit & guidelines" },
  { slug: "apex-landing-page", title: "Apex Landing Page", category: "Web Design", icon: "Code2", result: "+60% lead generation in first month" },
  { slug: "glowskin-reels", title: "GlowSkin Reels", category: "Video", icon: "Clapperboard", result: "5x engagement with short-form reels" },
];

export const PORTFOLIO_DETAILS = {
  "luxe-threads-rebrand": {
    client: "Luxe Threads",
    year: "2025",
    tagline: "A complete visual rebrand that turned a local boutique into a premium fashion label.",
    challenge: "Luxe Threads had a dated, inconsistent visual identity that failed to communicate their premium positioning. Their logo felt generic, social media templates looked mismatched, and packaging didn't reflect the quality of their products. Customers couldn't recognise the brand at a glance.",
    solution: "We rebuilt their brand from the ground up — a refined minimalist wordmark, a sophisticated color palette of deep navy and champagne gold, and a comprehensive brand style guide covering every touchpoint from packaging to Instagram stories.",
    services: ["Logo Design", "Brand Style Guide", "Social Media Templates", "Packaging Design", "Stationery"],
    metrics: [
      { label: "Brand Recall", value: "+180%" },
      { label: "Instagram Engagement", value: "+65%" },
      { label: "Delivery Time", value: "3 Weeks" },
    ],
    testimonial: { quote: "Brinexa completely transformed our brand. Everything finally feels consistent and premium.", name: "Ayesha Khan", role: "Founder, Luxe Threads" },
  },
  "novagoods-store": {
    client: "NovaGoods",
    year: "2025",
    tagline: "A high-converting Shopify store built to double their online revenue.",
    challenge: "NovaGoods was running on an outdated WooCommerce store with slow load times, poor mobile experience, and a checkout flow that was hemorrhaging conversions. Their bounce rate was over 70% and average session under 90 seconds.",
    solution: "We migrated and rebuilt their entire storefront on Shopify with a custom theme optimised for speed and conversion. Streamlined checkout, mobile-first design, smart upsell blocks, and a product page structure built around trust signals.",
    services: ["Shopify Development", "UI/UX Design", "Performance Optimization", "SEO Setup", "Analytics"],
    metrics: [
      { label: "Conversion Rate", value: "2x" },
      { label: "Bounce Rate Drop", value: "-38%" },
      { label: "Page Load Speed", value: "1.4s" },
    ],
    testimonial: { quote: "Our Amazon sales doubled within three months. Their work on the store design and optimization is genuinely next level.", name: "Bilal Ahmed", role: "CEO, NovaGoods" },
  },
  "fitfuel-social-growth": {
    client: "FitFuel",
    year: "2025",
    tagline: "From 3K to 48K Instagram followers in 90 days — without a single paid ad.",
    challenge: "FitFuel had an Instagram presence that wasn't growing. Inconsistent posting, generic captions, and no content strategy meant their follower count had been stagnant for months despite having a genuinely great product.",
    solution: "We built a complete organic content engine — a 30-day content calendar, on-brand Reels templates, hook-driven caption formulas, and a hashtag strategy tailored to the fitness niche. Posting 6x per week across feed and stories.",
    services: ["Social Media Management", "Content Strategy", "Reel Editing", "Copywriting", "Community Management"],
    metrics: [
      { label: "New Followers", value: "+45K" },
      { label: "Average Reach", value: "3.2x" },
      { label: "Profile Visits", value: "+210%" },
    ],
    testimonial: { quote: "Finally an agency that communicates. Weekly reports, real results, and a team that actually cares about our growth.", name: "Sara Malik", role: "Marketing Lead, FitFuel" },
  },
  "primepay-ad-engine": {
    client: "PrimePay",
    year: "2025",
    tagline: "3.2x return on ad spend across Meta and Google in under 60 days.",
    challenge: "PrimePay had been running their own Meta ads for six months with a ROAS of 0.9x — essentially losing money on every campaign. Their creatives were not tested, targeting was too broad, and there was zero retargeting infrastructure.",
    solution: "We audited and rebuilt their entire paid media stack. New audience architecture, dedicated retargeting funnels, fresh ad creatives across 4 angles, and A/B tested landing pages. Google Search campaigns were layered on top for high-intent captures.",
    services: ["Meta Ads", "Google Ads", "Ad Creative", "Audience Strategy", "Landing Page Optimization"],
    metrics: [
      { label: "ROAS", value: "3.2x" },
      { label: "Cost Per Lead", value: "-54%" },
      { label: "Monthly Ad Revenue", value: "+220%" },
    ],
    testimonial: null,
  },
  "urban-cart-on-amazon": {
    client: "Urban Cart",
    year: "2024",
    tagline: "Doubled monthly Amazon sales through listing optimization and PPC management.",
    challenge: "Urban Cart's Amazon listings were buried on page 4-5 for their main keywords. Their A+ content was basic, product images were low quality, and their PPC campaigns were running on broad match with no negative keyword strategy — burning budget daily.",
    solution: "We rebuilt every product listing with SEO-optimized titles, bullet points, and backend keywords. New professional A+ content, lifestyle imagery, and a complete PPC restructure with tightly themed ad groups and an aggressive negative keyword strategy.",
    services: ["Amazon Listing Optimization", "A+ Content", "Amazon PPC", "Keyword Research", "Competitor Analysis"],
    metrics: [
      { label: "Monthly Sales", value: "2x" },
      { label: "Organic Rank", value: "Top 3" },
      { label: "ACoS Reduction", value: "-41%" },
    ],
    testimonial: null,
  },
  "zenith-launch-film": {
    client: "Zenith",
    year: "2025",
    tagline: "A launch campaign video that hit 1.2M views and drove a sold-out product launch.",
    challenge: "Zenith was launching a new product line and needed a hero video that could carry both a paid social campaign and a product page. Previous launch videos had felt generic and underperformed on TikTok and Instagram Reels.",
    solution: "We produced a 60-second launch film built for short-form — fast cuts, cinematic colour grade, motion graphics for key specs, and platform-specific edits for TikTok (vertical), Instagram Reels, and YouTube pre-roll. Shot in 2 days, delivered in 5.",
    services: ["Video Production", "Video Editing", "Motion Graphics", "Color Grading", "Platform Optimization"],
    metrics: [
      { label: "Total Views", value: "1.2M+" },
      { label: "Launch Day Sales", value: "Sold Out" },
      { label: "Video CTR", value: "4.8%" },
    ],
    testimonial: null,
  },
  "bloom-co-identity": {
    client: "Bloom & Co",
    year: "2024",
    tagline: "A fresh brand identity that positioned a local florist as a premium gifting brand.",
    challenge: "Bloom & Co was operating with no real brand identity — just a handwritten wordmark and inconsistent colours across social media and packaging. They wanted to move upmarket and attract corporate gifting clients but couldn't charge premium prices without looking the part.",
    solution: "We designed a soft, contemporary brand identity anchored in muted sage and blush tones with a modern botanical logo mark. Delivered a full brand kit including logo suite, colour system, typography, gift packaging mockups, and a social media style guide.",
    services: ["Logo Design", "Brand Identity", "Packaging Design", "Brand Style Guide", "Social Media Templates"],
    metrics: [
      { label: "Brand Assets", value: "40+" },
      { label: "Premium Client Inquiries", value: "+3x" },
      { label: "Turnaround", value: "2 Weeks" },
    ],
    testimonial: null,
  },
  "apex-landing-page": {
    client: "Apex Consulting",
    year: "2025",
    tagline: "A focused landing page that grew lead generation by 60% in the first month.",
    challenge: "Apex Consulting's website was a multi-page brochure site that wasn't set up to convert. Visitors had no clear path, the CTA was buried below the fold, and the page load time on mobile was over 4 seconds.",
    solution: "We stripped it down to a single, conversion-optimised landing page — above-the-fold hero with a clear value proposition, social proof section, benefit-driven feature blocks, and a sticky CTA. Built in Next.js with a 98 Lighthouse score.",
    services: ["Landing Page Design", "Web Development", "Copywriting", "SEO", "CRO"],
    metrics: [
      { label: "Lead Generation", value: "+60%" },
      { label: "Lighthouse Score", value: "98" },
      { label: "Time to Deploy", value: "5 Days" },
    ],
    testimonial: null,
  },
  "glowskin-reels": {
    client: "GlowSkin",
    year: "2025",
    tagline: "Short-form Reels content that drove 5x engagement and 80K new impressions monthly.",
    challenge: "GlowSkin had a great product but their social content wasn't performing. Static posts and long-form tutorials weren't getting traction on Instagram or TikTok, and their engagement rate had dropped below 1%.",
    solution: "We built a monthly short-form content system — 12 Reels per month, each under 30 seconds, with trending audio, fast-cut editing, on-screen captions, and a strong hook in the first 2 frames. Each video was delivered in both 9:16 and 1:1 ratios.",
    services: ["Reel Editing", "Short-Form Strategy", "Captions & Sound Design", "Content Calendar", "Thumbnail Design"],
    metrics: [
      { label: "Engagement Rate", value: "5x" },
      { label: "Monthly Impressions", value: "80K+" },
      { label: "Profile Visits", value: "+340%" },
    ],
    testimonial: null,
  },
};

export const BLOG_POSTS = [
  { slug: "grow-brand-instagram-2025", title: "10 Ways to Grow Your Brand on Instagram in 2025", category: "Social Media", date: "Jun 18, 2026", excerpt: "Practical, no-fluff tactics to build a loyal Instagram audience and turn followers into customers this year." },
  { slug: "facebook-ads-beginners-pakistan", title: "How to Set Up Facebook Ads for Beginners in Pakistan", category: "Paid Ads", date: "Jun 10, 2026", excerpt: "A step-by-step starter guide to launching your first profitable Meta ad campaign on a local budget." },
  { slug: "why-business-needs-website", title: "Why Every Business Needs a Professional Website", category: "Web Development", date: "May 28, 2026", excerpt: "Your website is your hardest-working salesperson. Here's why a professional site pays for itself." },
  { slug: "amazon-listing-optimization", title: "Amazon Seller Guide: Optimize Your Listings for More Sales", category: "Amazon", date: "May 15, 2026", excerpt: "From keywords to A+ content - the listing tweaks that move the needle on Amazon rankings and revenue." },
  { slug: "brand-identity-vs-brand-image", title: "Brand Identity vs. Brand Image - What's the Difference?", category: "Branding", date: "May 2, 2026", excerpt: "They sound similar but they're not. Understanding the difference is the first step to a stronger brand." },
];

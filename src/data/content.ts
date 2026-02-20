// PrivacyStack Website Content

export const siteConfig = {
  name: "PrivacyStack",
  tagline: "Privacy-First Analytics. Enterprise-Ready.",
  description: "Your complete stack for compliant analytics, consent management, and AI governance.",
  url: "https://privacystack.io",
};

export const navigation = [
  { name: "Services", href: "#services" },
  { name: "Expertise", href: "#expertise" },
  { name: "Tools", href: "#compliance-tools" },
  { name: "Compliance", href: "#compliance-db" },
  { name: "Resources", href: "#resources" },
  { name: "Contact", href: "#contact" },
];

export const heroContent = {
  headline: "Privacy-First Analytics. Enterprise-Ready.",
  subheadline: "Your complete stack for compliant analytics, consent management, and AI governance.",
  ctaPrimary: "Get Started",
  ctaSecondary: "Download Expertise Deck",
};

export const problemStats = [
  {
    value: "€4B+",
    label: "GDPR fines since 2018",
    description: "And counting. Non-compliance is costly.",
  },
  {
    value: "25%",
    label: "Data loss from ad blockers",
    description: "Traditional analytics miss a quarter of your traffic.",
  },
  {
    value: "7+",
    label: "Regulatory frameworks",
    description: "Average enterprise must comply with multiple overlapping regulations.",
  },
];

export const pillars = [
  {
    id: "analytics",
    title: "Analytics",
    icon: "BarChart3",
    brief: "Privacy-first tracking that works without compromising data quality.",
    capabilities: [
      "Cookie-less analytics implementation (Plausible, Fathom, Matomo)",
      "Server-side tracking setup (GTM Server-Side, Meta CAPI)",
      "GA4 migration with privacy controls",
      "37% improvement in data accuracy with server-side",
      "Reduce data loss from 25% to 5%",
      "Custom dashboards and reporting",
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    icon: "Shield",
    brief: "End-to-end consent management and regulatory alignment.",
    capabilities: [
      "OneTrust implementation and optimization",
      "Google Consent Mode V2 setup (mandatory for EEA/UK)",
      "Cookie banner A/B testing (achieve 60-80% consent rates)",
      "DSAR automation (85% reduction in review time)",
      "Cross-domain consent synchronization",
      "Audit-ready documentation",
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    icon: "Activity",
    brief: "Continuous compliance monitoring and AI governance.",
    capabilities: [
      "EU AI Act readiness assessment",
      "AI system risk classification",
      "Automated compliance scoring",
      "Real-time consent rate tracking",
      "Scheduled compliance audits",
      "Incident detection and alerting",
    ],
  },
];

export const capabilityMatrix = {
  services: [
    "Cookie Consent",
    "Analytics Setup",
    "Server-Side Tracking",
    "DSAR Automation",
    "AI Governance",
    "Compliance Audit",
  ],
  regulations: [
    { code: "GDPR", name: "EU General Data Protection" },
    { code: "CCPA", name: "California Consumer Privacy" },
    { code: "ePrivacy", name: "EU ePrivacy Directive" },
    { code: "LGPD", name: "Brazil Data Protection" },
    { code: "POPIA", name: "South Africa Protection" },
    { code: "AI Act", name: "EU Artificial Intelligence" },
  ],
  coverage: [
    // Cookie Consent
    [true, true, true, true, true, false],
    // Analytics Setup
    [true, true, true, true, true, false],
    // Server-Side Tracking
    [true, true, true, true, true, false],
    // DSAR Automation
    [true, true, false, true, true, false],
    // AI Governance
    [true, false, false, false, false, true],
    // Compliance Audit
    [true, true, true, true, true, true],
  ],
};

export const techStack = {
  consentManagement: [
    { name: "OneTrust", category: "Consent" },
    { name: "Cookiebot", category: "Consent" },
    { name: "TrustArc", category: "Consent" },
  ],
  tagManagement: [
    { name: "Google Tag Manager", category: "Tags" },
    { name: "Adobe Launch", category: "Tags" },
    { name: "Tealium iQ", category: "Tags" },
    { name: "Segment", category: "Tags" },
  ],
  analytics: [
    { name: "Plausible", category: "Analytics" },
    { name: "Fathom", category: "Analytics" },
    { name: "Matomo", category: "Analytics" },
    { name: "PostHog", category: "Analytics" },
    { name: "Google Analytics 4", category: "Analytics" },
  ],
  serverSide: [
    { name: "GTM Server-Side", category: "Server" },
    { name: "Meta CAPI", category: "Server" },
    { name: "Stape.io", category: "Server" },
  ],
  compliance: [
    { name: "Drata", category: "Compliance" },
    { name: "Vanta", category: "Compliance" },
    { name: "Secureframe", category: "Compliance" },
  ],
  cloud: [
    { name: "Google Cloud", category: "Cloud" },
    { name: "AWS", category: "Cloud" },
    { name: "Azure", category: "Cloud" },
  ],
};

export const regulations = [
  {
    code: "GDPR",
    name: "General Data Protection Regulation",
    jurisdiction: "European Union",
    flag: "🇪🇺",
  },
  {
    code: "CCPA/CPRA",
    name: "California Consumer Privacy Act",
    jurisdiction: "California, USA",
    flag: "🇺🇸",
  },
  {
    code: "ePrivacy",
    name: "ePrivacy Directive",
    jurisdiction: "European Union",
    flag: "🇪🇺",
  },
  {
    code: "LGPD",
    name: "Lei Geral de Proteção de Dados",
    jurisdiction: "Brazil",
    flag: "🇧🇷",
  },
  {
    code: "POPIA",
    name: "Protection of Personal Information Act",
    jurisdiction: "South Africa",
    flag: "🇿🇦",
  },
  {
    code: "PDPA",
    name: "Personal Data Protection Act",
    jurisdiction: "Singapore",
    flag: "🇸🇬",
  },
  {
    code: "PIPEDA",
    name: "Personal Information Protection",
    jurisdiction: "Canada",
    flag: "🇨🇦",
  },
  {
    code: "EU AI Act",
    name: "Artificial Intelligence Act",
    jurisdiction: "European Union",
    flag: "🇪🇺",
  },
];

export const whyPrivacyStack = [
  {
    title: "Expert Team",
    description:
      "Specialized professionals in privacy engineering, compliance, and analytics architecture.",
  },
  {
    title: "Proven Methodology",
    description:
      "Battle-tested frameworks refined across enterprise implementations.",
  },
  {
    title: "Future-Proof",
    description:
      "Stay ahead of regulatory changes with continuous monitoring and updates.",
  },
  {
    title: "Enterprise-Ready",
    description:
      "Scalable solutions that grow with your organization's complexity.",
  },
];

export const analyticsComparison = [
  {
    tool: "Plausible",
    feature: "No cookies, EU-hosted, lightweight (<1KB)",
    price: "$9/mo",
    compliance: "GDPR, CCPA, PECR",
  },
  {
    tool: "Fathom",
    feature: "Cookie-less tracking, simple dashboard",
    price: "$15/mo",
    compliance: "GDPR, CCPA, ePrivacy",
  },
  {
    tool: "Matomo",
    feature: "Self-hosted option, 100% data ownership",
    price: "Free (self-hosted)",
    compliance: "Full compliance",
  },
  {
    tool: "Simple Analytics",
    feature: "Non-personal data only",
    price: "$19/mo",
    compliance: "Strictest regulations",
  },
  {
    tool: "PostHog",
    feature: "All-in-one platform, EU hosting",
    price: "Free tier",
    compliance: "GDPR compliant",
  },
];

export const aiActRisks = [
  {
    level: "Unacceptable",
    requirement: "Prohibited entirely",
    examples: "Social scoring, manipulative AI",
    color: "red",
  },
  {
    level: "High-Risk",
    requirement: "Heavy regulation, human oversight",
    examples: "Employment, credit scoring, health",
    color: "amber",
  },
  {
    level: "Limited",
    requirement: "Transparency obligations",
    examples: "Chatbots, emotion recognition",
    color: "purple",
  },
  {
    level: "Minimal",
    requirement: "Largely unregulated",
    examples: "AI games, spam filters",
    color: "green",
  },
];

export const aiActPenalties = [
  {
    violation: "Prohibited practices",
    penalty: "€40M or 7% global turnover",
  },
  {
    violation: "Data governance violations",
    penalty: "€20M or 4% global turnover",
  },
  {
    violation: "Other non-compliance",
    penalty: "€10M or 2% global turnover",
  },
];

export const consentModeV2 = {
  description: "Mandatory since March 2024 for EEA and UK operations",
  parameters: [
    { name: "ad_user_data", description: "Controls user data sent to Google for advertising" },
    { name: "ad_personalization", description: "Controls whether ads can be personalized" },
  ],
  requirements: "700+ ad clicks over 7 days for modeling",
  benefit: "15-25% uplift in reported conversions",
};

export const dsarStats = {
  gdprDeadline: "30 days",
  ccpaDeadline: "45 days",
  timeReduction: "85%",
  rights: ["Access", "Erasure", "Rectification", "Portability", "Opt-Out"],
};

export const serverSideStats = {
  accuracyImprovement: "37%",
  dataLossReduction: "25% to 5%",
  performanceImprovement: "65%",
  adoptionRate: "70% of marketers by 2024",
};

export const bannerOptimization = {
  averageRate: "31%",
  range: "4% to 85%",
  improvement: "23%+",
  targetBenchmark: "60-80%",
  testDuration: "30+ days",
  confidence: "95%",
};

export const contactForm = {
  title: "Get in Touch",
  description: "Tell us about your privacy analytics challenges.",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "company", label: "Company", type: "text", required: false },
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
  submitText: "Send Message",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} PrivacyStack. All rights reserved.`,
  links: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  social: [
    { name: "LinkedIn", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "GitHub", href: "#" },
  ],
};

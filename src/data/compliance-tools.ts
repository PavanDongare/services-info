export interface ToolCapability {
  category: string;
  details: string;
}

export interface ToolPhase {
  phase: string;
  actions: string[];
}

export interface ToolProvider {
  slug: string;
  name: string;
  headline: string;
  category: string;
  officialUrl: string;
  profileUrl: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  strengths: string[];
  tradeoffs: string[];
  bestFor: string[];
  capabilities: ToolCapability[];
  implementationPlan: ToolPhase[];
  sources: { label: string; url: string }[];
}

export const complianceTools: ToolProvider[] = [
  {
    slug: "onetrust",
    name: "OneTrust",
    headline: "Enterprise privacy, consent, and governance platform",
    category: "Consent + Privacy Operations",
    officialUrl: "https://www.onetrust.com/products/privacy-automation/",
    profileUrl: "/compliance-tools/onetrust",
    seoTitle: "OneTrust CMP & Privacy Automation Guide | Features, Fit, and Implementation",
    seoDescription:
      "Detailed OneTrust guide for compliance teams: consent management, data mapping, risk workflows, rollout plan, and enterprise tradeoffs.",
    summary:
      "OneTrust is a broad privacy and compliance platform used by enterprise teams that need coordinated workflows across consent, data governance, third-party risk, and policy controls.",
    strengths: [
      "Large product footprint for privacy operations beyond cookie banners.",
      "Strong enterprise workflow depth and process controls.",
      "Designed for organizations managing multiple business units and jurisdictions.",
    ],
    tradeoffs: [
      "Implementation can be complex for lean teams without dedicated admin ownership.",
      "Breadth of modules can increase rollout time compared with CMP-only tools.",
      "Value is highest when teams actively operationalize the platform, not just deploy a banner.",
    ],
    bestFor: [
      "Global enterprises with legal, marketing, security, and data teams sharing compliance ownership.",
      "Programs needing policy + consent + governance in one operating model.",
      "Organizations that want scalable controls, audits, and process automation.",
    ],
    capabilities: [
      {
        category: "Consent and Preference Control",
        details:
          "Supports enterprise consent and preference governance patterns used in complex websites and app ecosystems.",
      },
      {
        category: "Data and Privacy Operations",
        details:
          "Privacy automation positioning covers repeated operational tasks in risk, policy, and governance programs.",
      },
      {
        category: "Cross-Functional Governance",
        details:
          "Platform framing emphasizes a centralized operating layer used by legal, privacy, and digital teams.",
      },
    ],
    implementationPlan: [
      {
        phase: "Phase 1: Scope",
        actions: [
          "Define legal entities, digital properties, and jurisdictions that must be covered first.",
          "Agree on consent model taxonomy and ownership model across teams.",
        ],
      },
      {
        phase: "Phase 2: Deploy",
        actions: [
          "Implement consent collection and preference controls on priority domains.",
          "Connect governance workflows for policy and risk evidence where required.",
        ],
      },
      {
        phase: "Phase 3: Optimize",
        actions: [
          "Audit consent rates, geo-rules, and tag behavior monthly.",
          "Extend templates and controls to additional regions/business units.",
        ],
      },
    ],
    sources: [
      {
        label: "OneTrust Privacy Automation",
        url: "https://www.onetrust.com/products/privacy-automation/",
      },
      {
        label: "OneTrust Platform",
        url: "https://www.onetrust.com/platform/",
      },
    ],
  },
  {
    slug: "trustarc",
    name: "TrustArc",
    headline: "Nymity-driven privacy intelligence and compliance operations",
    category: "Privacy Management + Consent",
    officialUrl: "https://trustarc.com/",
    profileUrl: "/compliance-tools/trustarc",
    seoTitle: "TrustArc Compliance Platform Guide | Nymity Research, DSR, and Risk",
    seoDescription:
      "Comprehensive TrustArc profile for privacy leaders: Nymity updates, DSR automation, assessments, and program design for regulated teams.",
    summary:
      "TrustArc combines privacy management workflows with its Nymity legal intelligence engine, targeting teams that need policy updates, impact assessments, and auditable privacy operations.",
    strengths: [
      "Nymity research capability helps teams track regulatory and legal requirement updates.",
      "End-to-end privacy management suite supports consent, assessments, and request operations.",
      "Strong fit for programs requiring formal governance artifacts and documentation.",
    ],
    tradeoffs: [
      "Program maturity is needed to realize full value from policy and legal intelligence features.",
      "Can be heavier than CMP-first products for teams focused only on web consent UX.",
      "Rollout is most effective when legal and operations teams co-own configuration.",
    ],
    bestFor: [
      "Privacy offices with active regulatory monitoring and policy lifecycle management.",
      "Organizations building auditable, repeatable DSR and assessment processes.",
      "Teams that want legal intelligence integrated into execution workflows.",
    ],
    capabilities: [
      {
        category: "Regulatory Intelligence",
        details:
          "Nymity research is positioned as an expert legal content layer for current privacy obligations.",
      },
      {
        category: "Privacy Request Operations",
        details:
          "TrustArc markets workflows for privacy requests and governance execution with operational controls.",
      },
      {
        category: "Assessment and Risk",
        details:
          "Platform positioning includes broader compliance lifecycle support beyond cookie management.",
      },
    ],
    implementationPlan: [
      {
        phase: "Phase 1: Governance Design",
        actions: [
          "Map your legal entities and processing activities to a practical privacy operating model.",
          "Define intake routes for DSRs, assessments, and internal policy changes.",
        ],
      },
      {
        phase: "Phase 2: Workflow Build",
        actions: [
          "Configure DSR routing, SLAs, and evidence collection standards.",
          "Enable legal-intelligence review cadence for jurisdictions where you actively operate.",
        ],
      },
      {
        phase: "Phase 3: Audit Hardening",
        actions: [
          "Create quarterly governance reports for legal, security, and executive reviews.",
          "Continuously refine templates as new regulations and internal controls evolve.",
        ],
      },
    ],
    sources: [
      {
        label: "TrustArc Platform",
        url: "https://trustarc.com/",
      },
      {
        label: "TrustArc Nymity Overview",
        url: "https://trustarc.com/",
      },
    ],
  },
  {
    slug: "usercentrics",
    name: "Usercentrics",
    headline: "CMP and preference management across websites and apps",
    category: "Consent Management Platform",
    officialUrl: "https://usercentrics.com/products/cmp/",
    profileUrl: "/compliance-tools/usercentrics",
    seoTitle: "Usercentrics CMP Guide | GDPR/CCPA Consent Collection and Optimization",
    seoDescription:
      "In-depth Usercentrics CMP profile with deployment guidance, legal coverage scope, optimization ideas, and implementation checklist for growth teams.",
    summary:
      "Usercentrics focuses on consent and preference management for digital channels, with positioning around GDPR, CCPA, LGPD, POPIA, and other frameworks teams commonly handle in production.",
    strengths: [
      "Clear CMP focus with practical deployment patterns for websites and apps.",
      "Broad compliance-oriented messaging across major global privacy frameworks.",
      "Good fit for teams balancing legal requirements and conversion-sensitive UX.",
    ],
    tradeoffs: [
      "CMP-centric scope means you may still need separate tooling for deep privacy operations.",
      "Enterprises with heavy governance demands can outgrow a consent-only operating model.",
      "Optimization still depends on ongoing experimentation and policy review discipline.",
    ],
    bestFor: [
      "Marketing and product teams that need compliant consent collection at scale.",
      "Mid-market and international brands managing multiple legal regions.",
      "Organizations modernizing banners and preference centers without full governance-suite overhead.",
    ],
    capabilities: [
      {
        category: "Legal Coverage",
        details:
          "Product positioning references major frameworks including GDPR, CCPA, LGPD, and POPIA support scenarios.",
      },
      {
        category: "Consent and Preference UX",
        details:
          "CMP orientation centers on transparent choice collection, preference management, and legally aware banner behavior.",
      },
      {
        category: "Operational Rollout",
        details:
          "Platform messaging emphasizes practical implementation for web and app properties with ongoing optimization.",
      },
    ],
    implementationPlan: [
      {
        phase: "Phase 1: Consent Blueprint",
        actions: [
          "Define consent categories, lawful basis assumptions, and language requirements by region.",
          "Align marketing and legal on acceptable UX patterns before deployment.",
        ],
      },
      {
        phase: "Phase 2: Go-Live",
        actions: [
          "Deploy banner and preference center to highest-traffic properties first.",
          "Validate script blocking and analytics firing behavior by consent state.",
        ],
      },
      {
        phase: "Phase 3: Conversion + Compliance Tuning",
        actions: [
          "Track opt-in rates by locale, device, and template version.",
          "Refresh policies and templates as regulatory interpretations shift.",
        ],
      },
    ],
    sources: [
      {
        label: "Usercentrics CMP",
        url: "https://usercentrics.com/products/cmp/",
      },
      {
        label: "Usercentrics Product Hub",
        url: "https://usercentrics.com/products/",
      },
    ],
  },
  {
    slug: "osano",
    name: "Osano",
    headline: "Consent, DSAR, and vendor risk workflows for privacy teams",
    category: "Consent + Privacy Program Operations",
    officialUrl: "https://www.osano.com/",
    profileUrl: "/compliance-tools/osano",
    seoTitle: "Osano Privacy Compliance Guide | Consent, DSAR, and Vendor Risk",
    seoDescription:
      "Actionable Osano guide covering consent management, DSAR workflows, and vendor privacy risk monitoring for scalable compliance programs.",
    summary:
      "Osano combines consent management with request handling and vendor risk capabilities, making it attractive for teams that want faster time-to-value without a massive enterprise stack.",
    strengths: [
      "Balanced scope across consent, DSAR operations, and vendor risk use cases.",
      "Practical fit for small-to-mid enterprise teams building repeatable compliance workflows.",
      "Positioned as privacy program software rather than only a banner utility.",
    ],
    tradeoffs: [
      "Large global enterprises may still require deeper module breadth in specific governance areas.",
      "Success depends on process discipline around request handling and vendor reviews.",
      "Complex multinational policy nuances can still require legal operations overlays.",
    ],
    bestFor: [
      "Teams seeking one platform for consent + requests + vendor oversight.",
      "Growing organizations that need compliance operations without a long enterprise rollout cycle.",
      "Programs prioritizing operational workflows and pragmatic governance documentation.",
    ],
    capabilities: [
      {
        category: "Consent Management",
        details:
          "Supports consent workflows aimed at operational compliance and user transparency.",
      },
      {
        category: "DSAR and Subject Rights",
        details:
          "Platform positioning includes request handling processes to reduce manual privacy operations.",
      },
      {
        category: "Vendor Risk",
        details:
          "Includes privacy risk monitoring use cases relevant to third-party governance programs.",
      },
    ],
    implementationPlan: [
      {
        phase: "Phase 1: Program Baseline",
        actions: [
          "Set consent policy defaults, request response SLAs, and vendor review thresholds.",
          "Define incident/escalation ownership between legal, security, and data teams.",
        ],
      },
      {
        phase: "Phase 2: Workflow Rollout",
        actions: [
          "Launch consent templates and request intake routing with clear accountability.",
          "Onboard high-risk vendors into a recurring privacy review cycle.",
        ],
      },
      {
        phase: "Phase 3: Program Expansion",
        actions: [
          "Use monthly KPI reporting to refine response speed and consent quality.",
          "Expand coverage to additional properties, products, and legal regions.",
        ],
      },
    ],
    sources: [
      {
        label: "Osano Platform",
        url: "https://www.osano.com/",
      },
      {
        label: "Osano Privacy Program Positioning",
        url: "https://www.osano.com/",
      },
    ],
  },
];

export function getToolBySlug(slug: string) {
  return complianceTools.find((tool) => tool.slug === slug);
}

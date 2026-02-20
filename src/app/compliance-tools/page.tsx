import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { complianceTools } from "@/data/compliance-tools";

export const metadata: Metadata = {
  title: "Best Data Compliance Tools | OneTrust, TrustArc, Usercentrics, Osano",
  description:
    "Compare popular data compliance tools with practical implementation guidance. Detailed profiles for OneTrust, TrustArc, Usercentrics, and Osano.",
  keywords: [
    "data compliance tools",
    "privacy compliance software",
    "OneTrust alternative",
    "TrustArc review",
    "Usercentrics CMP",
    "Osano compliance",
  ],
};

export default function ComplianceToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden section-darker">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <BookOpen className="w-4 h-4" />
            Compliance Tool Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Popular <span className="text-gradient-cyan">Data Compliance Platforms</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Dense, implementation-focused profiles for leading privacy and consent tools.
            Use this directory to shortlist software based on operating model, legal scope,
            and rollout complexity.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {complianceTools.map((tool) => (
            <article key={tool.slug} className="bg-card border border-border rounded-xl p-6 card-glow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan">
                  {tool.category}
                </span>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  Official website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-1">{tool.name}</h2>
              <p className="text-muted-foreground mb-4">{tool.headline}</p>
              <p className="text-sm text-foreground/90 mb-5">{tool.summary}</p>

              <div className="mb-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Best fit
                </h3>
                <ul className="space-y-2">
                  {tool.bestFor.slice(0, 2).map((item) => (
                    <li key={item} className="text-sm text-foreground/90">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tool.profileUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-accent-cyan/80"
              >
                Read dense profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-card border border-accent-cyan/20 rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent-cyan mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                How to use these pages
              </h2>
              <p className="text-muted-foreground">
                Start with organizational constraints: jurisdictions, team size, audit pressure,
                and launch timeline. Then compare rollout overhead and workflow depth in each
                provider page before procurement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { complianceTools } from "@/data/compliance-tools";

export function ComplianceTools() {
  return (
    <section id="compliance-tools" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <BookOpen className="w-4 h-4" />
            Tool Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Popular <span className="text-accent-cyan">Data Compliance Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Deep profiles for widely used compliance platforms, including deployment scope,
            operational fit, and implementation priorities for privacy-first teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {complianceTools.map((tool) => (
            <article key={tool.slug} className="bg-card border border-border rounded-xl p-6 card-glow">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-mono bg-accent-cyan/10 text-accent-cyan">
                  {tool.category}
                </span>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  Official site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">{tool.name}</h3>
              <p className="text-muted-foreground text-sm mb-5">{tool.headline}</p>

              <ul className="space-y-2 mb-6">
                {tool.strengths.slice(0, 2).map((strength) => (
                  <li key={strength} className="text-sm text-foreground/90">
                    • {strength}
                  </li>
                ))}
              </ul>

              <Link
                href={tool.profileUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-accent-cyan/80"
              >
                Read full tool profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/compliance-tools"
            className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-lg text-sm text-foreground hover:border-accent-cyan/40"
          >
            Browse all compliance tool pages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

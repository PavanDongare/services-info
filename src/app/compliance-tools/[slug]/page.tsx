import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { complianceTools, getToolBySlug } from "@/data/compliance-tools";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return complianceTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      type: "article",
    },
  };
}

export default async function ComplianceToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden section-darker">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/compliance-tools"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to all tools
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-accent-cyan/10 text-accent-cyan mb-4">
            <BookOpen className="w-3 h-3" />
            {tool.category}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">{tool.name}</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">{tool.headline}</p>

          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-foreground/90 mb-2">{tool.summary}</p>
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-accent-cyan/80"
            >
              Visit official {tool.name} page
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-card border border-accent-green/20 rounded-xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <CheckCircle2 className="w-5 h-5 text-accent-green" />
                Where {tool.name} is strong
              </h2>
              <ul className="space-y-3">
                {tool.strengths.map((strength) => (
                  <li key={strength} className="text-sm text-foreground/90">
                    • {strength}
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-card border border-accent-amber/20 rounded-xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <CircleAlert className="w-5 h-5 text-accent-amber" />
                Constraints to plan for
              </h2>
              <ul className="space-y-3">
                {tool.tradeoffs.map((tradeoff) => (
                  <li key={tradeoff} className="text-sm text-foreground/90">
                    • {tradeoff}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Core capabilities
            </h2>
            <div className="grid gap-4">
              {tool.capabilities.map((capability) => (
                <div key={capability.category} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{capability.category}</h3>
                  <p className="text-sm text-muted-foreground">{capability.details}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Best fit organizations
            </h2>
            <div className="grid gap-3">
              {tool.bestFor.map((item) => (
                <div key={item} className="bg-card border border-border rounded-lg p-4 text-sm text-foreground/90">
                  • {item}
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              90-day implementation blueprint
            </h2>
            <div className="grid gap-4">
              {tool.implementationPlan.map((phase) => (
                <div key={phase.phase} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-3">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.actions.map((action) => (
                      <li key={action} className="text-sm text-muted-foreground">
                        • {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Source links used for this profile
            </h2>
            <ul className="space-y-2">
              {tool.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-accent-cyan/80"
                  >
                    {source.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <div className="bg-card border border-accent-cyan/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-accent-cyan mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Need implementation help?</h3>
                <p className="text-muted-foreground text-sm">
                  We can map this platform into your consent architecture, legal obligations,
                  and analytics stack.
                </p>
              </div>
            </div>
            <Button asChild className="gap-2 shrink-0">
              <Link href="/#contact">
                Talk to an expert
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

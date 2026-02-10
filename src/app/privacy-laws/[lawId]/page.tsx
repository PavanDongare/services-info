import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllLaws, getLawById, getCountriesByLaw } from "@/lib/compliance";
import {
  ConsentBadge,
  MetricCard,
  RightsMatrix,
  CookieRequirements,
  EnforcementBar,
  FineDisplay,
} from "@/components/compliance";
import { ChevronRight, Users, Calendar, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ lawId: string }>;
}

export async function generateStaticParams() {
  const laws = await getAllLaws();
  return laws.map((law) => ({ lawId: law.law_id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lawId } = await params;
  const law = await getLawById(lawId);

  if (!law) {
    return { title: "Law Not Found" };
  }

  const fineText = law.max_fine_absolute_usd
    ? `$${(law.max_fine_absolute_usd / 1000000).toFixed(1)}M`
    : "";

  return {
    title: `${law.law_name} Compliance Guide | Cookie Consent & Privacy Requirements`,
    description: `Complete ${law.law_name} compliance guide: ${law.consent_model.replace("_", " ")} consent model, age ${law.age_of_consent || "N/A"}, ${fineText} max fines. Cookie blocking, user rights & implementation requirements.`,
    openGraph: {
      title: `${law.law_name} - Privacy Law Compliance Guide`,
      description: `Everything you need to know about ${law.law_name} compliance`,
    },
  };
}

export const revalidate = 3600;

export default async function LawPage({ params }: PageProps) {
  const { lawId } = await params;
  const [law, countries] = await Promise.all([
    getLawById(lawId),
    getCountriesByLaw(lawId),
  ]);

  if (!law) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden section-darker">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/privacy-laws"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to all laws
          </Link>

          <div className="mb-4">
            <ConsentBadge model={law.consent_model} size="lg" showDescription />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            {law.law_name}
          </h1>

          {law.notes && (
            <div className="mt-6 p-4 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground italic">&ldquo;{law.notes}&rdquo;</p>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Key Metrics */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Key Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                icon={Users}
                value={law.age_of_consent || "N/A"}
                label="Age of Consent"
                suffix={law.age_of_consent ? " years" : ""}
                color="cyan"
              />
              <MetricCard
                icon={Calendar}
                value={law.consent_proof_retention_years || "N/A"}
                label="Retention Period"
                suffix={law.consent_proof_retention_years ? " years" : ""}
                color="purple"
              />
              <MetricCard
                icon={Globe}
                value={countries.length}
                label="Countries"
                color="green"
              />
              <MetricCard
                icon={Calendar}
                value={law.consent_refresh_days || "N/A"}
                label="Refresh Interval"
                suffix={law.consent_refresh_days ? " days" : ""}
                color="amber"
              />
            </div>
          </div>

          {/* Fines */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Penalty Structure
            </h2>
            <FineDisplay
              absoluteUsd={law.max_fine_absolute_usd}
              percentageRevenue={law.max_fine_percentage_revenue}
            />
          </div>

          {/* Enforcement */}
          {law.enforcement_likelihood && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Enforcement Risk
              </h2>
              <EnforcementBar level={law.enforcement_likelihood} />
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cookie Requirements */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Cookie Requirements
              </h2>
              <CookieRequirements law={law} />
            </div>

            {/* User Rights */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                User Rights
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(law.user_rights).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    right_to_access: "Access",
                    right_to_deletion: "Deletion",
                    right_to_portability: "Portability",
                    right_to_object: "Object",
                  };
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-xl border ${
                        value === "yes"
                          ? "bg-accent-green/5 border-accent-green/20"
                          : value === "limited"
                            ? "bg-accent-amber/5 border-accent-amber/20"
                            : "bg-muted/50 border-border"
                      }`}
                    >
                      <p className="font-medium text-foreground">{labels[key]}</p>
                      <p
                        className={`text-xs font-mono mt-1 ${
                          value === "yes"
                            ? "text-accent-green"
                            : value === "limited"
                              ? "text-accent-amber"
                              : "text-muted-foreground"
                        }`}
                      >
                        {value === "yes" ? "REQUIRED" : value === "limited" ? "LIMITED" : "NOT REQ"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Countries */}
          {countries.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Countries Subject to {law.law_name} ({countries.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/countries/${country.slug}`}
                    className="px-3 py-1.5 bg-card border border-border rounded-full text-sm hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all"
                  >
                    {country.country}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-card border border-accent-cyan/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Need help with {law.law_name} compliance?
              </h3>
              <p className="text-muted-foreground text-sm">
                Our experts can implement compliant cookie consent for your business.
              </p>
            </div>
            <Button asChild className="gap-2 shrink-0">
              <Link href="/#contact">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllCountries,
  getCountryBySlug,
  getLawById,
  getCountriesByRegion,
} from "@/lib/compliance";
import {
  ConsentBadge,
  MetricCard,
  FineDisplay,
  CookieRequirements,
  EnforcementBar,
} from "@/components/compliance";
import { ChevronRight, Scale, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const countries = await getAllCountries();
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) {
    return { title: "Country Not Found" };
  }

  const law = await getLawById(country.law_id);
  const lawName = law?.law_name || country.law_id.toUpperCase();

  return {
    title: `${country.country} Privacy Law | ${lawName} Cookie Consent Requirements`,
    description: `Cookie compliance requirements for ${country.country}. ${lawName} applies: ${law?.consent_model.replace("_", " ")} consent. Full compliance guide.`,
    openGraph: {
      title: `${country.country} - Privacy Law & Cookie Consent Guide`,
      description: `Everything you need for ${lawName} compliance in ${country.country}`,
    },
  };
}

export const revalidate = 3600;

const regionConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  Europe: {
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/20",
  },
  "North America": {
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    borderColor: "border-accent-purple/20",
  },
  "Latin America": {
    color: "text-accent-green",
    bgColor: "bg-accent-green/10",
    borderColor: "border-accent-green/20",
  },
  "Asia-Pacific": {
    color: "text-accent-amber",
    bgColor: "bg-accent-amber/10",
    borderColor: "border-accent-amber/20",
  },
  "Middle East": {
    color: "text-accent-red",
    bgColor: "bg-accent-red/10",
    borderColor: "border-accent-red/20",
  },
  Africa: {
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    borderColor: "border-accent-purple/20",
  },
  Other: {
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
  },
};

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const [law, relatedCountries] = await Promise.all([
    getLawById(country.law_id),
    getCountriesByRegion(country.region),
  ]);

  if (!law) {
    notFound();
  }

  const otherCountries = relatedCountries.filter((c) => c.slug !== country.slug);
  const config = regionConfig[country.region] || regionConfig.Other;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden section-darker">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/countries"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to all countries
          </Link>

          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium ${config.bgColor} ${config.color}`}
            >
              <MapPin className="w-3 h-3" />
              {country.region}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            {country.country}
          </h1>
          <p className="text-xl text-muted-foreground">
            Privacy and cookie consent requirements
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Applicable Law Card */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Applicable Law
            </h2>
            <Link
              href={`/privacy-laws/${law.law_id}`}
              className="group block bg-card border border-border rounded-xl p-6 hover:border-accent-cyan/30 transition-all card-glow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent-cyan transition-colors">
                      {law.law_name}
                    </h3>
                    <div className="mt-2">
                      <ConsentBadge model={law.consent_model} size="sm" />
                    </div>
                    {law.notes && (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {law.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-accent-cyan">
                  View full law details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Facts */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Quick Facts
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                icon={Calendar}
                value={law.consent_proof_retention_years || "N/A"}
                label="Consent Retention"
                suffix={law.consent_proof_retention_years ? " years" : ""}
                color="purple"
              />
              <MetricCard
                icon={Calendar}
                value={law.consent_refresh_days || "N/A"}
                label="Refresh Interval"
                suffix={law.consent_refresh_days ? " days" : ""}
                color="amber"
              />
              <MetricCard
                icon={MapPin}
                value={country.region}
                label="Region"
                color="green"
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

          {/* Cookie Requirements */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Compliance Checklist
            </h2>
            <CookieRequirements law={law} />
          </div>

          {/* User Rights */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              User Rights Under {law.law_name}
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

          {/* Other Countries in Region */}
          {otherCountries.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Other Countries in {country.region} ({otherCountries.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherCountries.slice(0, 16).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/countries/${c.slug}`}
                    className="px-3 py-1.5 bg-card border border-border rounded-full text-sm hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all"
                  >
                    {c.country}
                  </Link>
                ))}
                {otherCountries.length > 16 && (
                  <span className="px-3 py-1.5 text-sm text-muted-foreground">
                    +{otherCountries.length - 16} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-card border border-accent-cyan/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Need help with compliance in {country.country}?
              </h3>
              <p className="text-muted-foreground text-sm">
                Our experts can implement {law.law_name} compliant cookie consent for your business.
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

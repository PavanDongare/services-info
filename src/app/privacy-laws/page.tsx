import { getAllLaws } from "@/lib/compliance";
import { ConsentBadge } from "@/components/compliance";
import Link from "next/link";
import type { Metadata } from "next";
import { Scale, Shield, Globe, Database, ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Laws Database | 67 Global Data Protection Regulations",
  description:
    "Comprehensive database of 67 privacy laws worldwide. GDPR, CCPA, LGPD, and more. Compare consent requirements, fines, and compliance obligations.",
};

export const revalidate = 3600;

function formatFine(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

export default async function PrivacyLawsPage() {
  const laws = await getAllLaws();

  const stats = {
    OPT_IN: laws.filter((l) => l.consent_model === "OPT_IN").length,
    OPT_OUT: laws.filter((l) => l.consent_model === "OPT_OUT").length,
    IMPLIED_CONSENT: laws.filter((l) => l.consent_model === "IMPLIED_CONSENT").length,
    NOTIFY_ONLY: laws.filter((l) => l.consent_model === "NOTIFY_ONLY").length,
  };

  const groupedLaws = {
    OPT_IN: laws.filter((l) => l.consent_model === "OPT_IN"),
    OPT_OUT: laws.filter((l) => l.consent_model === "OPT_OUT"),
    IMPLIED_CONSENT: laws.filter((l) => l.consent_model === "IMPLIED_CONSENT"),
    NOTIFY_ONLY: laws.filter((l) => l.consent_model === "NOTIFY_ONLY"),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden section-darker">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to home
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <Database className="w-4 h-4" />
            Privacy Laws Database
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            <span className="text-gradient-cyan">{laws.length}</span> Privacy Laws Worldwide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Complete compliance requirements for every major data protection regulation.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-accent-green/20 rounded-xl p-5 text-center card-glow">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-green/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-green" />
              </div>
              <p className="text-3xl font-bold text-foreground font-mono">{stats.OPT_IN}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Opt-In Laws</p>
            </div>
            <div className="bg-card border border-accent-amber/20 rounded-xl p-5 text-center card-glow">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-amber/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-accent-amber" />
              </div>
              <p className="text-3xl font-bold text-foreground font-mono">{stats.OPT_OUT}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Opt-Out Laws</p>
            </div>
            <div className="bg-card border border-accent-purple/20 rounded-xl p-5 text-center card-glow">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent-purple" />
              </div>
              <p className="text-3xl font-bold text-foreground font-mono">{stats.IMPLIED_CONSENT}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Implied Consent</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center card-glow">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center">
                <Database className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground font-mono">{stats.NOTIFY_ONLY}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Notify Only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Laws List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {Object.entries(groupedLaws).map(([model, modelLaws]) => {
            if (modelLaws.length === 0) return null;
            return (
              <div key={model} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ConsentBadge
                    model={model as "OPT_IN" | "OPT_OUT" | "IMPLIED_CONSENT" | "NOTIFY_ONLY"}
                    size="lg"
                  />
                  <span className="text-muted-foreground">
                    {modelLaws.length} {modelLaws.length === 1 ? "law" : "laws"}
                  </span>
                </div>

                <div className="grid gap-3">
                  {modelLaws.map((law) => (
                    <Link
                      key={law.law_id}
                      href={`/privacy-laws/${law.law_id}`}
                      className="group bg-card border border-border rounded-xl p-5 hover:border-accent-cyan/30 transition-all card-glow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-accent-cyan transition-colors">
                            {law.law_name}
                          </h3>
                          {law.notes && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {law.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          {law.max_fine_absolute_usd && (
                            <div className="text-center">
                              <p className="font-mono font-bold text-foreground">
                                {formatFine(law.max_fine_absolute_usd)}
                              </p>
                              <p className="text-xs text-muted-foreground">Max Fine</p>
                            </div>
                          )}
                          {law.enforcement_likelihood && (
                            <div className="text-center">
                              <p
                                className={`font-mono font-bold capitalize ${
                                  law.enforcement_likelihood === "high"
                                    ? "text-accent-red"
                                    : law.enforcement_likelihood === "medium"
                                      ? "text-accent-amber"
                                      : "text-accent-green"
                                }`}
                              >
                                {law.enforcement_likelihood}
                              </p>
                              <p className="text-xs text-muted-foreground">Risk</p>
                            </div>
                          )}
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent-cyan transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

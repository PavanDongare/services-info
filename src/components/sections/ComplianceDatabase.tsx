import Link from "next/link";
import { getAllLaws, getAllCountries } from "@/lib/compliance";
import { Database, Shield, Scale, Globe, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplianceDropdowns } from "./ComplianceDropdowns";

export async function ComplianceDatabase() {
  const [laws, countries] = await Promise.all([getAllLaws(), getAllCountries()]);

  const stats = {
    OPT_IN: laws.filter((l) => l.consent_model === "OPT_IN").length,
    OPT_OUT: laws.filter((l) => l.consent_model === "OPT_OUT").length,
    IMPLIED_CONSENT: laws.filter((l) => l.consent_model === "IMPLIED_CONSENT").length,
    NOTIFY_ONLY: laws.filter((l) => l.consent_model === "NOTIFY_ONLY").length,
  };

  // Group laws by consent model
  const lawsByConsentModel = {
    OPT_IN: laws.filter((l) => l.consent_model === "OPT_IN"),
    OPT_OUT: laws.filter((l) => l.consent_model === "OPT_OUT"),
    IMPLIED_CONSENT: laws.filter((l) => l.consent_model === "IMPLIED_CONSENT"),
    NOTIFY_ONLY: laws.filter((l) => l.consent_model === "NOTIFY_ONLY"),
  };

  // Group countries by region
  const countriesByRegion = countries.reduce(
    (acc, c) => {
      if (!acc[c.region]) acc[c.region] = [];
      acc[c.region].push(c);
      return acc;
    },
    {} as Record<string, typeof countries>
  );

  const regionOrder = [
    "Europe",
    "North America",
    "Latin America",
    "Asia-Pacific",
    "Middle East",
    "Africa",
    "Other",
  ];

  return (
    <section id="compliance-db" className="py-20 px-4 sm:px-6 lg:px-8 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-accent-cyan/30 rounded-full text-sm text-accent-cyan mb-4">
            <Database className="w-4 h-4" />
            Live Compliance Database
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            We Track <span className="text-gradient-cyan">{laws.length}</span> Privacy Laws Across{" "}
            <span className="text-gradient-purple">{countries.length}</span> Countries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The most comprehensive cookie consent compliance database. Updated continuously.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-card border border-accent-green/20 rounded-xl p-5 text-center card-glow">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-green/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-green" />
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">{stats.OPT_IN}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Opt-In Laws
            </p>
          </div>
          <div className="bg-card border border-accent-amber/20 rounded-xl p-5 text-center card-glow">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-amber/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-accent-amber" />
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">{stats.OPT_OUT}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Opt-Out Laws
            </p>
          </div>
          <div className="bg-card border border-accent-purple/20 rounded-xl p-5 text-center card-glow">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-purple/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent-purple" />
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">
              {Object.keys(countriesByRegion).length}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Regions</p>
          </div>
          <div className="bg-card border border-accent-cyan/20 rounded-xl p-5 text-center card-glow">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent-cyan" />
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">{countries.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              Countries
            </p>
          </div>
        </div>

        {/* Interactive Dropdowns */}
        <ComplianceDropdowns
          lawsByConsentModel={lawsByConsentModel}
          countriesByRegion={countriesByRegion}
          regionOrder={regionOrder}
        />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button asChild size="lg" className="gap-2">
            <Link href="/privacy-laws">
              View Full Laws Database
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/countries">
              Browse All Countries
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { getAllCountries } from "@/lib/compliance";
import { ConsentBadge } from "@/components/compliance";
import Link from "next/link";
import type { Metadata } from "next";
import { Globe, MapPin, ChevronRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Laws by Country | 158 Countries Covered",
  description:
    "Find cookie consent and privacy law requirements for 158 countries. GDPR, CCPA, LGPD coverage by country with compliance guides.",
};

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

export default async function CountriesPage() {
  const countries = await getAllCountries();

  const regions = countries.reduce(
    (acc, country) => {
      if (!acc[country.region]) {
        acc[country.region] = [];
      }
      acc[country.region].push(country);
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
            <Globe className="w-4 h-4" />
            Countries Database
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            <span className="text-gradient-cyan">{countries.length}</span> Countries Covered
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Cookie consent and data protection requirements by country and region.
          </p>

          {/* Region Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {regionOrder
              .filter((r) => regions[r])
              .map((region) => {
                const config = regionConfig[region] || regionConfig.Other;
                return (
                  <div
                    key={region}
                    className={`bg-card border ${config.borderColor} rounded-xl p-4 text-center card-glow`}
                  >
                    <div
                      className={`w-8 h-8 mx-auto mb-2 rounded-lg ${config.bgColor} flex items-center justify-center`}
                    >
                      <MapPin className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-foreground font-mono">
                      {regions[region].length}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1 line-clamp-1">
                      {region}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Regions List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {regionOrder
            .filter((r) => regions[r])
            .map((region) => {
              const config = regionConfig[region] || regionConfig.Other;
              return (
                <div key={region} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}
                    >
                      <MapPin className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{region}</h2>
                      <p className="text-sm text-muted-foreground">
                        {regions[region].length} {regions[region].length === 1 ? "country" : "countries"}
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {regions[region].map((country) => (
                      <Link
                        key={country.slug}
                        href={`/countries/${country.slug}`}
                        className="group bg-card border border-border rounded-xl p-4 hover:border-accent-cyan/30 transition-all card-glow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground group-hover:text-accent-cyan transition-colors truncate">
                              {country.country}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono uppercase mt-1">
                              {country.law_id}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent-cyan transition-colors shrink-0 ml-2" />
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

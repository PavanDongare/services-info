"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Shield, Scale, Globe, MapPin, ArrowRight } from "lucide-react";

interface Law {
  law_id: string;
  law_name: string;
  consent_model: string;
  max_fine_absolute_usd: number | null;
}

interface Country {
  slug: string;
  country: string;
  law_id: string;
  region: string;
}

interface ComplianceDropdownsProps {
  lawsByConsentModel: Record<string, Law[]>;
  countriesByRegion: Record<string, Country[]>;
  regionOrder: string[];
}

const consentModelConfig: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string; icon: typeof Shield }
> = {
  OPT_IN: {
    label: "Opt-In Required",
    color: "text-accent-green",
    bgColor: "bg-accent-green/10",
    borderColor: "border-accent-green/30",
    icon: Shield,
  },
  OPT_OUT: {
    label: "Opt-Out Model",
    color: "text-accent-amber",
    bgColor: "bg-accent-amber/10",
    borderColor: "border-accent-amber/30",
    icon: Scale,
  },
  IMPLIED_CONSENT: {
    label: "Implied Consent",
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    borderColor: "border-accent-purple/30",
    icon: Globe,
  },
  NOTIFY_ONLY: {
    label: "Notify Only",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
    icon: Globe,
  },
};

const regionConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  Europe: {
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
    borderColor: "border-accent-cyan/30",
  },
  "North America": {
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    borderColor: "border-accent-purple/30",
  },
  "Latin America": {
    color: "text-accent-green",
    bgColor: "bg-accent-green/10",
    borderColor: "border-accent-green/30",
  },
  "Asia-Pacific": {
    color: "text-accent-amber",
    bgColor: "bg-accent-amber/10",
    borderColor: "border-accent-amber/30",
  },
  "Middle East": {
    color: "text-accent-red",
    bgColor: "bg-accent-red/10",
    borderColor: "border-accent-red/30",
  },
  Africa: {
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
    borderColor: "border-accent-purple/30",
  },
  Other: {
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
  },
};

function formatFine(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

export function ComplianceDropdowns({
  lawsByConsentModel,
  countriesByRegion,
  regionOrder,
}: ComplianceDropdownsProps) {
  const [expandedLaws, setExpandedLaws] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const consentModelOrder = ["OPT_IN", "OPT_OUT", "IMPLIED_CONSENT", "NOTIFY_ONLY"];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Laws by Consent Model */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent-cyan" />
            <h3 className="font-semibold text-foreground">Privacy Laws by Consent Model</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Click to expand and browse all laws
          </p>
        </div>
        <div className="divide-y divide-border">
          {consentModelOrder.map((model) => {
            const laws = lawsByConsentModel[model] || [];
            if (laws.length === 0) return null;
            const config = consentModelConfig[model];
            const isExpanded = expandedLaws === model;
            const Icon = config.icon;

            return (
              <div key={model}>
                <button
                  onClick={() => setExpandedLaws(isExpanded ? null : model)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${config.color}`}>{config.label}</p>
                      <p className="text-xs text-muted-foreground">{laws.length} laws</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="max-h-64 overflow-y-auto border-t border-border bg-muted/10">
                    {laws.map((law) => (
                      <Link
                        key={law.law_id}
                        href={`/privacy-laws/${law.law_id}`}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors group border-b border-border/50 last:border-0"
                      >
                        <span className="text-sm text-foreground group-hover:text-accent-cyan transition-colors truncate pr-2">
                          {law.law_name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {law.max_fine_absolute_usd && (
                            <span className="text-xs font-mono text-muted-foreground">
                              {formatFine(law.max_fine_absolute_usd)}
                            </span>
                          )}
                          <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-accent-cyan transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Countries by Region */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent-purple" />
            <h3 className="font-semibold text-foreground">Countries by Region</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Click to expand and browse all countries
          </p>
        </div>
        <div className="divide-y divide-border">
          {regionOrder.map((region) => {
            const countries = countriesByRegion[region] || [];
            if (countries.length === 0) return null;
            const config = regionConfig[region] || regionConfig.Other;
            const isExpanded = expandedRegion === region;

            return (
              <div key={region}>
                <button
                  onClick={() => setExpandedRegion(isExpanded ? null : region)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                      <MapPin className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${config.color}`}>{region}</p>
                      <p className="text-xs text-muted-foreground">{countries.length} countries</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="max-h-64 overflow-y-auto border-t border-border bg-muted/10">
                    {countries.map((country) => (
                      <Link
                        key={country.slug}
                        href={`/countries/${country.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors group border-b border-border/50 last:border-0"
                      >
                        <span className="text-sm text-foreground group-hover:text-accent-cyan transition-colors truncate pr-2">
                          {country.country}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-muted-foreground uppercase">
                            {country.law_id}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-accent-cyan transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

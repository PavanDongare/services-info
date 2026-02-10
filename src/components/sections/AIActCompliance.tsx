"use client";

import { RiskPyramid, TimelineChart, BarChart } from "@/components/charts";
import { aiActRisks } from "@/data/content";
import { Brain, AlertTriangle, Calendar, Euro } from "lucide-react";

const timelineEvents = [
  {
    date: "Jun 2024",
    title: "Adopted",
    description: "EU AI Act officially adopted by European Parliament",
    status: "completed" as const,
  },
  {
    date: "Aug 2024",
    title: "In Force",
    description: "Regulation enters into force",
    status: "completed" as const,
  },
  {
    date: "Feb 2025",
    title: "Prohibitions",
    description: "Unacceptable risk AI systems banned",
    status: "current" as const,
  },
  {
    date: "Aug 2026",
    title: "High-Risk",
    description: "High-risk AI rules become applicable",
    status: "upcoming" as const,
  },
  {
    date: "Aug 2027",
    title: "Full Force",
    description: "Complete implementation of all provisions",
    status: "upcoming" as const,
  },
];

const penaltyData = [
  { label: "Prohibited AI", value: 40, color: "red" as const, sublabel: "€40M / 7%" },
  { label: "Data Governance", value: 20, color: "amber" as const, sublabel: "€20M / 4%" },
  { label: "Other Violations", value: 10, color: "purple" as const, sublabel: "€10M / 2%" },
];

export function AIActCompliance() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-purple/10 border border-accent-purple/30 rounded-full text-accent-purple text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            EU Regulation 2024/1689
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            EU AI Act <span className="text-accent-purple">Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The world&apos;s first comprehensive AI regulation. Full implementation
            by August 2027.
          </p>
        </div>

        {/* Risk Classification */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-amber/15 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-accent-amber" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Risk Classification
              </h3>
            </div>
            <RiskPyramid
              risks={aiActRisks.map((risk) => ({
                ...risk,
                color: risk.color as "red" | "amber" | "purple" | "green",
              }))}
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-red/15 rounded-lg">
                <Euro className="w-5 h-5 text-accent-red" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Penalty Structure
              </h3>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <BarChart data={penaltyData} maxValue={45} barHeight={24} />
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Amounts shown are maximum penalties or percentage of global
                annual turnover (whichever is higher)
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="p-2 bg-accent-cyan/15 rounded-lg">
              <Calendar className="w-5 h-5 text-accent-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Implementation Timeline
            </h3>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            <TimelineChart events={timelineEvents} />
          </div>
        </div>

        {/* Key Requirements */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-3">
              Documentation & Logging
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Articles 12 & 19 require automatic logging of AI system
              activities for audit purposes.
            </p>
            <span className="text-xs font-mono text-accent-cyan">
              Art. 12, 19
            </span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-3">
              Human Oversight
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Article 14 mandates human oversight with two-person verification
              for critical decisions.
            </p>
            <span className="text-xs font-mono text-accent-purple">
              Art. 14
            </span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-3">
              Right to Explanation
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Article 86 gives individuals the right to explanation for AI-driven
              decisions affecting them.
            </p>
            <span className="text-xs font-mono text-accent-green">Art. 86</span>
          </div>
        </div>
      </div>
    </section>
  );
}

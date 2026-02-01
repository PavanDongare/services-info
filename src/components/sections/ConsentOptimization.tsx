"use client";

import { CircularProgress, ComparisonChart } from "@/components/charts";
import { bannerOptimization, consentModeV2 } from "@/data/content";
import { MousePointer2, TestTube2, Check, ArrowUpRight } from "lucide-react";

export function ConsentOptimization() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Consent Rate{" "}
            <span className="text-accent-amber">Optimization</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Maximize data collection while maintaining full compliance through
            A/B tested banner optimization.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Average Rate */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={31}
                size={120}
                color="amber"
                label="industry avg"
                suffix="%"
              />
            </div>
            <h3 className="font-semibold text-foreground">
              Current Industry Average
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Range: {bannerOptimization.range}
            </p>
          </div>

          {/* Improvement Potential */}
          <div className="bg-card border border-accent-green/30 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={70}
                size={120}
                color="green"
                label="target"
                suffix="%"
              />
            </div>
            <h3 className="font-semibold text-foreground">Target Benchmark</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Achievable with optimization
            </p>
          </div>

          {/* DHL Case Study */}
          <div className="bg-card border border-accent-cyan/30 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={40}
                size={120}
                color="cyan"
                label="increase"
                suffix="%"
              />
            </div>
            <h3 className="font-semibold text-foreground">DHL Case Study</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Opt-in increase with A/B testing
            </p>
          </div>
        </div>

        {/* Testing Protocol */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-purple/15 rounded-lg">
                <TestTube2 className="w-5 h-5 text-accent-purple" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Testing Protocol
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                `Minimum test duration: ${bannerOptimization.testDuration}`,
                `Statistical confidence: ${bannerOptimization.confidence}`,
                "Test banner positioning (bottom vs. modal)",
                "Test button styling and CTA copy",
                "Test timing (immediate vs. delayed)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent-purple mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-cyan/15 rounded-lg">
                <MousePointer2 className="w-5 h-5 text-accent-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Google Consent Mode V2
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {consentModeV2.description}
            </p>
            <div className="space-y-3">
              {consentModeV2.parameters.map((param) => (
                <div
                  key={param.name}
                  className="flex items-start gap-3 p-3 bg-secondary rounded-lg"
                >
                  <code className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
                    {param.name}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    {param.description}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-accent-green/10 border border-accent-green/30 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-accent-green" />
                <span className="text-sm font-medium text-accent-green">
                  {consentModeV2.benefit}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                In reported conversions through privacy-safe modeling
              </p>
            </div>
          </div>
        </div>

        {/* Before/After */}
        <ComparisonChart
          before={{ value: "31%", label: "Without optimization" }}
          after={{ value: "70%", label: "With A/B testing" }}
          improvement="+126%"
          direction="up"
          color="amber"
          className="max-w-2xl mx-auto"
        />
      </div>
    </section>
  );
}

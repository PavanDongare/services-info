"use client";

import { CircularProgress, ComparisonChart } from "@/components/charts";
import { serverSideStats } from "@/data/content";
import { Server, Zap, Shield, Users } from "lucide-react";

export function ServerSideStats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Server-Side Tracking{" "}
            <span className="text-accent-green">Benefits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bypass ad blockers and improve data accuracy with server-side
            implementation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Accuracy Improvement */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={37}
                size={100}
                color="cyan"
                label="accuracy"
                suffix="%"
              />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Data Accuracy
            </h3>
            <p className="text-sm text-muted-foreground">
              Improvement in conversion tracking
            </p>
          </div>

          {/* Performance */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={65}
                size={100}
                color="green"
                label="faster"
                suffix="%"
              />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Performance</h3>
            <p className="text-sm text-muted-foreground">
              Website load time improvement
            </p>
          </div>

          {/* Adoption Rate */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={70}
                size={100}
                color="purple"
                label="adopted"
                suffix="%"
              />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Adoption</h3>
            <p className="text-sm text-muted-foreground">
              Of marketers by 2024 (Gartner)
            </p>
          </div>

          {/* Data Loss Reduction visual */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <CircularProgress
                value={5}
                max={25}
                size={100}
                color="amber"
                showValue={false}
                label=""
              />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Data Loss</h3>
            <p className="text-sm text-muted-foreground">
              Reduced from 25% to just 5%
            </p>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <ComparisonChart
            before={{ value: "25%", label: "Data loss with client-side" }}
            after={{ value: "5%", label: "Data loss with server-side" }}
            improvement="80% reduction"
            direction="down"
            color="green"
          />
          <ComparisonChart
            before={{ value: "63%", label: "Baseline accuracy" }}
            after={{ value: "100%", label: "With server-side" }}
            improvement="+37%"
            direction="up"
            color="cyan"
          />
        </div>

        {/* Platform Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Supported Platforms
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "GTM Server-Side",
              "Meta CAPI",
              "Segment",
              "Stape.io",
              "Custom Solutions",
            ].map((platform) => (
              <span
                key={platform}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-accent-cyan/50 transition-colors"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

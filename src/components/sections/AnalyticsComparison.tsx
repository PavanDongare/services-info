import { analyticsComparison } from "@/data/content";
import { Check, ExternalLink } from "lucide-react";

export function AnalyticsComparison() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Privacy-First Analytics{" "}
            <span className="text-accent-cyan">Alternatives</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Move beyond Google Analytics with tools designed for privacy
            compliance from the ground up.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                  Tool
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                  Key Feature
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                  Starting Price
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsComparison.map((tool, index) => (
                <tr
                  key={tool.tool}
                  className="border-b border-border/50 hover:bg-card/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: `hsl(${index * 60}, 70%, 50%, 0.15)`,
                          color: `hsl(${index * 60}, 70%, 60%)`,
                        }}
                      >
                        {tool.tool.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">
                        {tool.tool}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {tool.feature}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-accent-green">
                      {tool.price}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.compliance.split(", ").map((reg) => (
                        <span
                          key={reg}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent-purple/10 text-accent-purple"
                        >
                          <Check className="w-3 h-3" />
                          {reg}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why Switch Callout */}
        <div className="mt-12 p-6 bg-card border border-accent-amber/30 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-amber/15 rounded-lg">
              <ExternalLink className="w-6 h-6 text-accent-amber" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Why Switch from Google Analytics?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                  France (CNIL) and Austria (DSB) ruled GA violates GDPR
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                  More EU countries expected to follow with similar rulings
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                  Third-party cookie deprecation affecting data collection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

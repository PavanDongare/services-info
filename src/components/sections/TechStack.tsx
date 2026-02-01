import { techStack } from "@/data/content";
import { Blocks } from "lucide-react";

const categories = [
  { key: "consentManagement", label: "Consent", color: "#a855f7" },
  { key: "tagManagement", label: "Tag Mgmt", color: "#22d3ee" },
  { key: "analytics", label: "Analytics", color: "#10b981" },
  { key: "serverSide", label: "Server-Side", color: "#f59e0b" },
  { key: "compliance", label: "Compliance", color: "#ef4444" },
  { key: "cloud", label: "Cloud", color: "#a1a1aa" },
] as const;

export function TechStack() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <Blocks className="w-4 h-4" />
            Integrations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technology <span className="text-accent-cyan">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with industry-leading platforms to build your compliant
            analytics infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div key={category.key} className="space-y-3">
              <h3
                className="text-xs font-semibold uppercase tracking-wider text-center pb-2 border-b"
                style={{
                  color: category.color,
                  borderColor: `${category.color}30`,
                }}
              >
                {category.label}
              </h3>
              <div className="space-y-2">
                {techStack[category.key].map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-card border border-border rounded-lg p-3 text-center hover:border-opacity-60 transition-all duration-300 cursor-default"
                    style={{
                      borderColor: `${category.color}20`,
                    }}
                  >
                    <span className="text-sm text-foreground">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

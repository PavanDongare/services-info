import { PillarCard } from "@/components/shared";
import { pillars } from "@/data/content";
import { Layers } from "lucide-react";

export function Pillars() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <Layers className="w-4 h-4" />
            Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Three Pillars of{" "}
            <span className="text-accent-purple">Compliant Analytics</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our integrated approach addresses analytics, compliance, and
            monitoring as interconnected challenges—not isolated problems.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.id}
              id={pillar.id}
              title={pillar.title}
              icon={pillar.icon}
              brief={pillar.brief}
              capabilities={pillar.capabilities}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

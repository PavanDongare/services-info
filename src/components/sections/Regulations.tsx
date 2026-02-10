import { regulations } from "@/data/content";
import { Globe } from "lucide-react";

export function Regulations() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <Globe className="w-4 h-4" />
            Global Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Regulatory <span className="text-accent-purple">Coverage</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We help enterprises navigate the complex web of international
            privacy regulations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regulations.map((regulation, index) => {
            const colors = ["#22d3ee", "#a855f7", "#10b981", "#f59e0b"];
            const color = colors[index % colors.length];

            return (
              <div
                key={regulation.code}
                className="bg-card border rounded-xl p-5 hover:scale-105 transition-all duration-300 cursor-default"
                style={{ borderColor: `${color}30` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{regulation.flag}</span>
                  <span
                    className="font-mono font-bold text-lg"
                    style={{ color }}
                  >
                    {regulation.code}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {regulation.name}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-2">
                  {regulation.jurisdiction}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

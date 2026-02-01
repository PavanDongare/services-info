import { Check, Minus } from "lucide-react";
import { capabilityMatrix } from "@/data/content";

export function CapabilityMatrix() {
  return (
    <section id="expertise" className="py-20 px-4 sm:px-6 lg:px-8 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Capability <span className="text-accent-cyan">Matrix</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our services mapped against global regulatory frameworks.
          </p>
        </div>

        {/* Scrollable container for mobile */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-card/80 text-foreground font-semibold">
                  Service
                </th>
                {capabilityMatrix.regulations.map((reg, index) => {
                  const colors = ["#22d3ee", "#a855f7", "#10b981", "#f59e0b", "#ef4444", "#22d3ee"];
                  return (
                    <th
                      key={reg.code}
                      className="p-4 bg-card/80 text-center"
                    >
                      <div
                        className="font-mono text-sm font-bold"
                        style={{ color: colors[index % colors.length] }}
                      >
                        {reg.code}
                      </div>
                      <div className="text-xs text-muted-foreground hidden lg:block mt-1">
                        {reg.name}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {capabilityMatrix.services.map((service, serviceIdx) => (
                <tr
                  key={service}
                  className="border-t border-border/50 hover:bg-card/30 transition-colors"
                >
                  <td className="p-4 text-foreground text-sm font-medium">
                    {service}
                  </td>
                  {capabilityMatrix.coverage[serviceIdx].map(
                    (covered, regIdx) => (
                      <td
                        key={regIdx}
                        className="p-4 text-center"
                      >
                        {covered ? (
                          <div className="inline-flex p-1 bg-accent-green/20 rounded-full">
                            <Check className="w-4 h-4 text-accent-green" />
                          </div>
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Scroll horizontally on mobile to view all regulations
        </p>
      </div>
    </section>
  );
}

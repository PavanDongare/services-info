import { whyPrivacyStack } from "@/data/content";
import { Users, Cog, TrendingUp, Building2, Sparkles } from "lucide-react";

const iconConfig = [
  { icon: Users, color: "#22d3ee" },
  { icon: Cog, color: "#a855f7" },
  { icon: TrendingUp, color: "#10b981" },
  { icon: Building2, color: "#f59e0b" },
];

export function WhyUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4" />
            Our Approach
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why <span className="text-accent-green">PrivacyStack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine deep technical expertise with practical compliance
            experience to deliver solutions that work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyPrivacyStack.map((item, index) => {
            const { icon: IconComponent, color } = iconConfig[index];
            return (
              <div
                key={item.title}
                className="bg-card border rounded-xl p-6 text-center hover:scale-105 transition-all duration-300"
                style={{ borderColor: `${color}30` }}
              >
                <div
                  className="inline-flex p-4 rounded-xl mb-4"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <IconComponent className="w-7 h-7" style={{ color }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { StatsGrid } from "@/components/shared";

export function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 section-darker bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Problem is <span className="text-accent-red">Real</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enterprises face mounting pressure from regulators, evolving privacy
            laws, and technical challenges that break traditional analytics.
          </p>
        </div>
        <StatsGrid />
      </div>
    </section>
  );
}

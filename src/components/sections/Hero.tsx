import { Button } from "@/components/ui/button";
import { VennDiagram, ContactModal } from "@/components/shared";
import { heroContent, capabilityMatrix } from "@/data/content";
import { ArrowRight, Download, Check } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-6">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              Enterprise-Ready Compliance
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Privacy-First Analytics.{" "}
              <span className="text-gradient-cyan">Enterprise-Ready.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {heroContent.subheadline}
            </p>

            {/* Service Checklist */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {capabilityMatrix.services.map((service) => (
                <div key={service} className="flex items-center gap-2 text-sm text-foreground/80">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-green/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-green" />
                  </div>
                  {service}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <ContactModal
                trigger={
                  <Button size="lg" className="gap-2">
                    {heroContent.ctaPrimary}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                }
              />
              <Button size="lg" variant="outline" asChild className="gap-2">
                <a href="/OneTrust_Compliance_Expertise.pptx" download>
                  <Download className="w-4 h-4" />
                  {heroContent.ctaSecondary}
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 mt-8 justify-center lg:justify-start">
              {["GDPR", "CCPA", "ePrivacy", "AI Act"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-mono border border-border rounded-full text-muted-foreground"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Venn Diagram */}
          <div className="flex justify-center lg:justify-end">
            <VennDiagram className="w-full max-w-xl scale-110 lg:scale-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

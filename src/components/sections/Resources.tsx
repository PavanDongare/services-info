import { DownloadCard } from "@/components/shared";
import { FileText } from "lucide-react";

export function Resources() {
  return (
    <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <FileText className="w-4 h-4" />
            Downloads
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent-amber">Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download our expertise deck to learn more about our approach to
            compliant analytics.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <DownloadCard
            title="OneTrust Compliance Expertise Deck"
            description="Comprehensive overview of our OneTrust implementation methodology, cookie consent optimization, and DSAR automation capabilities."
            fileName="OneTrust_Compliance_Expertise.pptx"
            fileSize="2.4 MB"
            fileType="PPTX"
            href="/OneTrust_Compliance_Expertise.pptx"
          />
        </div>
      </div>
    </section>
  );
}

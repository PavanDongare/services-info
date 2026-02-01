import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadCardProps {
  title: string;
  description: string;
  fileName: string;
  fileSize?: string;
  fileType?: string;
  href: string;
  className?: string;
}

export function DownloadCard({
  title,
  description,
  fileName,
  fileSize = "2.4 MB",
  fileType = "PPTX",
  href,
  className = "",
}: DownloadCardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-4 bg-secondary rounded-lg shrink-0">
          <FileText className="w-8 h-8 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="font-mono">{fileName}</span>
            <span>{fileSize}</span>
            <span className="px-2 py-0.5 bg-secondary rounded text-xs">
              {fileType}
            </span>
          </div>
          <Button asChild className="gap-2">
            <a href={href} download>
              <Download className="w-4 h-4" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

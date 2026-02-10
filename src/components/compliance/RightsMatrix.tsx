import type { UserRights } from "@/types/compliance";
import { Check, X, Minus } from "lucide-react";

interface RightsMatrixProps {
  rights: UserRights;
}

const rightConfig = {
  right_to_access: {
    label: "Access",
    description: "Request copies of personal data",
  },
  right_to_deletion: {
    label: "Deletion",
    description: "Request erasure of data",
  },
  right_to_portability: {
    label: "Portability",
    description: "Export data in usable format",
  },
  right_to_object: {
    label: "Object",
    description: "Stop data processing",
  },
};

function RightStatus({ value }: { value: string }) {
  if (value === "yes") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-accent-green/15 flex items-center justify-center">
          <Check className="h-3.5 w-3.5 text-accent-green" />
        </div>
        <span className="text-xs font-mono text-accent-green">REQUIRED</span>
      </div>
    );
  }
  if (value === "no") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-accent-red/15 flex items-center justify-center">
          <X className="h-3.5 w-3.5 text-accent-red" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">NOT REQ</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-accent-amber/15 flex items-center justify-center">
        <Minus className="h-3.5 w-3.5 text-accent-amber" />
      </div>
      <span className="text-xs font-mono text-accent-amber">LIMITED</span>
    </div>
  );
}

export function RightsMatrix({ rights }: RightsMatrixProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.entries(rights).map(([key, value]) => {
        const config = rightConfig[key as keyof UserRights];
        return (
          <div
            key={key}
            className="bg-card border border-border rounded-xl p-4 hover:border-accent-cyan/30 transition-all"
          >
            <p className="font-semibold text-foreground mb-1">{config.label}</p>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {config.description}
            </p>
            <RightStatus value={value} />
          </div>
        );
      })}
    </div>
  );
}

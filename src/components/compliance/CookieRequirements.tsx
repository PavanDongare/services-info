import type { Law } from "@/types/compliance";
import { Check, X } from "lucide-react";

interface CookieRequirementsProps {
  law: Law;
}

interface RequirementItem {
  key: string;
  label: string;
  value: string | null;
}

function RequirementRow({ label, value }: { label: string; value: string | null }) {
  const isYes = value === "yes";
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {isYes ? (
          <>
            <div className="w-5 h-5 rounded-full bg-accent-green/15 flex items-center justify-center">
              <Check className="h-3 w-3 text-accent-green" />
            </div>
            <span className="text-xs font-mono text-accent-green">REQUIRED</span>
          </>
        ) : (
          <>
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
              <X className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-mono text-muted-foreground">NOT REQ</span>
          </>
        )}
      </div>
    </div>
  );
}

export function CookieRequirements({ law }: CookieRequirementsProps) {
  const requirements: RequirementItem[] = [
    { key: "cookie_blocking", label: "Block cookies before consent", value: law.cookie_blocking_required },
    { key: "granular", label: "Granular category controls", value: law.granular_consent_required },
    { key: "reject", label: "Reject all button", value: law.reject_button_required },
    { key: "settings", label: "Settings/preferences button", value: law.settings_button_required },
  ];

  if (law.sensitive_data_extra_consent) {
    requirements.push({
      key: "sensitive",
      label: "Extra consent for sensitive data",
      value: law.sensitive_data_extra_consent,
    });
  }

  if (law.child_data_parental_consent) {
    requirements.push({
      key: "parental",
      label: "Parental consent for minors",
      value: law.child_data_parental_consent,
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {requirements.map((req) => (
        <RequirementRow key={req.key} label={req.label} value={req.value} />
      ))}
    </div>
  );
}

interface ConsentBadgeProps {
  model: "OPT_IN" | "OPT_OUT" | "IMPLIED_CONSENT" | "NOTIFY_ONLY";
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
}

const badgeConfig = {
  OPT_IN: {
    label: "Opt-In Required",
    description: "Users must actively consent before cookies are set",
    dotColor: "bg-accent-green",
    bgClass: "bg-accent-green/10 border-accent-green/30",
    textClass: "text-accent-green",
  },
  OPT_OUT: {
    label: "Opt-Out Model",
    description: "Cookies enabled by default, users can opt out",
    dotColor: "bg-accent-amber",
    bgClass: "bg-accent-amber/10 border-accent-amber/30",
    textClass: "text-accent-amber",
  },
  IMPLIED_CONSENT: {
    label: "Implied Consent",
    description: "Consent implied through continued use",
    dotColor: "bg-accent-purple",
    bgClass: "bg-accent-purple/10 border-accent-purple/30",
    textClass: "text-accent-purple",
  },
  NOTIFY_ONLY: {
    label: "Notify Only",
    description: "Only notification required, no consent mechanism needed",
    dotColor: "bg-muted-foreground",
    bgClass: "bg-muted/50 border-border",
    textClass: "text-muted-foreground",
  },
};

const sizeClasses = {
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-2",
  lg: "px-4 py-2 text-base gap-2",
};

const dotSizes = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

export function ConsentBadge({
  model,
  size = "md",
  showDescription = false,
}: ConsentBadgeProps) {
  const config = badgeConfig[model];

  return (
    <div className="inline-flex flex-col gap-1.5">
      <span
        className={`inline-flex items-center rounded-full border font-medium transition-all ${config.bgClass} ${config.textClass} ${sizeClasses[size]}`}
      >
        <span className={`rounded-full ${config.dotColor} ${dotSizes[size]}`} />
        {config.label}
      </span>
      {showDescription && (
        <span className="text-xs text-muted-foreground max-w-xs">
          {config.description}
        </span>
      )}
    </div>
  );
}

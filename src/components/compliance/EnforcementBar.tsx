interface EnforcementBarProps {
  level: string | null;
}

const enforcementConfig = {
  high: {
    label: "High",
    description: "Active enforcement with significant penalties",
    percentage: 85,
    color: "bg-accent-red",
    textColor: "text-accent-red",
    bgColor: "bg-accent-red/10",
  },
  medium: {
    label: "Medium",
    description: "Moderate enforcement with periodic audits",
    percentage: 50,
    color: "bg-accent-amber",
    textColor: "text-accent-amber",
    bgColor: "bg-accent-amber/10",
  },
  low: {
    label: "Low",
    description: "Limited enforcement activity",
    percentage: 25,
    color: "bg-accent-green",
    textColor: "text-accent-green",
    bgColor: "bg-accent-green/10",
  },
};

export function EnforcementBar({ level }: EnforcementBarProps) {
  if (!level) return null;

  const config = enforcementConfig[level as keyof typeof enforcementConfig];
  if (!config) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium ${config.bgColor} ${config.textColor}`}
          >
            {config.label.toUpperCase()}
          </span>
          <span className="text-sm text-muted-foreground">{config.description}</span>
        </div>
        <span className="text-sm font-mono text-muted-foreground">
          {config.percentage}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${config.color}`}
          style={{ width: `${config.percentage}%` }}
        />
      </div>
    </div>
  );
}

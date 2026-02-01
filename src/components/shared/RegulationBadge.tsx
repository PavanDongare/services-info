interface RegulationBadgeProps {
  code: string;
  name: string;
  jurisdiction: string;
  flag?: string;
  className?: string;
}

export function RegulationBadge({
  code,
  name,
  jurisdiction,
  flag,
  className = "",
}: RegulationBadgeProps) {
  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 hover:border-muted-foreground/50 transition-colors ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {flag && <span className="text-lg">{flag}</span>}
        <span className="font-mono font-semibold text-white">{code}</span>
      </div>
      <div className="text-sm text-muted-foreground line-clamp-2">{name}</div>
      <div className="text-xs text-muted-foreground/70 mt-1">{jurisdiction}</div>
    </div>
  );
}

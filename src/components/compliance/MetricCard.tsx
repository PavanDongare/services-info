import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: "cyan" | "purple" | "green" | "amber" | "red";
  suffix?: string;
}

const colorClasses = {
  cyan: {
    bg: "bg-accent-cyan/10",
    text: "text-accent-cyan",
    border: "border-accent-cyan/20",
  },
  purple: {
    bg: "bg-accent-purple/10",
    text: "text-accent-purple",
    border: "border-accent-purple/20",
  },
  green: {
    bg: "bg-accent-green/10",
    text: "text-accent-green",
    border: "border-accent-green/20",
  },
  amber: {
    bg: "bg-accent-amber/10",
    text: "text-accent-amber",
    border: "border-accent-amber/20",
  },
  red: {
    bg: "bg-accent-red/10",
    text: "text-accent-red",
    border: "border-accent-red/20",
  },
};

export function MetricCard({
  icon: Icon,
  value,
  label,
  color = "cyan",
  suffix,
}: MetricCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={`bg-card border rounded-xl p-5 hover:border-opacity-60 transition-all card-glow ${colors.border}`}
    >
      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
        {value}
        {suffix && <span className="text-lg text-muted-foreground ml-1">{suffix}</span>}
      </p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}

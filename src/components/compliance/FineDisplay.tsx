import { DollarSign, Percent } from "lucide-react";

interface FineDisplayProps {
  absoluteUsd: number | null;
  percentageRevenue: number | null;
}

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function FineDisplay({ absoluteUsd, percentageRevenue }: FineDisplayProps) {
  if (!absoluteUsd && !percentageRevenue) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {absoluteUsd && (
        <div className="bg-card border border-accent-red/20 rounded-xl p-5 flex-1 min-w-[140px]">
          <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5 text-accent-red" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {formatCurrency(absoluteUsd)}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            Max Absolute Fine
          </p>
        </div>
      )}
      {percentageRevenue && (
        <div className="bg-card border border-accent-amber/20 rounded-xl p-5 flex-1 min-w-[140px]">
          <div className="w-10 h-10 rounded-lg bg-accent-amber/10 flex items-center justify-center mb-3">
            <Percent className="w-5 h-5 text-accent-amber" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {percentageRevenue}%
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            Global Revenue
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonChartProps {
  before: {
    value: string | number;
    label: string;
  };
  after: {
    value: string | number;
    label: string;
  };
  improvement?: string;
  direction?: "up" | "down";
  color?: "cyan" | "purple" | "green" | "amber";
  className?: string;
}

const colorMap = {
  cyan: "#22d3ee",
  purple: "#a855f7",
  green: "#10b981",
  amber: "#f59e0b",
};

export function ComparisonChart({
  before,
  after,
  improvement,
  direction = "up",
  color = "green",
  className = "",
}: ComparisonChartProps) {
  const TrendIcon = direction === "up" ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 p-6 bg-card rounded-xl border border-border",
        className
      )}
    >
      {/* Before */}
      <div className="text-center">
        <div className="text-3xl font-mono font-bold text-muted-foreground">
          {before.value}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{before.label}</div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center gap-1">
        <ArrowRight
          className="w-8 h-8"
          style={{ color: colorMap[color] }}
        />
        {improvement && (
          <div
            className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${colorMap[color]}20`,
              color: colorMap[color],
            }}
          >
            <TrendIcon className="w-3 h-3" />
            {improvement}
          </div>
        )}
      </div>

      {/* After */}
      <div className="text-center">
        <div
          className="text-3xl font-mono font-bold"
          style={{ color: colorMap[color] }}
        >
          {after.value}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{after.label}</div>
      </div>
    </div>
  );
}

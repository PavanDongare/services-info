"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BarData {
  label: string;
  value: number;
  color?: "cyan" | "purple" | "green" | "amber" | "red";
  sublabel?: string;
}

interface BarChartProps {
  data: BarData[];
  maxValue?: number;
  orientation?: "horizontal" | "vertical";
  showValues?: boolean;
  animate?: boolean;
  className?: string;
  barHeight?: number;
}

const colorMap = {
  cyan: "#22d3ee",
  purple: "#a855f7",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
};

export function BarChart({
  data,
  maxValue,
  orientation = "horizontal",
  showValues = true,
  animate = true,
  className = "",
  barHeight = 32,
}: BarChartProps) {
  const [animatedData, setAnimatedData] = useState(
    animate ? data.map((d) => ({ ...d, value: 0 })) : data
  );

  const max = maxValue || Math.max(...data.map((d) => d.value));

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedData(data);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, animate]);

  if (orientation === "horizontal") {
    return (
      <div className={cn("space-y-4", className)}>
        {animatedData.map((bar, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-foreground">
                {bar.label}
              </span>
              {showValues && (
                <span
                  className="text-sm font-mono font-bold"
                  style={{ color: colorMap[bar.color || "cyan"] }}
                >
                  {bar.sublabel || bar.value}
                </span>
              )}
            </div>
            <div
              className="w-full bg-secondary rounded-full overflow-hidden"
              style={{ height: barHeight }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(bar.value / max) * 100}%`,
                  backgroundColor: colorMap[bar.color || "cyan"],
                  boxShadow: `0 0 10px ${colorMap[bar.color || "cyan"]}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={cn("flex items-end justify-center gap-4 h-48", className)}>
      {animatedData.map((bar, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <span
            className="text-sm font-mono font-bold"
            style={{ color: colorMap[bar.color || "cyan"] }}
          >
            {bar.sublabel || bar.value}
          </span>
          <div
            className="w-12 bg-secondary rounded-t-lg overflow-hidden flex items-end"
            style={{ height: "100%" }}
          >
            <div
              className="w-full rounded-t-lg transition-all duration-1000 ease-out"
              style={{
                height: `${(bar.value / max) * 100}%`,
                backgroundColor: colorMap[bar.color || "cyan"],
                boxShadow: `0 0 10px ${colorMap[bar.color || "cyan"]}40`,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground text-center max-w-16">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

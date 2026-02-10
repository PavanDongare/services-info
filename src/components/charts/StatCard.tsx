"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  description?: string;
  icon?: LucideIcon;
  color?: "cyan" | "purple" | "green" | "amber" | "red" | "white";
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  className?: string;
}

const colorMap = {
  cyan: "#22d3ee",
  purple: "#a855f7",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  white: "#ffffff",
};

export function StatCard({
  value,
  label,
  description,
  icon: Icon,
  color = "cyan",
  trend,
  className = "",
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  return (
    <div
      className={cn(
        "relative bg-card border border-border rounded-xl p-6 overflow-hidden transition-all duration-500 hover:border-opacity-50 card-glow",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      style={{
        borderColor: `${colorMap[color]}30`,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: colorMap[color] }}
      />

      {/* Icon */}
      {Icon && (
        <div
          className="inline-flex p-3 rounded-lg mb-4"
          style={{
            backgroundColor: `${colorMap[color]}15`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: colorMap[color] }} />
        </div>
      )}

      {/* Value */}
      <div
        className="text-4xl md:text-5xl font-bold font-mono mb-2"
        style={{ color: colorMap[color] }}
      >
        {value}
      </div>

      {/* Label */}
      <div className="text-lg font-semibold text-foreground mb-1">{label}</div>

      {/* Description */}
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}

      {/* Trend */}
      {trend && (
        <div
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${colorMap[color]}15`,
            color: colorMap[color],
          }}
        >
          {trend.direction === "up" ? "↑" : "↓"} {trend.value}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: "cyan" | "purple" | "green" | "amber" | "red" | "white";
  label?: string;
  sublabel?: string;
  showValue?: boolean;
  suffix?: string;
  className?: string;
  animate?: boolean;
}

const colorMap = {
  cyan: "#22d3ee",
  purple: "#a855f7",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  white: "#ffffff",
};

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "cyan",
  label,
  sublabel,
  showValue = true,
  suffix = "%",
  className = "",
  animate = true,
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(animate ? 0 : value);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((animatedValue / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, animate]);

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${colorMap[color]}50)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span
            className="font-mono font-bold"
            style={{
              fontSize: size * 0.22,
              color: colorMap[color],
            }}
          >
            {Math.round(animatedValue)}
            {suffix}
          </span>
        )}
        {label && (
          <span
            className="text-muted-foreground font-medium text-center px-2"
            style={{ fontSize: size * 0.1 }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Sublabel below */}
      {sublabel && (
        <span className="mt-2 text-sm text-muted-foreground text-center">
          {sublabel}
        </span>
      )}
    </div>
  );
}

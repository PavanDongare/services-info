"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RiskLevel {
  level: string;
  requirement: string;
  examples: string;
  color: "red" | "amber" | "purple" | "green";
}

interface RiskPyramidProps {
  risks: RiskLevel[];
  className?: string;
}

const colorMap = {
  red: {
    bg: "#ef4444",
    bgLight: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.3)",
  },
  amber: {
    bg: "#f59e0b",
    bgLight: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.3)",
  },
  purple: {
    bg: "#a855f7",
    bgLight: "rgba(168, 85, 247, 0.1)",
    border: "rgba(168, 85, 247, 0.3)",
  },
  green: {
    bg: "#10b981",
    bgLight: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.3)",
  },
};

export function RiskPyramid({ risks, className = "" }: RiskPyramidProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {risks.map((risk, index) => {
        const colors = colorMap[risk.color];
        const isActive = activeIndex === index;
        // Calculate width for pyramid effect (widest at bottom)
        const widthPercent = 60 + (index / (risks.length - 1)) * 40;

        return (
          <div
            key={index}
            className="flex justify-center"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className={cn(
                "relative px-6 py-4 rounded-lg cursor-pointer transition-all duration-300",
                isActive && "transform scale-105"
              )}
              style={{
                width: `${widthPercent}%`,
                backgroundColor: isActive ? colors.bgLight : "transparent",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: isActive ? colors.bg : colors.border,
                boxShadow: isActive ? `0 0 20px ${colors.bg}30` : "none",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Color indicator */}
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: colors.bg }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold"
                      style={{ color: colors.bg }}
                    >
                      {risk.level}
                    </span>
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      — {risk.requirement}
                    </span>
                  </div>

                  {/* Expanded details */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isActive ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Examples:</span>{" "}
                      {risk.examples}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

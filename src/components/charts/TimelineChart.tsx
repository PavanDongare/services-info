"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  status?: "completed" | "current" | "upcoming";
}

interface TimelineChartProps {
  events: TimelineEvent[];
  className?: string;
}

export function TimelineChart({ events, className = "" }: TimelineChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "current":
        return "#22d3ee";
      default:
        return "#a1a1aa";
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />

      {/* Events */}
      <div className="relative flex justify-between">
        {events.map((event, index) => {
          const color = getStatusColor(event.status);
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Dot */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-4 bg-background z-10 transition-all duration-300",
                  isActive && "transform scale-125"
                )}
                style={{
                  borderColor: color,
                  boxShadow: isActive ? `0 0 15px ${color}60` : "none",
                }}
              >
                {event.status === "completed" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full p-1"
                    fill="none"
                    stroke={color}
                    strokeWidth={3}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Date */}
              <div
                className="mt-3 text-xs font-mono font-semibold"
                style={{ color }}
              >
                {event.date}
              </div>

              {/* Title */}
              <div className="mt-1 text-sm font-medium text-foreground text-center max-w-24 sm:max-w-32">
                {event.title}
              </div>

              {/* Description tooltip */}
              {event.description && isActive && (
                <div className="absolute top-full mt-2 px-3 py-2 bg-card border border-border rounded-lg text-xs text-muted-foreground max-w-48 text-center z-20">
                  {event.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

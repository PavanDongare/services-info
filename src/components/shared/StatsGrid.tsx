"use client";

import { useEffect, useState } from "react";
import { problemStats } from "@/data/content";
import { TrendingUp, AlertTriangle, Scale } from "lucide-react";

interface StatsGridProps {
  className?: string;
}

const icons = [TrendingUp, AlertTriangle, Scale];
const colors = ["#ef4444", "#f59e0b", "#a855f7"];

export function StatsGrid({ className = "" }: StatsGridProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {problemStats.map((stat, index) => {
        const Icon = icons[index];
        const color = colors[index];

        return (
          <div
            key={index}
            className={`relative bg-card border rounded-xl p-8 text-center overflow-hidden transition-all duration-700 hover:scale-105 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 150}ms`,
              borderColor: `${color}30`,
            }}
          >
            {/* Background glow */}
            <div
              className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: color }}
            />

            {/* Icon */}
            <div
              className="inline-flex p-3 rounded-xl mb-4"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>

            {/* Value with animated counter effect */}
            <div
              className="text-5xl md:text-6xl font-bold font-mono mb-3"
              style={{ color }}
            >
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-lg font-semibold text-foreground mb-2">
              {stat.label}
            </div>

            {/* Description */}
            <div className="text-sm text-muted-foreground">
              {stat.description}
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

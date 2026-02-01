"use client";

import { useState } from "react";
import { BarChart3, Shield, Activity, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PillarCardProps {
  id: string;
  title: string;
  icon: string;
  brief: string;
  capabilities: string[];
  className?: string;
}

const iconConfig = {
  BarChart3: { component: BarChart3, color: "#22d3ee" },
  Shield: { component: Shield, color: "#a855f7" },
  Activity: { component: Activity, color: "#10b981" },
};

export function PillarCard({
  id,
  title,
  icon,
  brief,
  capabilities,
  className = "",
}: PillarCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = iconConfig[icon as keyof typeof iconConfig] || iconConfig.BarChart3;
  const IconComponent = config.component;
  const color = config.color;

  return (
    <div
      className={cn(
        "bg-card border rounded-xl overflow-hidden transition-all duration-300",
        isExpanded ? "ring-1" : "hover:border-opacity-60",
        className
      )}
      style={{
        borderColor: isExpanded ? color : `${color}30`,
        boxShadow: isExpanded ? `0 0 30px ${color}15` : "none",
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-start gap-4"
        aria-expanded={isExpanded}
        aria-controls={`pillar-${id}-content`}
      >
        <div
          className="p-3 rounded-xl shrink-0 transition-all duration-300"
          style={{
            backgroundColor: `${color}15`,
            boxShadow: isExpanded ? `0 0 20px ${color}30` : "none",
          }}
        >
          <IconComponent className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{brief}</p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 shrink-0 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
          style={{ color: isExpanded ? color : "#a1a1aa" }}
        />
      </button>

      <div
        id={`pillar-${id}-content`}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6 pt-0">
          <div
            className="border-t pt-4"
            style={{ borderColor: `${color}20` }}
          >
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: isExpanded ? "100%" : "0%",
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}50`,
                  }}
                />
              </div>
              <span className="text-xs font-mono" style={{ color }}>
                {capabilities.length} capabilities
              </span>
            </div>

            <ul className="space-y-3">
              {capabilities.map((capability, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 transition-all duration-300"
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <div
                    className="p-0.5 rounded-full mt-0.5 shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Check className="w-3 h-3" style={{ color }} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {capability}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

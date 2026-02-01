"use client";

import { useState } from "react";

interface VennDiagramProps {
  className?: string;
}

export function VennDiagram({ className = "" }: VennDiagramProps) {
  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  const circles = [
    {
      id: "analytics",
      label: "Analytics",
      cx: 200,
      cy: 180,
      textX: 130, // Pushed left
      textY: 130, // Pushed up
      description: ["Privacy-first", "tracking & insights"],
      color: "#22d3ee",
      gradient: "url(#gradient-analytics)",
    },
    {
      id: "compliance",
      label: "Compliance",
      cx: 320,
      cy: 180,
      textX: 390, // Pushed right
      textY: 130, // Pushed up
      description: ["Consent &", "regulatory alignment"],
      color: "#a855f7",
      gradient: "url(#gradient-compliance)",
    },
    {
      id: "monitoring",
      label: "Monitoring",
      cx: 260,
      cy: 300,
      textX: 260, // Centered horizontally
      textY: 390, // Pushed down
      description: ["Continuous", "governance"],
      color: "#10b981",
      gradient: "url(#gradient-monitoring)",
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 540 500"
        className="w-full max-w-lg mx-auto"
        role="img"
        aria-label="Venn diagram showing intersection of Analytics, Compliance, and Monitoring"
      >
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="gradient-analytics" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="gradient-compliance" cx="70%" cy="30%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="gradient-monitoring" cx="50%" cy="70%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="gradient-center" cx="50%" cy="50%">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.05" />
          </radialGradient>

          {/* Glow filters */}
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feFlood floodColor="#22d3ee" floodOpacity="0.5" />
            <feComposite in2="coloredBlur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feFlood floodColor="#a855f7" floodOpacity="0.5" />
            <feComposite in2="coloredBlur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feFlood floodColor="#10b981" floodOpacity="0.5" />
            <feComposite in2="coloredBlur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-center" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circle backgrounds with gradients */}
        {circles.map((circle, index) => {
          const isActive = activeCircle === circle.id;
          const glowFilters = ["glow-cyan", "glow-purple", "glow-green"];

          return (
            <circle
              key={circle.id}
              cx={circle.cx}
              cy={circle.cy}
              r={150}
              fill={circle.gradient}
              stroke={circle.color}
              strokeWidth={isActive ? 3 : 1.5}
              strokeOpacity={isActive ? 1 : 0.5}
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveCircle(circle.id)}
              onMouseLeave={() => setActiveCircle(null)}
              filter={isActive ? `url(#${glowFilters[index]})` : undefined}
            />
          );
        })}

        {/* Center intersection */}
        <circle
          cx={260}
          cy={220}
          r={50}
          fill="url(#gradient-center)"
          className="stroke-foreground animate-pulse-glow"
          strokeWidth={2}
          filter="url(#glow-center)"
        />

        {/* Labels for each circle */}
        {circles.map((circle) => (
          <g key={`${circle.id}-text`} className="pointer-events-none">
            <text
              x={circle.textX}
              y={circle.textY}
              textAnchor="middle"
              className="font-sans text-lg font-bold"
              fill={circle.color}
            >
              {circle.label}
            </text>
            {circle.description.map((line, i) => (
              <text
                key={i}
                x={circle.textX}
                y={circle.textY + 20 + (i * 14)}
                textAnchor="middle"
                className="font-sans text-xs font-medium fill-muted-foreground"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Center label */}
        <text
          x={260}
          y={215}
          textAnchor="middle"
          className="font-sans text-xs font-bold fill-foreground"
          style={{ fill: "var(--foreground-muted, #4b5563)" }} // Dark grey in light mode overridden by CSS var if needed, using tailwind class fallback
        >
          <tspan x="260" dy="0" className="fill-foreground dark:fill-white font-extrabold text-sm">Enterprise</tspan>
          <tspan x="260" dy="16" className="fill-foreground dark:fill-white font-extrabold text-sm">Ready</tspan>
        </text>
      </svg>
    </div>
  );
}

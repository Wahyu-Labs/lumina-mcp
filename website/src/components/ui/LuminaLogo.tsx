import React from "react"

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  showText?: boolean
  textClassName?: string
}

export function LuminaLogo({ size = 32, showText = true, textClassName = "", ...props }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5 group">
      {/* SVG Logo Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:scale-105 transition-transform duration-200"
        {...props}
      >
        <defs>
          {/* Main L Gradient */}
          <linearGradient id="lumina-l-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
            <stop offset="60%" stopColor="#6366f1" /> {/* Indigo */}
            <stop offset="100%" stopColor="#4f46e5" /> {/* Deep Indigo */}
          </linearGradient>

          {/* AI Core Hub Gradient */}
          <linearGradient id="lumina-ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#38bdf8" /> {/* Sky Blue */}
            <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
          </linearGradient>

          {/* Glow Filter */}
          <filter id="lumina-ai-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* MCP Connection Lines (Topology) */}
        <line x1="32" y1="45" x2="65" y2="45" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
        <line x1="65" y1="80" x2="65" y2="45" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
        <line x1="65" y1="45" x2="80" y2="25" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
        <line x1="65" y1="45" x2="52" y2="20" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
        <line x1="65" y1="45" x2="82" y2="58" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />

        {/* Pulsing Orbital Ring around the AI Core */}
        <circle cx="65" cy="45" r="14" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

        {/* Sleek L Ribbon (representing Lumina's core developer engine) */}
        <path
          d="M32 20V68C32 74.6274 37.3726 80 44 80H78"
          stroke="url(#lumina-l-grad)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Outer Connection Nodes (Representing integrated APIs: DB, Git, Jira) */}
        <circle cx="32" cy="20" r="4.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="78" cy="80" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
        
        {/* Mid-ribbon Connection Points */}
        <circle cx="32" cy="45" r="4.5" fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="65" cy="80" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />

        {/* Topology Network Nodes */}
        <circle cx="80" cy="25" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.2" />
        <circle cx="52" cy="20" r="3.5" fill="#a78bfa" stroke="#ffffff" strokeWidth="1.2" />
        <circle cx="82" cy="58" r="3.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.2" />

        {/* The Glowing AI Hub Core */}
        <circle cx="65" cy="45" r="8.5" fill="url(#lumina-ai-grad)" filter="url(#lumina-ai-glow)" />
        <circle cx="65" cy="45" r="4" fill="#ffffff" />
      </svg>

      {/* Logo Text */}
      {showText && (
        <span className={`text-xl font-extrabold tracking-tighter text-foreground ${textClassName}`}>
          Lumina<span className="text-accent">MCP</span>
        </span>
      )}
    </div>
  )
}

export function LuminaIcon({ size = 32, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Main L Gradient */}
        <linearGradient id="icon-l-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>

        {/* AI Core Hub Gradient */}
        <linearGradient id="icon-ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="icon-ai-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* MCP Connection Lines (Topology) */}
      <line x1="32" y1="45" x2="65" y2="45" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="65" y1="80" x2="65" y2="45" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="65" y1="45" x2="80" y2="25" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
      <line x1="65" y1="45" x2="52" y2="20" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
      <line x1="65" y1="45" x2="82" y2="58" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />

      {/* Pulsing Orbital Ring around the AI Core */}
      <circle cx="65" cy="45" r="14" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

      {/* Sleek L Ribbon (representing Lumina's core developer engine) */}
      <path
        d="M32 20V68C32 74.6274 37.3726 80 44 80H78"
        stroke="url(#icon-l-grad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Outer Connection Nodes (Representing integrated APIs: DB, Git, Jira) */}
      <circle cx="32" cy="20" r="4.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="78" cy="80" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
      
      {/* Mid-ribbon Connection Points */}
      <circle cx="32" cy="45" r="4.5" fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="65" cy="80" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />

      {/* Topology Network Nodes */}
      <circle cx="80" cy="25" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.2" />
      <circle cx="52" cy="20" r="3.5" fill="#a78bfa" stroke="#ffffff" strokeWidth="1.2" />
      <circle cx="82" cy="58" r="3.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.2" />

      {/* The Glowing AI Hub Core */}
      <circle cx="65" cy="45" r="8.5" fill="url(#icon-ai-grad)" filter="url(#icon-ai-glow)" />
      <circle cx="65" cy="45" r="4" fill="#ffffff" />
    </svg>
  )
}

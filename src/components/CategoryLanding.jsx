import React from "react";
import { Card, Button } from "@heroui/react";
import { ArrowRight, BookOpen, Code, Database, Network, Gamepad2 } from "lucide-react";
import { resolvePath } from "../utils/path.js";


const iconMap = {
  BookOpen, Code, Database, Network, Gamepad2,
};

const categoryColors = {
  "fundamentos":       { accent: "#06b6d4", glow: "rgba(6,182,212,0.15)", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  "redes":             { accent: "#ec4899", glow: "rgba(236,72,153,0.15)", badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  "ciencia-de-datos":  { accent: "#a855f7", glow: "rgba(168,85,247,0.15)", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  "desarrollo-software":{ accent: "#3b82f6", glow: "rgba(59,130,246,0.15)", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "bases-de-datos":    { accent: "#10b981", glow: "rgba(16,185,129,0.15)", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  "videojuegos":       { accent: "#f59e0b", glow: "rgba(245,158,11,0.15)", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

export default function CategoryLanding({ category, title, description, icon, topics = [] }) {
  const IconComponent = iconMap[icon] || BookOpen;
  const colors = categoryColors[category] || categoryColors["redes"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      {/* Header de categoría */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="p-3 rounded-2xl"
          style={{ background: `${colors.accent}20`, boxShadow: `0 0 24px ${colors.glow}` }}
        >
          <IconComponent size={32} style={{ color: colors.accent }} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-white/50 mt-1 text-sm">{description}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-8" style={{ background: `linear-gradient(to right, ${colors.accent}40, transparent)` }} />

      {/* Topics */}
      {topics.length > 0 ? (
        <div className="grid gap-3">
          {topics.map((topic, i) => (
            <a key={i} href={resolvePath(topic.path)} className="group block no-underline">
              <Card
                className="border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
                style={{ "--hover-glow": colors.glow }}
              >
                <Card.Content className="flex flex-row items-center justify-between py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 rounded-full" style={{ background: colors.accent }} />
                    <span className="text-white/80 group-hover:text-white transition-colors font-medium">
                      {topic.label}
                    </span>
                    {topic.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors.badge}`}>
                        {topic.badge}
                      </span>
                    )}
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-1 duration-200"
                  />
                </Card.Content>
              </Card>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-white/30">
          <p className="text-lg">Próximamente...</p>
          <p className="text-sm mt-1">Los apuntes de esta sección están en camino.</p>
        </div>
      )}
    </div>
  );
}

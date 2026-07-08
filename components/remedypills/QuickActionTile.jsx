import React from "react";

/**
 * QuickActionTile — RemedyPills home-screen quick action (icon in pastel
 * rounded square + label below). Used for Prescription/Refill/Consult/Health.
 */
export function QuickActionTile({ icon, label, tone = "teal", onClick }) {
  const tones = {
    teal: { bg: "var(--rp-tile-teal-bg)", fg: "var(--rp-tile-teal-fg)" },
    amber: { bg: "var(--rp-tile-amber-bg)", fg: "var(--rp-tile-amber-fg)" },
    blue: { bg: "var(--rp-tile-blue-bg)", fg: "var(--rp-tile-blue-fg)" },
    pink: { bg: "var(--rp-tile-pink-bg)", fg: "var(--rp-tile-pink-fg)" },
    purple: { bg: "var(--rp-tile-purple-bg)", fg: "var(--rp-tile-purple-fg)" },
    orange: { bg: "var(--rp-tile-orange-bg)", fg: "var(--rp-tile-orange-fg)" },
    emerald: { bg: "var(--rp-tile-emerald-bg)", fg: "var(--rp-tile-emerald-fg)" },
  };
  const t = tones[tone] || tones.teal;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: 56,
          height: 56,
          borderRadius: "var(--rp-radius-md)",
          background: t.bg,
          color: t.fg,
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: "hsl(var(--rp-foreground))" }}>{label}</span>
    </button>
  );
}

import React from "react";

/**
 * Badge — small status/label chip. `tone` picks a semantic color; RemedyPills
 * uses these for prescription statuses (StatusPill pattern in the app).
 */
const TONES = {
  neutral: { bg: "rgba(113,113,122,.15)", fg: "#3f3f46" },
  active: { bg: "var(--rp-status-active-bg)", fg: "var(--rp-status-active-fg)" },
  processing: { bg: "var(--rp-status-processing-bg)", fg: "var(--rp-status-processing-fg)" },
  ready: { bg: "var(--rp-status-ready-bg)", fg: "var(--rp-status-ready-fg)" },
  completed: { bg: "var(--rp-status-completed-bg)", fg: "var(--rp-status-completed-fg)" },
  primary: { bg: "hsl(var(--rp-primary))", fg: "#fff" },
};

export function Badge({ tone = "neutral", children, style = {} }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        borderRadius: "var(--rp-radius-pill)",
        padding: "4px 10px",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        background: t.bg,
        color: t.fg,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

import React from "react";

/**
 * Card — base surface container. RemedyPills: white, rounded-2xl, subtle
 * shadow, no visible border (shadow-sm). NBV: bordered card with soft shadow
 * and hover lift (used on About page's Vision/Approach cards).
 */
export function Card({ brand = "remedypills", hoverable = false, className = "", style = {}, children }) {
  const base =
    brand === "nbv"
      ? {
          background: "hsl(var(--nbv-card))",
          border: "1px solid hsl(var(--nbv-border))",
          borderRadius: "var(--nbv-radius-lg)",
          boxShadow: "var(--nbv-shadow-soft-sm)",
          padding: 24,
        }
      : {
          background: "hsl(var(--rp-card))",
          borderRadius: "var(--rp-radius-md)",
          boxShadow: "var(--rp-shadow-card)",
          padding: 16,
        };

  return (
    <div
      className={className}
      style={{
        ...base,
        transition: "box-shadow .25s ease, transform .2s ease",
        ...(hoverable ? { cursor: "pointer" } : {}),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.boxShadow = brand === "nbv" ? "var(--nbv-shadow-soft-lg)" : "0 10px 25px -5px rgba(15,118,110,.15)";
      }}
      onMouseLeave={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.boxShadow = brand === "nbv" ? "var(--nbv-shadow-soft-sm)" : "var(--rp-shadow-card)";
      }}
    >
      {children}
    </div>
  );
}

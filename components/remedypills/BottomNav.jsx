import React from "react";

/**
 * BottomNav — RemedyPills app's persistent 6-tab bottom navigation
 * (Home / Rx / Reminders / Care / Health / Account). Active tab renders in
 * brand teal; inactive tabs are gray.
 */
export function BottomNav({ items, active, onChange }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#fff",
        borderTop: "1px solid #e5e7eb",
        boxShadow: "var(--rp-shadow-nav)",
        padding: "8px 8px calc(8px + env(safe-area-inset-bottom))",
      }}
    >
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange && onChange(it.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "6px 12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              color: isActive ? "hsl(var(--rp-primary))" : "#9ca3af",
            }}
          >
            {it.icon}
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

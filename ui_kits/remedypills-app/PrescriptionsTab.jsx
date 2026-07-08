const { useState } = React;

const RX = [
  { name: "Metformin", strength: "500mg", rx: "RX-88213", status: "ready", refillable: true },
  { name: "Lisinopril", strength: "10mg", rx: "RX-88214", status: "active", refillable: true },
  { name: "Atorvastatin", strength: "20mg", rx: "RX-88099", status: "processing", refillable: false },
  { name: "Amoxicillin", strength: "250mg", rx: "RX-87650", status: "completed", refillable: false },
];

const STATUS = {
  active: { label: "Active", bg: "rgba(16,185,129,.15)", fg: "#047857" },
  processing: { label: "Processing", bg: "rgba(245,158,11,.15)", fg: "#92400e" },
  ready: { label: "Ready for Pickup", bg: "rgba(14,165,233,.15)", fg: "#075985" },
  completed: { label: "Completed", bg: "rgba(113,113,122,.15)", fg: "#3f3f46" },
};

function PrescriptionsTab() {
  const [showRefill, setShowRefill] = useState(false);
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Your Prescriptions</h2>
        <button onClick={() => setShowRefill(true)} style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "hsl(var(--rp-primary))", border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer" }}>+ Add</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {RX.map((p) => {
          const s = STATUS[p.status];
          return (
            <div key={p.rx} style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "var(--rp-shadow-card)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{p.name} {p.strength}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{p.rx}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 9999, background: s.bg, color: s.fg, whiteSpace: "nowrap" }}>{s.label}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button disabled={!p.refillable} onClick={() => setShowRefill(true)} style={{ flex: 1, height: 36, borderRadius: 12, border: "none", background: p.refillable ? "hsl(var(--rp-primary))" : "#e5e7eb", color: p.refillable ? "#fff" : "#9ca3af", fontSize: 12, fontWeight: 600, cursor: p.refillable ? "pointer" : "not-allowed" }}>🔄 Refill</button>
                <button style={{ flex: 1, height: 36, borderRadius: 12, border: "1px solid #e5e7eb", background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Details</button>
              </div>
            </div>
          );
        })}
      </div>

      {showRefill && (
        <div onClick={() => setShowRefill(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", display: "flex", alignItems: "flex-end", zIndex: 50 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxHeight: "70%", overflow: "auto" }}>
            <h3 style={{ marginTop: 0 }}>Request refill</h3>
            {RX.filter((p) => p.refillable).map((p) => (
              <div key={p.rx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 14 }}>{p.name} {p.strength}</span>
                <button onClick={() => setShowRefill(false)} style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "hsl(var(--rp-primary))", border: "none", borderRadius: 10, padding: "6px 12px", cursor: "pointer" }}>Refill</button>
              </div>
            ))}
            <button onClick={() => setShowRefill(false)} style={{ marginTop: 16, width: "100%", height: 44, borderRadius: 16, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { PrescriptionsTab });

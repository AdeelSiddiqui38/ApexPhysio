function HealthTab() {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700 }}>Health & Wellness</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 14, boxShadow: "var(--rp-shadow-card)" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>ADHERENCE</p>
          <p style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 700, color: "hsl(var(--rp-primary))" }}>85%</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 14, boxShadow: "var(--rp-shadow-card)" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>BLOOD PRESSURE</p>
          <p style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 700 }}>118/76</p>
        </div>
      </div>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".04em", margin: "0 0 8px" }}>Health Articles</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { t: "Managing Type 2 Diabetes", d: "Tips from our pharmacists on blood sugar control" },
          { t: "Flu Season: What to Know", d: "When to get vaccinated and how to stay protected" },
          { t: "Understanding Drug Interactions", d: "Common combinations to avoid" },
        ].map((a) => (
          <div key={a.t} style={{ background: "#fff", borderRadius: 16, padding: 14, boxShadow: "var(--rp-shadow-card)" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{a.t}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{a.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HealthTab });

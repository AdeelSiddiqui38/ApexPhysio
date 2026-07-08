function AccountTab({ onLogout }) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "hsl(var(--rp-primary) / .12)", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 700, color: "hsl(var(--rp-primary))" }}>SJ</div>
        <p style={{ margin: "10px 0 0", fontSize: 16, fontWeight: 700 }}>Sarah Johnson</p>
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>sarah.johnson@email.com</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "var(--rp-shadow-card)", overflow: "hidden", marginBottom: 16 }}>
        {["Personal Information", "Family Profiles", "Insurance Information", "Language Preferences", "Rewards & Points"].map((item, i, arr) => (
          <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{item}</span>
            <span style={{ color: "#9ca3af" }}>›</span>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "var(--rp-shadow-card)", padding: 16, marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Rewards</p>
        <p style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 700, color: "hsl(var(--rp-primary))" }}>1,240 pts</p>
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>1 pt / $1 spent · scan your QR at checkout</p>
      </div>

      <button onClick={onLogout} style={{ width: "100%", height: 46, borderRadius: 16, border: "1px solid #fecaca", background: "#fff", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Sign out</button>
    </div>
  );
}

Object.assign(window, { AccountTab });

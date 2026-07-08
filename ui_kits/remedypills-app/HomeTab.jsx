const sectionTitle = { fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 12px" };

function HomeTab({ onNav }) {
  const quickActions = [
    { label: "Prescription", icon: "💊", bg: "var(--rp-tile-teal-bg)", fg: "var(--rp-tile-teal-fg)", go: "prescriptions" },
    { label: "Refill", icon: "🔄", bg: "var(--rp-tile-amber-bg)", fg: "var(--rp-tile-amber-fg)", go: "prescriptions" },
    { label: "Consult", icon: "💬", bg: "var(--rp-tile-blue-bg)", fg: "var(--rp-tile-blue-fg)", go: "reminders" },
    { label: "Health", icon: "📈", bg: "var(--rp-tile-pink-bg)", fg: "var(--rp-tile-pink-fg)", go: "health" },
  ];
  const services = [
    { label: "Prescription Management", desc: "Upload, track, and manage your prescriptions", icon: "💊", go: "prescriptions" },
    { label: "Book a Service", desc: "Vaccines, minor ailments, and health checks", icon: "📅", go: "appointments" },
    { label: "Transfer Prescription", desc: "Easily move your Rx to RemedyPills", icon: "📤" },
    { label: "Ask a Pharmacist", desc: "Side effects, drug interactions & guidance", icon: "🩺" },
  ];
  return (
    <div style={{ padding: "20px 16px 100px", display: "flex", flexDirection: "column", gap: 24 }}>
      <section>
        <h2 style={sectionTitle}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {quickActions.map((qa) => (
            <button key={qa.label} onClick={() => onNav(qa.go)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}>
              <div style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 16, background: qa.bg, color: qa.fg, fontSize: 20 }}>{qa.icon}</div>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#374151" }}>{qa.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", borderRadius: 16, padding: 20, background: "linear-gradient(90deg, var(--rp-gradient-from), var(--rp-gradient-to))", color: "#fff" }}>
        <div style={{ position: "absolute", right: -16, top: -16, width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Free Prescription Delivery</h3>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,.85)" }}>Get your prescriptions delivered to your door. Sign up for auto-refill today!</p>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ ...sectionTitle, margin: 0 }}>Upcoming Reminders</h2>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 9999, background: "#d1fae5", color: "#047857" }}>85% adherence</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[{ n: "Metformin 500mg", t: "8:00 AM" }, { n: "Lisinopril 10mg", t: "8:00 PM" }].map((r) => (
            <div key={r.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 16, padding: 14, boxShadow: "var(--rp-shadow-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "var(--rp-tile-amber-bg)", color: "var(--rp-tile-amber-fg)" }}>🔔</div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{r.n}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{r.t}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ fontSize: 11, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>Snooze</button>
                <button style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: "hsl(var(--rp-primary))", border: "none", borderRadius: 10, padding: "6px 10px", cursor: "pointer" }}>✓ Taken</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={sectionTitle}>Our Services</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {services.map((s) => (
            <button key={s.label} onClick={() => s.go && onNav(s.go)} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 16, padding: 14, boxShadow: "var(--rp-shadow-card)", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "var(--rp-tile-teal-bg)", color: "var(--rp-tile-teal-fg)", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{s.desc}</p>
              </div>
              <span style={{ color: "#9ca3af" }}>›</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomeTab });

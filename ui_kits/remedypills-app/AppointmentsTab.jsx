function AppointmentsTab() {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700 }}>Care & Appointments</h2>
      <div style={{ borderRadius: 16, padding: 14, background: "hsl(var(--rp-primary) / 0.08)", border: "1px solid hsl(var(--rp-primary) / 0.2)", marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "hsl(var(--rp-primary))" }}>🩺 Alberta Expanded Prescribing Authority</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748b" }}>Alberta pharmacists can prescribe for 30+ minor ailments — no doctor visit needed!</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "var(--rp-shadow-card)", marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".04em" }}>Upcoming</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Flu Vaccination</p>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Fri, Nov 14 · 2:30 PM</p>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 9999, background: "rgba(14,165,233,.15)", color: "#075985" }}>Confirmed</span>
        </div>
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".04em", margin: "0 0 8px" }}>Book a Service</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {["Flu Vaccination", "COVID-19 Vaccine", "Minor Ailment Prescribing", "Medication Review", "Blood Pressure Check", "Travel Health Consultation"].map((s) => (
          <button key={s} style={{ textAlign: "left", background: "#fff", borderRadius: 14, padding: 12, border: "1px solid #f1f5f9", boxShadow: "var(--rp-shadow-card)", fontSize: 12.5, fontWeight: 600, color: "#111827", cursor: "pointer" }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { AppointmentsTab });

const { useState } = React;

const INITIAL = [
  { id: 1, med: "Metformin 500mg", time: "8:00 AM", freq: "Daily", taken: false },
  { id: 2, med: "Lisinopril 10mg", time: "8:00 PM", freq: "Daily", taken: false },
  { id: 3, med: "Vitamin D", time: "8:00 AM", freq: "Daily", taken: true },
];

function RemindersTab() {
  const [reminders, setReminders] = useState(INITIAL);
  const taken = reminders.filter((r) => r.taken).length;
  const rate = Math.round((taken / reminders.length) * 100);

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Reminders</h2>
        <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 9999, background: "#d1fae5", color: "#047857" }}>{rate}% adherence</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {reminders.map((r) => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 16, padding: 14, boxShadow: "var(--rp-shadow-card)", opacity: r.taken ? 0.6 : 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "var(--rp-tile-amber-bg)", color: "var(--rp-tile-amber-fg)" }}>🔔</div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{r.med}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{r.time} · {r.freq}</p>
              </div>
            </div>
            {!r.taken ? (
              <button onClick={() => setReminders(reminders.map((x) => (x.id === r.id ? { ...x, taken: true } : x)))} style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: "hsl(var(--rp-primary))", border: "none", borderRadius: 10, padding: "6px 10px", cursor: "pointer" }}>✓ Taken</button>
            ) : (
              <span style={{ fontSize: 11, fontWeight: 600, color: "#059669" }}>✓ Taken</span>
            )}
          </div>
        ))}
      </div>
      <button style={{ marginTop: 16, width: "100%", height: 46, borderRadius: 16, border: "1px dashed hsl(var(--rp-primary))", background: "none", color: "hsl(var(--rp-primary))", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ Add Reminder</button>
    </div>
  );
}

Object.assign(window, { RemindersTab });

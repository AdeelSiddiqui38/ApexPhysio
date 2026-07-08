/**
 * Shared chrome for the RemedyPills UI kit: the gradient TopBar (greeting +
 * notif/logout) and the persistent BottomNav. Pulled 1:1 from TopBar /
 * BottomNav in client/src/pages/pharmacy-app.tsx.
 */
function TopBar({ userName = "Sarah Johnson", unreadCount = 2, onNotifications }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  return (
    <header
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--rp-gradient-from), var(--rp-gradient-via), var(--rp-gradient-to))",
        padding: "40px 20px 24px",
      }}
    >
      <div style={{ position: "absolute", right: -48, top: -48, width: 192, height: 192, borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />
      <div style={{ position: "absolute", left: -32, bottom: -32, width: 128, height: 128, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.8)" }}>{greeting}</p>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#fff" }}>{userName}</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onNotifications}
            style={{ position: "relative", display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", cursor: "pointer" }}
          >
            🔔
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: -2, right: -2, display: "grid", placeItems: "center", width: 18, height: 18, borderRadius: "50%", background: "#ef4444", fontSize: 10, fontWeight: 700, color: "#fff", boxShadow: "0 0 0 2px var(--rp-gradient-from)" }}>
                {unreadCount}
              </span>
            )}
          </button>
          <div style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,.15)" }}>
            <img src="../../assets/remedypills/icon-foreground.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </header>
  );
}

function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "prescriptions", label: "Rx", icon: "💊" },
    { id: "reminders", label: "Reminders", icon: "🔔" },
    { id: "appointments", label: "Care", icon: "📅" },
    { id: "health", label: "Health", icon: "📈" },
    { id: "account", label: "Account", icon: "👤" },
  ];
  return (
    <nav style={{ position: "sticky", bottom: 0, borderTop: "1px solid #e5e7eb", background: "#fff", boxShadow: "var(--rp-shadow-nav)", display: "flex", justifyContent: "space-around", padding: "8px 4px" }}>
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", fontSize: 11, fontWeight: 500, color: active ? "hsl(var(--rp-primary))" : "#9ca3af" }}
          >
            <span style={{ fontSize: 17, filter: active ? "none" : "grayscale(60%) opacity(.7)" }}>{it.icon}</span>
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}

Object.assign(window, { TopBar, BottomNav });

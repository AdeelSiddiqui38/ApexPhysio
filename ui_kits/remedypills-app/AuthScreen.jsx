const { useState } = React;

/** RemedyPills auth flow: landing → login / register. Mirrors auth-page.tsx. */
function AuthScreen({ onLogin }) {
  const [screen, setScreen] = useState("landing");

  if (screen === "landing") {
    return (
      <div style={{ minHeight: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 24px", background: "linear-gradient(180deg, hsl(186,86%,25%), hsl(186,76%,35%), hsl(176,70%,42%))", textAlign: "center" }}>
        <div style={{ display: "grid", placeItems: "center", width: 80, height: 80, borderRadius: 20, background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,.2)", marginBottom: 20 }}>
          <img src="../../assets/remedypills/icon-foreground.png" alt="RemedyPills" style={{ width: 48, height: 48, objectFit: "contain" }} />
        </div>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Your health, managed with care</h1>
        <p style={{ marginTop: 12, fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.5, maxWidth: 320 }}>
          Prescriptions, reminders, bookings, and health tracking — all in one place from your trusted Calgary pharmacist.
        </p>
        <button
          onClick={() => setScreen("register")}
          style={{ marginTop: 32, width: "100%", maxWidth: 320, height: 56, borderRadius: 9999, border: "none", background: "#fff", color: "hsl(186,86%,25%)", fontWeight: 700, fontSize: 15, letterSpacing: ".02em", boxShadow: "0 10px 25px rgba(0,0,0,.2)", cursor: "pointer" }}
        >
          GET STARTED
        </button>
        <button onClick={() => setScreen("login")} style={{ marginTop: 16, background: "none", border: "none", color: "rgba(255,255,255,.9)", fontSize: 13, cursor: "pointer" }}>
          Already have an account? <span style={{ fontWeight: 700, textDecoration: "underline" }}>Log In</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 600, padding: "40px 24px", background: "#fff" }}>
      <button onClick={() => setScreen("landing")} style={{ background: "none", border: "none", color: "hsl(var(--rp-primary))", fontSize: 14, cursor: "pointer", marginBottom: 24 }}>← Back</button>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{screen === "login" ? "Welcome back" : "Create your account"}</h2>
      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>{screen === "login" ? "Log in to manage your prescriptions." : "Join RemedyPills Pharmacy in under a minute."}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {screen === "register" && (
          <input placeholder="Full name" style={inputStyle} />
        )}
        <input placeholder="Username" style={inputStyle} />
        <input placeholder="Password" type="password" style={inputStyle} />
        <button onClick={onLogin} style={{ marginTop: 8, height: 48, borderRadius: 16, border: "none", background: "hsl(var(--rp-primary))", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          {screen === "login" ? "Log In" : "Create Account"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0", color: "#94a3b8", fontSize: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} /> or <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>
        <button style={{ height: 48, borderRadius: 16, border: "1px solid #e5e7eb", background: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const inputStyle = { height: 46, borderRadius: 16, border: "1px solid hsl(var(--rp-input))", padding: "0 16px", fontSize: 14, fontFamily: "var(--font-sans)" };

Object.assign(window, { AuthScreen });

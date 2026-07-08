/** NBV site chrome: sticky navy header w/ dropdown nav, and footer. */
function Header({ page, setPage }) {
  const links = [
    { id: "about", label: "About Us" },
    { id: "programs", label: "Programs" },
    { id: "global", label: "Global Entrepreneurs" },
    { id: "founders", label: "Canadian Founders" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "hsl(var(--nbv-primary))", boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 76, padding: "0 24px", gap: 28 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <img src="../../assets/nbv/nbv-logo.jpg" alt="Next Bridge Ventures" style={{ height: 40, borderRadius: 6 }} />
        </button>
        <nav style={{ display: "flex", gap: 22, flex: 1 }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: page === l.id ? 700 : 500, color: page === l.id ? "#fff" : "rgba(255,255,255,.75)", fontFamily: "var(--font-sans)" }}>
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "hsl(var(--nbv-primary))", color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 32 }}>
        <div>
          <img src="../../assets/nbv/nbv-logo.jpg" alt="Next Bridge Ventures" style={{ height: 36, borderRadius: 6, marginBottom: 14 }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.6, maxWidth: 320 }}>
            Next Bridge Ventures (NBV) is a private Canadian venture incubation platform. We help global founders and Canadian entrepreneurs launch, acquire, or scale real businesses in Canada.
          </p>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>Navigate</p>
          {["About Us", "Programs", "FAQ", "Global Entrepreneurs", "Canadian Founders"].map((l) => (
            <p key={l} style={{ fontSize: 13, color: "rgba(255,255,255,.7)", margin: "0 0 10px" }}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>Get Started</p>
          {["Apply Now", "Resources", "Contact"].map((l) => (
            <p key={l} style={{ fontSize: 13, color: "rgba(255,255,255,.7)", margin: "0 0 10px" }}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>Contact</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", margin: "0 0 8px" }}>✉ info@nextbridgeventures.ca</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", margin: 0 }}>📍 Calgary, Alberta, Canada</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--nbv-cta-teal)", padding: "24px", fontSize: 11, color: "rgba(255,255,255,.55)", maxWidth: 1200, margin: "0 auto" }}>
        Disclaimer: Next Bridge Ventures (NBV) is not an immigration consultant, legal advisor, or government-endorsed entity. All immigration decisions are made solely by IRCC. © {new Date().getFullYear()} Next Bridge Ventures. All rights reserved.
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Footer });

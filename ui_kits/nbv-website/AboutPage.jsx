/** NBV About page — hero, mission, vision/approach cards, commitment band. Mirrors src/app/about/page.tsx. */
function AboutPage() {
  return (
    <div>
      <section style={{ position: "relative", background: "var(--nbv-hero-navy)", color: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 40, margin: 0 }}>About Us</h1>
          <p style={{ marginTop: 14, fontSize: 18, color: "#d1d5db", maxWidth: 640 }}>We are a Calgary-based venture partner enabling global founders to build, buy, and scale real businesses in Canada.</p>
        </div>
      </section>

      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <img src="../../assets/nbv/canada-image.png" alt="" style={{ width: "100%", borderRadius: 14, boxShadow: "var(--nbv-shadow-soft-sm)" }} />
          <div style={{ fontSize: 17, color: "#374151", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 16 }}>
            <p>At Next Bridge Ventures (NBV), we connect global founders and Canadian business owners with real opportunities that align with Canada's economic and immigration priorities.</p>
            <p>Whether you're starting a business in Canada, buying a Canadian business, or restructuring for growth, NBV provides the insight, support, and execution muscle to help validated ideas become viable, sustainable ventures.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "hsl(var(--nbv-secondary))", padding: "64px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 30, color: "hsl(var(--nbv-primary))", margin: 0 }}>Our Mission</h2>
          <p style={{ marginTop: 18, fontSize: 16, color: "#4b5563", lineHeight: 1.7 }}>To empower globally ambitious entrepreneurs with the tools, training, and strategic guidance to build ventures that fill market gaps and drive sustainable growth in Canada and beyond.</p>
          <div style={{ height: 1, background: "var(--nbv-cta-teal)", opacity: 0.3, margin: "32px auto", maxWidth: 400 }} />
          <p style={{ fontWeight: 700, fontSize: 17, color: "hsl(var(--nbv-primary))" }}>We don't sell visas, we build ventures.</p>
        </div>
      </section>

      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { t: "Our Vision", p: "We envision a world where technology, AI, and sustainability converge to solve real-world challenges, not just innovate for innovation's sake." },
            { t: "Our Approach", p: "We don't simply offer immigration-aligned programs — we deliver performance, commercial traction, and execution credibility." },
          ].map((c) => (
            <div key={c.t} style={{ border: "1px solid hsl(var(--nbv-border))", borderRadius: "var(--nbv-radius-lg)", boxShadow: "var(--nbv-shadow-soft-sm)", padding: 28 }}>
              <h3 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 22, color: "hsl(var(--nbv-primary))", margin: "0 0 12px" }}>{c.t}</h3>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{c.p}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AboutPage });

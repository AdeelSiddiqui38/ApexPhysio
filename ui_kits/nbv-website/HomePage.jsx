/** NBV homepage — hero, what-we-do, quote band, flip-card benefits, CTA. Mirrors src/app/page.tsx. */
function HomePage({ setPage }) {
  const benefits = [
    { label: "IRCC & Policy-Aligned Business Programs", desc: "We align your venture with Canada's national and regional priorities, making business immigration a natural outcome." },
    { label: "Transparent Process for Business Setup", desc: "Our transparent process helps you launch or acquire a real business in Canada and meet all milestones confidently." },
    { label: "Access to Canada's Startup Ecosystem", desc: "Access Canada's venture ecosystem, mentorship, funding partners, and regional economic support." },
    { label: "Hands-On Venture Support in Canada", desc: "We work side-by-side, from setup to scaling, with real-time insight and operational mentorship." },
  ];
  return (
    <div>
      <section style={{ position: "relative", color: "#fff", padding: "120px 24px", textAlign: "center", background: `linear-gradient(hsl(var(--nbv-primary) / .82), hsl(var(--nbv-primary) / .82)), url(../../assets/nbv/hero1.jpg) center/cover` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 44, letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
            From Vision to Venture.<br />Global ideas, Canadian execution.
          </h1>
          <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 24, lineHeight: 1.65 }}>
            At Next Bridge Ventures (NBV), we are more than a business incubator or immigration partner. We are a launchpad for entrepreneurs building meaningful, scalable ventures that contribute to Canada's economic future.
          </p>
          <p style={{ fontSize: 18, color: "#d1d5db", marginTop: 16, lineHeight: 1.65 }}>
            Whether you are a Canadian business owner seeking growth or exit, or an international founder entering Canada's innovation ecosystem, we advance validated ventures with insight, execution, and credibility.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32 }}>
            <button onClick={() => setPage("programs")} style={{ background: "var(--nbv-cta-teal)", color: "#fff", border: "none", borderRadius: "var(--nbv-radius-md)", padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Discover Programs</button>
            <button style={{ background: "transparent", color: "#fff", border: "1px solid #fff", borderRadius: "var(--nbv-radius-md)", padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Contact Us</button>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 32, color: "hsl(var(--nbv-primary))", margin: "0 0 16px" }}>What We Do</h2>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7 }}>At Next Bridge Ventures (NBV), we support Canadian and international founders with a business-first approach rooted in credibility, commercial scalability, and long-term economic value creation.</p>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7 }}>We help entrepreneurs launch, acquire, or scale real, sustainable ventures in Canada, not paper entities.</p>
          </div>
          <img src="../../assets/nbv/canada-image.png" alt="Canada" style={{ width: "100%", borderRadius: 14, boxShadow: "var(--nbv-shadow-soft-lg)" }} />
        </div>
      </section>

      <section style={{ background: "hsl(var(--nbv-primary))", color: "#fff", padding: "80px 24px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "var(--nbv-teal-500)" }} />
        <blockquote style={{ fontSize: 28, fontWeight: 300, fontStyle: "italic", maxWidth: 720, margin: "0 auto" }}>
          "We don't just incubate. We validate, audit, invest, and scale."
        </blockquote>
        <p style={{ marginTop: 20, color: "#d1d5db", fontSize: 16 }}>Our venture support ecosystem serves both Canada's economic priorities and the entrepreneurs driving innovation.</p>
      </section>

      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <h2 style={{ textAlign: "center", fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 32, color: "hsl(var(--nbv-primary))", margin: "0 0 40px" }}>What You Get With NBV</h2>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {benefits.map((b) => (
            <div key={b.label} style={{ borderRadius: 14, background: "var(--nbv-cta-teal)", color: "#fff", padding: 20, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", boxShadow: "var(--nbv-shadow-soft-sm)" }}>
              <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--nbv-cta-teal)", color: "#fff", padding: "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 28, margin: 0 }}>Let's Talk Business</h2>
        <p style={{ marginTop: 12, fontSize: 16, maxWidth: 600, margin: "12px auto 0" }}>Ready to build or acquire a real business in Canada with integrity and commercial traction?</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 24 }}>
          <button style={{ background: "#fff", color: "hsl(var(--nbv-primary))", border: "none", borderRadius: "var(--nbv-radius-md)", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>Start Your Venture</button>
          <button onClick={() => setPage("programs")} style={{ background: "transparent", color: "#fff", border: "1px solid #fff", borderRadius: "var(--nbv-radius-md)", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>Explore Programs</button>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage });

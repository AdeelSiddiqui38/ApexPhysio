const { useState } = React;

/** NBV FAQ page — accordion. Mirrors src/app/faq/page.tsx (abbreviated to 5 of 18 real questions). */
const FAQS = [
  { q: "What is Next Bridge Ventures?", a: "Next Bridge Ventures (NBV) is a private Canadian venture incubation platform that supports global and local entrepreneurs in launching, acquiring, or scaling real businesses in Canada. We are not immigration consultants." },
  { q: "Does NBV guarantee a visa?", a: "No. We do not provide immigration advice or visa guarantees. Our role is to build and validate your business so it meets the commercial standards required for immigration-linked programs." },
  { q: "What type of businesses does Next Bridge Ventures support?", a: "Tech and SaaS ventures, e-commerce platforms, clean-tech and sustainability startups, and service-based businesses. We do not support paper businesses, passive investments, or shell companies." },
  { q: "How much funding is required to get started?", a: "There's no fixed minimum, but you should be financially prepared to incorporate and operate in Canada, cover personal expenses for 12–18 months, and fund early business development." },
  { q: "How do I get started?", a: "Submit your business or founder profile via our application form. Only shortlisted and eligible candidates will be contacted for the next step in screening and onboarding." },
];

function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ padding: "64px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 34 }}>Frequently Asked Questions</h1>
        <p style={{ color: "#6b7280", fontSize: 16, marginTop: 10 }}>Have questions? We have answers.</p>
      </div>
      <div style={{ maxWidth: 720, margin: "40px auto 0" }}>
        {FAQS.map((f, i) => (
          <div key={f.q} style={{ borderBottom: "1px solid hsl(var(--nbv-border))" }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "18px 4px", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
              {f.q}<span>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p style={{ padding: "0 4px 18px", color: "#4b5563", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { FaqPage });

/** Simple placeholder pages for Programs / Global Entrepreneurs / Canadian Founders — content omitted (see readme caveat). */
function StubPage({ title, note }) {
  return (
    <div style={{ padding: "96px 24px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: 32, color: "hsl(var(--nbv-primary))" }}>{title}</h1>
      <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>{note}</p>
    </div>
  );
}

Object.assign(window, { StubPage });

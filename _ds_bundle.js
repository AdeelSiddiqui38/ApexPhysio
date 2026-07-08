/* @ds-bundle: {"format":4,"namespace":"RemedyPillsNBVDesignSystem_4359c3","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"BottomNav","sourcePath":"components/remedypills/BottomNav.jsx"},{"name":"QuickActionTile","sourcePath":"components/remedypills/QuickActionTile.jsx"}],"sourceHashes":{"apexphysio/booking.js":"3b8cf92faa0b","apexphysio/interactions.js":"8db32cf8abac","apexphysio/marketing/doc-page.js":"62024d965071","apexphysio/motion-bg.js":"b154dfa5a0af","components/core/Badge.jsx":"d03ca51884fc","components/core/Button.jsx":"fd325b124291","components/core/Card.jsx":"02659ba16d6b","components/core/Input.jsx":"5c7dcf672811","components/remedypills/BottomNav.jsx":"6cea56cc11ff","components/remedypills/QuickActionTile.jsx":"90bd7b3b0c75","ui_kits/nbv-website/AboutPage.jsx":"a35b50680103","ui_kits/nbv-website/FaqPage.jsx":"80b6819429f5","ui_kits/nbv-website/HomePage.jsx":"a9a7670cf6e8","ui_kits/nbv-website/NbvShell.jsx":"7aafce040615","ui_kits/nbv-website/StubPage.jsx":"24dcf3668c37","ui_kits/remedypills-app/AccountTab.jsx":"39db33a38db2","ui_kits/remedypills-app/AppointmentsTab.jsx":"81f176ae00bb","ui_kits/remedypills-app/AuthScreen.jsx":"941cbf3e4036","ui_kits/remedypills-app/HealthTab.jsx":"87bd89888af0","ui_kits/remedypills-app/HomeTab.jsx":"e95091969e80","ui_kits/remedypills-app/PrescriptionsTab.jsx":"e69f3feb4d88","ui_kits/remedypills-app/RemindersTab.jsx":"c3fd557212d5","ui_kits/remedypills-app/Shell.jsx":"a784ace874bb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RemedyPillsNBVDesignSystem_4359c3 = window.RemedyPillsNBVDesignSystem_4359c3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// apexphysio/booking.js
try { (() => {
/* Jane-App-style 4-step booking mock: service → day/time → details → confirm */
(function () {
  const shell = document.getElementById('bookingShell');
  const SVCS = [{
    nm: 'Physiotherapy — Initial Assessment',
    dt: '60 min · $120'
  }, {
    nm: 'Physiotherapy — Follow-Up',
    dt: '45 min · $95'
  }, {
    nm: 'Massage Therapy',
    dt: '60 min · $110'
  }, {
    nm: 'Chiropractic Adjustment',
    dt: '30 min · $75'
  }, {
    nm: 'MVA / WCB Intake',
    dt: '60 min · Direct billed'
  }, {
    nm: 'Acupuncture / IMS',
    dt: '45 min · $90'
  }];
  const DAYS = (() => {
    const out = [],
      dw = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      if (d.getDay() === 0) continue; // closed Sunday
      out.push({
        dw: i === 0 ? 'TODAY' : dw[d.getDay()],
        dn: d.getDate()
      });
    }
    return out.slice(0, 6);
  })();
  const SLOTS = ['8:00 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'];
  let step = 0,
    sel = {
      svc: null,
      day: null,
      slot: null,
      name: '',
      phone: ''
    };
  function stepsBar() {
    const labels = ['Service', 'Date & Time', 'Your Details', 'Confirmed'];
    return `<div class="jane-steps">${labels.map((l, i) => `<div class="jane-step ${i === step ? 'active' : i < step ? 'done' : ''}">${i < step ? '✓ ' : ''}${l}</div>`).join('')}</div>`;
  }
  function render() {
    let body = '';
    if (step === 0) {
      body = `<div class="svc-grid">${SVCS.map((s, i) => `<button class="svc-opt ${sel.svc === i ? 'sel' : ''}" data-i="${i}"><div class="nm">${s.nm}</div><div class="dt">${s.dt}</div></button>`).join('')}</div>
        <div class="jane-nav"><span></span><button class="jane-next" ${sel.svc === null ? 'disabled' : ''} data-go="1">Choose Time →</button></div>`;
    } else if (step === 1) {
      body = `<div class="day-row">${DAYS.map((d, i) => `<button class="day-chip ${sel.day === i ? 'sel' : ''}" data-d="${i}"><div class="dw">${d.dw}</div><div class="dn">${d.dn}</div></button>`).join('')}</div>
        <div class="slot-grid">${SLOTS.map((s, i) => `<button class="slot ${sel.slot === i ? 'sel' : ''}" data-s="${i}">${s}</button>`).join('')}</div>
        <div class="jane-nav"><button class="jane-back" data-go="0">← Back</button><button class="jane-next" ${sel.day === null || sel.slot === null ? 'disabled' : ''} data-go="2">Your Details →</button></div>`;
    } else if (step === 2) {
      body = `<div class="jane-form">
        <div class="fg"><label>Full Name</label><input id="jfName" placeholder="Jane Smith" value="${sel.name}"></div>
        <div class="fg"><label>Phone</label><input id="jfPhone" placeholder="403-000-0000" value="${sel.phone}"></div>
        <div class="fg"><label>Insurance (optional — we direct bill)</label><input placeholder="e.g. Alberta Blue Cross"></div>
        </div>
        <div class="jane-nav"><button class="jane-back" data-go="1">← Back</button><button class="jane-next" data-go="3">Confirm Booking →</button></div>`;
    } else {
      const d = DAYS[sel.day],
        s = SVCS[sel.svc];
      body = `<div class="jane-confirm">
        <div class="big">🎉</div>
        <h3>You're booked${sel.name ? ', ' + sel.name.split(' ')[0] : ''}!</h3>
        <p>This is a preview of the live Jane App flow — on the real site this confirms instantly and emails you a reminder.</p>
        <div class="jane-summary">
          <div><span class="k">Service</span><span class="v">${s.nm.split(' — ')[0]}</span></div>
          <div><span class="k">When</span><span class="v">${d.dw} ${d.dn} · ${SLOTS[sel.slot]}</span></div>
          <div><span class="k">Where</span><span class="v">Unit 150, 246 Nolanridge Cres NW</span></div>
          <div><span class="k">Billing</span><span class="v">Direct to insurer</span></div>
        </div>
        <button class="jane-next" style="margin-top:22px" data-go="0">Book Another</button>
      </div>`;
    }
    shell.innerHTML = `
      <div class="jane-head"><div class="jh-brand">📅 Book with Apex</div><span class="jane-badge">POWERED BY JANE APP · PREVIEW</span></div>
      <div class="jane-body">${stepsBar()}${body}</div>`;
    wire();
  }
  function wire() {
    shell.querySelectorAll('.svc-opt').forEach(b => b.onclick = () => {
      sel.svc = +b.dataset.i;
      render();
    });
    shell.querySelectorAll('.day-chip').forEach(b => b.onclick = () => {
      sel.day = +b.dataset.d;
      render();
    });
    shell.querySelectorAll('.slot').forEach(b => b.onclick = () => {
      sel.slot = +b.dataset.s;
      render();
    });
    shell.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
      const n = shell.querySelector('#jfName'),
        p = shell.querySelector('#jfPhone');
      if (n) sel.name = n.value;
      if (p) sel.phone = p.value;
      if (+b.dataset.go === 0) sel = {
        svc: null,
        day: null,
        slot: null,
        name: '',
        phone: ''
      };
      step = +b.dataset.go;
      render();
    });
  }
  render();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "apexphysio/booking.js", error: String((e && e.message) || e) }); }

// apexphysio/interactions.js
try { (() => {
/* Interactions: progress bar, scroll reveals, services, body map, quiz,
   recovery slider, exercise library, chat bubble, service modal. */

/* ── scroll progress + reveals ── */
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }
}), {
  threshold: .15
});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── services ── */
const SERVICES = [{
  icon: '🦴',
  name: 'Physiotherapy',
  desc: 'Back/neck pain, whiplash, shoulder injuries and post-surgical rehab.',
  body: 'Hands-on manual therapy, exercise prescription and education — one-on-one, full sessions with the same physiotherapist every visit.'
}, {
  icon: '💆',
  name: 'Massage Therapy',
  desc: 'Deep tissue, sports, therapeutic and relaxation massage.',
  body: 'Registered massage therapists targeting muscle tension, recovery and stress — direct billing available.'
}, {
  icon: '🩻',
  name: 'Chiropractic',
  desc: 'Spinal adjustments, joint mobilization and posture correction.',
  body: 'Evidence-based chiropractic care coordinated with your physio plan for faster results.'
}, {
  icon: '🏃',
  name: 'Kinesiology',
  desc: 'Active rehab, exercise therapy and return-to-work conditioning.',
  body: 'Movement specialists building strength and function after injury, MVA or surgery.'
}, {
  icon: '📌',
  name: 'Acupuncture & IMS',
  desc: 'Dry needling and acupuncture for pain and muscle release.',
  body: 'Certified practitioners using needling techniques to release trigger points and calm chronic pain.'
}, {
  icon: '🚗',
  name: 'MVA Rehab',
  desc: 'Motor vehicle accident recovery with direct insurer billing.',
  body: 'We handle the paperwork with your insurer under Alberta DTPR — you focus on recovery.'
}, {
  icon: '👷',
  name: 'WCB Injuries',
  desc: 'Workplace injury rehab and return-to-work programs.',
  body: 'WCB-authorized treatment with progress reporting and modified-duty planning.'
}, {
  icon: '🧘',
  name: 'Wellness Programs',
  desc: 'Posture clinics, ergonomics and injury prevention.',
  body: 'Stay at your peak — preventative programs for desk workers, athletes and seniors.'
}];
document.getElementById('servicesGrid').innerHTML = SERVICES.map((s, i) => `
  <div class="service-card reveal d${i % 6 + 1}" data-svc="${i}">
    <div class="s-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p>
    <div class="learn-more">Explore →</div>
  </div>`).join('');
document.querySelectorAll('.service-card').forEach(el => {
  io.observe(el);
  el.addEventListener('click', () => {
    const s = SERVICES[+el.dataset.svc];
    document.getElementById('modalTitle').textContent = s.icon + ' ' + s.name;
    document.getElementById('modalBody').textContent = s.body;
    document.getElementById('modalBack').classList.add('open');
  });
});
document.getElementById('modalX').onclick = () => document.getElementById('modalBack').classList.remove('open');
document.getElementById('modalBack').addEventListener('click', e => {
  if (e.target.id === 'modalBack') e.currentTarget.classList.remove('open');
});

/* ── body map ── */
const SPOTS = [{
  x: 120,
  y: 50,
  area: 'Head & Jaw',
  title: 'Headaches · TMJ · Concussion',
  desc: 'Tension headaches, jaw pain and post-concussion symptoms often trace back to the neck and jaw muscles.',
  tags: ['Physiotherapy', 'Massage', 'Acupuncture']
}, {
  x: 120,
  y: 92,
  area: 'Neck',
  title: 'Neck Pain & Whiplash',
  desc: 'Stiff neck, whiplash from an MVA, or "tech neck" from desk work — among the most common issues we treat.',
  tags: ['Physiotherapy', 'Chiropractic', 'MVA Rehab']
}, {
  x: 88,
  y: 128,
  area: 'Shoulder',
  title: 'Rotator Cuff & Frozen Shoulder',
  desc: 'Pain reaching overhead, clicking, or post-injury weakness responds well to targeted physio and needling.',
  tags: ['Physiotherapy', 'IMS / Dry Needling']
}, {
  x: 120,
  y: 185,
  area: 'Lower Back',
  title: 'Low Back Pain & Sciatica',
  desc: 'Disc irritation, sciatica and chronic stiffness — hands-on treatment plus a progressive exercise plan.',
  tags: ['Physiotherapy', 'Chiropractic', 'Kinesiology']
}, {
  x: 185,
  y: 205,
  area: 'Wrist & Hand',
  title: 'Carpal Tunnel & Sprains',
  desc: 'Numb or tingling hands, sport sprains and repetitive-strain injuries of the wrist and elbow.',
  tags: ['Physiotherapy', 'Ergonomics']
}, {
  x: 108,
  y: 300,
  area: 'Hip',
  title: 'Hip Pain & Bursitis',
  desc: 'Pinching hips, bursitis and glute weakness that limit walking, squatting and stairs.',
  tags: ['Physiotherapy', 'Kinesiology']
}, {
  x: 152,
  y: 372,
  area: 'Knee',
  title: 'Knee Injuries & Runner\u2019s Knee',
  desc: 'ACL/MCL sprains, meniscus irritation and patellofemoral pain from running or sport.',
  tags: ['Physiotherapy', 'Sports Rehab']
}, {
  x: 82,
  y: 440,
  area: 'Ankle & Foot',
  title: 'Ankle Sprains & Plantar Fasciitis',
  desc: 'Rolled ankles that never fully healed and heel pain that bites with the first steps of the day.',
  tags: ['Physiotherapy', 'Massage']
}];
const svg = document.getElementById('bodySvg');
SPOTS.forEach((s, i) => {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'bm-spot');
  g.dataset.i = i;
  g.innerHTML = `<circle class="ring" cx="${s.x}" cy="${s.y}" r="14"></circle><circle class="core" cx="${s.x}" cy="${s.y}" r="8"></circle>`;
  g.addEventListener('click', () => {
    document.querySelectorAll('.bm-spot').forEach(el => el.classList.remove('active'));
    g.classList.add('active');
    document.getElementById('bmPanel').innerHTML = `
      <div class="area">${s.area}</div><h3>${s.title}</h3><p>${s.desc}</p>
      <div class="bm-tags">${s.tags.map(t => `<span class="bm-tag">${t}</span>`).join('')}</div>
      <a href="#book" class="btn-primary" style="padding:12px 22px;font-size:.9rem">Book an Assessment →</a>`;
  });
  svg.appendChild(g);
});

/* ── quiz ── */
const QUIZ = [{
  q: 'Where is your main concern?',
  opts: ['Neck / shoulders', 'Back / hips', 'Knee / ankle', 'General tension or stress']
}, {
  q: 'How did it start?',
  opts: ['Car accident (MVA)', 'Work injury', 'Sport / exercise', 'Gradually — no clear cause']
}, {
  q: 'How long has it bothered you?',
  opts: ['Less than 2 weeks', '2–6 weeks', 'Months', 'Years — on and off']
}, {
  q: 'What matters most to you right now?',
  opts: ['Fast pain relief', 'Getting back to sport/work', 'Fixing the root cause', 'Relaxation & maintenance']
}];
const RESULTS = [{
  title: 'Physiotherapy Assessment',
  desc: 'Based on your answers, a one-on-one physiotherapy assessment is the right starting point. Your physiotherapist will diagnose the issue, relieve pain hands-on, and map your recovery plan.'
}, {
  title: 'MVA / WCB Rehab Intake',
  desc: 'Accident- or work-related injuries qualify for direct insurer billing. Start with our MVA/WCB intake — we handle the paperwork, you start treatment right away.'
}, {
  title: 'Massage Therapy',
  desc: 'For tension, stress and maintenance, a registered massage therapy session is the best first step — with physio backup if anything deeper shows up.'
}];
let qStep = 0,
  qAns = [];
function renderQuiz() {
  const card = document.getElementById('quizCard');
  if (qStep < QUIZ.length) {
    const q = QUIZ[qStep];
    card.innerHTML = `
      <div class="quiz-progress"><div style="width:${qStep / QUIZ.length * 100 + 12}%"></div></div>
      <div class="quiz-q">${qStep + 1}. ${q.q}</div>
      <div class="quiz-opts">${q.opts.map((o, i) => `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}</div>`;
    card.querySelectorAll('.quiz-opt').forEach(b => b.addEventListener('click', () => {
      qAns.push(+b.dataset.i);
      qStep++;
      renderQuiz();
    }));
  } else {
    const r = qAns[1] <= 1 ? RESULTS[1] : qAns[3] === 3 ? RESULTS[2] : RESULTS[0];
    card.innerHTML = `
      <div class="quiz-progress"><div style="width:100%"></div></div>
      <div class="quiz-result">
        <div style="font-size:2.6rem;margin-bottom:10px">🎯</div>
        <h3>Recommended: ${r.title}</h3><p>${r.desc}</p>
        <a href="#book" class="btn-primary" style="padding:13px 26px;font-size:.92rem">Book ${r.title.split(' ')[0]} →</a>
        <br><button class="quiz-restart">↺ Retake quiz</button>
      </div>`;
    card.querySelector('.quiz-restart').onclick = () => {
      qStep = 0;
      qAns = [];
      renderQuiz();
    };
  }
}
renderQuiz();

/* ── recovery slider ── */
const STAGES = [{
  e: '😣',
  t: 'Assessment & Pain Relief',
  d: 'Your first 1-on-1 visit: full assessment, hands-on treatment to calm pain, and a plan built for your body and goals.',
  f: 12
}, {
  e: '🙂',
  t: 'Early Wins',
  d: 'Pain settling, movement returning. Gentle mobility work begins and daily activities get noticeably easier.',
  f: 35
}, {
  e: '💪',
  t: 'Rebuilding Strength',
  d: 'Progressive loading and targeted exercises restore the strength and control the injury took away.',
  f: 60
}, {
  e: '🏃',
  t: 'Return to Activity',
  d: 'Sport-, work- and life-specific training. You test the body under real demands with your clinician watching form.',
  f: 85
}, {
  e: '🏔️',
  t: 'Peak Performance',
  d: 'Discharged with a maintenance plan — stronger than before the injury, with tools to keep it that way.',
  f: 100
}];
const recRange = document.getElementById('recRange');
recRange.addEventListener('input', () => {
  const s = STAGES[+recRange.value];
  document.getElementById('recEmoji').textContent = s.e;
  document.getElementById('recTitle').textContent = s.t;
  document.getElementById('recDesc').textContent = s.d;
  document.getElementById('recFill').style.width = s.f + '%';
  document.getElementById('recEmoji').style.transform = 'scale(1.25)';
  setTimeout(() => document.getElementById('recEmoji').style.transform = '', 200);
});

/* ── exercise library ── */
const LIB = [{
  cat: 'Lower Back',
  name: 'Cat-Cow Mobility Flow',
  dur: '3:24',
  icon: '🐱'
}, {
  cat: 'Neck',
  name: 'Desk Worker Neck Reset',
  dur: '4:10',
  icon: '💻'
}, {
  cat: 'Knee',
  name: 'Runner\u2019s Knee Strength Set',
  dur: '6:45',
  icon: '🏃'
}, {
  cat: 'Shoulder',
  name: 'Rotator Cuff Band Series',
  dur: '5:02',
  icon: '💪'
}, {
  cat: 'Ankle',
  name: 'Ankle Sprain Rebuild',
  dur: '4:38',
  icon: '🦶'
}, {
  cat: 'Posture',
  name: '5-Minute Posture Break',
  dur: '5:00',
  icon: '🧘'
}];
document.getElementById('libGrid').innerHTML = LIB.map((v, i) => `
  <div class="lib-card reveal d${i % 6 + 1}">
    <div class="lib-thumb"><div class="bg"></div><span class="ex-icon">${v.icon}</span><div class="play">▶</div><span class="dur">${v.dur}</span></div>
    <div class="lib-body"><div class="lib-cat">${v.cat}</div><h4>${v.name}</h4></div>
  </div>`).join('');
document.querySelectorAll('.lib-card').forEach(el => {
  io.observe(el);
  el.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = '🎬 Coming with launch';
    document.getElementById('modalBody').textContent = 'The full exercise video library ships with the live site — filmed with our own clinicians. Every Apex patient gets free access to their personalized program.';
    document.getElementById('modalBack').classList.add('open');
  });
});

/* ── chat bubble ── */
const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
chatToggle.addEventListener('click', () => chatPanel.classList.toggle('open'));
document.querySelectorAll('.chat-act').forEach(b => b.addEventListener('click', () => {
  window.open('https://wa.me/14030000000?text=' + encodeURIComponent(b.dataset.msg), '_blank');
}));
})(); } catch (e) { __ds_ns.__errors.push({ path: "apexphysio/interactions.js", error: String((e && e.message) || e) }); }

// apexphysio/marketing/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * On screen the document renders as a single continuous sheet on a desk
 * background (Google Docs' pageless view): you scroll one tall page card.
 * There is no manual page-splitting — write the whole document as normal
 * flow inside <doc-page> and the browser's print engine paginates it at
 * export.
 *
 * At print the component injects `@page { size: …; margin: 0 }` (which
 * leaves Chrome no margin box to draw its date/URL/page-count header in)
 * and moves the visual margin onto the sheet's own padding, so the printed
 * page has the same inset you see on screen. Standard break-hygiene rules
 * (`break-inside: avoid` on figures, code blocks, images and table rows;
 * `orphans/widows: 3`) are applied so paragraphs and groups split cleanly.
 * On screen and at print, headings default to `text-wrap: balance` and
 * body text (p, li, blockquote, figcaption) to `text-wrap: pretty`, so
 * the document avoids widowed/orphaned words; the defaults have zero
 * specificity, so any text-wrap you declare on those elements wins.
 *
 * Usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page size="letter" margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 *
 * Attributes:
 *   size    — letter | a4 | legal (default letter)
 *   width / height — explicit CSS lengths, override `size`
 *   margin  — printable inset on every page (default 0.75in)
 *
 * Running header/footer (optional): give an element `slot="header"` or
 * `slot="footer"` and it repeats on every printed page via
 * `position: fixed`. To keep body text from sliding under it, the
 * component prints inside a single-cell table whose <thead>/<tfoot> are
 * spacers sized to the header/footer height — browsers repeat thead/tfoot
 * on every page, so each sheet's content starts below the header and ends
 * above the footer. On screen the header/footer render once at the
 * top/bottom of the sheet.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  const safeLen = (v, fb) => CSS_LENGTH.test((v || '').trim()) ? v.trim() : fb;
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      min-height: 100vh;
      background: #ece8dd;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 14px rgba(20, 20, 19, 0.12);
      border-radius: 2px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + 0.35in)); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + 0.35in)); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }
    get pageWidth() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()];
      return safeLen(this.getAttribute('width'), named ? named[0] : PAPER.letter[0]);
    }
    get pageHeight() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()];
      return safeLen(this.getAttribute('height'), named ? named[1] : PAPER.letter[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      if (!document.querySelector('doc-page')) {
        ['doc-page-print', 'doc-page-text-wrap'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><slot></slot></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      this._vars.textContent = ':host{' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      tag.textContent = '@page { size: ' + this.pageWidth + ' ' + this.pageHeight + '; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "apexphysio/marketing/doc-page.js", error: String((e && e.message) || e) }); }

// apexphysio/motion-bg.js
try { (() => {
/* Simulated "moving video" hero background — layered drifting gradient blobs
   + rising particles + slow light sweep, rendered on canvas. */
(function () {
  const canvas = document.getElementById('motionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const blobs = [{
    x: .15,
    y: .25,
    r: 380,
    hue: 'rgba(0,229,179,',
    a: .22,
    sp: .00022,
    ph: 0
  }, {
    x: .85,
    y: .75,
    r: 340,
    hue: 'rgba(14,120,180,',
    a: .28,
    sp: .00017,
    ph: 2
  }, {
    x: .65,
    y: .2,
    r: 260,
    hue: 'rgba(255,176,58,',
    a: .10,
    sp: .00028,
    ph: 4
  }, {
    x: .35,
    y: .85,
    r: 300,
    hue: 'rgba(0,201,167,',
    a: .16,
    sp: .0002,
    ph: 1
  }];
  const N = 70;
  const parts = Array.from({
    length: N
  }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: .6 + Math.random() * 1.8,
    vy: .0003 + Math.random() * .0009,
    drift: (Math.random() - .5) * .0003,
    tw: Math.random() * Math.PI * 2
  }));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // drifting gradient blobs
    blobs.forEach(b => {
      const bx = (b.x + Math.sin(t * b.sp * 1000 + b.ph) * .07) * W;
      const by = (b.y + Math.cos(t * b.sp * 900 + b.ph) * .09) * H;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
      g.addColorStop(0, b.hue + b.a + ')');
      g.addColorStop(1, b.hue + '0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });

    // slow diagonal light sweep
    const sweepX = (t * .02 % 2 - .5) * W * 1.5;
    const sg = ctx.createLinearGradient(sweepX, 0, sweepX + W * .45, H);
    sg.addColorStop(0, 'rgba(255,255,255,0)');
    sg.addColorStop(.5, 'rgba(120,220,255,.035)');
    sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);

    // rising particles
    parts.forEach(p => {
      p.y -= p.vy;
      p.x += p.drift;
      if (p.y < -.02) {
        p.y = 1.02;
        p.x = Math.random();
      }
      const tw = .35 + Math.sin(t * 2 + p.tw) * .3;
      ctx.globalAlpha = tw;
      ctx.fillStyle = '#7FF2D4';
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // dot grid overlay (faint)
    ctx.fillStyle = 'rgba(255,255,255,.045)';
    for (let gx = 20; gx < W; gx += 34) {
      for (let gy = 20; gy < H; gy += 34) {
        ctx.fillRect(gx, gy, 1.2, 1.2);
      }
    }
    t += .016;
    if (!reduce) requestAnimationFrame(draw);
  }
  draw();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "apexphysio/motion-bg.js", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — small status/label chip. `tone` picks a semantic color; RemedyPills
 * uses these for prescription statuses (StatusPill pattern in the app).
 */
const TONES = {
  neutral: {
    bg: "rgba(113,113,122,.15)",
    fg: "#3f3f46"
  },
  active: {
    bg: "var(--rp-status-active-bg)",
    fg: "var(--rp-status-active-fg)"
  },
  processing: {
    bg: "var(--rp-status-processing-bg)",
    fg: "var(--rp-status-processing-fg)"
  },
  ready: {
    bg: "var(--rp-status-ready-bg)",
    fg: "var(--rp-status-ready-fg)"
  },
  completed: {
    bg: "var(--rp-status-completed-bg)",
    fg: "var(--rp-status-completed-fg)"
  },
  primary: {
    bg: "hsl(var(--rp-primary))",
    fg: "#fff"
  }
};
function Badge({
  tone = "neutral",
  children,
  style = {}
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      borderRadius: "var(--rp-radius-pill)",
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "var(--font-sans)",
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — shared primitive across both products.
 * RemedyPills uses very round corners (rounded-2xl / full pill on auth CTAs)
 * and a solid teal primary; NBV uses more restrained radii and a navy/teal
 * pairing. Pass `brand="nbv"` to switch palettes; default is RemedyPills.
 */
const SIZE_STYLES = {
  sm: {
    minHeight: 32,
    padding: "0 12px",
    fontSize: 13
  },
  default: {
    minHeight: 40,
    padding: "0 18px",
    fontSize: 14
  },
  lg: {
    minHeight: 48,
    padding: "0 28px",
    fontSize: 16
  }
};
function paletteFor(brand) {
  if (brand === "nbv") {
    return {
      primaryBg: "var(--nbv-hero-navy, hsl(var(--nbv-primary)))",
      primaryFg: "hsl(var(--nbv-primary-foreground))",
      accentBg: "var(--nbv-cta-teal)",
      secondaryBg: "hsl(var(--nbv-secondary))",
      secondaryFg: "hsl(var(--nbv-secondary-foreground))",
      radius: "var(--nbv-radius-md)"
    };
  }
  return {
    primaryBg: "hsl(var(--rp-primary))",
    primaryFg: "hsl(var(--rp-primary-foreground))",
    accentBg: "hsl(var(--rp-accent))",
    secondaryBg: "hsl(var(--rp-secondary))",
    secondaryFg: "hsl(var(--rp-secondary-foreground))",
    radius: "var(--rp-radius-md)"
  };
}
function Button({
  variant = "primary",
  size = "default",
  brand = "remedypills",
  pill = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  const p = paletteFor(brand);
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.default;
  const variants = {
    primary: {
      background: p.primaryBg,
      color: p.primaryFg,
      border: "1px solid transparent"
    },
    accent: {
      background: p.accentBg,
      color: "#fff",
      border: "1px solid transparent"
    },
    secondary: {
      background: p.secondaryBg,
      color: p.secondaryFg,
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: p.primaryBg,
      border: `1px solid ${p.primaryBg}`
    },
    ghost: {
      background: "transparent",
      color: p.primaryBg,
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      whiteSpace: "nowrap",
      cursor: "pointer",
      borderRadius: pill ? "var(--rp-radius-pill)" : p.radius,
      transition: "filter .15s ease, transform .05s ease",
      ...sizeStyle,
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = "scale(0.97)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Card — base surface container. RemedyPills: white, rounded-2xl, subtle
 * shadow, no visible border (shadow-sm). NBV: bordered card with soft shadow
 * and hover lift (used on About page's Vision/Approach cards).
 */
function Card({
  brand = "remedypills",
  hoverable = false,
  className = "",
  style = {},
  children
}) {
  const base = brand === "nbv" ? {
    background: "hsl(var(--nbv-card))",
    border: "1px solid hsl(var(--nbv-border))",
    borderRadius: "var(--nbv-radius-lg)",
    boxShadow: "var(--nbv-shadow-soft-sm)",
    padding: 24
  } : {
    background: "hsl(var(--rp-card))",
    borderRadius: "var(--rp-radius-md)",
    boxShadow: "var(--rp-shadow-card)",
    padding: 16
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      ...base,
      transition: "box-shadow .25s ease, transform .2s ease",
      ...(hoverable ? {
        cursor: "pointer"
      } : {}),
      ...style
    },
    onMouseEnter: e => {
      if (!hoverable) return;
      e.currentTarget.style.boxShadow = brand === "nbv" ? "var(--nbv-shadow-soft-lg)" : "0 10px 25px -5px rgba(15,118,110,.15)";
    },
    onMouseLeave: e => {
      if (!hoverable) return;
      e.currentTarget.style.boxShadow = brand === "nbv" ? "var(--nbv-shadow-soft-sm)" : "var(--rp-shadow-card)";
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Input — text field. RemedyPills rounds fully (rounded-2xl); NBV uses standard shadcn radius. */
function Input({
  brand = "remedypills",
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    style: {
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      padding: "10px 14px",
      borderRadius: brand === "nbv" ? "var(--nbv-radius-md)" : "var(--rp-radius-md)",
      border: `1px solid ${brand === "nbv" ? "hsl(var(--nbv-input))" : "hsl(var(--rp-input))"}`,
      background: "#fff",
      color: brand === "nbv" ? "hsl(var(--nbv-foreground))" : "hsl(var(--rp-foreground))",
      outline: "none",
      boxSizing: "border-box",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/remedypills/BottomNav.jsx
try { (() => {
/**
 * BottomNav — RemedyPills app's persistent 6-tab bottom navigation
 * (Home / Rx / Reminders / Care / Health / Account). Active tab renders in
 * brand teal; inactive tabs are gray.
 */
function BottomNav({
  items,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      background: "#fff",
      borderTop: "1px solid #e5e7eb",
      boxShadow: "var(--rp-shadow-nav)",
      padding: "8px 8px calc(8px + env(safe-area-inset-bottom))"
    }
  }, items.map(it => {
    const isActive = active === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "6px 12px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "var(--font-sans)",
        color: isActive ? "hsl(var(--rp-primary))" : "#9ca3af"
      }
    }, it.icon, /*#__PURE__*/React.createElement("span", null, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/remedypills/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/remedypills/QuickActionTile.jsx
try { (() => {
/**
 * QuickActionTile — RemedyPills home-screen quick action (icon in pastel
 * rounded square + label below). Used for Prescription/Refill/Consult/Health.
 */
function QuickActionTile({
  icon,
  label,
  tone = "teal",
  onClick
}) {
  const tones = {
    teal: {
      bg: "var(--rp-tile-teal-bg)",
      fg: "var(--rp-tile-teal-fg)"
    },
    amber: {
      bg: "var(--rp-tile-amber-bg)",
      fg: "var(--rp-tile-amber-fg)"
    },
    blue: {
      bg: "var(--rp-tile-blue-bg)",
      fg: "var(--rp-tile-blue-fg)"
    },
    pink: {
      bg: "var(--rp-tile-pink-bg)",
      fg: "var(--rp-tile-pink-fg)"
    },
    purple: {
      bg: "var(--rp-tile-purple-bg)",
      fg: "var(--rp-tile-purple-fg)"
    },
    orange: {
      bg: "var(--rp-tile-orange-bg)",
      fg: "var(--rp-tile-orange-fg)"
    },
    emerald: {
      bg: "var(--rp-tile-emerald-bg)",
      fg: "var(--rp-tile-emerald-fg)"
    }
  };
  const t = tones[tone] || tones.teal;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    },
    onMouseDown: e => e.currentTarget.style.transform = "scale(.95)",
    onMouseUp: e => e.currentTarget.style.transform = "scale(1)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 56,
      height: 56,
      borderRadius: "var(--rp-radius-md)",
      background: t.bg,
      color: t.fg
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "hsl(var(--rp-foreground))"
    }
  }, label));
}
Object.assign(__ds_scope, { QuickActionTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/remedypills/QuickActionTile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nbv-website/AboutPage.jsx
try { (() => {
/** NBV About page — hero, mission, vision/approach cards, commitment band. Mirrors src/app/about/page.tsx. */
function AboutPage() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--nbv-hero-navy)",
      color: "#fff",
      padding: "72px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 40,
      margin: 0
    }
  }, "About Us"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 18,
      color: "#d1d5db",
      maxWidth: 640
    }
  }, "We are a Calgary-based venture partner enabling global founders to build, buy, and scale real businesses in Canada."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "64px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/nbv/canada-image.png",
    alt: "",
    style: {
      width: "100%",
      borderRadius: 14,
      boxShadow: "var(--nbv-shadow-soft-sm)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      color: "#374151",
      lineHeight: 1.7,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", null, "At Next Bridge Ventures (NBV), we connect global founders and Canadian business owners with real opportunities that align with Canada's economic and immigration priorities."), /*#__PURE__*/React.createElement("p", null, "Whether you're starting a business in Canada, buying a Canadian business, or restructuring for growth, NBV provides the insight, support, and execution muscle to help validated ideas become viable, sustainable ventures.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "hsl(var(--nbv-secondary))",
      padding: "64px 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 30,
      color: "hsl(var(--nbv-primary))",
      margin: 0
    }
  }, "Our Mission"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: 16,
      color: "#4b5563",
      lineHeight: 1.7
    }
  }, "To empower globally ambitious entrepreneurs with the tools, training, and strategic guidance to build ventures that fill market gaps and drive sustainable growth in Canada and beyond."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--nbv-cta-teal)",
      opacity: 0.3,
      margin: "32px auto",
      maxWidth: 400
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      fontSize: 17,
      color: "hsl(var(--nbv-primary))"
    }
  }, "We don't sell visas, we build ventures."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "64px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, [{
    t: "Our Vision",
    p: "We envision a world where technology, AI, and sustainability converge to solve real-world challenges, not just innovate for innovation's sake."
  }, {
    t: "Our Approach",
    p: "We don't simply offer immigration-aligned programs — we deliver performance, commercial traction, and execution credibility."
  }].map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      border: "1px solid hsl(var(--nbv-border))",
      borderRadius: "var(--nbv-radius-lg)",
      boxShadow: "var(--nbv-shadow-soft-sm)",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 22,
      color: "hsl(var(--nbv-primary))",
      margin: "0 0 12px"
    }
  }, c.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: "#4b5563",
      lineHeight: 1.7,
      margin: 0
    }
  }, c.p))))));
}
Object.assign(window, {
  AboutPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nbv-website/AboutPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nbv-website/FaqPage.jsx
try { (() => {
const {
  useState
} = React;

/** NBV FAQ page — accordion. Mirrors src/app/faq/page.tsx (abbreviated to 5 of 18 real questions). */
const FAQS = [{
  q: "What is Next Bridge Ventures?",
  a: "Next Bridge Ventures (NBV) is a private Canadian venture incubation platform that supports global and local entrepreneurs in launching, acquiring, or scaling real businesses in Canada. We are not immigration consultants."
}, {
  q: "Does NBV guarantee a visa?",
  a: "No. We do not provide immigration advice or visa guarantees. Our role is to build and validate your business so it meets the commercial standards required for immigration-linked programs."
}, {
  q: "What type of businesses does Next Bridge Ventures support?",
  a: "Tech and SaaS ventures, e-commerce platforms, clean-tech and sustainability startups, and service-based businesses. We do not support paper businesses, passive investments, or shell companies."
}, {
  q: "How much funding is required to get started?",
  a: "There's no fixed minimum, but you should be financially prepared to incorporate and operate in Canada, cover personal expenses for 12–18 months, and fund early business development."
}, {
  q: "How do I get started?",
  a: "Submit your business or founder profile via our application form. Only shortlisted and eligible candidates will be contacted for the next step in screening and onboarding."
}];
function FaqPage() {
  const [open, setOpen] = useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "64px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 34
    }
  }, "Frequently Asked Questions"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#6b7280",
      fontSize: 16,
      marginTop: 10
    }
  }, "Have questions? We have answers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: "40px auto 0"
    }
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f.q,
    style: {
      borderBottom: "1px solid hsl(var(--nbv-border))"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      width: "100%",
      textAlign: "left",
      background: "none",
      border: "none",
      padding: "18px 4px",
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between"
    }
  }, f.q, /*#__PURE__*/React.createElement("span", null, open === i ? "−" : "+")), open === i && /*#__PURE__*/React.createElement("p", {
    style: {
      padding: "0 4px 18px",
      color: "#4b5563",
      fontSize: 15,
      lineHeight: 1.7,
      margin: 0
    }
  }, f.a)))));
}
Object.assign(window, {
  FaqPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nbv-website/FaqPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nbv-website/HomePage.jsx
try { (() => {
/** NBV homepage — hero, what-we-do, quote band, flip-card benefits, CTA. Mirrors src/app/page.tsx. */
function HomePage({
  setPage
}) {
  const benefits = [{
    label: "IRCC & Policy-Aligned Business Programs",
    desc: "We align your venture with Canada's national and regional priorities, making business immigration a natural outcome."
  }, {
    label: "Transparent Process for Business Setup",
    desc: "Our transparent process helps you launch or acquire a real business in Canada and meet all milestones confidently."
  }, {
    label: "Access to Canada's Startup Ecosystem",
    desc: "Access Canada's venture ecosystem, mentorship, funding partners, and regional economic support."
  }, {
    label: "Hands-On Venture Support in Canada",
    desc: "We work side-by-side, from setup to scaling, with real-time insight and operational mentorship."
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      color: "#fff",
      padding: "120px 24px",
      textAlign: "center",
      background: `linear-gradient(hsl(var(--nbv-primary) / .82), hsl(var(--nbv-primary) / .82)), url(../../assets/nbv/hero1.jpg) center/cover`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 44,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
      margin: 0
    }
  }, "From Vision to Venture.", /*#__PURE__*/React.createElement("br", null), "Global ideas, Canadian execution."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "#d1d5db",
      marginTop: 24,
      lineHeight: 1.65
    }
  }, "At Next Bridge Ventures (NBV), we are more than a business incubator or immigration partner. We are a launchpad for entrepreneurs building meaningful, scalable ventures that contribute to Canada's economic future."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "#d1d5db",
      marginTop: 16,
      lineHeight: 1.65
    }
  }, "Whether you are a Canadian business owner seeking growth or exit, or an international founder entering Canada's innovation ecosystem, we advance validated ventures with insight, execution, and credibility."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("programs"),
    style: {
      background: "var(--nbv-cta-teal)",
      color: "#fff",
      border: "none",
      borderRadius: "var(--nbv-radius-md)",
      padding: "14px 28px",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer"
    }
  }, "Discover Programs"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: "transparent",
      color: "#fff",
      border: "1px solid #fff",
      borderRadius: "var(--nbv-radius-md)",
      padding: "14px 28px",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer"
    }
  }, "Contact Us")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#fff",
      padding: "80px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 32,
      color: "hsl(var(--nbv-primary))",
      margin: "0 0 16px"
    }
  }, "What We Do"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: "#4b5563",
      lineHeight: 1.7
    }
  }, "At Next Bridge Ventures (NBV), we support Canadian and international founders with a business-first approach rooted in credibility, commercial scalability, and long-term economic value creation."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: "#4b5563",
      lineHeight: 1.7
    }
  }, "We help entrepreneurs launch, acquire, or scale real, sustainable ventures in Canada, not paper entities.")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/nbv/canada-image.png",
    alt: "Canada",
    style: {
      width: "100%",
      borderRadius: 14,
      boxShadow: "var(--nbv-shadow-soft-lg)"
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "hsl(var(--nbv-primary))",
      color: "#fff",
      padding: "80px 24px",
      textAlign: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 6,
      background: "var(--nbv-teal-500)"
    }
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontSize: 28,
      fontWeight: 300,
      fontStyle: "italic",
      maxWidth: 720,
      margin: "0 auto"
    }
  }, "\"We don't just incubate. We validate, audit, invest, and scale.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      color: "#d1d5db",
      fontSize: 16
    }
  }, "Our venture support ecosystem serves both Canada's economic priorities and the entrepreneurs driving innovation.")), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#fff",
      padding: "80px 24px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 32,
      color: "hsl(var(--nbv-primary))",
      margin: "0 0 40px"
    }
  }, "What You Get With NBV"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20
    }
  }, benefits.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label,
    style: {
      borderRadius: 14,
      background: "var(--nbv-cta-teal)",
      color: "#fff",
      padding: 20,
      minHeight: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      boxShadow: "var(--nbv-shadow-soft-sm)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      margin: 0
    }
  }, b.label))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--nbv-cta-teal)",
      color: "#fff",
      padding: "56px 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 28,
      margin: 0
    }
  }, "Let's Talk Business"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 16,
      maxWidth: 600,
      margin: "12px auto 0"
    }
  }, "Ready to build or acquire a real business in Canada with integrity and commercial traction?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      justifyContent: "center",
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: "#fff",
      color: "hsl(var(--nbv-primary))",
      border: "none",
      borderRadius: "var(--nbv-radius-md)",
      padding: "12px 24px",
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Start Your Venture"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("programs"),
    style: {
      background: "transparent",
      color: "#fff",
      border: "1px solid #fff",
      borderRadius: "var(--nbv-radius-md)",
      padding: "12px 24px",
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Explore Programs"))));
}
Object.assign(window, {
  HomePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nbv-website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nbv-website/NbvShell.jsx
try { (() => {
/** NBV site chrome: sticky navy header w/ dropdown nav, and footer. */
function Header({
  page,
  setPage
}) {
  const links = [{
    id: "about",
    label: "About Us"
  }, {
    id: "programs",
    label: "Programs"
  }, {
    id: "global",
    label: "Global Entrepreneurs"
  }, {
    id: "founders",
    label: "Canadian Founders"
  }, {
    id: "faq",
    label: "FAQ"
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "hsl(var(--nbv-primary))",
      boxShadow: "0 2px 8px rgba(0,0,0,.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      height: 76,
      padding: "0 24px",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("home"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/nbv/nbv-logo.jpg",
    alt: "Next Bridge Ventures",
    style: {
      height: 40,
      borderRadius: 6
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 22,
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => setPage(l.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 15,
      fontWeight: page === l.id ? 700 : 500,
      color: page === l.id ? "#fff" : "rgba(255,255,255,.75)",
      fontFamily: "var(--font-sans)"
    }
  }, l.label)))));
}
function Footer({
  setPage
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "hsl(var(--nbv-primary))",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "56px 24px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/nbv/nbv-logo.jpg",
    alt: "Next Bridge Ventures",
    style: {
      height: 36,
      borderRadius: 6,
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,.7)",
      lineHeight: 1.6,
      maxWidth: 320
    }
  }, "Next Bridge Ventures (NBV) is a private Canadian venture incubation platform. We help global founders and Canadian entrepreneurs launch, acquire, or scale real businesses in Canada.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Navigate"), ["About Us", "Programs", "FAQ", "Global Entrepreneurs", "Canadian Founders"].map(l => /*#__PURE__*/React.createElement("p", {
    key: l,
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,.7)",
      margin: "0 0 10px"
    }
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Get Started"), ["Apply Now", "Resources", "Contact"].map(l => /*#__PURE__*/React.createElement("p", {
    key: l,
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,.7)",
      margin: "0 0 10px"
    }
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Contact"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,.7)",
      margin: "0 0 8px"
    }
  }, "\u2709 info@nextbridgeventures.ca"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,.7)",
      margin: 0
    }
  }, "\uD83D\uDCCD Calgary, Alberta, Canada"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--nbv-cta-teal)",
      padding: "24px",
      fontSize: 11,
      color: "rgba(255,255,255,.55)",
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, "Disclaimer: Next Bridge Ventures (NBV) is not an immigration consultant, legal advisor, or government-endorsed entity. All immigration decisions are made solely by IRCC. \xA9 ", new Date().getFullYear(), " Next Bridge Ventures. All rights reserved."));
}
Object.assign(window, {
  Header,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nbv-website/NbvShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/nbv-website/StubPage.jsx
try { (() => {
/** Simple placeholder pages for Programs / Global Entrepreneurs / Canadian Founders — content omitted (see readme caveat). */
function StubPage({
  title,
  note
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "96px 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 700,
      fontSize: 32,
      color: "hsl(var(--nbv-primary))"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#9ca3af",
      fontSize: 14,
      marginTop: 12,
      maxWidth: 480,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, note));
}
Object.assign(window, {
  StubPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/nbv-website/StubPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/AccountTab.jsx
try { (() => {
function AccountTab({
  onLogout
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: "50%",
      background: "hsl(var(--rp-primary) / .12)",
      display: "grid",
      placeItems: "center",
      fontSize: 28,
      fontWeight: 700,
      color: "hsl(var(--rp-primary))"
    }
  }, "SJ"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      fontSize: 16,
      fontWeight: 700
    }
  }, "Sarah Johnson"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "#6b7280"
    }
  }, "sarah.johnson@email.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "var(--rp-shadow-card)",
      overflow: "hidden",
      marginBottom: 16
    }
  }, ["Personal Information", "Family Profiles", "Insurance Information", "Language Preferences", "Rewards & Points"].map((item, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 16px",
      borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, item), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9ca3af"
    }
  }, "\u203A")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "var(--rp-shadow-card)",
      padding: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      fontWeight: 700,
      color: "#9ca3af",
      textTransform: "uppercase"
    }
  }, "Rewards"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 24,
      fontWeight: 700,
      color: "hsl(var(--rp-primary))"
    }
  }, "1,240 pts"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "#6b7280"
    }
  }, "1 pt / $1 spent \xB7 scan your QR at checkout")), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: "100%",
      height: 46,
      borderRadius: 16,
      border: "1px solid #fecaca",
      background: "#fff",
      color: "#dc2626",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "Sign out"));
}
Object.assign(window, {
  AccountTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/AccountTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/AppointmentsTab.jsx
try { (() => {
function AppointmentsTab() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 16px",
      fontSize: 18,
      fontWeight: 700
    }
  }, "Care & Appointments"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      padding: 14,
      background: "hsl(var(--rp-primary) / 0.08)",
      border: "1px solid hsl(var(--rp-primary) / 0.2)",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      fontWeight: 700,
      color: "hsl(var(--rp-primary))"
    }
  }, "\uD83E\uDE7A Alberta Expanded Prescribing Authority"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 12,
      color: "#64748b"
    }
  }, "Alberta pharmacists can prescribe for 30+ minor ailments \u2014 no doctor visit needed!")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 16,
      boxShadow: "var(--rp-shadow-card)",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      fontWeight: 700,
      color: "#9ca3af",
      textTransform: "uppercase",
      letterSpacing: ".04em"
    }
  }, "Upcoming"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600
    }
  }, "Flu Vaccination"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "#6b7280"
    }
  }, "Fri, Nov 14 \xB7 2:30 PM")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      padding: "4px 10px",
      borderRadius: 9999,
      background: "rgba(14,165,233,.15)",
      color: "#075985"
    }
  }, "Confirmed"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#9ca3af",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      margin: "0 0 8px"
    }
  }, "Book a Service"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, ["Flu Vaccination", "COVID-19 Vaccine", "Minor Ailment Prescribing", "Medication Review", "Blood Pressure Check", "Travel Health Consultation"].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    style: {
      textAlign: "left",
      background: "#fff",
      borderRadius: 14,
      padding: 12,
      border: "1px solid #f1f5f9",
      boxShadow: "var(--rp-shadow-card)",
      fontSize: 12.5,
      fontWeight: 600,
      color: "#111827",
      cursor: "pointer"
    }
  }, s))));
}
Object.assign(window, {
  AppointmentsTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/AppointmentsTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/AuthScreen.jsx
try { (() => {
const {
  useState
} = React;

/** RemedyPills auth flow: landing → login / register. Mirrors auth-page.tsx. */
function AuthScreen({
  onLogin
}) {
  const [screen, setScreen] = useState("landing");
  if (screen === "landing") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "48px 24px",
        background: "linear-gradient(180deg, hsl(186,86%,25%), hsl(186,76%,35%), hsl(176,70%,42%))",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        placeItems: "center",
        width: 80,
        height: 80,
        borderRadius: 20,
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/remedypills/icon-foreground.png",
      alt: "RemedyPills",
      style: {
        width: 48,
        height: 48,
        objectFit: "contain"
      }
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 30,
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.2
      }
    }, "Your health, managed with care"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 12,
        fontSize: 15,
        color: "rgba(255,255,255,.85)",
        lineHeight: 1.5,
        maxWidth: 320
      }
    }, "Prescriptions, reminders, bookings, and health tracking \u2014 all in one place from your trusted Calgary pharmacist."), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("register"),
      style: {
        marginTop: 32,
        width: "100%",
        maxWidth: 320,
        height: 56,
        borderRadius: 9999,
        border: "none",
        background: "#fff",
        color: "hsl(186,86%,25%)",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: ".02em",
        boxShadow: "0 10px 25px rgba(0,0,0,.2)",
        cursor: "pointer"
      }
    }, "GET STARTED"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("login"),
      style: {
        marginTop: 16,
        background: "none",
        border: "none",
        color: "rgba(255,255,255,.9)",
        fontSize: 13,
        cursor: "pointer"
      }
    }, "Already have an account? ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        textDecoration: "underline"
      }
    }, "Log In")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 600,
      padding: "40px 24px",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("landing"),
    style: {
      background: "none",
      border: "none",
      color: "hsl(var(--rp-primary))",
      fontSize: 14,
      cursor: "pointer",
      marginBottom: 24
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 4
    }
  }, screen === "login" ? "Welcome back" : "Create your account"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "#64748b",
      marginBottom: 24
    }
  }, screen === "login" ? "Log in to manage your prescriptions." : "Join RemedyPills Pharmacy in under a minute."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, screen === "register" && /*#__PURE__*/React.createElement("input", {
    placeholder: "Full name",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Username",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Password",
    type: "password",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onLogin,
    style: {
      marginTop: 8,
      height: 48,
      borderRadius: 16,
      border: "none",
      background: "hsl(var(--rp-primary))",
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer"
    }
  }, screen === "login" ? "Log In" : "Create Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "8px 0",
      color: "#94a3b8",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "#e5e7eb"
    }
  }), " or ", /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "#e5e7eb"
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 48,
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      background: "#fff",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "Continue with Google")));
}
const inputStyle = {
  height: 46,
  borderRadius: 16,
  border: "1px solid hsl(var(--rp-input))",
  padding: "0 16px",
  fontSize: 14,
  fontFamily: "var(--font-sans)"
};
Object.assign(window, {
  AuthScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/AuthScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/HealthTab.jsx
try { (() => {
function HealthTab() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 16px",
      fontSize: 18,
      fontWeight: 700
    }
  }, "Health & Wellness"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      boxShadow: "var(--rp-shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11,
      color: "#9ca3af",
      fontWeight: 700
    }
  }, "ADHERENCE"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 24,
      fontWeight: 700,
      color: "hsl(var(--rp-primary))"
    }
  }, "85%")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      boxShadow: "var(--rp-shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11,
      color: "#9ca3af",
      fontWeight: 700
    }
  }, "BLOOD PRESSURE"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 24,
      fontWeight: 700
    }
  }, "118/76"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#9ca3af",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      margin: "0 0 8px"
    }
  }, "Health Articles"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [{
    t: "Managing Type 2 Diabetes",
    d: "Tips from our pharmacists on blood sugar control"
  }, {
    t: "Flu Season: What to Know",
    d: "When to get vaccinated and how to stay protected"
  }, {
    t: "Understanding Drug Interactions",
    d: "Common combinations to avoid"
  }].map(a => /*#__PURE__*/React.createElement("div", {
    key: a.t,
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      boxShadow: "var(--rp-shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600
    }
  }, a.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: 12,
      color: "#6b7280"
    }
  }, a.d)))));
}
Object.assign(window, {
  HealthTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/HealthTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/HomeTab.jsx
try { (() => {
const sectionTitle = {
  fontSize: 16,
  fontWeight: 700,
  color: "#111827",
  margin: "0 0 12px"
};
function HomeTab({
  onNav
}) {
  const quickActions = [{
    label: "Prescription",
    icon: "💊",
    bg: "var(--rp-tile-teal-bg)",
    fg: "var(--rp-tile-teal-fg)",
    go: "prescriptions"
  }, {
    label: "Refill",
    icon: "🔄",
    bg: "var(--rp-tile-amber-bg)",
    fg: "var(--rp-tile-amber-fg)",
    go: "prescriptions"
  }, {
    label: "Consult",
    icon: "💬",
    bg: "var(--rp-tile-blue-bg)",
    fg: "var(--rp-tile-blue-fg)",
    go: "reminders"
  }, {
    label: "Health",
    icon: "📈",
    bg: "var(--rp-tile-pink-bg)",
    fg: "var(--rp-tile-pink-fg)",
    go: "health"
  }];
  const services = [{
    label: "Prescription Management",
    desc: "Upload, track, and manage your prescriptions",
    icon: "💊",
    go: "prescriptions"
  }, {
    label: "Book a Service",
    desc: "Vaccines, minor ailments, and health checks",
    icon: "📅",
    go: "appointments"
  }, {
    label: "Transfer Prescription",
    desc: "Easily move your Rx to RemedyPills",
    icon: "📤"
  }, {
    label: "Ask a Pharmacist",
    desc: "Side effects, drug interactions & guidance",
    icon: "🩺"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 100px",
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: sectionTitle
  }, "Quick Actions"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 10
    }
  }, quickActions.map(qa => /*#__PURE__*/React.createElement("button", {
    key: qa.label,
    onClick: () => onNav(qa.go),
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 52,
      height: 52,
      borderRadius: 16,
      background: qa.bg,
      color: qa.fg,
      fontSize: 20
    }
  }, qa.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: "#374151"
    }
  }, qa.label))))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 16,
      padding: 20,
      background: "linear-gradient(90deg, var(--rp-gradient-from), var(--rp-gradient-to))",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -16,
      top: -16,
      width: 96,
      height: 96,
      borderRadius: "50%",
      background: "rgba(255,255,255,.1)"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 700
    }
  }, "Free Prescription Delivery"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      color: "rgba(255,255,255,.85)"
    }
  }, "Get your prescriptions delivered to your door. Sign up for auto-refill today!")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sectionTitle,
      margin: 0
    }
  }, "Upcoming Reminders"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 9999,
      background: "#d1fae5",
      color: "#047857"
    }
  }, "85% adherence")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [{
    n: "Metformin 500mg",
    t: "8:00 AM"
  }, {
    n: "Lisinopril 10mg",
    t: "8:00 PM"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.n,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      boxShadow: "var(--rp-shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--rp-tile-amber-bg)",
      color: "var(--rp-tile-amber-fg)"
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600
    }
  }, r.n), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "#6b7280"
    }
  }, r.t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      fontSize: 11,
      color: "#6b7280",
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, "Snooze"), /*#__PURE__*/React.createElement("button", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#fff",
      background: "hsl(var(--rp-primary))",
      border: "none",
      borderRadius: 10,
      padding: "6px 10px",
      cursor: "pointer"
    }
  }, "\u2713 Taken")))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    style: sectionTitle
  }, "Our Services"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, services.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.label,
    onClick: () => s.go && onNav(s.go),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      boxShadow: "var(--rp-shadow-card)",
      border: "none",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--rp-tile-teal-bg)",
      color: "var(--rp-tile-teal-fg)",
      fontSize: 18,
      flexShrink: 0
    }
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600
    }
  }, s.label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "#6b7280"
    }
  }, s.desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9ca3af"
    }
  }, "\u203A"))))));
}
Object.assign(window, {
  HomeTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/HomeTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/PrescriptionsTab.jsx
try { (() => {
const {
  useState
} = React;
const RX = [{
  name: "Metformin",
  strength: "500mg",
  rx: "RX-88213",
  status: "ready",
  refillable: true
}, {
  name: "Lisinopril",
  strength: "10mg",
  rx: "RX-88214",
  status: "active",
  refillable: true
}, {
  name: "Atorvastatin",
  strength: "20mg",
  rx: "RX-88099",
  status: "processing",
  refillable: false
}, {
  name: "Amoxicillin",
  strength: "250mg",
  rx: "RX-87650",
  status: "completed",
  refillable: false
}];
const STATUS = {
  active: {
    label: "Active",
    bg: "rgba(16,185,129,.15)",
    fg: "#047857"
  },
  processing: {
    label: "Processing",
    bg: "rgba(245,158,11,.15)",
    fg: "#92400e"
  },
  ready: {
    label: "Ready for Pickup",
    bg: "rgba(14,165,233,.15)",
    fg: "#075985"
  },
  completed: {
    label: "Completed",
    bg: "rgba(113,113,122,.15)",
    fg: "#3f3f46"
  }
};
function PrescriptionsTab() {
  const [showRefill, setShowRefill] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700
    }
  }, "Your Prescriptions"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRefill(true),
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#fff",
      background: "hsl(var(--rp-primary))",
      border: "none",
      borderRadius: 12,
      padding: "8px 14px",
      cursor: "pointer"
    }
  }, "+ Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, RX.map(p => {
    const s = STATUS[p.status];
    return /*#__PURE__*/React.createElement("div", {
      key: p.rx,
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: 16,
        boxShadow: "var(--rp-shadow-card)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        fontWeight: 700
      }
    }, p.name, " ", p.strength), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0",
        fontSize: 12,
        color: "#6b7280"
      }
    }, p.rx)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 9999,
        background: s.bg,
        color: s.fg,
        whiteSpace: "nowrap"
      }
    }, s.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      disabled: !p.refillable,
      onClick: () => setShowRefill(true),
      style: {
        flex: 1,
        height: 36,
        borderRadius: 12,
        border: "none",
        background: p.refillable ? "hsl(var(--rp-primary))" : "#e5e7eb",
        color: p.refillable ? "#fff" : "#9ca3af",
        fontSize: 12,
        fontWeight: 600,
        cursor: p.refillable ? "pointer" : "not-allowed"
      }
    }, "\uD83D\uDD04 Refill"), /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        height: 36,
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#fff",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, "Details")));
  })), showRefill && /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowRefill(false),
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.4)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "#fff",
      borderRadius: "24px 24px 0 0",
      padding: 24,
      width: "100%",
      maxHeight: "70%",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 0
    }
  }, "Request refill"), RX.filter(p => p.refillable).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.rx,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #f1f5f9"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, p.name, " ", p.strength), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRefill(false),
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#fff",
      background: "hsl(var(--rp-primary))",
      border: "none",
      borderRadius: 10,
      padding: "6px 12px",
      cursor: "pointer"
    }
  }, "Refill"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRefill(false),
    style: {
      marginTop: 16,
      width: "100%",
      height: 44,
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      background: "#fff",
      cursor: "pointer"
    }
  }, "Close"))));
}
Object.assign(window, {
  PrescriptionsTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/PrescriptionsTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/RemindersTab.jsx
try { (() => {
const {
  useState
} = React;
const INITIAL = [{
  id: 1,
  med: "Metformin 500mg",
  time: "8:00 AM",
  freq: "Daily",
  taken: false
}, {
  id: 2,
  med: "Lisinopril 10mg",
  time: "8:00 PM",
  freq: "Daily",
  taken: false
}, {
  id: 3,
  med: "Vitamin D",
  time: "8:00 AM",
  freq: "Daily",
  taken: true
}];
function RemindersTab() {
  const [reminders, setReminders] = useState(INITIAL);
  const taken = reminders.filter(r => r.taken).length;
  const rate = Math.round(taken / reminders.length * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700
    }
  }, "Reminders"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: 9999,
      background: "#d1fae5",
      color: "#047857"
    }
  }, rate, "% adherence")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, reminders.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#fff",
      borderRadius: 16,
      padding: 14,
      boxShadow: "var(--rp-shadow-card)",
      opacity: r.taken ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--rp-tile-amber-bg)",
      color: "var(--rp-tile-amber-fg)"
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600
    }
  }, r.med), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "#6b7280"
    }
  }, r.time, " \xB7 ", r.freq))), !r.taken ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setReminders(reminders.map(x => x.id === r.id ? {
      ...x,
      taken: true
    } : x)),
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#fff",
      background: "hsl(var(--rp-primary))",
      border: "none",
      borderRadius: 10,
      padding: "6px 10px",
      cursor: "pointer"
    }
  }, "\u2713 Taken") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#059669"
    }
  }, "\u2713 Taken")))), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 16,
      width: "100%",
      height: 46,
      borderRadius: 16,
      border: "1px dashed hsl(var(--rp-primary))",
      background: "none",
      color: "hsl(var(--rp-primary))",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "+ Add Reminder"));
}
Object.assign(window, {
  RemindersTab
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/RemindersTab.jsx", error: String((e && e.message) || e) }); }

// ui_kits/remedypills-app/Shell.jsx
try { (() => {
/**
 * Shared chrome for the RemedyPills UI kit: the gradient TopBar (greeting +
 * notif/logout) and the persistent BottomNav. Pulled 1:1 from TopBar /
 * BottomNav in client/src/pages/pharmacy-app.tsx.
 */
function TopBar({
  userName = "Sarah Johnson",
  unreadCount = 2,
  onNotifications
}) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, var(--rp-gradient-from), var(--rp-gradient-via), var(--rp-gradient-to))",
      padding: "40px 20px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -48,
      top: -48,
      width: 192,
      height: 192,
      borderRadius: "50%",
      background: "rgba(255,255,255,.1)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -32,
      bottom: -32,
      width: 128,
      height: 128,
      borderRadius: "50%",
      background: "rgba(255,255,255,.08)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      fontWeight: 500,
      color: "rgba(255,255,255,.8)"
    }
  }, greeting), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      color: "#fff"
    }
  }, userName)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onNotifications,
    style: {
      position: "relative",
      display: "grid",
      placeItems: "center",
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "rgba(255,255,255,.15)",
      border: "none",
      color: "#fff",
      cursor: "pointer"
    }
  }, "\uD83D\uDD14", unreadCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -2,
      right: -2,
      display: "grid",
      placeItems: "center",
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#ef4444",
      fontSize: 10,
      fontWeight: 700,
      color: "#fff",
      boxShadow: "0 0 0 2px var(--rp-gradient-from)"
    }
  }, unreadCount)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,.15)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/remedypills/icon-foreground.png",
    alt: "",
    style: {
      width: 24,
      height: 24,
      objectFit: "contain"
    }
  })))));
}
function BottomNav({
  tab,
  setTab
}) {
  const items = [{
    id: "home",
    label: "Home",
    icon: "🏠"
  }, {
    id: "prescriptions",
    label: "Rx",
    icon: "💊"
  }, {
    id: "reminders",
    label: "Reminders",
    icon: "🔔"
  }, {
    id: "appointments",
    label: "Care",
    icon: "📅"
  }, {
    id: "health",
    label: "Health",
    icon: "📈"
  }, {
    id: "account",
    label: "Account",
    icon: "👤"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      bottom: 0,
      borderTop: "1px solid #e5e7eb",
      background: "#fff",
      boxShadow: "var(--rp-shadow-nav)",
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 4px"
    }
  }, items.map(it => {
    const active = tab === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => setTab(it.id),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 8px",
        fontSize: 11,
        fontWeight: 500,
        color: active ? "hsl(var(--rp-primary))" : "#9ca3af"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        filter: active ? "none" : "grayscale(60%) opacity(.7)"
      }
    }, it.icon), it.label);
  }));
}
Object.assign(window, {
  TopBar,
  BottomNav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/remedypills-app/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.QuickActionTile = __ds_scope.QuickActionTile;

})();

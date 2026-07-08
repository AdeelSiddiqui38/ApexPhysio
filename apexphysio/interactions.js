/* Interactions: progress bar, scroll reveals, services, body map, quiz,
   recovery slider, exercise library, chat bubble, service modal. */

/* ── scroll progress + reveals ── */
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── services ── */
const SERVICES = [
  { icon: '🦴', name: 'Physiotherapy', desc: 'Back/neck pain, whiplash, shoulder injuries and post-surgical rehab.', body: 'Hands-on manual therapy, exercise prescription and education — one-on-one, full sessions with the same physiotherapist every visit.' },
  { icon: '💆', name: 'Massage Therapy', desc: 'Deep tissue, sports, therapeutic and relaxation massage.', body: 'Registered massage therapists targeting muscle tension, recovery and stress — direct billing available.' },
  { icon: '🩻', name: 'Chiropractic', desc: 'Spinal adjustments, joint mobilization and posture correction.', body: 'Evidence-based chiropractic care coordinated with your physio plan for faster results.' },
  { icon: '🏃', name: 'Kinesiology', desc: 'Active rehab, exercise therapy and return-to-work conditioning.', body: 'Movement specialists building strength and function after injury, MVA or surgery.' },
  { icon: '📌', name: 'Acupuncture & IMS', desc: 'Dry needling and acupuncture for pain and muscle release.', body: 'Certified practitioners using needling techniques to release trigger points and calm chronic pain.' },
  { icon: '🚗', name: 'MVA Rehab', desc: 'Motor vehicle accident recovery with direct insurer billing.', body: 'We handle the paperwork with your insurer under Alberta DTPR — you focus on recovery.' },
  { icon: '👷', name: 'WCB Injuries', desc: 'Workplace injury rehab and return-to-work programs.', body: 'WCB-authorized treatment with progress reporting and modified-duty planning.' },
  { icon: '🧘', name: 'Wellness Programs', desc: 'Posture clinics, ergonomics and injury prevention.', body: 'Stay at your peak — preventative programs for desk workers, athletes and seniors.' },
];
document.getElementById('servicesGrid').innerHTML = SERVICES.map((s, i) => `
  <div class="service-card reveal d${(i % 6) + 1}" data-svc="${i}">
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
const SPOTS = [
  { x: 120, y: 50, area: 'Head & Jaw', title: 'Headaches · TMJ · Concussion', desc: 'Tension headaches, jaw pain and post-concussion symptoms often trace back to the neck and jaw muscles.', tags: ['Physiotherapy', 'Massage', 'Acupuncture'] },
  { x: 120, y: 92, area: 'Neck', title: 'Neck Pain & Whiplash', desc: 'Stiff neck, whiplash from an MVA, or "tech neck" from desk work — among the most common issues we treat.', tags: ['Physiotherapy', 'Chiropractic', 'MVA Rehab'] },
  { x: 88, y: 128, area: 'Shoulder', title: 'Rotator Cuff & Frozen Shoulder', desc: 'Pain reaching overhead, clicking, or post-injury weakness responds well to targeted physio and needling.', tags: ['Physiotherapy', 'IMS / Dry Needling'] },
  { x: 120, y: 185, area: 'Lower Back', title: 'Low Back Pain & Sciatica', desc: 'Disc irritation, sciatica and chronic stiffness — hands-on treatment plus a progressive exercise plan.', tags: ['Physiotherapy', 'Chiropractic', 'Kinesiology'] },
  { x: 185, y: 205, area: 'Wrist & Hand', title: 'Carpal Tunnel & Sprains', desc: 'Numb or tingling hands, sport sprains and repetitive-strain injuries of the wrist and elbow.', tags: ['Physiotherapy', 'Ergonomics'] },
  { x: 108, y: 300, area: 'Hip', title: 'Hip Pain & Bursitis', desc: 'Pinching hips, bursitis and glute weakness that limit walking, squatting and stairs.', tags: ['Physiotherapy', 'Kinesiology'] },
  { x: 152, y: 372, area: 'Knee', title: 'Knee Injuries & Runner\u2019s Knee', desc: 'ACL/MCL sprains, meniscus irritation and patellofemoral pain from running or sport.', tags: ['Physiotherapy', 'Sports Rehab'] },
  { x: 82, y: 440, area: 'Ankle & Foot', title: 'Ankle Sprains & Plantar Fasciitis', desc: 'Rolled ankles that never fully healed and heel pain that bites with the first steps of the day.', tags: ['Physiotherapy', 'Massage'] },
];
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
const QUIZ = [
  { q: 'Where is your main concern?', opts: ['Neck / shoulders', 'Back / hips', 'Knee / ankle', 'General tension or stress'] },
  { q: 'How did it start?', opts: ['Car accident (MVA)', 'Work injury', 'Sport / exercise', 'Gradually — no clear cause'] },
  { q: 'How long has it bothered you?', opts: ['Less than 2 weeks', '2–6 weeks', 'Months', 'Years — on and off'] },
  { q: 'What matters most to you right now?', opts: ['Fast pain relief', 'Getting back to sport/work', 'Fixing the root cause', 'Relaxation & maintenance'] },
];
const RESULTS = [
  { title: 'Physiotherapy Assessment', desc: 'Based on your answers, a one-on-one physiotherapy assessment is the right starting point. Your physiotherapist will diagnose the issue, relieve pain hands-on, and map your recovery plan.' },
  { title: 'MVA / WCB Rehab Intake', desc: 'Accident- or work-related injuries qualify for direct insurer billing. Start with our MVA/WCB intake — we handle the paperwork, you start treatment right away.' },
  { title: 'Massage Therapy', desc: 'For tension, stress and maintenance, a registered massage therapy session is the best first step — with physio backup if anything deeper shows up.' },
];
let qStep = 0, qAns = [];
function renderQuiz() {
  const card = document.getElementById('quizCard');
  if (qStep < QUIZ.length) {
    const q = QUIZ[qStep];
    card.innerHTML = `
      <div class="quiz-progress"><div style="width:${((qStep) / QUIZ.length) * 100 + 12}%"></div></div>
      <div class="quiz-q">${qStep + 1}. ${q.q}</div>
      <div class="quiz-opts">${q.opts.map((o, i) => `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}</div>`;
    card.querySelectorAll('.quiz-opt').forEach(b => b.addEventListener('click', () => {
      qAns.push(+b.dataset.i); qStep++; renderQuiz();
    }));
  } else {
    const r = qAns[1] <= 1 ? RESULTS[1] : (qAns[3] === 3 ? RESULTS[2] : RESULTS[0]);
    card.innerHTML = `
      <div class="quiz-progress"><div style="width:100%"></div></div>
      <div class="quiz-result">
        <div style="font-size:2.6rem;margin-bottom:10px">🎯</div>
        <h3>Recommended: ${r.title}</h3><p>${r.desc}</p>
        <a href="#book" class="btn-primary" style="padding:13px 26px;font-size:.92rem">Book ${r.title.split(' ')[0]} →</a>
        <br><button class="quiz-restart">↺ Retake quiz</button>
      </div>`;
    card.querySelector('.quiz-restart').onclick = () => { qStep = 0; qAns = []; renderQuiz(); };
  }
}
renderQuiz();

/* ── recovery slider ── */
const STAGES = [
  { e: '😣', t: 'Assessment & Pain Relief', d: 'Your first 1-on-1 visit: full assessment, hands-on treatment to calm pain, and a plan built for your body and goals.', f: 12 },
  { e: '🙂', t: 'Early Wins', d: 'Pain settling, movement returning. Gentle mobility work begins and daily activities get noticeably easier.', f: 35 },
  { e: '💪', t: 'Rebuilding Strength', d: 'Progressive loading and targeted exercises restore the strength and control the injury took away.', f: 60 },
  { e: '🏃', t: 'Return to Activity', d: 'Sport-, work- and life-specific training. You test the body under real demands with your clinician watching form.', f: 85 },
  { e: '🏔️', t: 'Peak Performance', d: 'Discharged with a maintenance plan — stronger than before the injury, with tools to keep it that way.', f: 100 },
];
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
const LIB = [
  { cat: 'Lower Back', name: 'Cat-Cow Mobility Flow', dur: '3:24', icon: '🐱' },
  { cat: 'Neck', name: 'Desk Worker Neck Reset', dur: '4:10', icon: '💻' },
  { cat: 'Knee', name: 'Runner\u2019s Knee Strength Set', dur: '6:45', icon: '🏃' },
  { cat: 'Shoulder', name: 'Rotator Cuff Band Series', dur: '5:02', icon: '💪' },
  { cat: 'Ankle', name: 'Ankle Sprain Rebuild', dur: '4:38', icon: '🦶' },
  { cat: 'Posture', name: '5-Minute Posture Break', dur: '5:00', icon: '🧘' },
];
document.getElementById('libGrid').innerHTML = LIB.map((v, i) => `
  <div class="lib-card reveal d${(i % 6) + 1}">
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

/* Shared JS for individual service pages (services/*.html) — a lighter
   version of interactions.js without the homepage-only widgets (services
   grid, body map, quiz, recovery slider, exercise library). Handles the
   progress bar, scroll reveals, FAQ accordion, chat bubble and mobile nav. */

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';
});

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-item .faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── chat bubble ── */
const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
if (chatToggle && chatPanel) {
  chatToggle.addEventListener('click', () => chatPanel.classList.toggle('open'));
  document.querySelectorAll('.chat-act').forEach(b => b.addEventListener('click', () => {
    window.open('https://wa.me/14030000000?text=' + encodeURIComponent(b.dataset.msg), '_blank');
  }));
}

/* ── mobile nav ── */
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('mobileNav');
const headerNav = document.getElementById('nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    if (isOpen && headerNav) mobileNav.style.top = headerNav.getBoundingClientRect().bottom + 'px';
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }));
}

/* Premium micro-interactions: cursor spotlight on glass cards, 3D tilt,
   magnetic CTAs, hero scroll parallax. All disabled for reduced motion
   and touch-only devices where appropriate. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduce) return;

  /* ── cursor spotlight (sets --mx/--my consumed by CSS ::before) ── */
  if (finePointer) {
    const spotlightSel = '.hero-card, .service-card, .quiz-card, .bm-panel, .lib-card, .tier, .esc-card, .step-card';
    document.addEventListener('pointermove', e => {
      document.querySelectorAll(spotlightSel).forEach(el => {
        const r = el.getBoundingClientRect();
        if (e.clientX < r.left - 80 || e.clientX > r.right + 80 ||
            e.clientY < r.top - 80 || e.clientY > r.bottom + 80) return;
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    }, { passive: true });
  }

  /* ── 3D tilt on hero cards & service cards ── */
  if (finePointer) {
    document.querySelectorAll('.hero-card, .service-card').forEach(el => {
      let raf = null;
      el.addEventListener('pointermove', e => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - .5) * -6;
          const ry = ((e.clientX - r.left) / r.width - .5) * 6;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
          raf = null;
        });
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ── magnetic buttons ── */
  if (finePointer) {
    document.querySelectorAll('.btn-primary, .nav-cta, .map-btn').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * .18;
        const dy = (e.clientY - r.top - r.height / 2) * .3;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ── hero scroll parallax (content drifts up slower + fades) ── */
  const heroInner = document.querySelector('.hero-inner');
  const heroCanvas = document.getElementById('motionCanvas');
  if (heroInner) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = window.innerHeight;
        if (y < h) {
          heroInner.style.transform = `translateY(${y * .18}px)`;
          heroInner.style.opacity = Math.max(0, 1 - y / (h * .85));
          if (heroCanvas) heroCanvas.style.transform = `translateY(${y * .08}px) scale(${1 + y / h * .04})`;
        }
        ticking = false;
      });
    }, { passive: true });
  }
})();

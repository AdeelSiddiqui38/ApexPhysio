/* GSAP scroll reveal for the hero section + Lottie placeholder animation
   for the services section. Falls back cleanly to the existing CSS
   entrance animations if the GSAP/Lottie CDNs fail to load, and respects
   prefers-reduced-motion. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── HERO: GSAP + ScrollTrigger reveal ──
     Guarded on .hero existing at all — service pages (services/*.html)
     share this script for the cinematic section reveals below, but have
     no hero/canvas of their own, so this whole block is skipped there. */
  const heroEls = document.querySelectorAll('[data-hero-el]');
  const hasHero = !!document.querySelector('.hero');
  if (hasHero && window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(heroEls, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top 85%', once: true }
    });
    tl.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12
    });

    /* scroll-linked parallax: hero content drifts + fades, canvas drifts
       and scales slightly as the user scrolls the hero out of view */
    const heroInner = document.querySelector('.hero-inner');
    const heroCanvas = document.getElementById('motionCanvas');
    if (heroInner) {
      gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 }
      })
        .to(heroInner, { y: 90, opacity: 0.15, ease: 'none' }, 0)
        .to(heroCanvas, { y: 40, scale: 1.05, ease: 'none' }, 0);
    }

    /* cinematic "lens settle" on load: whole hero eases in from a
       slight zoom, like a camera racking into focus */
    gsap.fromTo('.hero', { scale: 1.04 }, { scale: 1, duration: 1.6, ease: 'power3.out' });
  } else {
    /* GSAP unavailable or reduced motion — restore the original CSS
       keyframe entrance so the hero still animates in. */
    document.documentElement.classList.remove('has-js');
    if (heroEls) heroEls.forEach(el => { el.style.opacity = ''; el.style.transform = ''; });
  }

  /* ── CINEMATIC SCROLL STORYTELLING (site-wide) ──
     Movie-trailer style dramatic reveals as the visitor scrolls: big
     section headers ease up with weight, card grids stagger in with a
     scale-pop, and hero feature elements (body map, quiz, recovery,
     booking) rise up from below with a soft scale settle. All of this
     layers ON TOP of the simpler CSS .reveal fade (interactions.js) —
     GSAP sets inline styles which take priority, so nothing conflicts,
     and everything still degrades gracefully if GSAP fails to load. */
  if (window.gsap && window.ScrollTrigger && !reduce) {
    // Section labels/titles/subs: a weightier, slower rise than the base reveal
    document.querySelectorAll('.s-label, .s-title, .s-sub').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 46 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    // Card grids: staggered scale + fade pop as each grid enters view
    ['.services-grid', '.lib-grid'].forEach(sel => {
      const grid = document.querySelector(sel);
      if (!grid || !grid.children.length) return;
      gsap.fromTo(grid.children,
        { opacity: 0, y: 44, scale: .92 },
        {
          opacity: 1, y: 0, scale: 1, duration: .8, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: grid, start: 'top 90%', once: true }
        }
      );
    });

    // Body map figure: dramatic scale + rotate settle, like a spotlight reveal
    const bmFigure = document.querySelector('.bm-figure');
    if (bmFigure) {
      gsap.fromTo(bmFigure,
        { opacity: 0, scale: .82, rotate: -4 },
        {
          opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: bmFigure, start: 'top 85%', once: true }
        }
      );
    }
    const bmPanel = document.getElementById('bmPanel');
    if (bmPanel) {
      gsap.fromTo(bmPanel,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: bmPanel, start: 'top 85%', once: true }
        }
      );
    }

    // Big feature cards: rise up from below with a scale settle
    ['.quiz-card', '.rec-slider', '.booking-shell'].forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 70, scale: .96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.05, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    // Trust bar + location map card: quick staggered pop
    const trustItems = gsap.utils.toArray('.trust-item');
    if (trustItems.length) {
      gsap.fromTo(trustItems,
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: .6, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.trust-bar', start: 'top 90%', once: true }
        }
      );
    }
    const mapCard = document.querySelector('.map-card');
    if (mapCard) {
      gsap.fromTo(mapCard,
        { opacity: 0, y: 50, scale: .95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: mapCard, start: 'top 88%', once: true }
        }
      );
    }
  }

  /* ── SERVICES: Lottie placeholder animation ── */
  const lottieHost = document.getElementById('servicesLottie');
  if (lottieHost && window.lottie && !reduce) {
    const anim = lottie.loadAnimation({
      container: lottieHost,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'assets/services-pulse.json'
    });
    const lottieIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anim.play();
          lottieIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    lottieIO.observe(lottieHost);
  }
})();

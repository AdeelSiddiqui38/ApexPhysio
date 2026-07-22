/* GSAP scroll reveal for the hero section + Lottie placeholder animation
   for the services section. Falls back cleanly to the existing CSS
   entrance animations if the GSAP/Lottie CDNs fail to load, and respects
   prefers-reduced-motion. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── HERO: GSAP + ScrollTrigger reveal ── */
  const heroEls = document.querySelectorAll('[data-hero-el]');
  if (window.gsap && window.ScrollTrigger && !reduce) {
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
  } else {
    /* GSAP unavailable or reduced motion — restore the original CSS
       keyframe entrance so the hero still animates in. */
    document.documentElement.classList.remove('has-js');
    if (heroEls) heroEls.forEach(el => { el.style.opacity = ''; el.style.transform = ''; });
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

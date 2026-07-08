/* Cinematic hero background — aurora ribbons, depth-layered orbs,
   gold-dust particles, cursor-reactive parallax, slow light sweep.
   Respects prefers-reduced-motion (renders one static frame). */
(function () {
  const canvas = document.getElementById('motionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* cursor parallax (eased) */
  let mx = .5, my = .5, cmx = .5, cmy = .5;
  if (!reduce) {
    window.addEventListener('pointermove', e => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    }, { passive: true });
  }

  /* depth-layered aurora orbs — soft pastels for light theme */
  const orbs = [
    { x: .12, y: .22, r: 420, c: '14,168,141', a: .1, sp: .00019, ph: 0, z: .9 },
    { x: .88, y: .72, r: 380, c: '110,170,215', a: .14, sp: .00015, ph: 2, z: .5 },
    { x: .62, y: .16, r: 280, c: '217,174,98', a: .09, sp: .00025, ph: 4, z: 1.2 },
    { x: .32, y: .88, r: 340, c: '80,200,175', a: .09, sp: .00021, ph: 1, z: .7 },
    { x: .5, y: .5, r: 520, c: '165,200,225', a: .12, sp: .0001, ph: 3, z: .3 },
  ];

  /* aurora ribbons — flowing sine bands */
  const ribbons = [
    { yBase: .3, amp: .07, freq: 2.1, speed: .12, c: '14,168,141', a: .045, w: 130 },
    { yBase: .55, amp: .09, freq: 1.6, speed: .08, c: '120,175,215', a: .05, w: 170 },
    { yBase: .42, amp: .05, freq: 2.6, speed: .16, c: '217,174,98', a: .03, w: 90 },
  ];

  /* particles: teal motes + gold dust */
  const parts = Array.from({ length: 80 }, (_, i) => ({
    x: Math.random(), y: Math.random(),
    r: .5 + Math.random() * 1.9,
    vy: .0002 + Math.random() * .0008,
    drift: (Math.random() - .5) * .0003,
    tw: Math.random() * Math.PI * 2,
    gold: i % 5 === 0,
    z: .4 + Math.random() * .9,
  }));

  let t = 0, running = true;

  /* pause when hero offscreen */
  new IntersectionObserver(es => { running = es[0].isIntersecting; if (running && !reduce) requestAnimationFrame(draw); },
    { threshold: 0 }).observe(canvas);

  function draw() {
    cmx += (mx - cmx) * .04; cmy += (my - cmy) * .04;
    const px = (cmx - .5), py = (cmy - .5);

    ctx.clearRect(0, 0, W, H);

    /* aurora orbs with parallax */
    orbs.forEach(o => {
      const ox = (o.x + Math.sin(t * o.sp * 1000 + o.ph) * .06 - px * .05 * o.z) * W;
      const oy = (o.y + Math.cos(t * o.sp * 850 + o.ph) * .08 - py * .05 * o.z) * H;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
      g.addColorStop(0, `rgba(${o.c},${o.a})`);
      g.addColorStop(1, `rgba(${o.c},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });

    /* flowing aurora ribbons */
    ribbons.forEach(rb => {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 14) {
        const nx = x / W;
        const y = (rb.yBase + Math.sin(nx * rb.freq * Math.PI * 2 + t * rb.speed * 6) * rb.amp
          + Math.sin(nx * rb.freq * 5 + t * rb.speed * 3) * rb.amp * .3 - py * .03) * H;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = rb.w;
      ctx.lineCap = 'round';
      const lg = ctx.createLinearGradient(0, 0, W, 0);
      lg.addColorStop(0, `rgba(${rb.c},0)`);
      lg.addColorStop(.5, `rgba(${rb.c},${rb.a})`);
      lg.addColorStop(1, `rgba(${rb.c},0)`);
      ctx.strokeStyle = lg;
      ctx.stroke();
    });

    /* slow diagonal light sweep */
    const sweepX = ((t * .016) % 2 - .5) * W * 1.5;
    const sg = ctx.createLinearGradient(sweepX, 0, sweepX + W * .45, H);
    sg.addColorStop(0, 'rgba(255,255,255,0)');
    sg.addColorStop(.5, 'rgba(255,252,240,.25)');
    sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);

    /* faint dot grid */
    ctx.fillStyle = 'rgba(16,42,67,.05)';
    for (let gx = 20; gx < W; gx += 40) {
      for (let gy = 20; gy < H; gy += 40) ctx.fillRect(gx, gy, 1.2, 1.2);
    }

    /* particles with depth parallax */
    parts.forEach(p => {
      p.y -= p.vy; p.x += p.drift;
      if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
      const tw = .18 + Math.sin(t * 2 + p.tw) * .15;
      ctx.globalAlpha = tw;
      ctx.fillStyle = p.gold ? '#C99B4F' : '#0EA88D';
      ctx.beginPath();
      ctx.arc((p.x - px * .02 * p.z) * W, (p.y - py * .02 * p.z) * H, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    /* cursor glow bloom */
    if (!reduce) {
      const cg = ctx.createRadialGradient(cmx * W, cmy * H, 0, cmx * W, cmy * H, 260);
      cg.addColorStop(0, 'rgba(14,168,141,.05)');
      cg.addColorStop(1, 'rgba(14,168,141,0)');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);
    }

    /* soft white vignette for airy cinematic depth */
    const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .3, W / 2, H / 2, Math.max(W, H) * .75);
    vg.addColorStop(0, 'rgba(255,255,255,0)');
    vg.addColorStop(1, 'rgba(248,251,252,.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    t += .016;
    if (!reduce && running) requestAnimationFrame(draw);
  }
  draw();
})();

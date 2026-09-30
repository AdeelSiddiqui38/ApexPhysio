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

  const blobs = [
    { x: .15, y: .25, r: 380, hue: 'rgba(154,222,27,', a: .16, sp: .00022, ph: 0 },
    { x: .85, y: .75, r: 340, hue: 'rgba(150,158,165,', a: .13, sp: .00017, ph: 2 },
    { x: .65, y: .2, r: 260, hue: 'rgba(20,23,26,', a: .05, sp: .00028, ph: 4 },
    { x: .35, y: .85, r: 300, hue: 'rgba(124,181,24,', a: .14, sp: .0002, ph: 1 },
  ];

  const N = 70;
  const parts = Array.from({ length: N }, () => ({
    x: Math.random(), y: Math.random(),
    r: .6 + Math.random() * 1.8,
    vy: .0003 + Math.random() * .0009,
    drift: (Math.random() - .5) * .0003,
    tw: Math.random() * Math.PI * 2,
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

    // slow diagonal light sweep (brand-green tinted, visible on white)
    const sweepX = ((t * .02) % 2 - .5) * W * 1.5;
    const sg = ctx.createLinearGradient(sweepX, 0, sweepX + W * .45, H);
    sg.addColorStop(0, 'rgba(154,222,27,0)');
    sg.addColorStop(.5, 'rgba(154,222,27,.06)');
    sg.addColorStop(1, 'rgba(154,222,27,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);

    // rising particles (deep green, readable against a light hero)
    parts.forEach(p => {
      p.y -= p.vy;
      p.x += p.drift;
      if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
      const tw = .35 + Math.sin(t * 2 + p.tw) * .3;
      ctx.globalAlpha = tw;
      ctx.fillStyle = '#7CB518';
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // dot grid overlay (faint, dark on light bg)
    ctx.fillStyle = 'rgba(20,23,26,.05)';
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

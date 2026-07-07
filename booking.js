/* Jane-App-style 4-step booking mock: service → day/time → details → confirm */
(function () {
  const shell = document.getElementById('bookingShell');
  const SVCS = [
    { nm: 'Physiotherapy — Initial Assessment', dt: '60 min' },
    { nm: 'Physiotherapy — Follow-Up', dt: '45 min' },
    { nm: 'Massage Therapy', dt: '60 min' },
    { nm: 'Chiropractic Adjustment', dt: '30 min' },
    { nm: 'MVA / WCB Intake', dt: '60 min · Direct billed' },
    { nm: 'Acupuncture / IMS', dt: '45 min' },
  ];
  const DAYS = (() => {
    const out = [], dw = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() + i);
      if (d.getDay() === 0) continue; // closed Sunday
      out.push({ dw: i === 0 ? 'TODAY' : dw[d.getDay()], dn: d.getDate() });
    }
    return out.slice(0, 6);
  })();
  const SLOTS = ['8:00 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'];

  let step = 0, sel = { svc: null, day: null, slot: null, name: '', phone: '' };

  function stepsBar() {
    const labels = ['Service', 'Date & Time', 'Your Details', 'Confirmed'];
    return `<div class="jane-steps">${labels.map((l, i) =>
      `<div class="jane-step ${i === step ? 'active' : i < step ? 'done' : ''}">${i < step ? '✓ ' : ''}${l}</div>`).join('')}</div>`;
  }

  function render() {
    let body = '';
    if (step === 0) {
      body = `<div class="svc-grid">${SVCS.map((s, i) =>
        `<button class="svc-opt ${sel.svc === i ? 'sel' : ''}" data-i="${i}"><div class="nm">${s.nm}</div><div class="dt">${s.dt}</div></button>`).join('')}</div>
        <div class="jane-nav"><span></span><button class="jane-next" ${sel.svc === null ? 'disabled' : ''} data-go="1">Choose Time →</button></div>`;
    } else if (step === 1) {
      body = `<div class="day-row">${DAYS.map((d, i) =>
        `<button class="day-chip ${sel.day === i ? 'sel' : ''}" data-d="${i}"><div class="dw">${d.dw}</div><div class="dn">${d.dn}</div></button>`).join('')}</div>
        <div class="slot-grid">${SLOTS.map((s, i) =>
        `<button class="slot ${sel.slot === i ? 'sel' : ''}" data-s="${i}">${s}</button>`).join('')}</div>
        <div class="jane-nav"><button class="jane-back" data-go="0">← Back</button><button class="jane-next" ${sel.day === null || sel.slot === null ? 'disabled' : ''} data-go="2">Your Details →</button></div>`;
    } else if (step === 2) {
      body = `<div class="jane-form">
        <div class="fg"><label>Full Name</label><input id="jfName" placeholder="Jane Smith" value="${sel.name}"></div>
        <div class="fg"><label>Phone</label><input id="jfPhone" placeholder="403-000-0000" value="${sel.phone}"></div>
        <div class="fg"><label>Insurance (optional — we direct bill)</label><input placeholder="e.g. Alberta Blue Cross"></div>
        </div>
        <div class="jane-nav"><button class="jane-back" data-go="1">← Back</button><button class="jane-next" data-go="3">Confirm Booking →</button></div>`;
    } else {
      const d = DAYS[sel.day], s = SVCS[sel.svc];
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
    shell.querySelectorAll('.svc-opt').forEach(b => b.onclick = () => { sel.svc = +b.dataset.i; render(); });
    shell.querySelectorAll('.day-chip').forEach(b => b.onclick = () => { sel.day = +b.dataset.d; render(); });
    shell.querySelectorAll('.slot').forEach(b => b.onclick = () => { sel.slot = +b.dataset.s; render(); });
    shell.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
      const n = shell.querySelector('#jfName'), p = shell.querySelector('#jfPhone');
      if (n) sel.name = n.value; if (p) sel.phone = p.value;
      if (+b.dataset.go === 0) sel = { svc: null, day: null, slot: null, name: '', phone: '' };
      step = +b.dataset.go; render();
    });
  }

  render();
})();

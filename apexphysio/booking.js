/* Booking form: posts to booking.php (WHC / cPanel PHP) and pre-fills from the 3D muscle map. */
(function () {
  const form = document.getElementById('bookForm');
  const success = document.getElementById('bookSuccess');
  if (!form) return;

  const btn = form.querySelector('.book-submit');
  const btnLabel = btn ? btn.textContent : '';

  // Inline status line (replaces alert(), which blocks the page and fails in some browsers).
  const status = document.createElement('p');
  status.className = 'book-status';
  status.setAttribute('role', 'alert');
  status.hidden = true;
  if (btn) btn.insertAdjacentElement('afterend', status);

  function showError(text) {
    status.textContent = text;
    status.hidden = false;
  }
  function showSuccess() {
    form.style.display = 'none';
    success.style.display = 'block';
  }

  const params = new URLSearchParams(location.search);

  // No-JavaScript fallback returns here with ?sent=1 or ?sent=0.
  if (params.get('sent') === '1') showSuccess();
  if (params.get('sent') === '0') showError('We couldn’t send your request. Please call us at 403-000-0000.');

  // Pre-fill from the 3D muscle map (pain-map/ links here with ?area=<id>#book).
  const AREAS = {
    neck: 'Neck & upper traps',
    upperback: 'Between the shoulder blades',
    shoulder: 'Shoulder & rotator cuff',
    elbow: 'Elbow & forearm',
    lowback: 'Lower back',
    glutes: 'Hips & glutes',
    hipflexor: 'Hip flexors',
    knee: 'Thigh & knee',
    hamstring: 'Hamstrings',
    shin: 'Shin',
    calf: 'Calf & Achilles'
  };
  const area = params.get('area');
  if (area && AREAS[area]) {
    const hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = 'area';
    hidden.value = AREAS[area];
    form.appendChild(hidden);

    const service = form.querySelector('#bf-service');
    if (service && !service.value) service.value = 'Physiotherapy — Initial Assessment';
    const msg = form.querySelector('#bf-msg');
    if (msg && !msg.value) msg.value = 'From the 3D muscle map: ' + AREAS[area] + '. ';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.hidden = true;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    fetch(form.getAttribute('action') || 'booking.php', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        return res.json().catch(function () { return { ok: false }; }).then(function (data) {
          return { status: res.status, data: data };
        });
      })
      .then(function (r) {
        if (r.data && r.data.ok) { showSuccess(); return; }
        btn.disabled = false;
        btn.textContent = btnLabel;
        if (r.status === 422) showError('Please check your name, phone number and email, then try again.');
        else if (r.status === 429) showError('You’ve sent several requests already. Please call us at 403-000-0000.');
        else showError('We couldn’t send your request. Please call us at 403-000-0000.');
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = btnLabel;
        showError('No connection. Please check your internet, or call us at 403-000-0000.');
      });
  });
})();

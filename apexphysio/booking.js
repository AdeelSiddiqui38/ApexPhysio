/* Booking form — posts to send-booking.php (PHP mail handler on WHC hosting) */
(function () {
  const form = document.getElementById('bookForm');
  const success = document.getElementById('bookSuccess');
  const momentumLine = document.getElementById('momentumLine');

  /* Show the real waitlist count once it's meaningful. On Netlify (no PHP)
     this fetch just fails silently and the evergreen fallback text stays. */
  function setMomentumCount(count) {
    if (!momentumLine || !count || count < 5) return; // don't show tiny/early numbers
    momentumLine.textContent = '🔥 ' + count + ' people have already joined our waitlist';
  }
  if (momentumLine) {
    fetch('waitlist-count.php', { cache: 'no-store' })
      .then(function (res) { return res.json(); })
      .then(function (data) { setMomentumCount(data && data.count); })
      .catch(function () {});
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('.book-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    fetch(form.getAttribute('action') || 'send-booking.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(function (res) { return res.json().catch(function () { return { ok: res.ok }; }); })
      .then(function (data) {
        if (data && data.ok) {
          form.style.display = 'none';
          success.style.display = 'block';
          setMomentumCount(data.count);
        } else {
          throw new Error((data && data.error) || 'Send failed');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = '🔔 Notify Me When You Open →';
        alert('Something went wrong — please call us directly at 403-000-0000.');
      });
  });
})();

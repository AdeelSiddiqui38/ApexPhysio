/* Booking form — Netlify Forms submission handler */
(function () {
  const form = document.getElementById('bookForm');
  const success = document.getElementById('bookSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('.book-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(function () {
        form.style.display = 'none';
        success.style.display = 'block';
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = '📅 Request My Appointment →';
        alert('Something went wrong — please call us directly at 403-000-0000.');
      });
  });
})();

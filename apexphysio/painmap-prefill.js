/* Pre-fills the waitlist/booking form when a visitor arrives from the 3D muscle map (pain-map/ links to ./?area=<id>#book). */
(function () {
  var AREAS = {
    neck: 'Neck & upper traps', upperback: 'Between the shoulder blades', shoulder: 'Shoulder & rotator cuff',
    elbow: 'Elbow & forearm', lowback: 'Lower back', glutes: 'Hips & glutes', hipflexor: 'Hip flexors',
    knee: 'Thigh & knee', hamstring: 'Hamstrings', shin: 'Shin', calf: 'Calf & Achilles'
  };
  var area = new URLSearchParams(location.search).get('area');
  if (!area || !AREAS[area]) return;
  var service = document.getElementById('bf-service');
  if (service && !service.value) service.value = 'Physiotherapy — Initial Assessment';
  var msg = document.getElementById('bf-msg');
  if (msg && !msg.value) msg.value = 'From the 3D muscle map: ' + AREAS[area] + '. ';
})();

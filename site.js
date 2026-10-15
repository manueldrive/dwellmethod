// Shared header: hamburger menu open/close.
(function () {
  var btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
  if (!btn || !menu) return;
  function set(open) { btn.setAttribute('aria-expanded', open); menu.classList.toggle('open', open); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(!menu.classList.contains('open')); });
  document.addEventListener('click', function (e) { if (!menu.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();

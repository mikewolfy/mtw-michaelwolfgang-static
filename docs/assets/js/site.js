// Site-wide behaviour: dropdown nav, mobile menu, theme toggle, image fallbacks.
(function () {
  var root = document.documentElement;

  // ---- Theme ----
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage unavailable */ }

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  // ---- Dropdown menus ----
  var groups = Array.prototype.slice.call(document.querySelectorAll('.nav-group'));
  function closeAll(except) {
    groups.forEach(function (g) {
      if (g !== except) {
        g.classList.remove('open');
        var b = g.querySelector('.nav-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  }
  groups.forEach(function (g) {
    var btn = g.querySelector('.nav-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !g.classList.contains('open');
      closeAll(g);
      g.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
      var nav = document.getElementById('site-nav');
      if (nav) nav.classList.remove('open');
    }
  });

  // ---- Mobile menu ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // ---- Broken images: swap in a tidy placeholder instead of a broken icon ----
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = '1';
    var label = img.getAttribute('alt') || '';
    var holder = img.closest('.book-cover');
    if (holder) {
      holder.classList.add('fallback');
      holder.textContent = label;
    } else {
      img.style.visibility = 'hidden';
    }
  }, true);
})();

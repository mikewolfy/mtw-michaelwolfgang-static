(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));
  var map = { csharp: 'csharp', azure: 'azure', 'problem-solving': 'problem-solving' };
  var legacy = { CSharp: 'csharp', Azure: 'azure', ProblemSolving: 'problem-solving' }; // ?category= links from the old site

  function show(id, pushHash) {
    if (!map[id]) id = 'csharp';
    tabs.forEach(function (t) {
      var sel = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
    });
    panels.forEach(function (p) { p.hidden = p.dataset.panel !== id; });
    if (pushHash) history.replaceState(null, '', '#' + id);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t.dataset.tab, true); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length];
      n.focus(); show(n.dataset.tab, true);
    });
  });
  var param = new URLSearchParams(location.search).get('category');
  var start = location.hash.slice(1) || legacy[param] || 'csharp';
  show(start, false);
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), false); });
})();

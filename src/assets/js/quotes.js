(function () {
  var list = document.getElementById('quote-list');
  var items = Array.prototype.slice.call(list.querySelectorAll('.quote'));
  var q = document.getElementById('q'), authorSel = document.getElementById('author'),
      tagSel = document.getElementById('tag'), sortSel = document.getElementById('sort'),
      count = document.getElementById('count'), empty = document.getElementById('empty'),
      reset = document.getElementById('reset');

  function apply() {
    var text = q.value.trim().toLowerCase(), author = authorSel.value, tag = tagSel.value;
    var visible = items.filter(function (el) {
      var ok = (!author || el.dataset.author === author) &&
               (!tag || el.dataset.tags.split('|').indexOf(tag) !== -1) &&
               (!text || el.dataset.search.indexOf(text) !== -1);
      el.hidden = !ok;
      return ok;
    });
    var dir = sortSel.value.slice(-4) === 'desc' ? -1 : 1;
    var field = sortSel.value.split('-')[0];
    visible.sort(function (a, b) { return dir * a.dataset[field].localeCompare(b.dataset[field]); });
    visible.forEach(function (el) { list.appendChild(el); });
    count.textContent = 'Showing ' + visible.length + ' of ' + items.length + ' quotes';
    empty.hidden = visible.length > 0;
    reset.hidden = !(text || author || tag);
  }

  [q, authorSel, tagSel, sortSel].forEach(function (c) { c.addEventListener('input', apply); });
  reset.addEventListener('click', function () { q.value = ''; authorSel.value = ''; tagSel.value = ''; apply(); });
  list.addEventListener('click', function (e) {
    var a = e.target.closest('[data-pick-author]');
    var t = e.target.closest('[data-pick-tag]');
    if (a) { authorSel.value = a.dataset.pickAuthor; apply(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    if (t) { tagSel.value = t.dataset.pickTag; apply(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });
  apply();
})();

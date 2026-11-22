(function () {
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-cat]'));
  var books = Array.prototype.slice.call(document.querySelectorAll('.book'));
  var count = document.getElementById('book-count');
  function apply(cat) {
    var n = 0;
    books.forEach(function (b) { var show = !cat || b.dataset.cat === cat; b.hidden = !show; if (show) n++; });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String((c.dataset.cat || '') === cat)); });
    count.textContent = n + (n === 1 ? ' book' : ' books') + (cat ? ' in ' + cat : '');
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { apply(c.dataset.cat); }); });
  apply('');
})();

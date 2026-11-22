(function () {
  var KM_PER_MILE = 1.609344;
  var DISTANCES = [
    { id: '5k', label: '5K', km: 5 },
    { id: '10k', label: '10K', km: 10 },
    { id: 'half', label: 'Half Marathon', km: 21.0975 },
    { id: 'marathon', label: 'Marathon', km: 42.195 }
  ];
  var grid = document.getElementById('pace-grid');
  var clearBtn = document.getElementById('pace-clear');

  function clock(total) {
    var r = Math.round(total), h = Math.floor(r / 3600), m = Math.floor((r % 3600) / 60), s = r % 60;
    var mm = h > 0 ? String(m).padStart(2, '0') : String(m);
    return (h > 0 ? h + ':' : '') + mm + ':' + String(s).padStart(2, '0');
  }
  function secs(card) {
    var v = function (n) { return parseFloat(card.querySelector('[data-f="' + n + '"]').value) || 0; };
    return v('h') * 3600 + v('m') * 60 + v('s');
  }

  grid.innerHTML = DISTANCES.map(function (d) {
    var miles = d.km / KM_PER_MILE;
    return '<section class="card pace-card" data-km="' + d.km + '" data-miles="' + miles + '" aria-labelledby="h-' + d.id + '">' +
      '<div class="head"><h2 id="h-' + d.id + '">' + d.label + '</h2><span class="chip">' + miles.toFixed(2) + ' mi</span></div>' +
      '<div class="time-inputs">' +
      ['h:Hours:', 'm:Minutes:59', 's:Seconds:59'].map(function (x) {
        var p = x.split(':');
        return '<div><label for="' + d.id + '-' + p[0] + '">' + p[1] + '</label><input id="' + d.id + '-' + p[0] + '" data-f="' + p[0] + '" type="number" inputmode="numeric" min="0"' + (p[2] ? ' max="' + p[2] + '"' : '') + ' placeholder="0"></div>';
      }).join('') +
      '</div>' +
      '<div class="label" style="margin:0">Pace per mile</div><div class="pace-big" data-out="mile">—</div>' +
      '<div class="pace-sub"><span data-out="km">— / km</span><span data-out="mph">— mph</span></div>' +
      '</section>';
  }).join('');

  function update() {
    var any = false;
    Array.prototype.forEach.call(grid.children, function (card) {
      var total = secs(card), km = +card.dataset.km, miles = +card.dataset.miles;
      var has = total > 0; any = any || has;
      card.querySelector('[data-out="mile"]').textContent = has ? clock(total / miles) : '—';
      card.querySelector('[data-out="km"]').textContent = has ? clock(total / km) + ' / km' : '— / km';
      card.querySelector('[data-out="mph"]').textContent = has ? (miles / (total / 3600)).toFixed(1) + ' mph' : '— mph';
    });
    clearBtn.hidden = !any;
  }
  grid.addEventListener('input', update);
  clearBtn.addEventListener('click', function () {
    Array.prototype.forEach.call(grid.querySelectorAll('input'), function (i) { i.value = ''; });
    update();
  });
  update();
})();

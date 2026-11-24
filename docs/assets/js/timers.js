(function () {
  var END_OF_LIFE_AGE = 85;
  var $ = function (id) { return document.getElementById(id); };
  var dobEl = $('dob'), retEl = $('retirement-age'), box = $('timers');
  var KEY = 'lifeTimers.v2';

  try {
    var s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s) { if (s.dob) dobEl.value = s.dob; if (s.ret) retEl.value = s.ret; }
  } catch (e) { /* ignore */ }

  function save() { try { localStorage.setItem(KEY, JSON.stringify({ dob: dobEl.value, ret: retEl.value })); } catch (e) { /* ignore */ } }

  function addMonths(d, n) { var x = new Date(d.getTime()); x.setMonth(x.getMonth() + n); return x; }
  function addYears(d, n) { var x = new Date(d.getTime()); x.setFullYear(x.getFullYear() + n); return x; }

  function countWorkdays(start, end) {
    if (!(end > start)) return 0;
    var s = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
    var e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    if (s > e) return 0;
    var total = Math.floor((e - s) / 86400000) + 1;
    var weekdays = Math.floor(total / 7) * 5;
    for (var i = 0; i < total % 7; i++) {
      var day = (s.getDay() + i) % 7;
      if (day >= 1 && day <= 5) weekdays++;
    }
    return weekdays;
  }
  function countUnits(start, target, step) {
    var cursor = new Date(start.getTime()), n = 0;
    for (;;) {
      var next = step(cursor, 1);
      if (next <= target) { n++; cursor = next; } else break;
    }
    return n;
  }
  function totals(target, now) {
    if (!(target > now)) return { years: 0, months: 0, days: 0, workdays: 0, hours: 0, minutes: 0, seconds: 0 };
    var diff = target - now;
    return {
      years: countUnits(now, target, addYears),
      months: countUnits(now, target, addMonths),
      days: Math.floor(diff / 86400000),
      workdays: countWorkdays(now, target),
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor(diff / 60000),
      seconds: Math.floor(diff / 1000)
    };
  }

  function card(title, t, keys) {
    var labels = { years: 'Years', months: 'Months', days: 'Days', workdays: 'Workdays', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };
    return '<div class="card"><h2 class="card-title">' + title + '</h2><div class="stat-grid">' +
      keys.map(function (k) { return '<div class="stat"><div class="v">' + t[k].toLocaleString() + '</div><div class="k">' + labels[k] + '</div></div>'; }).join('') +
      '</div></div>';
  }

  function render() {
    var now = new Date();
    var html = '';
    var eoy = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    html += card('Until the end of ' + now.getFullYear(), totals(eoy, now), ['months', 'days', 'workdays', 'hours', 'minutes', 'seconds']);

    var dob = dobEl.value ? new Date(dobEl.value + 'T00:00:00') : null;
    if (dob && isNaN(dob.getTime())) dob = null;
    var ra = parseInt(retEl.value, 10);
    if (isNaN(ra) || ra <= 0) ra = null;

    if (dob && ra) {
      var ret = new Date(dob.getFullYear() + ra, dob.getMonth(), dob.getDate(), 23, 59, 59);
      html += card('Until retirement (age ' + ra + ')', totals(ret, now), ['years', 'months', 'days', 'workdays', 'hours', 'minutes', 'seconds']);
    } else {
      html += '<div class="empty-state">Enter a valid date of birth and retirement age to see retirement timers.</div>';
    }
    if (dob) {
      var eol = new Date(dob.getFullYear() + END_OF_LIFE_AGE, dob.getMonth(), dob.getDate(), 23, 59, 59);
      html += card('Until age ' + END_OF_LIFE_AGE + ' (assumed life expectancy)', totals(eol, now), ['years', 'months', 'days', 'hours', 'minutes', 'seconds']);
    } else {
      html += '<div class="empty-state">Enter a valid date of birth to see the life-expectancy timer.</div>';
    }
    box.innerHTML = html;
  }

  [dobEl, retEl].forEach(function (e) { e.addEventListener('input', function () { save(); render(); }); });
  render();
  setInterval(render, 1000);
})();

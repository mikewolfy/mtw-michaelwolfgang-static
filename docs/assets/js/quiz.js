// Shared two-option quiz engine used by Myers-Briggs and Love Languages.
// config: { root, questions, storageKey, onResults(state) -> HTMLElement, title, subtitle, resultsTitle }
(function () {
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return ''; }
  }

  window.createQuiz = function (cfg) {
    var root = document.getElementById(cfg.root);
    var answers = []; // array of chosen type keys, one per question answered
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(cfg.storageKey) || 'null'); } catch (e) { saved = null; }

    function setView(node) {
      root.innerHTML = '';
      root.appendChild(node);
      root.scrollIntoView({ block: 'nearest' });
    }

    function showIntro() {
      var wrap = el('div', { class: 'quiz' });
      if (saved && saved.dateTaken) {
        wrap.appendChild(el('div', { class: 'card prev-card' }, [
          el('p', { class: 'eyebrow', text: 'Previous result found' }),
          el('h2', { text: 'You took this test on ' + fmtDate(saved.dateTaken) }),
          el('p', { class: 'muted', text: 'Your result was:' }),
          el('div', { class: 'big', text: cfg.savedHeadline(saved) }),
          el('div', { class: 'btn-row', style: 'justify-content:center;margin-top:1rem' }, [
            btn('View previous results', 'btn', function () { answers = saved.answers.slice(); showResults(false); }),
            btn('Take the test again', 'btn btn-ghost', startTest)
          ])
        ]));
      } else {
        wrap.appendChild(el('div', { class: 'card prev-card' }, [
          el('h2', { text: 'Ready when you are' }),
          el('p', { class: 'muted', text: cfg.questions.length + ' questions · about ' + Math.ceil(cfg.questions.length / 8) + ' minutes · results are saved only in this browser.' }),
          el('div', { class: 'btn-row', style: 'justify-content:center;margin-top:1rem' }, [btn('Start the test', 'btn', startTest)])
        ]));
      }
      setView(wrap);
    }

    function btn(label, cls, fn) {
      var b = el('button', { type: 'button', class: cls, text: label });
      b.addEventListener('click', fn);
      return b;
    }

    function startTest() { answers = []; showQuestion(); }

    function showQuestion() {
      var i = answers.length;
      var q = cfg.questions[i];
      var pct = Math.round(((i + 1) / cfg.questions.length) * 100);
      var wrap = el('div', { class: 'quiz' });
      wrap.appendChild(el('div', { class: 'progress' }, [
        el('div', { class: 'progress-meta' }, [
          el('span', { text: 'Question ' + (i + 1) + ' of ' + cfg.questions.length }),
          el('span', { text: pct + '% complete' })
        ]),
        el('div', { class: 'progress-track', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pct) }, [
          el('div', { class: 'progress-bar', style: 'width:' + pct + '%' })
        ])
      ]));
      wrap.appendChild(el('h2', { class: 'question', text: q.question }));
      var opts = el('div', { class: 'options' });
      [['A', q.optionA, q.typeA], ['B', q.optionB, q.typeB]].forEach(function (o) {
        var b = el('button', { type: 'button', class: 'option' }, [
          el('span', { class: 'key', text: o[0] }),
          el('span', { text: o[1] })
        ]);
        b.addEventListener('click', function () { choose(o[2]); });
        opts.appendChild(b);
      });
      wrap.appendChild(opts);
      if (i > 0) {
        wrap.appendChild(el('div', { class: 'quiz-nav' }, [
          btn('← Go back', 'btn btn-ghost btn-sm', function () { answers.pop(); showQuestion(); })
        ]));
      }
      setView(wrap);
    }

    function choose(type) {
      answers.push(type);
      if (answers.length >= cfg.questions.length) showResults(true);
      else showQuestion();
    }

    function showResults(persist) {
      var node = cfg.renderResults(answers);
      if (persist) {
        try { localStorage.setItem(cfg.storageKey, JSON.stringify(cfg.toSaved(answers))); } catch (e) { /* ignore */ }
      }
      var wrap = el('div', { class: 'stack' });
      wrap.appendChild(node);
      wrap.appendChild(el('div', { class: 'center' }, [btn('Take the test again', 'btn', startTest)]));
      setView(wrap);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showIntro();
  };
  window.quizEl = el;
})();

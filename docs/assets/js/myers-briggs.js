(function () {
  var el = window.quizEl;
  Promise.resolve().then(function () { return JSON.parse(document.getElementById('quiz-data').textContent); }).then(function (data) {
    var pairs = [['E', 'I', 'Extraversion', 'Introversion'], ['S', 'N', 'Sensing', 'Intuition'], ['T', 'F', 'Thinking', 'Feeling'], ['J', 'P', 'Judging', 'Perceiving']];

    function tally(answers) {
      var t = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      answers.forEach(function (a) { t[a]++; });
      return t;
    }
    function typeOf(t) { return pairs.map(function (p) { return t[p[0]] >= t[p[1]] ? p[0] : p[1]; }).join(''); }

    window.createQuiz({
      root: 'quiz',
      questions: data.questions,
      storageKey: 'myersBriggsResults.v2',
      savedHeadline: function (s) { return typeOf(tally(s.answers)); },
      toSaved: function (answers) { return { answers: answers, dateTaken: new Date().toISOString() }; },
      renderResults: function (answers) {
        var t = tally(answers), code = typeOf(t), info = data.types[code];
        var frag = el('div', { class: 'stack' });
        frag.appendChild(el('div', { class: 'result-hero' }, [
          el('div', { class: 'type', text: code }),
          el('h2', { text: info.name }),
          el('p', { text: info.description })
        ]));
        var cards = el('div', { class: 'card' }, [
          el('div', { class: 'trait-block' }, [el('h3', { text: 'How you operate' }), el('p', { text: info.howTheyOperate })]),
          el('div', { class: 'trait-block' }, [el('h3', { text: 'Your strengths' }), el('p', { text: info.strengths })]),
          el('div', { class: 'trait-block' }, [el('h3', { text: 'Ideal career paths' }), el('p', { text: info.idealCareers })])
        ]);
        frag.appendChild(cards);

        var d = el('div', { class: 'dichotomies' });
        pairs.forEach(function (p) {
          var first = t[p[0]] >= t[p[1]];
          var letter = first ? p[0] : p[1];
          var name = first ? p[2] : p[3];
          var score = Math.max(t[p[0]], t[p[1]]);
          var total = t[p[0]] + t[p[1]];
          d.appendChild(el('div', { class: 'card dich' }, [
            el('div', { class: 'letter', text: letter }),
            el('div', { class: 'name', text: name }),
            el('div', { class: 'score', text: score + ' / ' + total })
          ]));
        });
        frag.appendChild(d);

        frag.appendChild(el('div', { class: 'card' }, [
          el('h2', { text: 'About the Myers-Briggs Type Indicator' }),
          el('p', { text: 'The Myers-Briggs Type Indicator (MBTI) is a personality assessment that categorizes individuals into 16 distinct personality types based on four dichotomies:' }),
          el('ul', { html: '<li><strong>Extraversion (E) vs. Introversion (I):</strong> How you gain energy</li><li><strong>Sensing (S) vs. Intuition (N):</strong> How you take in information</li><li><strong>Thinking (T) vs. Feeling (F):</strong> How you make decisions</li><li><strong>Judging (J) vs. Perceiving (P):</strong> How you structure your life</li>' }),
          el('p', { class: 'muted small', text: 'This is an informal self-assessment for fun and reflection, not an official MBTI instrument.' })
        ]));

        var guide = el('div', { class: 'card type-guide' }, [el('h2', { text: 'All 16 personality types' })]);
        Object.keys(data.types).forEach(function (k) {
          var ti = data.types[k];
          var det = el('details', k === code ? { open: '' } : {}, [
            el('summary', {}, [el('span', { class: 'code4', text: k }), el('span', { text: ti.name })]),
            el('div', { class: 'inner' }, [
              el('p', { class: 'muted', text: ti.description }),
              el('h4', { text: 'How they operate' }), el('p', { text: ti.howTheyOperate }),
              el('h4', { text: 'Key strengths' }), el('p', { text: ti.strengths }),
              el('h4', { text: 'Ideal career paths' }), el('p', { text: ti.idealCareers })
            ])
          ]);
          guide.appendChild(det);
        });
        frag.appendChild(guide);
        return frag;
      }
    });
  }).catch(function () {
    document.getElementById('quiz').innerHTML = '<div class="notice error"><strong>Couldn\'t load the quiz.</strong>Please refresh the page. </div>';
  });
})();

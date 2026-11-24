(function () {
  var el = window.quizEl;
  var TIPS = {
    wordsOfAffirmation: ['Say "I love you" and "I appreciate you" often', 'Give genuine compliments about their appearance, achievements, or character', 'Write love notes, texts, or cards expressing your feelings', 'Offer encouragement during challenging times', 'Verbally acknowledge their efforts and contributions', 'Express gratitude for the things they do', 'Praise them in front of others'],
    qualityTime: ['Put away your phone and give undivided attention', 'Plan regular date nights or special outings together', 'Have meaningful conversations without distractions', 'Take walks together and talk about your day', 'Cook or eat meals together without TV or devices', 'Do activities you both enjoy (games, hobbies, sports)', 'Travel together and create shared experiences'],
    receivingGifts: ['Give thoughtful gifts that show you were thinking of them', 'Remember special occasions (birthdays, anniversaries, holidays)', 'Bring back souvenirs when you travel', 'Surprise them with their favorite treat or item', 'Create handmade gifts or personalized items', 'Give flowers, chocolates, or small tokens "just because"', 'Pay attention to things they mention wanting'],
    actsOfService: ['Help with household chores (dishes, laundry, cleaning)', 'Cook their favorite meal or pack their lunch', 'Run errands for them when they\'re busy', 'Fill up their gas tank or wash their car', 'Fix things around the house without being asked', 'Help with projects or tasks they\'re working on', 'Take care of responsibilities to lighten their load'],
    physicalTouch: ['Hold hands while walking or sitting together', 'Give hugs, kisses, and physical affection regularly', 'Offer back rubs, massages, or gentle touches', 'Sit close together on the couch while relaxing', 'Put your arm around them or hold them close', 'Greet them with a warm embrace when reuniting', 'Show physical comfort during difficult moments']
  };

  Promise.resolve().then(function () { return JSON.parse(document.getElementById('quiz-data').textContent); }).then(function (data) {
    var keys = Object.keys(data.info);
    var possible = {};
    keys.forEach(function (k) { possible[k] = 0; });
    data.questions.forEach(function (q) { possible[q.typeA]++; possible[q.typeB]++; });

    function ranked(answers) {
      var s = {};
      keys.forEach(function (k) { s[k] = 0; });
      answers.forEach(function (a) { s[a]++; });
      return keys.map(function (k, idx) { return { key: k, score: s[k], idx: idx, info: data.info[k] }; })
        .sort(function (a, b) { return b.score - a.score || a.idx - b.idx; });
    }

    window.createQuiz({
      root: 'quiz',
      questions: data.questions,
      storageKey: 'loveLanguagesResults.v2',
      savedHeadline: function (s) { return data.info[ranked(s.answers)[0].key].name; },
      toSaved: function (answers) { return { answers: answers, dateTaken: new Date().toISOString() }; },
      renderResults: function (answers) {
        var list = ranked(answers);
        var frag = el('div', { class: 'stack' });
        frag.appendChild(el('div', { class: 'result-hero' }, [
          el('p', { class: 'eyebrow', style: 'color:#c9c2ff', text: 'Your strongest love language' }),
          el('div', { class: 'type', style: 'font-size:clamp(2rem,6vw,3.2rem);letter-spacing:0', text: list[0].info.icon + ' ' + list[0].info.name }),
          el('p', { style: 'margin-top:.8rem', text: list[0].info.description })
        ]));

        var card = el('div', { class: 'card' }, [el('h2', { text: 'Ranked from strongest to weakest' })]);
        list.forEach(function (l, i) {
          var pct = Math.round((l.score / possible[l.key]) * 100);
          card.appendChild(el('div', { class: 'rank' }, [
            el('div', { class: 'badge-circle', text: l.info.icon }),
            el('div', {}, [
              el('h3', {}, [el('span', { class: 'n', text: '#' + (i + 1) }), el('span', { text: l.info.name })]),
              el('p', { text: l.info.description }),
              el('div', { class: 'meter' }, [
                el('div', { class: 'meter-track' }, [el('div', { class: 'meter-fill', style: 'width:' + pct + '%' })]),
                el('span', { class: 'meter-val', text: l.score + ' / ' + possible[l.key] })
              ])
            ])
          ]));
        });
        frag.appendChild(card);

        frag.appendChild(el('div', { class: 'card' }, [
          el('h2', { text: 'About the 5 Love Languages' }),
          el('p', { text: 'The 5 Love Languages, developed by Dr. Gary Chapman, describes five ways people express and experience love:' }),
          el('ul', { html: '<li><strong>Words of Affirmation:</strong> Verbal expressions of love and appreciation</li><li><strong>Quality Time:</strong> Undivided attention and meaningful connection</li><li><strong>Receiving Gifts:</strong> Tangible symbols of love and thoughtfulness</li><li><strong>Acts of Service:</strong> Helpful actions that ease burdens</li><li><strong>Physical Touch:</strong> Physical expressions of affection</li>' }),
          el('p', { text: 'Understanding your love languages helps you communicate your needs and better understand how others express their love.' })
        ]));

        var tips = el('div', { class: 'card' }, [el('h2', { text: 'Ways to communicate with each love language' })]);
        var cols = el('div', { class: 'cols-lists' });
        keys.forEach(function (k) {
          var ul = el('ul', { class: 'tip-list' });
          TIPS[k].forEach(function (t) { ul.appendChild(el('li', { text: t })); });
          cols.appendChild(el('div', {}, [el('h3', { text: data.info[k].icon + ' ' + data.info[k].name }), ul]));
        });
        tips.appendChild(cols);
        frag.appendChild(tips);
        return frag;
      }
    });
  }).catch(function () {
    document.getElementById('quiz').innerHTML = '<div class="notice error"><strong>Couldn\'t load the quiz.</strong>Please refresh the page. </div>';
  });
})();

/* ===========================================================
   STEFFS GEWUERZ-MULTIVERSUM  --  Steffs Ansicht
   -----------------------------------------------------------
   Alle Einzelbilder aller Stationen liegen in einer flachen Liste.
   Vor und Zurueck sind damit einfach Schritte darin. Bereits
   geoeffnete Portale werden beim Blaettern uebersprungen, damit
   niemand einen Code zweimal eintippen muss.
   Fortschritt liegt im localStorage.
   =========================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'steff-multiversum-v2';
  var SPICE_COUNT = 7;

  var main    = document.getElementById('view');
  var actions = document.getElementById('actions');
  var spices  = document.getElementById('spices');
  var counter = document.getElementById('counter');
  var sfxBtn  = document.getElementById('sfx');

  /* ---------- Flache Liste aller Bilder ------------------- */
  var SCREENS = [];
  STAGES.forEach(function (stage, si) {
    if (stage.gate) SCREENS.push({ stage: stage, si: si, k: 'gate', idx: -1 });
    stage.screens.forEach(function (s, idx) {
      SCREENS.push({ stage: stage, si: si, k: s.k, screen: s, idx: idx });
    });
  });

  var pos = 0;
  var unlocked = {};

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ pos: pos, unlocked: Object.keys(unlocked) }));
    } catch (e) { /* Privatmodus */ }
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      (s.unlocked || []).forEach(function (id) { unlocked[id] = true; });
      if (typeof s.pos === 'number') pos = Math.min(Math.max(s.pos, 0), SCREENS.length - 1);
    } catch (e) { /* kaputter Eintrag -> Neustart */ }
  }
  function reset() {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    pos = 0; unlocked = {};
    render();
  }

  /* Ein bereits geöffnetes Tor wird beim Blättern übersprungen. Ein noch
     verschlossenes ist die Grenze -- dort bleibt man stehen. */
  function isPassedGate(entry) { return entry.k === 'gate' && !!unlocked[entry.stage.id]; }

  /* ---------- Toene (ohne Audiodateien, per WebAudio) ----- */
  var Sfx = {
    on: true, ctx: null,
    init: function () {
      if (this.ctx) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    },
    tone: function (freq, start, dur, type, vol) {
      if (!this.on || !this.ctx) return;
      var t = this.ctx.currentTime + start;
      var o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.16, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(t); o.stop(t + dur + 0.02);
    },
    click:  function () { this.tone(520, 0, 0.06, 'triangle', 0.07); },
    error:  function () { this.tone(150, 0, 0.18, 'square', 0.10); this.tone(110, 0.1, 0.22, 'square', 0.10); },
    unlock: function () { [330, 440, 587, 880].forEach(function (f, k) { Sfx.tone(f, k * 0.08, 0.30, 'sawtooth', 0.09); }); },
    reward: function () { [523, 659, 784, 1047].forEach(function (f, k) { Sfx.tone(f, k * 0.11, 0.45, 'sine', 0.13); }); }
  };

  /* ---------- Vorlesestimme ------------------------------- */
  /* Zu fast jedem Bildschirm gibt es eine Aufnahme. Sie startet eine
     Sekunde nach dem Umblaettern -- kurz genug, dass es sich anfuehlt
     wie Teil des Blaetterns, lang genug, dass schnelles Durchklicken
     nichts ausloest. Der Lautsprecher oben rechts schaltet Toene und
     Stimme gemeinsam ab. */
  var VOICE_DELAY = 1000;

  /* 15 ms Stille. Handybrowser lassen Wiedergabe nur zu, wenn dasselbe
     Element schon einmal aus einer Beruehrung heraus gespielt hat --
     das hier ist dieses eine Mal, unhoerbar beim ersten Tippen. */
  var SILENCE = 'data:audio/wav;base64,UklGRhQBAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YfAA' +
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';

  var Voice = {
    el: null, timer: null, freigeschaltet: false,

    init: function () {
      if (this.el) return;
      var self = this;
      this.el = new Audio();
      this.el.preload = 'auto';
      this.el.addEventListener('playing', function () { self.anzeigen(true); });
      this.el.addEventListener('pause',   function () { self.anzeigen(false); });
      this.el.addEventListener('ended',   function () { self.anzeigen(false); });
      this.el.addEventListener('error',   function () { self.anzeigen(false); });
    },

    /* Gehoert in jeden Klick-Handler: einmal stumm anspielen genuegt. */
    freischalten: function () {
      if (this.freigeschaltet) return;
      this.freigeschaltet = true;
      this.init();
      var el = this.el;
      el.muted = true;
      el.src = SILENCE;
      var p = el.play();
      var fertig = function () { el.pause(); el.muted = false; };
      if (p && p.then) p.then(fertig, fertig); else fertig();
    },

    stop: function () {
      clearTimeout(this.timer);
      this.timer = null;
      if (this.el) { this.el.pause(); this.el.removeAttribute('src'); }
      this.anzeigen(false);
    },

    /* Datei sofort laden, abgespielt wird nach der Wartezeit. Reicht
       der Puffer nicht, laeuft die Wiedergabe eben an, sobald genug da
       ist -- der Browser regelt das selbst. */
    planen: function (datei) {
      this.stop();
      if (!datei || !Sfx.on) return;
      this.init();
      this.el.src = 'assets/audio/' + datei;
      var self = this;
      this.timer = setTimeout(function () {
        var p = self.el.play();
        if (p && p.catch) p.catch(function () { self.anzeigen(false); });
      }, VOICE_DELAY);
    },

    anzeigen: function (an) { sfxBtn.classList.toggle('speaking', !!an); }
  };

  /* Startbild und Portale haben keinen Text, also auch keine Aufnahme. */
  function voiceFile(entry) {
    if (typeof AUDIO === 'undefined' || !entry || entry.idx < 0) return null;
    return AUDIO[entry.stage.id + ':' + entry.idx] || null;
  }

  function setSfx(on) {
    Sfx.on = on;
    sfxBtn.textContent = on ? '\u{1F50A}' : '\u{1F507}';
    sfxBtn.setAttribute('aria-label', on ? 'Ton aus' : 'Ton an');
    try { localStorage.setItem(STORE_KEY + ':sfx', on ? '1' : '0'); } catch (e) {}
    if (!on) Voice.stop();
  }

  /* ---------- Fortschrittsanzeige ------------------------- */
  function earned() {
    var n = 0;
    for (var i = 0; i <= pos && i < SCREENS.length; i++) {
      if (SCREENS[i].k === 'award' && SCREENS[i].screen.spice) n++;
    }
    return n;
  }

  function paintProgress() {
    var got = earned(), html = '';
    for (var k = 0; k < SPICE_COUNT; k++) html += '<i class="spice' + (k < got ? ' earned' : '') + '"></i>';
    spices.innerHTML = html;
    counter.textContent = got + ' / ' + SPICE_COUNT;
  }

  /* ---------- Portal-Uebergang ---------------------------- */
  function warp(done) {
    var el = document.createElement('div');
    el.className = 'warp';
    el.innerHTML = '<div class="warp-core"></div>';
    document.body.appendChild(el);
    window.scrollTo(0, 0);
    setTimeout(function () { el.remove(); done(); }, 1250);
  }

  /* ---------- Blaettern ----------------------------------- */
  /* Waehrend der Portal-Animation bleibt der alte Knopf im DOM. Ohne
     diese Sperre starten hektische Mehrfachklicks ueberlappende
     Uebergaenge, die sich gegenseitig aufheben. */
  var busy = false;

  function move(delta) {
    if (busy) return;

    var from = SCREENS[pos];
    var p = pos + delta;
    while (p >= 0 && p < SCREENS.length && isPassedGate(SCREENS[p])) p += delta;
    if (p < 0 || p >= SCREENS.length) return;

    var to = SCREENS[p];
    var portal = delta > 0 && to.k !== 'gate' && to.idx === 0 &&
                 (from.si !== to.si || from.k === 'gate');

    var go = function () { pos = p; save(); render(); };
    if (portal) {
      busy = true;
      warp(function () { go(); busy = false; });
    } else {
      window.scrollTo(0, 0);
      go();
    }
  }

  /* ---------- Einzelne Ansichten -------------------------- */
  /* Bewusst nichtssagend: kein Wort von Gewürzen, Welten oder Anzahl.
     Steff soll hier noch überhaupt nicht wissen, worauf er sich einlässt.
     Fehlt das Bild noch, rückt das Emoji nach -- wie auf den Weltbildern. */
  function viewStart() {
    return '<section class="view start">' +
      '<header class="imagehead">' +
        '<div class="eyebrow">Streng geheim</div>' +
        '<h1>Steffs super geheime Geburtstagsmission</h1>' +
        '<p class="place">Peinlichkeitsfaktor: 100 %. Rückzug: nicht vorgesehen.</p>' +
      '</header>' +
      '<figure class="bigimg">' +
        '<span class="hero-emoji">\u{1F575}\u{FE0F}</span>' +
        '<img class="hero-img" src="assets/img/start.png" alt="" ' +
        'onerror="this.onerror=null;this.classList.add(\'is-missing\')">' +
      '</figure>' +
      '</section>';
  }

  function viewGate(entry) {
    var prev = STAGES[entry.si - 1];
    var riddle = prev && prev.riddle;
    return '<section class="view gate">' +
      '<div class="portal locked"></div>' +
      '<div class="eyebrow">Portal ' + entry.stage.nr + ' verschlossen</div>' +
      '<h1>Code eingeben</h1>' +
      '<p class="place">Das Rätsel klebt auf dem Gewürz, das du gerade bekommen hast.</p>' +
      '<form class="codeform" id="codeform" autocomplete="off">' +
        '<input class="code-input" id="code" type="text" inputmode="text" ' +
          'autocapitalize="characters" autocorrect="off" spellcheck="false" placeholder="LÖSUNGSWORT">' +
        '<div class="gate-msg" id="gatemsg"></div>' +
      '</form>' +
      (riddle ? '<button class="hintlink" id="showriddle" type="button">Rätsel nochmal anzeigen</button>' +
                '<div class="riddlebox" id="riddlebox" hidden>' +
                  riddle.lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') +
                  (riddle.hint ? '<p class="hintpattern">' + esc(riddle.hint) + '</p>' : '') +
                '</div>'
              : '') +
      '</section>';
  }

  /* Bild allein auf dem Bildschirm, darüber der Ort als Titel. */
  function viewImage(entry) {
    var stage = entry.stage;
    return '<section class="view imageonly">' +
      '<header class="imagehead">' +
        '<div class="eyebrow">' + (stage.type === 'world' ? 'Welt ' + stage.nr + ' von 7' : stageLabel(stage)) + '</div>' +
        '<h1>' + esc(stage.place) + '</h1>' +
      '</header>' +
      heroHTML(stage) +
      '</section>';
  }

  /* Der Ort stand schon über dem Bild, hier folgt nur noch der Name. */
  function viewHero(entry) {
    var stage = entry.stage;
    return '<section class="view">' +
      '<div class="eyebrow">' + (stage.type === 'world' ? 'Welt ' + stage.nr + ' von 7' : stageLabel(stage)) + '</div>' +
      '<h1 class="storytitle">' + esc(stage.name) + '</h1>' +
      '<div class="story">' + entry.screen.story.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      '</section>';
  }

  function viewCard(entry) {
    var stage = entry.stage, s = entry.screen;
    return '<section class="view">' +
      (s.hero ? heroHTML(stage) : '') +
      '<div class="eyebrow">' + stageLabel(stage) + ' · ' + esc(stage.name) + '</div>' +
      '<div class="card">' +
        '<h2>' + esc(s.title) + '</h2>' +
        '<div class="blocks">' + renderBlocks(s.blocks, 'steff') + '</div>' +
      '</div>' +
      '</section>';
  }

  /* Produktfoto der Belohnung, sonst das Emoji. Laedt das Bild nicht,
     nimmt onerror die Klasse weg und das Emoji rueckt nach. */
  function awardVisual(s) {
    if (!s.pic) return '<span class="reward-emoji">' + s.emoji + '</span>';
    return '<div class="reward-visual has-pic">' +
      '<div class="reward-pic"><img src="assets/img/unlocks/' + s.pic + '.webp" alt="" ' +
      'onerror="this.closest(\'.reward-visual\').classList.remove(\'has-pic\')"></div>' +
      '<span class="reward-emoji">' + s.emoji + '</span>' +
      '</div>';
  }

  function viewAward(entry) {
    var s = entry.screen;
    return '<section class="view">' +
      (s.hero ? heroHTML(entry.stage) : '') +
      '<div class="card reward">' +
        awardVisual(s) +
        '<div class="reward-sub">' + esc(s.sub) + (s.spice ? ' · Gewürz ' + entry.stage.nr + ' von 7' : '') + '</div>' +
        '<h2>' + esc(s.name) + '</h2>' +
        '<p class="note">' + esc(s.note) + '</p>' +
      '</div>' +
      '</section>';
  }

  /* ---------- Hauptrender --------------------------------- */
  function render() {
    var entry = SCREENS[pos], stage = entry.stage;

    /* Am verschlossenen Tor die neutrale Portalfarbe lassen -- sonst
       verrät der Farbwechsel schon, welche Welt als nächstes kommt. */
    document.body.setAttribute('data-theme', entry.k === 'gate' ? 'rick' : stage.theme);

    /* Auf der Startseite bleibt auch die Fortschrittsleiste verdeckt --
       „0 / 7" würde ja schon verraten, dass es sieben von irgendetwas gibt. */
    document.body.classList.toggle('at-start', entry.k === 'start');
    paintProgress();

    if (entry.k === 'start')      main.innerHTML = viewStart();
    else if (entry.k === 'gate')  main.innerHTML = viewGate(entry);
    else if (entry.k === 'image') main.innerHTML = viewImage(entry);
    else if (entry.k === 'hero')  main.innerHTML = viewHero(entry);
    else if (entry.k === 'card')  main.innerHTML = viewCard(entry);
    else if (entry.k === 'award') { main.innerHTML = viewAward(entry); Sfx.reward(); }

    var back = pos > 0 ? '<button class="btn back" id="back" type="button" aria-label="Zurück">‹</button>' : '';
    var last = pos === SCREENS.length - 1;

    if (entry.k === 'gate') {
      actions.innerHTML = back + '<button class="btn" id="cta" type="button">Portal öffnen</button>';
      wireGate(entry);
    } else if (last) {
      /* Ganz am Ende: alles zurücksetzen, damit die Mission beim nächsten
         Mal wieder bei null anfängt -- auch die geöffneten Portale. */
      actions.innerHTML = back + '<button class="btn ghost" id="restart" type="button">Alles zurücksetzen</button>';
    } else {
      actions.innerHTML = back + '<button class="btn" id="cta" type="button">' +
        esc(entry.screen.cta || 'Weiter') + '</button>';
    }

    var backBtn = document.getElementById('back');
    if (backBtn) backBtn.addEventListener('click', function () {
      Sfx.init(); Voice.freischalten(); Sfx.click(); move(-1);
    });

    var cta = document.getElementById('cta');
    if (cta && entry.k !== 'gate') {
      cta.addEventListener('click', function () {
        Sfx.init(); Voice.freischalten(); Sfx.click(); move(1);
      });
    }

    var restart = document.getElementById('restart');
    if (restart) {
      restart.addEventListener('click', function () {
        Sfx.init(); Voice.freischalten();
        if (!confirm('Fortschritt und alle geöffneten Portale zurücksetzen?\n\nSteff müsste dann jeden Code neu eingeben.')) return;
        Sfx.click();
        window.scrollTo(0, 0);
        reset();
      });
    }

    Voice.planen(voiceFile(entry));
  }

  /* ---------- Passworteingabe ----------------------------- */
  function wireGate(entry) {
    var form  = document.getElementById('codeform');
    var input = document.getElementById('code');
    var msg   = document.getElementById('gatemsg');
    var cta   = document.getElementById('cta');
    var tries = 0;

    var toggle = document.getElementById('showriddle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var box = document.getElementById('riddlebox');
        box.hidden = !box.hidden;
        toggle.textContent = box.hidden ? 'Rätsel nochmal anzeigen' : 'Rätsel ausblenden';
      });
    }

    function submit(e) {
      if (e) e.preventDefault();
      Sfx.init();
      Voice.freischalten();
      if (!Crypt.normalize(input.value)) { input.focus(); return; }

      if (Crypt.check(input.value) === entry.stage.gate.hash) {
        msg.textContent = 'Portal öffnet …';
        msg.classList.remove('error');
        Sfx.unlock();
        input.blur();
        unlocked[entry.stage.id] = true;
        save();
        move(1);
      } else {
        tries++;
        Sfx.error();
        msg.textContent = tries < 3
          ? 'Falscher Code. Nochmal.'
          : 'Immer noch falsch. Lies das Rätsel nochmal in Ruhe.';
        msg.classList.add('error');
        input.classList.remove('shake');
        void input.offsetWidth;                 /* Neustart der Animation erzwingen */
        input.classList.add('shake');
        input.select();
      }
    }

    form.addEventListener('submit', submit);
    cta.addEventListener('click', submit);
  }

  /* ---------- Start --------------------------------------- */
  function boot() {
    if (/[?&]reset\b/.test(location.search)) {
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
      history.replaceState(null, '', location.pathname);
    }
    load();

    var sfxPref = '1';
    try { sfxPref = localStorage.getItem(STORE_KEY + ':sfx') || '1'; } catch (e) {}
    setSfx(sfxPref === '1');
    /* Wieder eingeschaltet heisst: der aktuelle Bildschirm wird nochmal
       angeboten, damit man nicht erst weiterblaettern muss. */
    sfxBtn.addEventListener('click', function () {
      Sfx.init();
      Voice.freischalten();
      setSfx(!Sfx.on);
      if (Sfx.on) { Sfx.click(); Voice.planen(voiceFile(SCREENS[pos])); }
    });

    /* Notausgang für den Spielleiter: 2 Sekunden auf den Zähler drücken */
    var timer = null;
    ['touchstart', 'mousedown'].forEach(function (ev) {
      counter.addEventListener(ev, function () {
        timer = setTimeout(function () {
          if (confirm('Fortschritt komplett zurücksetzen?')) reset();
        }, 2000);
      });
    });
    ['touchend', 'touchcancel', 'mouseup', 'mouseleave'].forEach(function (ev) {
      counter.addEventListener(ev, function () { clearTimeout(timer); });
    });

    render();
  }

  boot();
})();

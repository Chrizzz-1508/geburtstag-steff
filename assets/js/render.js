/* Gemeinsame Render-Helfer für index.html, spielleiter.html,
   zuschauer.html und karten.html */

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* Wandelt Textbausteine in HTML um.
   audience: 'steff' (Steffs Ansicht) oder 'crew' (Spielleiter + Zuschauer).
   Ein Block mit  who: 'steff' | 'crew'  erscheint nur beim passenden
   Publikum -- so bleiben beim Feuerbändigen die Kommandos vor Steff
   verborgen. Ohne who sehen ihn alle. */
function renderBlocks(blocks, audience) {
  if (!blocks) return '';
  audience = audience || 'steff';

  return blocks.filter(function (b) {
    return !b.who || b.who === audience;
  }).map(function (b) {
    switch (b.t) {
      case 'p':
        return '<p>' + esc(b.text) + '</p>';

      case 'h':
        return '<h3>' + esc(b.text) + '</h3>';

      case 'needs':
        return '<div class="needs"><span class="needs-label">BRAUCHST DU</span><ul>' +
          b.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
          '</ul></div>';

      case 'list':
        return '<ul>' + b.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';

      case 'check':
        return '<ul class="check">' + b.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';

      case 'cmds':
        return b.items.map(function (c) {
          return '<div class="cmd"><span class="cmd-n">' + esc(c.n) + '</span>' +
                 (c.d ? '<span class="cmd-d">' + esc(c.d) + '</span>' : '') + '</div>';
        }).join('');

      case 'keys':
        return '<div class="keys">' + b.items.map(function (i) { return '<span>' + esc(i) + '</span>'; }).join('') + '</div>';

      case 'shout':
        return '<div class="shout">' + esc(b.text) + '</div>';

      case 'quote':
        return '<blockquote class="quote">' + esc(b.text) + '</blockquote>';

      case 'stats':
        return '<table class="stats"><tbody>' + b.items.map(function (row) {
          return '<tr><td>' + esc(row[0]) + '</td><td>' + esc(row[1]) + '</td></tr>';
        }).join('') + '</tbody></table>';

      case 'banner':
        return '<div class="banners">' + b.items.map(function (i) {
          return '<div class="banner">' + esc(i) + '</div>';
        }).join('') + '</div>';

      default:
        return '';
    }
  }).join('');
}

/* Weltbild, randlos und ohne Text drumherum -- es bekommt einen eigenen
   Bildschirm. Probiert .png, dann .jpg; die gelieferten Bilder sind PNG,
   so entfaellt eine Fehlanfrage pro Bild. Fehlen beide, bleibt der farbige
   Verlauf mit dem Welt-Emoji stehen: die Seite funktioniert also auch
   komplett ohne Bilder. */
function heroHTML(stage) {
  var base = 'assets/img/' + stage.img;
  return '<figure class="bigimg">' +
    '<span class="hero-emoji">' + stage.emoji + '</span>' +
    '<img class="hero-img" src="' + base + '.png" alt="" data-alt="' + base + '.jpg" ' +
    'onerror="if(this.dataset.alt){this.src=this.dataset.alt;this.dataset.alt=\'\';}' +
    'else{this.onerror=null;this.classList.add(\'is-missing\');}">' +
    '</figure>';
}

/* Beschriftung einer Station: „Intro", „Welt 3", „Finale" */
function stageLabel(stage) {
  if (stage.type === 'intro')  return 'Intro';
  if (stage.type === 'finale') return 'Finale';
  return 'Welt ' + stage.nr;
}

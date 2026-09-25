/* ===========================================================
   STEFFS GEWUERZ-MULTIVERSUM  --  Inhalte
   -----------------------------------------------------------
   Jede Station hat eine Liste von Einzelbildern (screens).
   Bildarten:
     {k:'start'}                       Startseite mit QR-Code für die Gäste
     {k:'image'}                       Weltbild ganzseitig, darüber place als Titel
     {k:'hero',  story:[...]}          Name + Erzähltext (ohne Bild)
     {k:'card',  title, blocks, hero}  Karte mit Textbausteinen
     {k:'award', emoji, name, sub, note, spice, pic}  Übergabe-Bild
       pic = Dateiname in assets/img/unlocks/ (ohne .webp), sonst greift emoji
   Jedes Bild darf mit  cta: '…'  die Beschriftung des Weiter-Knopfs setzen.

   Blockarten für blocks / guests[].blocks:
     {t:'p',     text}          Absatz
     {t:'h',     text}          Zwischenüberschrift
     {t:'needs', items:[]}      Material-Kasten
     {t:'list',  items:[]}      Aufzählung
     {t:'check', items:[]}      Abhak-Liste (Pflichtpunkte)
     {t:'cmds',  items:[{n,d}]} Kommando-Karten
     {t:'keys',  items:[]}      Pflichtwörter als Pills
     {t:'shout', text}          Großer Ruf-Text
     {t:'quote', text}          Zitat
     {t:'stats', items:[[k,v]]} Statuszeilen
     {t:'banner',items:[]}      Gerahmte Meldungen

   Jeder Block darf  who: 'steff' | 'crew'  tragen und ist dann nur für
   Steff bzw. nur für Spielleiter und Zuschauer sichtbar. Ohne Angabe
   sehen ihn alle. Damit bleiben beim Feuerbändigen die Kommandos vor
   Steff verborgen.
   =========================================================== */

const STAGES = [

/* ---------- 0 | INTRO ------------------------------------- */
{
  id: 'intro', nr: 0, type: 'intro', theme: 'rick', emoji: '\u{1F300}',
  name: 'Ricks Garage', place: 'Dimension C-137', img: 'intro',
  brief: 'Rick schickt Steff los. Ihr schaut erstmal nur zu.',
  gate: null,
  screens: [
    { k: 'start', cta: 'Mission starten' },

    { k: 'image', cta: 'Weiter' },


    { k: 'hero', cta: 'Weiter', story: [
      'Steff. Wir müssen reden.',
      'Es ist rausgekommen. Letztes Jahr. Die abgelaufenen Gewürze in deinem Schrank. Ich habe es gesehen, Morty hat es gesehen, das halbe Multiversum hat es gesehen.',
      'Also habe ich sieben neue Gewürze besorgt. Aus sieben Dimensionen. Frisch. Mit einem Haltbarkeitsdatum, das tatsächlich in der Zukunft liegt.',
      'Kleines Problem: Die Bewohner dieser Welten rücken sie nicht einfach so raus. Du musst sie dir verdienen.',
      'Nach jeder bestandenen Prüfung bekommst du ein Gewürz. Auf jedem Gewürz klebt ein Rätsel. Die Lösung ist das Passwort für das nächste Portal.'
    ]},

    { k: 'card', title: 'Moment.', cta: 'Ausrüstung anfordern', blocks: [
      { t: 'p', text: 'Bevor ich dich losschicke, müssen wir noch über eine Sache reden.' },
      { t: 'p', text: 'Letztes Jahr hast du bereits bewiesen, dass man dich nicht vollkommen unbeaufsichtigt mit Gewürzen arbeiten lassen sollte.' },
      { t: 'p', text: 'Deshalb bekommst du für diese Mission professionelle Ausrüstung.' }
    ]},

    { k: 'card', title: 'Missionsgegenstand freigeschaltet', cta: 'Übernehmen', blocks: [
      { t: 'shout', text: 'Interdimensionales Präzisions-Dosierinstrument' },
      { t: 'p', text: 'Entwickelt wurde es für exakte Gewürzdosierung, kontrollierte Geschmacksexperimente und die Vermeidung kulinarischer Katastrophen. Also für Menschen, denen man offenbar keinen normalen Teelöffel mehr zutraut.' },
      { t: 'stats', items: [
        ['Technologielevel', 'erschreckend niedrig'],
        ['Offizielle Bezeichnung', 'Gewürzschaufel']
      ]}
    ]},

    { k: 'award', emoji: '\u{1F944}', name: 'Gewürzschaufel', pic: 'unlock-intro', sub: 'Missionsausrüstung',
      spice: false, cta: 'Missionsstatus',
      note: 'Trag sie mit Würde. Oder steck sie einfach ein. Ist eine Schaufel, Steff.' },

    { k: 'card', title: 'Missionsstatus', cta: 'Portal 01 öffnen', blocks: [
      { t: 'stats', items: [
        ['Ausrüstung erhalten', '✅'],
        ['Gewürze erhalten', '0 / 7'],
        ['Gewürzalter', 'hoffentlich unter einem Jahrzehnt'],
        ['Überlebenschance', 'ausreichend']
      ]},
      { t: 'p', text: 'Viel Glück. Nicht sterben.' }
    ]}
  ],
  guests: [
    { role: 'Alle Gäste', blocks: [
      { t: 'p', text: 'Noch keine aktive Rolle. Steff bekommt zuerst seine Gewürzschaufel überreicht.' },
      { t: 'p', text: 'Eure einzige Aufgabe: darauf achten, dass er später keine Prüfung überspringt.' },
      { t: 'p', text: 'Optional darf einer als „Ricks Assistent" die Regeln überwachen.' }
    ]}
  ],
  riddle: null
},

/* ---------- Welt 1 ---------------------------------------- */
{
  id: 'tmnt', nr: 1, type: 'world', theme: 'tmnt', emoji: '\u{1F422}',
  name: 'Teenage Mutant Ninja Turtles', place: 'Kanalisation von New York', img: 'welt1-tmnt',
  brief: 'Erst 20 Liegestütze, dann die Ninja-Prüfung. Ihr zählt mit und ruft die Kommandos.',
  gate: null,
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Es riecht feucht. Es tropft. Irgendwo läuft ein Fernseher.',
      'Du stehst in der Kanalisation von New York. Hier unten leben vier mutierte Schildkröten: Leonardo, Donatello, Raphael und Michelangelo.',
      'Sie wurden zu Ninjas ausgebildet, kämpfen gegen Bösewichte und lieben Pizza. Ungefähr in dieser Reihenfolge, aber da ist sich niemand ganz sicher.',
      'Sie haben dein erstes Gewürz. Rausrücken tun sie es nur, wenn auch in dir ein Ninja steckt.'
    ]},
    { k: 'card', title: 'Erst wird trainiert', cta: 'Geschafft', blocks: [
      { t: 'p', text: 'Ihr Meister ist eine Ratte namens Splinter. Bevor hier irgendjemand über Waffen redet, will er sehen, dass du überhaupt trainierbar bist.' },
      { t: 'shout', text: '20 Liegestütze.' },
      { t: 'p', text: 'Die Turtles zählen mit. Laut. Und sie zählen nur, was sauber genug aussieht.' },
      { t: 'p', text: 'Form ist zweitrangig. Die Zahl nicht.' }
    ]},

    { k: 'card', title: 'Aufgewärmt', cta: 'Auffangen', blocks: [
      { t: 'p', text: 'Du liegst am Boden. Die Turtles nicken anerkennend. Splinter deutlich weniger.' },
      { t: 'quote', text: 'Zwanzig. Akzeptabel. Für einen Menschen.' },
      { t: 'p', text: 'Dann wirft dir Raphael etwas zu. Es ist kein Schwert. Es ist nicht einmal annähernd eine Waffe.' }
    ]},

    { k: 'card', title: 'Die Ninja-Aufnahmeprüfung', cta: 'Aufgabe bestanden', blocks: [
      { t: 'needs', who: 'crew', items: ['1 Geschirrtuch'] },
      { t: 'p', text: 'Das Geschirrtuch ist ab jetzt deine offizielle Ninja-Waffe. Du darfst es wie ein Nunchaku schleudern, wie ein Schwert führen, wie eine Peitsche schwingen oder einfach dramatisch um dich werfen — solange du dabei niemanden ernsthaft triffst.' },
      { t: 'p', text: 'Stell dich in Kampfposition. Gleich kommen schnell hintereinander Kommandos, und zu jedem gehört eine eigene Bewegung.' },
      { t: 'cmds', items: [
        { n: 'LEONARDO!',     d: 'Zwei imaginäre Schwerter. Geschirrtuch in beide Hände.' },
        { n: 'DONATELLO!',    d: 'Geschirrtuch gespannt oder zusammengerollt — langer Kampfstab.' },
        { n: 'RAPHAEL!',      d: 'Aggressivste Ninja-Pose. Das Geschirrtuch muss bedrohlich wirken.' },
        { n: 'MICHELANGELO!', d: 'Nunchaku. Schwingen.' },
        { n: 'PIZZA!',        d: 'Alles stehen und liegen lassen und den Schlachtruf brüllen.' }
      ]},
      { t: 'shout', text: 'COWABUNGA!' }
    ]},
    { k: 'card', title: 'Aufgenommen', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Die vier beraten sich kurz hinter einem Rohr. Es fallen Wörter wie „brauchbar" und „überraschend beweglich".' },
      { t: 'p', text: 'Dann tritt Leonardo vor und spricht ein Urteil, das man bei ihm durchaus als Lob verstehen darf.' },
      { t: 'quote', text: 'Du hast den Geist verstanden. Die Technik nicht. Aber den Geist.' },
      { t: 'p', text: 'Michelangelo verschwindet in einer Seitenröhre und kommt mit etwas zurück, das er offensichtlich seit Jahren hortet. Er drückt es dir in die Hand — und lässt es erst nach kurzem Zögern wirklich los.' }
    ]},
    { k: 'award', emoji: '\u{1F355}', name: 'Pizza New York Style', pic: 'unlock-tmnt', sub: 'TMNT', spice: true,
      cta: 'Nächstes Portal',
      note: 'Auf dem Gewürz klebt ein Rätsel. Die Lösung ist der Code für das nächste Portal.' }
  ],
  guests: [
    { role: 'Alle Gäste — Teil 1', blocks: [
      { t: 'p', text: 'Steff macht 20 Liegestütze. Zählt laut mit — und zwar nur die, die sauber genug aussehen.' },
      { t: 'p', text: 'Kommentare in der Rolle eines strengen Meisters sind ausdrücklich erwünscht.' },
      { t: 'p', text: 'Danach wirft ihm einer von euch das Geschirrtuch zu. Das ist das Stichwort für Teil 2.' }
    ]},
    { role: 'Gast 1 — Ninja-Meister (Teil 2)', blocks: [
      { t: 'p', text: 'Ruf die Kommandos möglichst schnell und unvorhersehbar auf. Reihenfolge und Wiederholungen bestimmst du — zum Beispiel so:' },
      { t: 'list', items: ['Leonardo!', 'Raphael!', 'Pizza!', 'Donatello!', 'Pizza!', 'Michelangelo!', 'Raphael!'] },
      { t: 'p', text: 'Bei „Pizza!" muss Steff alles fallen lassen und COWABUNGA! schreien.' }
    ]},
    { role: 'Alle anderen — Teil 2', blocks: [
      { t: 'p', text: 'Am Ende per Applaus entscheiden, ob Steff als Ninja durchgeht. Rein symbolisch — er besteht sowieso.' }
    ]}
  ],
  riddle: {
    lines: [
      'Dein nächstes Ziel liegt tief unter dem Meer.',
      'Dort lebt ein gelber Bewohner, dessen bester Freund Patrick heißt.',
      'Er arbeitet in einem Restaurant und ist fast immer viel zu gut gelaunt.',
      'Wie heißt er?'
    ],
    hint: null
  }
},

/* ---------- Welt 2 ---------------------------------------- */
{
  id: 'spongebob', nr: 2, type: 'world', theme: 'spongebob', emoji: '\u{1F9FD}',
  name: 'SpongeBob', place: 'Die Krosse Krabbe', img: 'welt2-spongebob',
  brief: 'Erst zehn Hampelmänner mit Ansage, dann verkauft er euch einen Burger.',
  gate: { hash: 'f0e2e750791171b0391b682ec35835bd6a5c3f7c8d1d0191451ec77b4d75f240' },
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Du landest in Bikini Bottom, einer Stadt auf dem Meeresgrund.',
      'Hier lebt SpongeBob, ein extrem fröhlicher gelber Schwamm. Er arbeitet als Koch im Fast-Food-Restaurant Krosse Krabbe.',
      'Sein Chef, Mr. Krabs, liebt Geld mehr als fast alles andere. Und Mr. Krabs hat dein nächstes Gewürz.',
      'Kostenlos gibt es hier gar nichts. Du musst dafür arbeiten.'
    ]},
    { k: 'card', title: 'Bist du bereit?', cta: 'Bereit', blocks: [
      { t: 'p', text: 'Bevor du hier irgendetwas verkaufst, musst du beweisen, dass du bereit bist. SpongeBob macht das jeden Morgen.' },
      { t: 'shout', text: 'Zehn Hampelmänner.' },
      { t: 'p', text: 'Zu jedem gehört ein Text, und der ist zweigeteilt. Beim Auseinandergehen sagst du „Ich bin …", und sobald die Hände über dem Kopf zusammenklatschen, kommt das „BEREIT!" hinterher.' },
      { t: 'p', text: 'Zehnmal. Lauter, als dir lieb ist. Wer den Text vergisst, dem zählt der Hampelmann nicht.' }
    ]},

    { k: 'card', title: 'Der Chef hat es gehört', cta: 'An den Tresen', blocks: [
      { t: 'p', text: 'Zehn Hampelmänner später bist du außer Atem, und der halbe Meeresgrund hat es gehört.' },
      { t: 'p', text: 'Mr. Krabs steckt den Kopf aus dem Büro. Lautstärke interessiert ihn nur, wenn sie sich zu Geld machen lässt. Bei dir ist er sich nicht sicher, aber neugierig.' },
      { t: 'quote', text: 'Der Junge hat Lunge. Lunge kann man verkaufen.' },
      { t: 'p', text: 'Er zeigt auf den Tresen. Dort wartet bereits ein Kunde.' }
    ]},

    { k: 'card', title: 'Der Krosse-Krabbe-Einstellungstest', cta: 'Aufgabe bestanden', blocks: [
      { t: 'p', text: 'Verkauf dem Kunden einen imaginären Krabbenburger. Drei Dinge sind dabei Pflicht.' },
      { t: 'check', items: [
        'Den Kunden völlig übertrieben begrüßen',
        'Mindestens drei komplett bescheuerte Zutaten anbieten',
        'Einmal so lächerlich wie möglich wie SpongeBob lachen'
      ]},
      { t: 'p', text: 'Und egal wie es läuft, am Ende stellst du ihm noch diese eine Frage.' },
      { t: 'quote', text: 'Möchten Sie dazu Mayonnaise als Instrument?' }
    ]},
    { k: 'card', title: 'Eingestellt', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Der Kunde zahlt. Freiwillig. Für einen Burger, den es nicht gibt.' },
      { t: 'p', text: 'Mr. Krabs starrt auf die Münze in seiner Schere, dann auf dich. In seinen Augen passiert etwas, das man dort sonst nie sieht: Respekt.' },
      { t: 'quote', text: 'Du verkaufst Nichts an Jemanden. Das ist die reinste Form von Handel, die es gibt.' },
      { t: 'p', text: 'SpongeBob quietscht vor Begeisterung und schiebt dir etwas über den Tresen — schnell, bevor sein Chef es sich anders überlegt.' }
    ]},
    { k: 'award', emoji: '\u{1F35B}', name: 'Pineapple Curry', pic: 'unlock-spongebob', sub: 'SpongeBob', spice: true,
      cta: 'Nächstes Portal',
      note: 'Auf dem Gewürz klebt ein Rätsel. Die Lösung ist der Code für das nächste Portal.' }
  ],
  guests: [
    { role: 'Alle Gäste — Teil 1', blocks: [
      { t: 'p', text: 'Steff macht zehn Hampelmänner. Zählt laut mit.' },
      { t: 'p', text: 'Bei jedem einzelnen muss beides kommen: beim Auseinandergehen „Ich bin …", beim Klatschen über dem Kopf „BEREIT!"' },
      { t: 'p', text: 'Fehlt eines von beiden, zählt der Hampelmann nicht.' }
    ]},
    { role: 'Gast 1 — Der Kunde (Teil 2)', blocks: [
      { t: 'p', text: 'Setz oder stell dich an den Tresen und sei richtig schwierig:' },
      { t: 'list', items: [
        '„Was ist denn da drauf?"',
        '„Das klingt überhaupt nicht lecker."',
        '„Haben Sie nichts Vernünftiges?"',
        '„Warum kostet der 97 Euro?"'
      ]},
      { t: 'p', text: 'Steff muss trotzdem weiterverkaufen.' }
    ]},
    { role: 'Gast 2 — optional (Teil 2)', blocks: [
      { t: 'p', text: 'Wenn Steff nach der Mayonnaise fragt, antworte völlig trocken:' },
      { t: 'quote', text: 'Ist Mayonnaise ein Instrument?' }
    ]}
  ],
  riddle: {
    lines: [
      'In der nächsten Welt können manche Menschen Wasser, Erde, Feuer oder Luft kontrollieren.',
      'Nur eine besondere Person kann alle vier Elemente beherrschen.',
      'Wie nennt man diese Person?'
    ],
    hint: 'A _ _ _ _ _'
  }
},

/* ---------- Welt 3 ---------------------------------------- */
{
  id: 'avatar', nr: 3, type: 'world', theme: 'avatar', emoji: '\u{1F525}',
  name: 'Avatar', place: 'Tempelhof der Feuerbändiger', img: 'welt3-avatar',
  brief: 'Erst ein Biss in eine scharfe Chili, dann die Feuerbändiger-Prüfung. Die Techniken kennt er NICHT.',
  gate: { hash: '87bbe879c7a5f5784a70384bb49fa9513a6a3fbe4c2d388635e3c87611c03fae' },
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Vier große Völker. Vier Elemente: Wasser, Erde, Feuer und Luft.',
      'Manche Menschen können jeweils eines davon kontrollieren — man nennt sie Bändiger. Nur eine einzige Person beherrscht alle vier.',
      'Dein Gewürz liegt bei den Feuerbändigern. Und die geben es nur an jemanden heraus, der selbst Feuer kontrollieren kann.',
      'Du kannst das natürlich nicht. Aber das müssen die ja nicht wissen.'
    ]},
    { k: 'card', title: 'Die Feuerprobe', cta: 'Runtergeschluckt', blocks: [
      { t: 'needs', who: 'crew', items: ['1 scharfe Chili', 'Milch oder Joghurt bereitstellen — für danach'] },
      { t: 'p', text: 'Feuerbändiger erkennt man nicht an der Bewegung. Man erkennt sie an der Hitze.' },
      { t: 'p', text: 'Vor dir liegt etwas sehr Kleines und sehr Rotes. Ein Biss genügt — mehr verlangt hier niemand von dir.' },
      { t: 'shout', text: 'Ein Biss. Nicht zögern.' },
      { t: 'p', text: 'Solange du kaust, wird nichts getrunken. Danach schon — und vermutlich willst du das dann auch ziemlich dringend.' }
    ]},

    { k: 'card', title: 'Es brennt', cta: 'Auf den Tempelhof', blocks: [
      { t: 'p', text: 'Dein Gesicht läuft rot an. Deine Augen tränen. Irgendwo in dir passiert gerade etwas zutiefst Chemisches.' },
      { t: 'p', text: 'Genau darauf haben die Feuerbändiger gewartet.' },
      { t: 'quote', text: 'Seht ihr? Das Feuer ist längst in ihm. Er muss es nur noch herauslassen.' },
      { t: 'p', text: 'Sie führen dich hinaus auf den Tempelhof. Dort steht schon jemand bereit.' }
    ]},

    { k: 'card', title: 'Die Feuerbändiger-Prüfung', cta: 'Aufgabe bestanden', blocks: [
      { t: 'p', text: 'Stell dich in Kampfposition. Dir werden Feuertechniken zugerufen, und zu jeder improvisierst du sofort eine passende Bewegung.' },
      { t: 'p', who: 'steff', text: 'Welche Techniken kommen, siehst du hier bewusst nicht. Du erfährst sie erst in dem Moment, in dem sie gerufen werden.' },
      { t: 'shout', who: 'steff', text: 'Zeit zum Nachdenken: keine.' },
      { t: 'p', who: 'steff', text: 'Geräusche sind ausdrücklich erwünscht.' },
      { t: 'h', who: 'crew', text: 'Diese Techniken ruft ihr auf' },
      { t: 'cmds', who: 'crew', items: [
        { n: 'FEUERBALL LINKS!',      d: 'Ausfallschritt, Faust nach links raus.' },
        { n: 'FEUERBALL RECHTS!',     d: 'Dasselbe. Andere Seite.' },
        { n: 'FEUERWAND!',            d: 'Beide Arme, breite Bewegung von unten nach oben.' },
        { n: 'DOPPELTER FEUERSTOSS!', d: 'Zwei Schläge, schnell hintereinander.' },
        { n: 'DRACHENFLAMME!',        d: 'Große kreisende Bewegung.' }
      ]},
      { t: 'h', who: 'crew', text: 'Zum Abschluss' },
      { t: 'shout', who: 'crew', text: 'ULTIMATIVE FEUERBÄNDIGER-TECHNIK!' },
      { t: 'p', who: 'crew', text: 'Hier muss Steff eine maximal übertriebene Bewegung mit dramatischer Endpose zeigen. Geräusche erwünscht.' }
    ]},
    { k: 'card', title: 'Das Urteil', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Der Prüfer schweigt lange.' },
      { t: 'quote', text: 'Technisch war das kein Feuerbändigen. Technisch war das gar nichts. Aber du hast keine einzige Sekunde gezögert.' },
      { t: 'p', text: 'Er nickt den Wachen zu. Die Tore des Tempels öffnen sich.' },
      { t: 'p', text: 'Wer freiwillig in eine Chili beißt, nur um Feuer vorzutäuschen, hat sich etwas verdient. Er reicht dir etwas aus dem Tempelvorrat. Es ist warm. Frag lieber nicht, warum.' }
    ]},
    { k: 'award', emoji: '\u{1F336}️', name: 'Brizzel', pic: 'unlock-avatar', sub: 'Avatar', spice: true,
      cta: 'Nächstes Portal',
      note: 'Auf dem Gewürz klebt ein Rätsel. Die Lösung ist der Code für das nächste Portal.' }
  ],
  guests: [
    { role: 'Alle Gäste — Teil 1', blocks: [
      { t: 'p', text: 'Überreicht Steff die Chili. Ein beherzter Biss reicht völlig, sie muss nicht ganz gegessen werden — das Ding ist scharf genug.' },
      { t: 'p', text: 'Milch oder Joghurt stehen bereit, aber erst danach. Wenn er rot anläuft, geht es weiter.' }
    ]},
    { role: 'Gast 1 — Feuermeister (Teil 2)', blocks: [
      { t: 'p', text: 'Steff sieht diese Liste nicht. Ruf die Techniken schnell und in wechselnder Reihenfolge auf, er soll keine Zeit zum Nachdenken haben:' },
      { t: 'cmds', items: [
        { n: 'FEUERBALL LINKS!',      d: 'Ausfallschritt, Faust nach links raus.' },
        { n: 'FEUERBALL RECHTS!',     d: 'Dasselbe. Andere Seite.' },
        { n: 'FEUERWAND!',            d: 'Beide Arme, breite Bewegung von unten nach oben.' },
        { n: 'DOPPELTER FEUERSTOSS!', d: 'Zwei Schläge, schnell hintereinander.' },
        { n: 'DRACHENFLAMME!',        d: 'Große kreisende Bewegung.' }
      ]},
      { t: 'p', text: 'Ganz zum Schluss, richtig laut:' },
      { t: 'shout', text: 'ULTIMATIVE FEUERBÄNDIGER-TECHNIK!' }
    ]},
    { role: 'Gast 2 — Prüfer (Teil 2)', blocks: [
      { t: 'p', text: 'Bewerte anschließend laut mit genau einem der beiden Urteile:' },
      { t: 'list', items: ['„Feuerbändiger!"', '„Menschlicher Gasgrill!"'] }
    ]},
    { role: 'Alle anderen', blocks: [
      { t: 'p', text: 'Applaus. Er besteht unabhängig vom Ergebnis.' }
    ]}
  ],
  riddle: {
    lines: [
      'In der nächsten Welt gibt es einen mächtigen Ring.',
      'Ein kleiner Hobbit soll ihn zerstören und muss ihn dafür zu einem Vulkan bringen.',
      'Wie heißt dieser Hobbit?'
    ],
    hint: 'F _ _ _ _'
  }
},

/* ---------- Welt 4 ---------------------------------------- */
{
  id: 'lotr', nr: 4, type: 'world', theme: 'lotr', emoji: '\u{1F48D}',
  name: 'Der Herr der Ringe', place: 'Ein Hügel in Mittelerde', img: 'welt4-hdr',
  brief: 'Steff wird blind ein Gegenstand in die Hand gedrückt. Danach Rede — und ihr klaut.',
  gate: { hash: 'ff6668c9c0541301b18b3da3be4f719151eb0f873f3b74dbb036ee00434cee0f' },
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Mittelerde. Hier leben Menschen, Elben, Zwerge — und Hobbits.',
      'Hobbits sind kleine, gemütliche Wesen mit haarigen Füßen und einer sehr großen Begeisterung für Essen.',
      'Ein Hobbit namens Sam liebt vor allem eines. Was das ist, verrät dir hier niemand.',
      'Sam hat dein nächstes Gewürz. Rausrücken tut er es nur, wenn du erkennst, was ihm so wichtig ist.'
    ]},

    { k: 'card', title: 'Erkenne es blind', cta: 'Erkannt', blocks: [
      { t: 'needs', who: 'crew', items: ['1 echte Kartoffel', '1 Augenbinde, Schal oder Tuch'] },
      { t: 'p', text: 'Sam rückt sein Gewürz nur an jemanden heraus, der versteht, was ihm wirklich wichtig ist. Beweisen sollst du das ohne Augen.' },
      { t: 'p', text: 'Man verbindet sie dir und drückt dir etwas in die Hand.' },
      { t: 'shout', text: 'Nur mit den Händen.' },
      { t: 'p', text: 'Nicht blinzeln, nicht schummeln. Sag laut, was du da hältst — genau das ist es, was Sam über alles liebt.' }
    ]},

    { k: 'card', title: 'Richtig erkannt', cta: 'Erklären', blocks: [
      { t: 'p', text: 'Die Augenbinde fällt. In deiner Hand liegt tatsächlich genau das, was du gesagt hast.' },
      { t: 'p', text: 'Sam jubelt so laut, dass in den Hügeln ringsum zwei Türen aufgehen.' },
      { t: 'quote', text: 'Blind! Er hat sie blind erkannt!' },
      { t: 'p', text: 'Dann wird er unvermittelt ernst, legt dir die Kartoffel wieder in die Hände und sieht dich prüfend an.' },
      { t: 'quote', text: 'Erkennen kann sie jeder. Aber verstehst du auch, was sie bedeutet?' }
    ]},
    { k: 'card', title: 'Die Kartoffelrede', cta: 'Aufgabe bestanden', blocks: [
      { t: 'p', text: 'Jetzt musst du liefern. Du hast eine Minute für eine möglichst epische Rede darüber, warum Kartoffeln das wichtigste Lebensmittel überhaupt sind.' },
      { t: 'p', text: 'Währenddessen versuchen die Gäste, dir die Kartoffel zu klauen. Verteidige sie als Gollum, und mindestens einmal muss dabei dieser Satz fallen.' },
      { t: 'shout', text: 'MEIN SCHATZ!' },
      { t: 'p', text: 'Schafft es jemand wirklich, sie dir abzunehmen, fängt die Minute von vorne an.' }
    ]},
    { k: 'card', title: 'Sam ist überzeugt', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Deine Rede hat er sich bis zum letzten Wort angehört. Zweimal hat er dabei geweint — einmal, weil sie so schön war, und einmal, weil du die Kartoffel beinahe verloren hättest.' },
      { t: 'quote', text: 'Genau so. Genau so habe ich das gemeint.' },
      { t: 'p', text: 'Er nimmt dir die Kartoffel ab, wischt sie sorgfältig an seiner Weste sauber und lässt sie in seinem Beutel verschwinden.' },
      { t: 'p', text: 'Dafür kramt er etwas anderes hervor und drückt es dir in die Hand.' },
      { t: 'quote', text: 'Das gehört dazu. Ohne das ist alles nur halb so gut.' }
    ]},
    { k: 'award', emoji: '\u{1F954}', name: 'Tüften Pott', pic: 'unlock-lotr', sub: 'Herr der Ringe', spice: true,
      cta: 'Nächstes Portal',
      note: 'Auf dem Gewürz klebt ein Rätsel. Die Lösung ist der Code für das nächste Portal.' }
  ],
  guests: [
    { role: 'Gast 1 — Sam', blocks: [
      { t: 'p', text: 'Verbinde Steff die Augen und drück ihm die Kartoffel in die Hand. Dann frag:' },
      { t: 'quote', text: 'Was hältst du in deinen Händen?' },
      { t: 'p', text: 'Nicht helfen, keine Tipps. Er darf so lange raten und tasten, wie er braucht. Erst wenn „Kartoffel" fällt, geht es weiter.' }
    ]},
    { role: 'Alle — Kartoffeldiebe', blocks: [
      { t: 'p', text: 'Steff hält eine Minute lang eine Rede über Kartoffeln. Während der ganzen Zeit dürft ihr versuchen, sie ihm abzunehmen:' },
      { t: 'list', items: ['langsam danach greifen', 'ablenken und zugreifen', 'zu zweit von beiden Seiten'] },
      { t: 'p', text: 'Wer sie wirklich zu fassen bekommt, gewinnt — dann startet die Zeit von vorn.' },
      { t: 'p', text: 'Steff muss sich dabei in Gollum verwandeln und mindestens einmal „Mein Schatz!" rufen.' }
    ]}
  ],
  riddle: {
    lines: [
      'In einer weit, weit entfernten Galaxis kämpfen besondere Krieger mit leuchtenden Schwertern.',
      'Sie benutzen eine unsichtbare Energie, mit der sie sogar Gegenstände bewegen können.',
      'Wie heißt diese Energie?'
    ],
    hint: null
  }
},

/* ---------- Welt 5 ---------------------------------------- */
{
  id: 'starwars', nr: 5, type: 'world', theme: 'starwars', emoji: '⭐',
  name: 'Star Wars', place: 'Kontrollpunkt des Imperiums', img: 'welt5-starwars',
  brief: 'Steff versucht den Jedi-Trick. Einer spielt den Wachposten und sagt zweimal Nein.',
  gate: { hash: '948c2674ef58db0bd05d7ca2167b07ee6faa6bafe7b1d28ef5bb4144d608dc38' },
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Du landest auf einem riesigen Raumschiff des bösen Imperiums.',
      'In dieser Galaxis gibt es besondere Krieger namens Jedi. Sie benutzen eine geheimnisvolle Energie: die Macht.',
      'Ihre Gegner werden von Darth Vader angeführt — schwarze Rüstung, sehr tiefe Stimme, extrem auffällige Atemgeräusche.',
      'Das Imperium hat dein Gewürz beschlagnahmt. Um es zurückzubekommen, musst du an einem Kontrollpunkt vorbei.'
    ]},
    { k: 'card', title: 'Jedi-Gedankenkontrolle', cta: 'Aufgabe beendet?', blocks: [
      { t: 'p', text: 'Stell dich vor den Wachposten. Möglichst ernste Jedi-Stimme, dazu die typische Handbewegung — und dann sagst du diesen Satz.' },
      { t: 'quote', text: 'Du möchtest mich durchlassen und mir außerdem sagen, dass ich heute außergewöhnlich gut aussehe.' },
      { t: 'p', text: 'Funktioniert nicht? Dann überzeugender. Und nochmal. Die Macht ist stark in dir, das kriegst du hin.' }
    ]},

    { k: 'card', title: 'Er rührt sich nicht', cta: 'Plan B', blocks: [
      { t: 'p', text: 'Du hast es versucht. Mehrfach. Jedes Mal kam ein „Nein", so trocken, dass es fast schon wieder beeindruckend ist.' },
      { t: 'p', text: 'Der Jedi-Trick wirkt nur bei schwachen Geistern. Dieser hier scheint überhaupt keinen zu haben.' },
      { t: 'p', text: 'In deinem Ohr knackt es. Rick meldet sich aus der Garage.' },
      { t: 'quote', text: 'Okay, das war peinlich. Wir machen das anders. Wenn er dich nicht durchlassen will, dann muss er dich eben durchlassen wollen. Umschalten.' }
    ]},
    { k: 'card', title: 'Neues Protokoll', cta: 'Aufgabe bestanden', blocks: [
      { t: 'p', text: 'Der Jedi-Weg ist gescheitert. Also versuchst du es mit dem, wovor an Bord dieses Schiffes wirklich jeder Respekt hat.' },
      { t: 'shout', text: 'Imitiere Darth Vader.' },
      { t: 'check', items: [
        'Darth Vaders Atemgeräusche nachmachen',
        'So tief sprechen wie irgend möglich',
        'Den Wachposten bedrohen'
      ]},
      { t: 'p', text: 'Womit du drohst, überlegst du dir selbst. Der Anfang ist dir geschenkt.' },
      { t: 'quote', text: 'Wenn du mich nicht durchlässt, dann …' }
    ]},
    { k: 'card', title: 'Sie dürfen passieren', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Der Wachposten tritt zur Seite.' },
      { t: 'quote', text: 'Der Trick mit der Hand war erbärmlich. Aber die Stimme … die Stimme war beunruhigend gut.' },
      { t: 'p', text: 'Er sieht sich um, ob jemand zuhört, und senkt die Stimme.' },
      { t: 'quote', text: 'Nehmen Sie das hier mit. Wurde letzte Woche beschlagnahmt, und die Kantine an Bord ist eine Zumutung. Und Sie haben mich nie gesehen.' }
    ]},
    { k: 'award', emoji: '\u{1F9C2}', name: 'Salttrooper', pic: 'unlock-starwars', sub: 'Star Wars', spice: true,
      cta: 'Nächstes Portal',
      note: 'Auf dem Gewürz klebt ein Rätsel. Die Lösung ist der Code für das nächste Portal.' }
  ],
  guests: [
    { role: 'Gast 1 — Imperialer Wachposten', blocks: [
      { t: 'p', text: 'Egal wie oft Steff den Jedi-Trick versucht und wie überzeugend er dabei ist — antworte jedes Mal völlig trocken:' },
      { t: 'shout', text: 'Nein.' },
      { t: 'p', text: 'Irgendwann tippt der Spielleiter auf Weiter, dann bekommt Steff eine neue Aufgabe: Darth Vader imitieren. Davon weiß er vorher nichts.' },
      { t: 'p', text: 'Lass ihn erst durch, wenn alle drei Punkte erfüllt sind:' },
      { t: 'check', items: [
        'Die Darth-Vader-Stimme ist akzeptabel',
        'Ein Atemgeräusch kam vor',
        'Steff hat eine eigene Drohung improvisiert'
      ]},
      { t: 'p', text: 'Dann: „Sie dürfen passieren."' }
    ]},
    { role: 'Alle anderen', blocks: [
      { t: 'p', text: 'Zuschauen und den Wachposten notfalls daran erinnern, hart zu bleiben.' }
    ]}
  ],
  riddle: {
    lines: [
      'Dein nächster Gastgeber ist ein Kater.',
      'Er ist orange. Er hasst Montage. Er liebt Lasagne.',
      'Und körperliche Anstrengung betrachtet er als persönlichen Angriff.',
      'Wie heißt er?'
    ],
    hint: null
  }
},

/* ---------- Welt 6 ---------------------------------------- */
{
  id: 'garfield', nr: 6, type: 'world', theme: 'garfield', emoji: '\u{1F431}',
  name: 'Garfield', place: 'Garfields Wohnzimmer', img: 'welt6-garfield',
  brief: 'Steff baut Gegenstände zu Faulheits-Hilfsmitteln um. Danach bedient er euch als Garfields Butler.',
  gate: { hash: '5094dcad61aca84adae760a3a4ef66bd00284a17a39286132c3b641ddbad87df' },
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Ein Sofa. Ein Kater. Orange.',
      'Garfield liebt: Lasagne, Schlafen und Nichtstun.',
      'Garfield hasst: Montage, Sport, Arbeit und unnötige Bewegung.',
      'Er hat dein sechstes Gewürz — und gibt es nur an jemanden weiter, der seine Lebensphilosophie wirklich verstanden hat.'
    ]},
    { k: 'card', title: 'Garfields Erfindungsprüfung', cta: 'Aufgabe bestanden', blocks: [
      { t: 'needs', who: 'crew', items: ['3 banale Alltagsgegenstände aus dem Raum'] },
      { t: 'p', text: 'Garfield hat ein Lebenswerk: Aufwand abschaffen. Wer sein Gewürz will, muss beweisen, dass er das genauso ernst nimmt wie er.' },
      { t: 'p', text: 'Man reicht dir nacheinander drei Alltagsgegenstände. Zu jedem erklärst du, wie man ihn umbauen müsste, damit man sich künftig noch weniger bewegen muss.' },
      { t: 'shout', text: 'Drei Gegenstände. Keine Ausreden.' },
      { t: 'p', text: 'Je absurder die Erfindung, desto besser. Aufstehen ist dabei ausdrücklich nicht vorgesehen.' },
      { t: 'p', text: 'Würde eine Erfindung selbst zu viel Aufwand bedeuten, rufen alle „UNNÖTIG!" — dann musst du nachbessern.' }
    ]},

    { k: 'card', title: 'Ein besseres Werkzeug', cta: 'Dienst antreten', blocks: [
      { t: 'p', text: 'Garfield hat deine Erfindungen kommentarlos zur Kenntnis genommen. Bei einer hat er kurz genickt. Das ist viel.' },
      { t: 'p', text: 'Dann richtet er sich ein Stück auf. Bei ihm entspricht das ungefähr einem Sprint.' },
      { t: 'quote', text: 'Erfindungen sind ja ganz nett. Aber weißt du, was noch weniger Aufwand macht als eine Maschine? Jemand, der es einfach für einen erledigt.' },
      { t: 'p', text: 'Er mustert dich von oben bis unten und lässt sich zurück ins Kissen fallen.' },
      { t: 'quote', text: 'Wer bei mir etwas will, fängt unten an.' }
    ]},
    { k: 'card', title: 'Garfields Butler', cta: 'Aufgabe bestanden', blocks: [
      { t: 'needs', who: 'crew', items: ['Getränke, Gläser und etwas zum Servieren'] },
      { t: 'p', text: 'Ab sofort bist du im Dienst. Garfield rührt sich nicht, also übernimmst du das.' },
      { t: 'shout', text: 'Jeder Gast wird gefragt.' },
      { t: 'p', text: 'Geh reihum durch den Raum und frag jeden einzeln, ob er Durst hat. Wer ja sagt, bekommt ein frisches Getränk gebracht — von dir, an den Platz.' },
      { t: 'p', text: 'Niemand wird übersprungen, und niemand muss dafür aufstehen. Genau darum geht es hier.' },
      { t: 'p', text: 'Haltung: aufrecht. Ton: höflich. Tempo: zügig.' }
    ]},
    { k: 'card', title: 'Garfield ist beeindruckt', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Alle haben etwas zu trinken. Und niemand im Raum musste dafür auch nur aufstehen.' },
      { t: 'p', text: 'Garfield hat das Ganze aus dem Liegen verfolgt und dabei nicht ein einziges Mal die Position gewechselt.' },
      { t: 'quote', text: 'Du hast dafür gesorgt, dass sich außer dir niemand bewegen musste. Weißt du eigentlich, wie selten so jemand ist?' },
      { t: 'p', text: 'Er streckt eine Pfote aus und schiebt dir etwas hin. Weiter bewegt er sich nicht. Für seine Verhältnisse ist das eine Umarmung.' }
    ]},
    { k: 'award', emoji: '\u{1F35D}', name: 'Gemüselasagne', pic: 'unlock-garfield', sub: 'Garfield', spice: true,
      cta: 'Nächstes Portal',
      note: 'Auf dem Gewürz klebt ein Rätsel. Die Lösung ist der Code für das nächste Portal.' }
  ],
  guests: [
    { role: 'Alle Gäste — Teil 1', blocks: [
      { t: 'p', text: 'Sammelt drei banale Gegenstände ein, die ohnehin im Raum liegen:' },
      { t: 'list', items: ['Fernbedienung', 'Löffel', 'Socke', 'Kissen', 'Ladekabel', 'Wasserflasche', 'Decke'] },
      { t: 'p', text: 'Drückt sie Steff nacheinander in die Hand. Zu jedem muss er erklären, wie man den Gegenstand umbaut, damit man sich künftig weniger bewegen muss.' },
      { t: 'p', text: 'Klingt eine Erfindung selbst nach Arbeit, ruft alle im Chor:' },
      { t: 'shout', text: 'Unnötig!' },
      { t: 'p', text: 'Dann muss er nachbessern. Aufstehen gilt nicht.' }
    ]},
    { role: 'Alle Gäste — Teil 2', blocks: [
      { t: 'p', text: 'Steff kommt als Butler reihum zu euch und fragt jeden einzeln, ob er Durst hat.' },
      { t: 'p', text: 'Antwortet ehrlich. Wer ja sagt, lässt sich auch wirklich etwas bringen — sonst ist es keine Aufgabe.' },
      { t: 'p', text: 'Wer übersprungen wird, meldet sich lautstark. Bleibt dabei sitzen, aufstehen ist hier verboten.' }
    ]}
  ],
  riddle: {
    lines: [
      'Der Mann, der für dieses gesamte Chaos verantwortlich ist:',
      'Er ist Wissenschaftler. Er reist durch verschiedene Dimensionen.',
      'Und er schleppt seinen Enkel Morty ständig mit.',
      'Wie heißt er?'
    ],
    hint: null
  }
},

/* ---------- Welt 7 ---------------------------------------- */
{
  id: 'rickmorty', nr: 7, type: 'world', theme: 'rick', emoji: '\u{1F952}',
  name: 'Rick & Morty', place: 'Ricks Garage', img: 'welt7-rickmorty',
  brief: 'Finale: Steff wird in etwas Grünes gewickelt und hält die Pickle-Steff-Rede.',
  gate: { hash: '5efc60b80fa21baa18d66c9a9c33c51e2b87fba0876709d4c8909aa3ed7fbbde' },
  screens: [
    { k: 'image', cta: 'Weiter' },

    { k: 'hero', cta: 'Zur Aufgabe', story: [
      'Du bist wieder da, wo alles angefangen hat.',
      'Rick erklärt dir: Das siebte Gewürz war die ganze Zeit hier. Er hatte schlicht vergessen, dass es noch in seiner Garage rumliegt.',
      'Einfach so bekommst du es trotzdem nicht. Nach sechs bestandenen Prüfungen braucht es natürlich ein Finale.'
    ]},
    { k: 'card', title: 'Die Verwandlung', cta: 'Ich bin bereit', blocks: [
      { t: 'needs', who: 'crew', items: ['grüne Decke, grünes Handtuch oder großes grünes Kleidungsstück'] },
      { t: 'p', text: 'Rick hat sich in der Serie einmal selbst in eine Gurke verwandelt. Daraus wurde: PICKLE RICK. Also musst du jetzt dasselbe tun.' },
      { t: 'p', text: 'Lass dich von den Gästen möglichst gurkenartig einwickeln. Je unbeweglicher, desto besser.' }
    ]},

    { k: 'card', title: 'Verwandlung abgeschlossen', cta: 'Und jetzt?', blocks: [
      { t: 'p', text: 'Du bist jetzt vollständig grün und weitgehend bewegungsunfähig.' },
      { t: 'p', text: 'Rick umrundet dich einmal langsam und begutachtet das Ergebnis wie ein Gutachter eine Schadensmeldung.' },
      { t: 'quote', text: 'Okay. Okay! Das ist … erschreckend überzeugend. Ich hab damals drei Tage und ein halbes Labor gebraucht. Du hast eine Decke benutzt.' },
      { t: 'p', text: 'Er tritt einen Schritt zurück und verschränkt die Arme.' }
    ]},
    { k: 'card', title: 'Pickle Steff', cta: 'Aufgabe bestanden', blocks: [
      { t: 'p', text: 'Du bist jetzt Pickle Steff.' },
      { t: 'p', text: 'Damit auch der Letzte im Raum begreift, wen er da vor sich hat, rufst du es einmal so laut heraus, wie du kannst.' },
      { t: 'shout', text: 'ICH BIN PICKLE STEFF!' },
      { t: 'p', text: 'Danach hast du eine Minute, um allen zu erklären, warum ausgerechnet du das gefährlichste Wesen im gesamten Multiversum bist. Je absurder die Begründung, desto besser.' }
    ]},
    { k: 'card', title: 'Rick klatscht', cta: 'Was ist das?', blocks: [
      { t: 'p', text: 'Stille in der Garage. Dann fängt Rick an zu klatschen. Langsam. Einmal. Zweimal.' },
      { t: 'quote', text: 'Weißt du, was das Verrückte ist? Bei mir gab es wenigstens einen Grund — ich wollte einer Familientherapie entgehen. Du machst das freiwillig. Auf deiner eigenen Geburtstagsfeier.' },
      { t: 'p', text: 'Er wischt sich etwas aus dem Augenwinkel und behauptet, das sei Portalflüssigkeit.' },
      { t: 'quote', text: 'Hier. Lag die ganze Zeit da drüben. Sieben von sieben, Steff.' }
    ]},
    { k: 'award', emoji: '\u{1F952}', name: 'Pickle Rick Flavor', pic: 'unlock-rickmorty', sub: 'Rick & Morty', spice: true,
      cta: 'Letztes Portal',
      note: 'Sieben von sieben. Und trotzdem klebt auf diesem Gewürz noch ein Rätsel.' }
  ],
  guests: [
    { role: 'Gast 1 & Gast 2 — Teil 1', blocks: [
      { t: 'p', text: 'Wickelt Steff möglichst gurkenartig in die grüne Decke bzw. das Handtuch ein. Je unbeweglicher, desto besser.' },
      { t: 'p', text: 'Wenn er fertig verpackt ist, tippt der Spielleiter auf Weiter.' }
    ]},
    { role: 'Alle Gäste — Teil 2', blocks: [
      { t: 'p', text: 'Fordert ihn auf:' },
      { t: 'shout', text: 'Identifiziere dich!' },
      { t: 'p', text: 'Er muss „Ich bin Pickle Steff!" rufen und danach eine Minute lang erklären, warum Pickle Steff das gefährlichste Wesen im Multiversum ist.' },
      { t: 'p', text: 'Ganz am Ende muss einer von euch fragen:' },
      { t: 'quote', text: 'Und warum genau sollten wir Angst vor dir haben?' }
    ]}
  ],
  riddle: {
    lines: [
      'Sieben Welten sind geschafft. Sieben Gewürze sind dein.',
      'Doch Rick versprach dir noch mehr.',
      'Das letzte Passwort beschreibt einen Tag, den man einmal im Jahr feiert.',
      'Man bekommt Geschenke, obwohl man eigentlich nur älter geworden ist.',
      'Was feiern wir heute?'
    ],
    hint: null
  }
},

/* ---------- 8 | FINALE ------------------------------------ */
{
  id: 'finale', nr: 8, type: 'finale', theme: 'finale', emoji: '\u{1F389}',
  name: 'Ricks Belohnung', place: 'Deine Küche', img: 'finale',
  brief: 'Abschluss. Der Mini-Reiskocher wird überreicht — haltet die Kamera bereit.',
  gate: { hash: '892014575be5ac6a08d9e5e4b4a79b1c4441ca57d4d431e23435cb87282655ab' },
  screens: [
    { k: 'card', title: 'Passwort akzeptiert', cta: 'Rick meldet sich', blocks: [
      { t: 'banner', items: ['PASSWORT AKZEPTIERT', 'ÜBERPRÜFE MISSIONSSTATUS'] },
      { t: 'stats', items: [
        ['TMNT-Dimension', '✅'],
        ['Bikini Bottom', '✅'],
        ['Feuernation', '✅'],
        ['Mittelerde', '✅'],
        ['Imperium', '✅'],
        ['Garfield-Dimension', '✅'],
        ['Pickle-Protokoll', '✅']
      ]},
      { t: 'banner', items: ['7 / 7 GEWÜRZE GESICHERT', 'MISSION ERFOLGREICH'] }
    ]},

    { k: 'card', title: 'Rick hat noch was zu sagen', cta: 'Weiter', blocks: [
      { t: 'p', text: 'Steff. Ich muss zugeben: Ich hatte nicht damit gerechnet, dass du es wirklich bis hierhin schaffst.' },
      { t: 'list', items: [
        'Du hast zwanzig Liegestütze gemacht, um eine Schildkröte zu beeindrucken.',
        'Du hast brüllend Hampelmänner gemacht und danach in einem Unterwasserrestaurant gearbeitet.',
        'Du hast in eine Chili gebissen, nur um Feuerbändigen vorzutäuschen.',
        'Du hast eine Kartoffel zu deinem Schatz erklärt.',
        'Du hast einen imperialen Wachposten bedroht.',
        'Du hast Erfindungen präsentiert, deren einziger Zweck es war, Bewegung zu vermeiden.',
        'Du hast im Auftrag eines Katers Getränke serviert.',
        'Und schließlich hast du dich freiwillig in eine Gurke verwandelt.'
      ]},
      { t: 'p', text: 'Alles nur, weil deine Gewürze letztes Jahr abgelaufen waren.' },
      { t: 'p', text: 'Wenn man darüber nachdenkt, ist das eigentlich ziemlich bescheuert. Aber egal.' }
    ]},

    { k: 'card', title: 'Allerdings gibt es ein Problem', cta: 'Artefakt ausgepackt', blocks: [
      { t: 'p', text: 'Du besitzt jetzt sieben neue Gewürze. Sehr schön. Nur … was willst du damit machen?' },
      { t: 'p', text: 'Du kannst sie natürlich wieder in einen Schrank stellen und warten, bis sie ablaufen. Aber nach allem, was heute passiert ist, halte ich das für unverantwortlich.' },
      { t: 'p', text: 'Deshalb habe ich noch etwas organisiert. Der Scanner meldet ein Bonus-Artefakt: kompakt, elektrisch, produziert Nahrung und erfordert überraschend wenig Kompetenz.' },
      { t: 'shout', text: 'Perfekt.' }
    ]},

    { k: 'image', cta: 'Auspacken' },

    { k: 'award', emoji: '\u{1F35A}', name: 'Mini-Reiskocher',
      sub: 'Interdimensionale Nahrungszubereitungseinheit', spice: false, cta: 'Missionsbilanz',
      note: 'Reis rein. Wasser rein. Knopf drücken. Sogar du solltest das schaffen.' },

    { k: 'card', title: 'Finale Missionsbilanz', blocks: [
      { t: 'stats', items: [
        ['Welten besucht', '7 / 7'],
        ['Prüfungen bestanden', '7 / 7'],
        ['Gewürze erhalten', '7 / 7'],
        ['Gewürzschaufel erhalten', '✅'],
        ['Mini-Reiskocher erhalten', '✅'],
        ['Möglichkeit, Reis zu kochen', '✅'],
        ['Ausrede, die neuen Gewürze nicht zu benutzen', '❌'],
        ['Würde', 'nicht mehr zuverlässig messbar'],
        ['Gewürzschrank', 'erfolgreich modernisiert'],
        ['Multiversum', 'gerettet']
      ]},
      { t: 'p', text: 'Ein letzter Hinweis noch. Du hast ab sofort sieben frische Gewürze, eine Gewürzschaufel und einen Reiskocher. Damit wurden sämtliche technischen Voraussetzungen geschaffen, damit sich das Gewürzproblem vom letzten Jahr nicht wiederholt.' },
      { t: 'p', text: 'Bitte lies gelegentlich das Mindesthaltbarkeitsdatum.' },
      { t: 'shout', text: 'Wir machen diesen Scheiß nächstes Jahr nicht nochmal.' },
      { t: 'p', text: '– Rick' }
    ]}
  ],
  guests: [
    { role: 'Übergabe', blocks: [
      { t: 'p', text: 'Der Mini-Reiskocher wird überreicht. Dazu kommen Geburtstagskarte und Amazon-Gutschein.' },
      { t: 'p', text: 'Die Gewürzschaufel hat Steff schon zu Beginn bekommen.' }
    ]},
    { role: 'Alle Gäste', blocks: [
      { t: 'p', text: 'Applaus, Fotos, fertig. Ihr habt das Multiversum gerettet.' }
    ]}
  ],
  riddle: null
}

];

/* Materialliste für die Spielleiter-Seite */
const MATERIAL = [
  { item: 'Gewürzschaufel', note: 'Intro — wird ganz zu Beginn überreicht' },
  { item: '7 Gewürze', note: 'je eines nach jeder Welt' },
  { item: 'Rätsel-Karten für jedes Gewürz', note: 'Druckvorlage: karten.html' },
  { item: '1 Geschirrtuch', note: 'Welt 1 — TMNT, wird nach den Liegestützen zugeworfen' },
  { item: '1 scharfe Chili', note: 'Welt 3 — Avatar, ein Biss genügt' },
  { item: 'Milch oder Joghurt', note: 'Welt 3 — für direkt nach der Chili' },
  { item: '1 echte Kartoffel', note: 'Welt 4 — Herr der Ringe' },
  { item: '1 Augenbinde, Schal oder Tuch', note: 'Welt 4 — Steff erkennt die Kartoffel blind' },
  { item: 'Getränke und Gläser', note: 'Welt 6 — Steff bedient als Butler die Gäste' },
  { item: '3 banale Alltagsgegenstände', note: 'Welt 6 — liegen ohnehin rum, nichts zu besorgen' },
  { item: '1 grüne Decke oder großes grünes Handtuch', note: 'Welt 7 — Pickle Steff' },
  { item: 'Mini-Reiskocher', note: 'Finale' },
  { item: 'Geburtstagskarte', note: 'Finale' },
  { item: 'Amazon-Gutschein', note: 'Finale' },
  { item: 'Handy mit Steffs Ansicht', note: 'index.html' },
  { item: 'Zweites Handy oder Ausdruck', note: 'diese Spielleiter-Seite' },
  { item: 'Handys der Gäste', note: 'QR-Code auf der Startseite scannen' }
];

if (typeof module !== 'undefined' && module.exports) { module.exports = { STAGES: STAGES, MATERIAL: MATERIAL }; }

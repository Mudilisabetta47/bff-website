/** BOUND FOR FUTURE — sämtliche Inhalte an einem Ort. */

export const BRAND = {
  name: 'BOUND FOR FUTURE',
  short: 'BOUND',
  tagline: 'NÄCHSTER STOPP: ZUKUNFT.',
  claim: 'Digitalagentur für Marke, Web und Wachstum.',
  email: 'mudi@monvex-group.de',
  url: 'https://boundforfuture.de',
  region: 'Deutschland',
  founded: '2026',
  operator: 'MONVEX UG (haftungsbeschränkt) i. G.',
  phone: '0421 499 58 207',
  phoneHref: '+4942149958207',
  operatorUrl: 'https://www.monvex-group.de',
} as const;

export const NAV = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Arbeiten', href: '/#arbeiten' },
  { label: 'Prozess', href: '/#prozess' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Kontakt', href: '/#kontakt' },
] as const;

export const HERO = {
  eyebrow: 'Digitalagentur',
  coords: '51.2°N · 10.4°O',
  line1: 'NÄCHSTER STOPP:',
  line2: 'ZUKUNFT.',
  lead:
    'Wir bauen digitale Auftritte, die nicht mitlaufen, sondern vorausgehen. Marke, Website, Kampagne und Technologie aus einem Guss.',
  primary: { label: 'Projekt starten', href: '/#kontakt' },
  secondary: { label: 'Leistungen ansehen', href: '/#leistungen' },
  scroll: 'Scrollen',
  skip: 'Intro überspringen',
};

export const INTRO = {
  kicker: 'Wer wir sind',
  lines: ['Eine Agentur für alles,', 'was nach dem Logo kommt.'],
  lead:
    'BOUND FOR FUTURE verbindet Strategie, Design und Entwicklung in einem Team. Kein Weiterreichen zwischen Abteilungen, keine Vorlagen aus dem Baukasten — sondern digitale Auftritte, die man nach dem ersten Screen nicht mehr vergisst.',
  points: [
    { n: '01', t: 'Strategie zuerst', d: 'Wir starten mit der Frage, welche Entscheidung ein Mensch treffen soll — und bauen von dort rückwärts.' },
    { n: '02', t: 'Design mit Haltung', d: 'Gestaltung ist kein Anstrich am Ende. Sie ist die Form, in der die Strategie sichtbar wird.' },
    { n: '03', t: 'Technik ohne Ausreden', d: 'Serverseitig gerendert, messbar schnell, wartbar gebaut. Performance ist Teil des Designs.' },
  ],
};

export type ServiceKey =
  | 'webdesign' | 'branding' | 'online-marketing' | 'seo' | 'social-media' | 'digital-solutions';

export interface Service {
  slug: ServiceKey;
  index: string;
  title: string;
  short: string;
  claim: string;
  lead: string;
  metaTitle: string;
  metaDesc: string;
  hero: 'browser' | 'brand' | 'campaign' | 'serp' | 'feed' | 'graph';
  accent: string;
  items: { t: string; d: string }[];
  deliverables: string[];
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: 'webdesign', index: '01', title: 'Webdesign & Websites', short: 'Webdesign',
    claim: 'Websites, die man nicht wegklickt.',
    lead: 'Von der Unternehmenswebsite bis zur Kampagnen-Landingpage: Wir gestalten und bauen digitale Auftritte, die schnell laden, klar führen und im Kopf bleiben.',
    metaTitle: 'Webdesign & Websites — moderne Unternehmenswebsites',
    metaDesc: 'Webdesign aus Deutschland: moderne Unternehmenswebsites, Landingpages, UX/UI und High-End Web Experiences. Schnell, barrierearm, messbar.',
    hero: 'browser', accent: '#FF6A3D',
    items: [
      { t: 'Unternehmenswebsites', d: 'Der digitale Hauptsitz Ihrer Marke — strukturiert, pflegbar und auf Anfragen ausgelegt.' },
      { t: 'Landingpages', d: 'Fokussierte Seiten für Kampagnen, Produkte und Angebote. Ein Ziel, ein Weg, kein Ablenken.' },
      { t: 'UX/UI Design', d: 'Nutzerführung, Informationsarchitektur und Interface-Design vom Wireframe bis zum Prototyp.' },
      { t: 'E-Commerce', d: 'Shops, die sich wie eine Kollektion lesen statt wie ein Katalog.' },
      { t: 'Relaunch', d: 'Bestehende Auftritte analysieren, Inhalte retten, Struktur neu denken — ohne Rankingverlust.' },
      { t: 'Web Experiences', d: 'Scroll-Storytelling, 3D, Motion — dort, wo es die Marke wirklich trägt.' },
    ],
    deliverables: ['Konzept & Struktur', 'Designsystem', 'Interaktiver Prototyp', 'Umsetzung in Next.js', 'Redaktions-Schulung', 'Performance-Budget'],
    faq: [
      { q: 'Wie lange dauert eine neue Website?', a: 'Eine fokussierte Landingpage entsteht in zwei bis drei Wochen. Eine vollständige Unternehmenswebsite liegt üblicherweise bei sechs bis zwölf Wochen — abhängig von Umfang, Inhalten und Abstimmungsrunden.' },
      { q: 'Kann ich Inhalte selbst pflegen?', a: 'Ja. Wir binden ein Headless-CMS an, das genau die Felder zeigt, die Sie wirklich brauchen. Dazu gibt es eine Einweisung und eine kurze Dokumentation.' },
      { q: 'Was kostet eine Website?', a: 'Der Rahmen hängt von Seitenanzahl, Funktionen und Inhaltsproduktion ab. Nach einem ersten Gespräch erhalten Sie eine belastbare Spanne, bevor Aufwand entsteht.' },
    ],
  },
  {
    slug: 'branding', index: '02', title: 'Branding & Corporate Design', short: 'Branding',
    claim: 'Eine Marke ist eine Entscheidung, die man wiedererkennt.',
    lead: 'Positionierung, Identität und ein System, das im Pitch, im Feed und auf dem Karton funktioniert — nicht nur im Logo-Präsentations-PDF.',
    metaTitle: 'Branding & Corporate Design — Markenidentität entwickeln',
    metaDesc: 'Branding und Corporate Design: Markenstrategie, Logo, Farbe, Typografie, Brand Guidelines und Rebranding für Unternehmen in Deutschland.',
    hero: 'brand', accent: '#FFB347',
    items: [
      { t: 'Markenstrategie', d: 'Position, Versprechen, Zielgruppe und Tonalität — schriftlich, entscheidbar, überprüfbar.' },
      { t: 'Logo & Wortmarke', d: 'Ein Zeichen, das in 16 Pixeln und auf zwölf Metern funktioniert.' },
      { t: 'Visual Identity', d: 'Farbe, Typografie, Raster, Bildsprache, Motion — als System, nicht als Sammlung.' },
      { t: 'Brand Guidelines', d: 'Regeln, die Teams befähigen statt zu bremsen. Digital und als PDF.' },
      { t: 'Rebranding', d: 'Bestehende Marken schärfen, ohne das aufzugeben, was bereits erkannt wird.' },
      { t: 'Naming', d: 'Namen, die verfügbar, sprechbar und schützbar sind.' },
    ],
    deliverables: ['Markenkern & Positionierung', 'Logo-Suite', 'Farb- & Typosystem', 'Bild- und Motion-Sprache', 'Brand Guidelines', 'Anwendungsvorlagen'],
    faq: [
      { q: 'Reicht nicht einfach ein Logo?', a: 'Ein Logo ist die Unterschrift, nicht die Marke. Wiedererkennung entsteht durch Farbe, Typografie, Bildsprache und Tonalität — deshalb liefern wir immer ein System, nicht nur ein Zeichen.' },
      { q: 'Wie läuft die Entwicklung ab?', a: 'Erst Positionierung und Strategie, dann zwei bis drei gestalterische Richtungen, dann Ausarbeitung einer Route bis zum vollständigen System. Sie entscheiden an jedem Meilenstein mit.' },
      { q: 'Übernehmen Sie auch die Markenanmeldung?', a: 'Wir prüfen Verfügbarkeit und Verwechslungsgefahr und arbeiten für die Anmeldung mit spezialisierten Kanzleien zusammen.' },
    ],
  },
  {
    slug: 'online-marketing', index: '03', title: 'Online-Marketing', short: 'Marketing',
    claim: 'Aufmerksamkeit ist teuer. Wir kaufen sie klug ein.',
    lead: 'Kampagnen mit klarer Ökonomie: Wir bauen Funnels, messen ehrlich und optimieren auf Umsatz statt auf Impressionen.',
    metaTitle: 'Online-Marketing & Performance Marketing',
    metaDesc: 'Online-Marketing: Google Ads, Meta Ads, Performance Marketing, Kampagnen und Conversion-Optimierung — datenbasiert und auf Umsatz optimiert.',
    hero: 'campaign', accent: '#4DE1B2',
    items: [
      { t: 'Google Ads', d: 'Such-, Shopping- und Performance-Max-Kampagnen mit sauberer Kontostruktur.' },
      { t: 'Meta Ads', d: 'Creatives, Zielgruppen und Testpläne für Instagram und Facebook.' },
      { t: 'Funnel-Aufbau', d: 'Vom ersten Kontakt bis zur Anfrage: Seiten, Angebote und Nachfassstrecken.' },
      { t: 'Conversion-Optimierung', d: 'Hypothesen, Tests, Entscheidungen. Kein Bauchgefühl-Redesign.' },
      { t: 'Tracking & Analytics', d: 'Serverseitiges Tracking, Consent-konform und ohne Datenlücken.' },
      { t: 'Reporting', d: 'Ein Dashboard, das die drei Zahlen zeigt, die wirklich zählen.' },
    ],
    deliverables: ['Kanal- & Budgetplan', 'Kampagnenstruktur', 'Creatives & Anzeigentexte', 'Landingpages', 'Tracking-Setup', 'Monatliches Reporting'],
    faq: [
      { q: 'Ab welchem Budget lohnt sich das?', a: 'Für lokale Dienstleister lohnen sich Kampagnen oft schon ab etwa 500 € Mediabudget im Monat. Entscheidend ist weniger die Höhe als die Klarheit des Angebots und die Qualität der Zielseite.' },
      { q: 'Wann sehe ich erste Ergebnisse?', a: 'Erste Daten liegen nach wenigen Tagen vor, belastbare Aussagen meist nach zwei bis vier Wochen. Skalieren macht erst Sinn, wenn die Ökonomie stimmt.' },
      { q: 'Bleiben die Konten in meinem Besitz?', a: 'Immer. Wir arbeiten in Ihren Werbekonten. Sie behalten Zugriff, Daten und Historie — auch wenn die Zusammenarbeit endet.' },
    ],
  },
  {
    slug: 'seo', index: '04', title: 'SEO', short: 'SEO',
    claim: 'Sichtbar genau dann, wenn gesucht wird.',
    lead: 'Technik, Inhalt und Struktur greifen ineinander. Wir bauen Sichtbarkeit, die nicht mit dem nächsten Update verschwindet.',
    metaTitle: 'SEO — technische Optimierung, Local SEO & Content',
    metaDesc: 'SEO für Unternehmen: technisches SEO, Local SEO, OnPage-Optimierung, Content-Strategie und SEO-Landingpages für nachhaltige Sichtbarkeit bei Google.',
    hero: 'serp', accent: '#7FB4FF',
    items: [
      { t: 'Technisches SEO', d: 'Indexierung, Ladezeit, Core Web Vitals, strukturierte Daten, saubere Weiterleitungen.' },
      { t: 'Local SEO', d: 'Unternehmensprofil, Standortseiten, Bewertungen und lokale Signale.' },
      { t: 'OnPage', d: 'Überschriftenlogik, interne Verlinkung, Snippets und Seitenarchitektur.' },
      { t: 'Content-Strategie', d: 'Themen nach Suchintention statt nach Bauchgefühl.' },
      { t: 'Keyword-Strategie', d: 'Priorisierung nach Aufwand, Wettbewerb und tatsächlichem Geschäftswert.' },
      { t: 'SEO-Landingpages', d: 'Eigene Seiten für Leistungen und Städte, die auch ohne Suchmaschine überzeugen.' },
    ],
    deliverables: ['Technisches Audit', 'Keyword- & Themenkarte', 'Seitenarchitektur', 'OnPage-Umsetzung', 'Redaktionsplan', 'Monitoring & Reporting'],
    faq: [
      { q: 'Wie lange dauert SEO?', a: 'Technische Verbesserungen wirken oft innerhalb weniger Wochen. Für Rankings zu umkämpften Begriffen sollten Sie drei bis neun Monate einplanen — abhängig von Domainhistorie und Wettbewerb.' },
      { q: 'Garantieren Sie Platz 1?', a: 'Nein, und niemand sollte das tun. Wir garantieren saubere Technik, belegbare Fortschritte und eine nachvollziehbare Priorisierung.' },
      { q: 'Was ist Local SEO?', a: 'Optimierung für Suchanfragen mit lokalem Bezug — etwa „Werbeagentur Bremen". Dazu gehören Standortseiten, ein gepflegtes Unternehmensprofil, konsistente Kontaktdaten und lokale Inhalte.' },
    ],
  },
  {
    slug: 'social-media', index: '05', title: 'Content & Social Media', short: 'Content & Social',
    claim: 'Wiedererkennbar in einem Feed voller Lärm.',
    lead: 'Formatlogik statt Zufall: Serienformate, die sich produzieren lassen und trotzdem nach Marke aussehen.',
    metaTitle: 'Content & Social Media — Konzepte, Formate, Produktion',
    metaDesc: 'Content und Social Media: Content-Strategie, Formatentwicklung, Produktion für Instagram, TikTok und LinkedIn, Community und Paid Social.',
    hero: 'feed', accent: '#C77DFF',
    items: [
      { t: 'Content-Strategie', d: 'Themen, Formate, Frequenz und Tonalität — als Plan, nicht als Ideensammlung.' },
      { t: 'Formatentwicklung', d: 'Serien, die wiedererkennbar sind und sich wöchentlich produzieren lassen.' },
      { t: 'Produktion', d: 'Foto, Video, Motion und Text — im Studio oder vor Ort bei Ihnen.' },
      { t: 'Instagram & TikTok', d: 'Vertikale Formate, die in den ersten zwei Sekunden funktionieren.' },
      { t: 'LinkedIn', d: 'B2B-Kommunikation mit Substanz statt Motivationsposts.' },
      { t: 'Community & Paid', d: 'Betreuung, Interaktion und gezielte Reichweite für das, was funktioniert.' },
    ],
    deliverables: ['Content-Strategie', 'Formatbaukasten', 'Redaktionsplan', 'Produktionstage', 'Templates & Vorlagen', 'Monatsauswertung'],
    faq: [
      { q: 'Wie viele Beiträge pro Monat sind sinnvoll?', a: 'Lieber acht gute als dreißig beliebige. Für die meisten Unternehmen funktionieren zwei bis drei Beiträge pro Woche in klar definierten Formaten.' },
      { q: 'Produzieren Sie auch vor Ort?', a: 'Ja. Wir planen Produktionstage so, dass daraus Inhalte für mehrere Wochen entstehen.' },
      { q: 'Übernehmen Sie auch das Community Management?', a: 'Auf Wunsch. Wir definieren gemeinsam Reaktionszeiten, Tonalität und Eskalationswege.' },
    ],
  },
  {
    slug: 'digital-solutions', index: '06', title: 'Digital Solutions', short: 'Digital Solutions',
    claim: 'Wenn Standardsoftware nicht mehr reicht.',
    lead: 'Individuelle Tools, Portale und Systeme: gebaut wie Software, betrieben wie Infrastruktur, gestaltet wie ein Produkt.',
    metaTitle: 'Digital Solutions — individuelle Tools, Portale & Web-Apps',
    metaDesc: 'Digitale Lösungen: Web-Apps, Kundenportale, Konfiguratoren, Schnittstellen und Automatisierung mit Next.js, React und TypeScript.',
    hero: 'graph', accent: '#5EE7FF',
    items: [
      { t: 'Web-Apps', d: 'Anwendungen mit Rollen, Rechten und echtem Arbeitsalltag im Blick.' },
      { t: 'Kundenportale', d: 'Ein Ort für Dokumente, Status und Kommunikation — statt E-Mail-Ketten.' },
      { t: 'Konfiguratoren', d: 'Produkte, Preise und Varianten verständlich machen und Anfragen qualifizieren.' },
      { t: 'Schnittstellen', d: 'ERP, CRM, Warenwirtschaft und Drittsysteme sauber verbunden.' },
      { t: 'Automatisierung', d: 'Wiederkehrende Abläufe abschaffen, statt sie schneller zu machen.' },
      { t: 'Betrieb & Wartung', d: 'Monitoring, Updates und Weiterentwicklung mit klaren Reaktionszeiten.' },
    ],
    deliverables: ['Anforderungsanalyse', 'Architekturentwurf', 'Prototyp', 'Umsetzung & Tests', 'Deployment & Monitoring', 'Wartungsvereinbarung'],
    faq: [
      { q: 'Welche Technologien setzen Sie ein?', a: 'Überwiegend TypeScript, React und Next.js, dazu passende Datenbanken und Hosting-Umgebungen. Die Wahl richtet sich nach Ihrem Bestand, nicht nach unserer Vorliebe.' },
      { q: 'Gehört mir der Quellcode?', a: 'Ja. Sie erhalten das vollständige Repository und die Rechte daran. Kein Lock-in.' },
      { q: 'Können Sie bestehende Systeme übernehmen?', a: 'Nach einem Code- und Architektur-Review sagen wir ehrlich, ob Weiterentwicklung oder Neubau der günstigere Weg ist.' },
    ],
  },
];

export interface Project {
  slug: string; name: string; sector: string; year: string; claim: string;
  summary: string; disciplines: string[]; accent: string; visual: string;
  challenge: string; approach: string; result: string[];
}

/** Konzeptstudien — eigene Arbeiten, keine Kundenprojekte. */
export const PROJECTS: Project[] = [
  {
    slug: 'helion', name: 'HELION', sector: 'Erneuerbare Energien', year: '2026',
    claim: 'Energie sichtbar machen.',
    summary: 'Markenwelt und digitaler Auftritt für einen Anbieter von Speicherlösungen — Daten als Gestaltungsmittel statt als Beiwerk.',
    disciplines: ['Branding', 'Webdesign', 'Motion'], accent: '#4DE1B2', visual: 'helion',
    challenge: 'Technische Infrastruktur ist schwer emotionalisierbar. Der Auftritt musste Vertrauen aufbauen und gleichzeitig zeigen, dass hier etwas Neues entsteht.',
    approach: 'Ein Gestaltungssystem, in dem Messwerte zur Bildsprache werden: Ladekurven, Netzlast und Ertrag erscheinen als grafische Grundform in Web, Print und Social.',
    result: ['Konzeptstudie', 'Markensystem mit Datenbildsprache', 'Scroll-basierte Produkterklärung'],
  },
  {
    slug: 'orbit-one', name: 'ORBIT ONE', sector: 'Luft- und Raumfahrt', year: '2026',
    claim: 'Präzision als Markenkern.',
    summary: 'Corporate Website für einen Zulieferer: technische Tiefe für Ingenieure, klare Botschaft für Entscheider.',
    disciplines: ['Corporate Website', 'Informationsarchitektur', 'SEO'], accent: '#7FB4FF', visual: 'orbit',
    challenge: 'Zwei Zielgruppen mit gegensätzlichen Bedürfnissen: Einkauf will Zahlen, Technik will Datenblätter.',
    approach: 'Zwei Einstiege, eine Architektur. Jede Produktseite existiert in einer erklärenden und einer technischen Tiefe, ohne die Navigation zu verdoppeln.',
    result: ['Konzeptstudie', 'Zweistufiges Informationsmodell', 'Strukturierte Daten für Produktseiten'],
  },
  {
    slug: 'nordwerk', name: 'NORDWERK', sector: 'Maschinenbau', year: '2026',
    claim: 'Vom Katalog zum Konfigurator.',
    summary: 'Digitale Lösung für einen Sondermaschinenbauer: ein Konfigurator, der Anfragen qualifiziert, bevor der Vertrieb übernimmt.',
    disciplines: ['Digital Solutions', 'UX/UI', 'Schnittstellen'], accent: '#5EE7FF', visual: 'nordwerk',
    challenge: 'Anfragen kamen unvollständig herein. Jede Rückfrage kostete Tage — und manchmal den Auftrag.',
    approach: 'Ein Konfigurator führt in sechs Schritten durch Varianten und erzeugt eine strukturierte Anfrage inklusive Vorkalkulation direkt im CRM.',
    result: ['Konzeptstudie', 'Konfigurator-Prototyp', 'CRM-Anbindung im Entwurf'],
  },
  {
    slug: 'maison-vela', name: 'MAISON VELA', sector: 'Fashion E-Commerce', year: '2026',
    claim: 'Ein Shop, der sich wie eine Kollektion liest.',
    summary: 'E-Commerce-Konzept mit editorialem Aufbau — Produkt und Redaktion greifen ineinander statt getrennte Welten zu bleiben.',
    disciplines: ['E-Commerce', 'Art Direction', 'Content'], accent: '#C77DFF', visual: 'vela',
    challenge: 'Standard-Shopsysteme zerlegen eine Kollektion in Kacheln. Der Zusammenhang — und damit der Preis — geht verloren.',
    approach: 'Die Kollektion wird in Kapiteln erzählt. Kaufen ist jederzeit möglich, aber nie der erste Ton.',
    result: ['Konzeptstudie', 'Editorial-Commerce-Modell', 'Komponentenbibliothek'],
  },
  {
    slug: 'puls', name: 'PULS', sector: 'Gesundheit', year: '2026',
    claim: 'Vertrauen beginnt bei der Ladezeit.',
    summary: 'Plattformkonzept für eine Praxisgruppe: Terminanfrage in drei Schritten, barrierearm und lokal auffindbar.',
    disciplines: ['Website', 'Local SEO', 'Barrierefreiheit'], accent: '#FF6A3D', visual: 'puls',
    challenge: 'Gesundheitsseiten sind oft langsam und unübersichtlich — genau dort, wo Termine entstehen: auf dem Smartphone.',
    approach: 'Die drei häufigsten Anliegen bestimmen die Startseite. Alles andere ordnet sich unter. Hoher Kontrast, große Ziele, klare Fokuszustände.',
    result: ['Konzeptstudie', 'WCAG-orientiertes Interface', 'Standortstruktur für Local SEO'],
  },
  {
    slug: 'terra', name: 'TERRA', sector: 'Bau & Immobilien', year: '2026',
    claim: 'Substanz sichtbar machen.',
    summary: 'Corporate Website für ein Bauunternehmen — mit einer Bildsprache aus Volumen, Licht und Konstruktion statt Baustellenfotos.',
    disciplines: ['Corporate Website', 'Bildkonzept', 'Recruiting'], accent: '#FFB347', visual: 'terra',
    challenge: 'Bauunternehmen konkurrieren online weniger um Kunden als um Fachkräfte. Der Auftritt musste beides bedienen.',
    approach: 'Zwei Einstiege, ein System: Referenzen für Auftraggeber, Kultur und Karriere für Bewerbende.',
    result: ['Konzeptstudie', 'Zweispuriges Informationsmodell', 'Wiederverwendbares Projektmodul'],
  },
];

export const WHY = {
  kicker: 'Warum BOUND FOR FUTURE',
  lines: ['Vier Gründe,', 'die nach dem Launch', 'noch zählen.'],
  items: [
    { n: '01', t: 'Strategie', d: 'Wir fangen nicht mit Farben an, sondern mit Fragen. Positionierung, Zielgruppe und Erfolgskriterien stehen, bevor das erste Layout entsteht.' },
    { n: '02', t: 'Kreativität', d: 'Gestaltung, die auffällt, weil sie präzise ist — nicht weil sie laut ist. Jede Bewegung, jede Fläche hat eine Aufgabe.' },
    { n: '03', t: 'Technologie', d: 'Next.js, TypeScript, serverseitiges Rendering. Wir bauen Auftritte, die auch nach zwei Jahren Content-Pflege noch schnell sind.' },
    { n: '04', t: 'Wachstum', d: 'Der Launch ist der Anfang. Danach beginnt die Arbeit an Sichtbarkeit, Conversion und messbaren Ergebnissen.' },
  ],
};

export const PROCESS = [
  { n: '01', t: 'Entdecken', d: 'Markt, Wettbewerb, Zielgruppe, Zahlen. Wir hören zu und stellen die unbequemen Fragen, bevor jemand ein Layout öffnet.', dur: '1–2 Wochen' },
  { n: '02', t: 'Strategie', d: 'Positionierung, Botschaft, Struktur und Erfolgskriterien. Ab hier weiß jede Entscheidung, worauf sie einzahlt.', dur: '1–2 Wochen' },
  { n: '03', t: 'Konzept', d: 'Informationsarchitektur, Wireframes, Inhaltsplan. Die Seite steht, bevor sie schön wird.', dur: '1–3 Wochen' },
  { n: '04', t: 'Design', d: 'Art Direction, Designsystem, bewegter Prototyp. Wir zeigen früh Motion — statische Screens lügen über das Endergebnis.', dur: '2–4 Wochen' },
  { n: '05', t: 'Entwicklung', d: 'Komponenten, Inhalte, Integrationen. Typsicher gebaut, kontinuierlich gegen echte Geräte getestet.', dur: '3–6 Wochen' },
  { n: '06', t: 'Launch & Wachstum', d: 'Performance-Budget, SEO-Setup, Tracking, Übergabe. Danach Kampagnen, Inhalte und Iteration.', dur: 'laufend' },
];

export const STATS = {
  kicker: 'Unser Standard',
  note:
    'BOUND FOR FUTURE ist jung. Diese Zahlen sind unser Anspruch an jedes Projekt — keine Bilanz. Kundenergebnisse veröffentlichen wir erst, wenn sie belegt sind.',
  items: [
    { v: 100, suffix: '', label: 'Lighthouse-Ziel', sub: 'Performance · SEO · Best Practices' },
    { v: 1.2, prefix: '< ', suffix: ' s', decimals: 1, label: 'Ladezeit-Ziel', sub: 'Largest Contentful Paint, 4G' },
    { v: 6, suffix: '', label: 'Disziplinen', sub: 'Marke bis Digital Solutions' },
    { v: 24, suffix: ' h', label: 'Antwortzeit', sub: 'Auf jede Projektanfrage' },
  ],
};

export const CONTACT = {
  kicker: 'Kontakt',
  lines: ['Erzählen Sie uns,', 'wohin es gehen soll.'],
  lead: 'Name, E-Mail und eine kurze Nachricht genügen — wir melden uns innerhalb von 24 Stunden.',
  fields: { name: 'Ihr Name', email: 'E-Mail', message: 'Ihre Nachricht (kurz genügt)' },
  submit: 'Anfrage senden',
  success: { title: 'Angekommen.', body: 'Danke — wir melden uns innerhalb von 24 Stunden.' },
};

export interface City { slug: string; name: string; article: string; region: string; intro: string; local: string[]; }

export const CITIES: City[] = [
  { slug: 'bremen', name: 'Bremen', article: 'in Bremen', region: 'Bremen & Umland',
    intro: 'Von der Überseestadt bis zum Technologiepark: Bremen verbindet Hafenwirtschaft, Luft- und Raumfahrt, Handel und eine wachsende Gründerszene.',
    local: ['Überseestadt', 'Technologiepark', 'Airport-Stadt', 'Bremen-Nord'] },
  { slug: 'hamburg', name: 'Hamburg', article: 'in Hamburg', region: 'Hamburg & Metropolregion',
    intro: 'Hamburg ist Handels-, Medien- und Logistikstandort zugleich — ein Markt mit hohem Anspruch an Auftritt und Tempo.',
    local: ['HafenCity', 'Altona', 'Eimsbüttel', 'Harburg'] },
  { slug: 'hannover', name: 'Hannover', article: 'in Hannover', region: 'Hannover & Region',
    intro: 'Messestadt, Industriestandort und Sitz vieler Mittelständler: In Hannover entscheidet Sichtbarkeit oft über den Erstkontakt.',
    local: ['Mitte', 'List', 'Linden', 'Messegelände'] },
  { slug: 'oldenburg', name: 'Oldenburg', article: 'in Oldenburg', region: 'Oldenburg & Nordwest',
    intro: 'Starker Mittelstand, Gesundheitswirtschaft und Energie: Oldenburg ist ein Markt, in dem Empfehlung und lokale Sichtbarkeit zusammenwirken.',
    local: ['Innenstadt', 'Donnerschwee', 'Kreyenbrück', 'Wechloy'] },
  { slug: 'osnabrueck', name: 'Osnabrück', article: 'in Osnabrück', region: 'Osnabrück & Umland',
    intro: 'Logistik, Maschinenbau und Handel prägen die Region — mit vielen Unternehmen, deren Auftritt hinter ihrer Leistung zurückbleibt.',
    local: ['Innenstadt', 'Hafen', 'Westerberg', 'Schinkel'] },
];

export const FOOTER = {
  columns: [
    { title: 'Leistungen', links: SERVICES.map((s) => ({ l: s.title, h: `/leistungen/${s.slug}` })) },
    { title: 'Standorte', links: CITIES.map((c) => ({ l: `Agentur ${c.name}`, h: `/standorte/${c.slug}` })) },
    { title: 'Agentur', links: [
      { l: 'Arbeiten', h: '/#arbeiten' }, { l: 'Prozess', h: '/#prozess' },
      { l: 'Studio', h: '/#studio' }, { l: 'Kontakt', h: '/#kontakt' },
      { l: 'Impressum', h: '/impressum' }, { l: 'Datenschutz', h: '/datenschutz' },
    ] },
  ],
  social: [{ l: 'Instagram', h: '#' }, { l: 'LinkedIn', h: '#' }, { l: 'Behance', h: '#' }],
};

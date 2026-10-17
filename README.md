# BOUND FOR FUTURE — Website

Cinematic Digitalagentur-Website. Next.js 15 (App Router), React 19, TypeScript —
**ohne Animations- und ohne 3D-Bibliothek**.

---

## Schnellstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktionsbuild
npm run typecheck
npm run preview      # Einzeldatei-Vorschau nach .build/
npm run map          # Weltkarte als PNG zur Kontrolle rendern
```

---

## Der Hero-Globus

`app/globe.ts` — rohes WebGL2, ~11 KB, keine Abhängigkeit:

- Eine Vollbild-Fläche, ein Fragment-Shader. Die Kugel wird **analytisch geschnitten**
  (Ray–Sphere), nicht als Geometrie gebaut.
- Land ist ein **Punktraster** auf Bändern konstanter Winkelbreite; die Dichte hängt an
  der Bildschirmauflösung, damit die Punkte in jeder Zoomstufe gleich groß bleiben.
- Atmosphäre, Terminator, Nachtlichter, Gradnetz und Sternenfeld entstehen im selben Shader.
- **Kameraflug**: 7,2 s von Distanz 9,4 auf 2,35, Ziel 50,4° N / 10,4° O. Zweiphasige
  Kurve — erst lange weit draußen, dann kontrollierter Anflug. Danach übernimmt der Scroll.
- HUD-Marker werden in JS projiziert und als DOM-Elemente über den Canvas gelegt.
- Kein WebGL? → CSS-Fallback (`.globe__fallback`), Seite bleibt vollständig nutzbar.
- `prefers-reduced-motion` → kein Flug, kein Loop, ein statisches Bild.

**Weltgeometrie:** `lib/geo.ts` enthält handgezeichnete Kontinentumrisse in Länge/Breite
(~8 KB) plus subtraktive Binnenmeere. Sie werden beim Start auf ein Canvas gerastert und
als Textur hochgeladen. Kein externer Datensatz, kein Lizenzthema.
Zur Kontrolle: `npm run map` schreibt eine äquidistante Karte als PNG.

---

## Motion-Layer

`app/motion.ts` — eine eigene Engine (~10 KB gzip statt ~120 KB für GSAP + ScrollTrigger + Lenis):

| Baustein | Funktion |
|---|---|
| Smooth Scroll | rAF-Interpolation der echten Scrollposition, sticky bleibt intakt |
| Scroll-Tracks | ein Loop, gecachte Messwerte, kein Layout-Thrashing |
| Reveals | Zeilenmasken, Zeichen-Split, Clip-Path, Blur-zu-scharf |
| Pinning | horizontale Leistungs-Schiene, Prozess-Timeline |
| Hero-Mechaniken | sechs verschiedene, je Leistungsseite |
| Cursor, Magnete, Marquee, Zähler, Parallaxe, FAQ, Seitenübergang | |

Alles läuft über `transform`, `opacity`, `filter`, `clip-path`.
Auf Mobil sind Rasterdichte, Grain und Parallaxe reduziert; horizontale Schienen werden
zu vertikalen Stapeln.

---

## Struktur

```
app/
  layout.tsx              Metadaten, Schriften, JSON-LD, globales Chrome
  page.tsx                Startseite (volle Dramaturgie)
  globals.css             komplettes Designsystem
  globe.ts                WebGL-Globus
  motion.ts               Motion-Engine
  leistungen/[slug]/      6 Leistungsseiten
  arbeiten/[slug]/        6 Konzeptstudien
  standorte/[stadt]/      5 Standortseiten
  impressum/ datenschutz/ api/kontakt/ sitemap.ts robots.ts
components/               Chrome, Home, ServicePage, CasePage, CityPage, art, ui
lib/content.ts            ALLE Texte und Daten an einem Ort
lib/geo.ts                Weltgeometrie
tools/                    Vorschau-Builder, QA-Screenshots, Kartenprüfung, Syntaxcheck
```

Das Markup wird **vollständig auf dem Server gerendert**. Es gibt genau eine
Client-Komponente (`components/MotionRoot.tsx`). Ohne JavaScript bleibt die Seite lesbar.

---

## Dramaturgie der Startseite

1. Cinematic Hero — Weltall → Erde → Europa → Deutschland, `NÄCHSTER STOPP: ZUKUNFT.`
2. Laufband der Disziplinen
3. Intro — wer wir sind, drei Grundsätze
4. Leistungen — horizontale Schiene mit sechs Kacheln, jede verlinkt auf ihre Seite
5. Arbeiten — Konzeptstudien als Zeilen mit Vorschau am Cursor
6. Warum BOUND FOR FUTURE — Strategie, Kreativität, Technologie, Wachstum
7. Prozess — sechs Phasen, große mitlaufende Zahl
8. Zahlen — animierte Zähler
9. Finale — Planetenrand, Sternenhimmel, großer CTA
10. Kontakt — kurzes Formular mit Name, E-Mail und Nachricht
11. Footer — Wortmarke, `NÄCHSTER STOPP: ZUKUNFT.`

---

## SEO

- Eigene URL, eigener Title, eigene Description je Leistung und Standort
- `/leistungen/webdesign`, `/leistungen/branding`, `/leistungen/online-marketing`,
  `/leistungen/seo`, `/leistungen/social-media`, `/leistungen/digital-solutions`
- `/standorte/bremen`, `/hamburg`, `/hannover`, `/oldenburg`, `/osnabrueck`
- JSON-LD: `Organization`, `WebSite`, `ProfessionalService` mit `OfferCatalog`,
  `FAQPage` je Leistungsseite
- `sitemap.xml`, `robots.txt`, Brotkrumen, saubere H1/H2/H3-Hierarchie
- Dichte interne Verlinkung: Leistung ↔ Leistung, Leistung ↔ Stadt, Stadt ↔ Leistung

**Neue Stadt anlegen:** einen Eintrag in `CITIES` (`lib/content.ts`) ergänzen — Seite,
Sitemap, Footer und interne Links entstehen automatisch.

---

## Vor dem Livegang

- [ ] **Impressum ausfüllen** (`app/impressum/page.tsx`) — Pflicht nach § 5 DDG
- [ ] **Datenschutz prüfen lassen** (`app/datenschutz/page.tsx`)
- [ ] `BRAND.url` in `lib/content.ts` auf die echte Domain setzen
- [ ] Social-Links im Footer eintragen
- [ ] OG-Bild hinterlegen (1200×630 PNG) und in `app/layout.tsx` verlinken
- [ ] Formularversand: `RESEND_API_KEY` im Hosting setzen und die Absenderdomain
      in Resend verifizieren. Standardabsender: `BOUND FOR FUTURE <noreply@monvex-group.de>`;
      alternativ `CONTACT_FROM_EMAIL` auf eine bereits verifizierte Absenderadresse setzen.
      Empfänger und öffentliche Kontaktadresse kommen einheitlich aus `BRAND.email`
      (`mudi@monvex-group.de`). Antworten auf Anfragen gehen dank `replyTo` an den Absender.
      Ohne Schlüssel oder bei einem Versandfehler bietet das Formular einen manuellen
      E-Mail-Link mit den eingegebenen Angaben an; die E-Mail muss dort abgesendet werden.
      Eine erfolgreiche API-Antwort bestätigt die Annahme durch Resend, nicht den Eingang
      im Postfach. Für die Empfangsprüfung nach dem Deployment eine echte Anfrage senden
      und Zustellstatus sowie Posteingang/Spam prüfen.
- [ ] Die Zahlen im Abschnitt „Unser Standard" sind als **Anspruch** formuliert, nicht als
      Bilanz. Erst durch belegte Ergebnisse ersetzen.
- [ ] Die Projekte sind als **Konzeptstudien** gekennzeichnet. Kennzeichnung erst
      entfernen, wenn es echte Kundenprojekte sind.
- [ ] Optional: Schriften lokal ausliefern (`next/font/local`), dann entfällt die
      Google-Fonts-Passage im Datenschutz.

---

## Barrierefreiheit & Performance

- Semantisches HTML, Landmarks, Skip-Link, sichtbare Fokus-Zustände
- Vollständige Tastaturbedienung inkl. Menü (Escape schließt), FAQ als Buttons
- `prefers-reduced-motion` deaktiviert Flug, Loop und alle Reveals
- Keine externen Skripte, kein Tracking, keine Cookies
- Kein Framework-JS für das Markup, eine Client-Insel, keine Bilddateien
  (alle Grafiken sind Inline-SVG oder Shader)

# Perfect Line & Bridal Looks by Irina — Website

Website von Irina Baumgärtner in Sarstedt (zwischen Hildesheim und Hannover) mit zwei Leistungsbereichen: **Perfect Line by Irina** (Permanent Make-up, Lashlift, Browlift) und **Bridal Looks by Irina** (Braut-Styling).

## Struktur

```
/
├── index.html                    Startseite (Auswahl Perfect Line / Bridal Looks)
├── studio.html                   Studio Sarstedt & mobiler Braut-Service — gemeinsam
├── ueber-mich.html               Über Irina Baumgärtner — gemeinsam
├── kontakt.html                  Kontaktkanäle & Anfrageformular — gemeinsam
├── impressum.html                Impressum (§5 TMG)
├── datenschutz.html              Datenschutzerklärung
├── agb.html                      Allgemeine Geschäftsbedingungen
│
├── perfect-line/index.html       Leistungen & Preise Perfect Line
├── bridal-looks/index.html       Leistungen, Preise, Konditionen & Portfolio Bridal Looks
│
├── styles/tailwind.css           Kompiliertes, selbst gehostetes Tailwind-CSS (siehe unten)
├── styles/fonts.css              @font-face-Regeln für die selbst gehosteten Schriften
├── styles/main.css               Basisstile und Reveal-Animationen
├── scripts/main.js               Navigation, Kontaktformular, Bewertungs-Slider, Karte (Zwei-Klick)
├── assets/icons/                 Eigene SVG-Icons
├── assets/images/                Fotos
├── assets/fonts/                 Selbst gehostete Schriften (.woff2), siehe assets/fonts/README.md
├── robots.txt / sitemap.xml
├── tailwind.config.cjs           Design-Tokens (Farben, Fonts), Content-Pfade
```

Alle Seiten teilen sich eine Navigation: Perfect Line · Bridal Looks · Studio · Über mich · Kontakt sowie „Termin buchen“. Nur die Leistungen sind nach Bereich getrennt; Studio, Über mich und Kontakt gibt es je einmal.

## Tech-Stack

Reines HTML5 + selbst gehostetes Tailwind CSS + Vanilla JavaScript + selbst gehostete Schriften. Zur Laufzeit sind **keine externen Anfragen** an Drittanbieter nötig (schneller, robuster, DSGVO-freundlicher als CDN-Varianten). Die fertigen Seiten können direkt per Webserver ausgeliefert werden (z. B. `python3 -m http.server` zum lokalen Testen) — ein Build-Schritt ist für den Betrieb nicht erforderlich.

Nur wenn du die verwendeten Tailwind-Klassen im HTML änderst, muss `styles/tailwind.css` neu erzeugt werden:

```bash
npm install
npx tailwindcss -i styles/tailwind.src.css -o styles/tailwind.css --minify
```

## Design

Farben: Ivory `#F7F3ED`, Champagne `#E8DCCE`, Taupe `#B9A99A`, Espresso `#35302D` (plus dunkleres Taupe `#776859` für lesbare Akzentschrift). Schriften: **Playfair Display** (Überschriften), **Cormorant Garamond Italic** (Akzente, emotionale Subheadlines), **Montserrat** (Fließtext, Beschriftungen).

## Vor dem Livegang zu erledigen

1. **Bilder ersetzen** — alle mit `Platzhalter` markierten Flächen (`.ph-image`) durch echte Fotos ersetzen. Am einfachsten: `<img>`-Tag anstelle des Platzhalter-`<div>` einsetzen, `.ph-image`-Klasse entfernen.
2. **`assets/images/og-cover.jpg`** (1200×630 px) ergänzen — wird aktuell in den Meta-Tags referenziert, existiert aber noch nicht.
3. **Rechtstexte prüfen lassen** — Impressum, Datenschutz und AGB wurden inhaltlich aus der bisherigen Website übernommen bzw. an die neue Technik angepasst, sollten aber vor Veröffentlichung von einer fachkundigen Stelle geprüft werden (u. a. Kleinunternehmerregelung, Hosting-Angabe in der Datenschutzerklärung ergänzen).
4. **Kontaktformular** — sendet aktuell per `mailto:` (öffnet das E-Mail-Programm der Besucherin). Für eine serverseitige Zustellung kann es später an einen Formular-Service (z. B. Formspree) oder ein eigenes Backend angebunden werden.

## Lokale Vorschau

```bash
python3 -m http.server 8000
```

Anschließend `http://localhost:8000` im Browser öffnen.

# Grundsicherungsrechner

Ein webbasierter Rechner, der für Nutzer Schritt für Schritt prüft, ob sie Anspruch auf **Grundsicherung im Alter** (SGB XII) haben und wie hoch die Leistung ungefähr wäre.

![Screenshot der Startseite](screenshot.png)

**[Live-Demo](https://bnjmnsbl.github.io/grundsicherungsrechner/)**

## Warum dieses Tool?

Viele Rentnerinnen und Rentner in Deutschland erhalten weniger Geld als ihnen zusteht – oft, weil sie nicht wissen, dass sie Grundsicherung beantragen können. Dieser Rechner senkt die Hemmschwelle: verständliche Sprache, keine Formulare, klare Ergebnisse.

## Features

- **5-Schritte-Wizard**: Persönliche Angaben, Wohnsituation, Einkommen, Vermögen, Zusatzfragen
- **Vollständige Berechnung** nach SGB XII (Rechtsstand 2026) inkl. aller Freibeträge
- **Sofort-Feedback** bei Ausschlussgründen – nicht erst am Ende
- **Ergebnisseite** mit transparenter Aufschlüsselung und konkreten nächsten Schritten
- **Datenschutz**: Alle Daten bleiben im Browser, keine Server-Kommunikation
- **Barrierefreiheit**: Große Schrift (18px), hohe Kontraste, mobile-first

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- Lucide React Icons
- Vitest (16 Unit-Tests)

## Lokale Entwicklung

```bash
pnpm install
pnpm dev        # Dev-Server starten
pnpm test       # Tests ausführen
pnpm build      # Production Build
```

## Rechtlicher Hinweis

Dieser Rechner liefert eine **unverbindliche Ersteinschätzung**. Er ersetzt keine rechtliche Beratung und keinen offiziellen Antrag beim Sozialamt.

## Lizenz

MIT

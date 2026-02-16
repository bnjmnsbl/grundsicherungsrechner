# Architecture Decision Records

## ADR-001: TypeScript statt JSX

**Kontext:** Die Coding-Anweisung spezifiziert "eine einzelne .jsx-Datei", AGENTS.md bevorzugt TypeScript.

**Entscheidung:** TypeScript (.tsx) mit mehreren Dateien statt einer einzelnen JSX-Datei.

**Begründung:** Bessere Typsicherheit, einfachere Wartbarkeit, Fehler werden zur Compile-Zeit erkannt. Die Berechnungslogik profitiert besonders von strikter Typisierung.

## ADR-002: useReducer statt useState

**Kontext:** State Management für den Wizard mit 20+ Formularfeldern.

**Entscheidung:** `useReducer` in App.tsx mit einem flachen FormData-Objekt.

**Begründung:** Klare Action-Typen (NEXT_STEP, PREV_STEP, UPDATE_FIELD, RESET), zentralisierte State-Logik, einfach testbar. Kein Context/Redux nötig, da alle Steps direkte Kinder von App sind.

## ADR-003: Tailwind CSS v4 mit @theme

**Kontext:** Styling mit benutzerdefiniertem Farbschema für die Zielgruppe (ältere Menschen).

**Entscheidung:** Tailwind CSS v4 mit Vite-Plugin und `@theme` für Custom Colors.

**Begründung:** v4 ist aktuell und braucht keine tailwind.config.js mehr. Benutzerdefinierte Farben (Petrol, Creme, Gold) sind direkt in index.css definiert.

## ADR-004: Berechnungslogik als reine Funktionen

**Kontext:** Die Berechnung ist komplex (Freibeträge, Altersgrenzen, Mehrbedarfe).

**Entscheidung:** Alle Berechnungen in `calculations.ts` als reine Funktionen ohne UI-Abhängigkeiten.

**Begründung:** Testbar ohne React/DOM, wiederverwendbar, klare Trennung von Logik und Darstellung.

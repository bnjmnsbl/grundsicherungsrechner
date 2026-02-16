# Coding-Anweisung: Grundsicherung im Alter – Eligibility Calculator

**Ziel:** Baue eine Single-Page React-App (.jsx), die Nutzer Schritt für Schritt durch eine Prüfung führt, ob sie Anspruch auf „Grundsicherung im Alter" haben und wie hoch die Leistung ungefähr wäre. Die App muss für Menschen ohne juristisches Vorwissen verständlich sein – denke an eine 68-jährige Rentnerin, die zum ersten Mal davon hört.

---

## TEIL 1: DESIGN & UX-PRINZIPIEN

### Grundhaltung
- **Sprache:** Durchgehend Deutsch, Du-Form vermeiden – Siezen ("Sie"), warm aber respektvoll.
- **Ton:** Ermutigend, nicht bürokratisch. Niemals einschüchternd. Das Tool soll Hemmschwellen abbauen, nicht aufbauen.
- **Juristisches Vokabular:** Nur dort verwenden, wo nötig – und dann IMMER mit einer Alltagserklärung in Klammern oder als Tooltip. Beispiel: Nicht „Regelaltersgrenze erreicht?" sondern „Haben Sie das gesetzliche Rentenalter erreicht?"
- **Kein Formular-Monster:** Die App ist ein geführter Wizard (Schritt für Schritt), KEIN langes Formular. Jeder Schritt zeigt nur 2-4 Fragen. Ein Fortschrittsbalken zeigt, wo man steht.

### Visuelles Design
- **Ästhetik:** Warm, zugänglich, vertrauenswürdig. Denke an eine freundliche Beratungsstelle, nicht an ein Amt.
- **Farbschema:** Warme, beruhigende Farben. Vorschlag: Tiefes Petrol/Teal als Hauptfarbe (#0D7377 oder ähnlich), warmes Creme/Sandton als Hintergrund (#FBF7F0), Akzente in warmem Gold/Amber (#D4A843). Grün für positive Ergebnisse, gedämpftes Rot/Terracotta für Ablehnungen.
- **Typografie:** Gut lesbar, eher groß (mindestens 16px Basis). Serifenlose Schrift für Fließtext, die warm wirkt. Verwende Google Fonts – z.B. „Source Sans 3" oder „Nunito" für Body, „Playfair Display" oder „Merriweather" für Überschriften.
- **Icons:** Sparsam, aber hilfreich. Verwende Lucide-Icons für Info-Tooltips (ℹ️), Häkchen (✓), Kreuze (✗) und Navigations-Pfeile.
- **Responsiv:** Mobile-first, muss auf Smartphones gut funktionieren (viele ältere Nutzer nutzen primär das Handy).
- **Schriftgröße:** Eher 18px Body-Text. Ältere Nutzer sind die Hauptzielgruppe.
- **Kontraste:** WCAG AA mindestens, besser AAA für Text.

### Interaktionsdesign
- **Wizard mit Fortschrittsanzeige:** 5 Schritte, visuell als Stepper/Breadcrumb am oberen Rand.
- **Smart Flow:** Fragen, die nicht relevant sind, werden übersprungen (z.B. Erwerbsminderung wird nur gefragt, wenn Altersgrenze noch nicht erreicht).
- **Sofort-Feedback bei Ausschluss:** Wenn eine Antwort zum Ausschluss führt (z.B. „Wohnen Sie nicht in Deutschland?"), wird SOFORT ein freundlicher Hinweis angezeigt – NICHT erst am Ende. Aber: Der Nutzer kann trotzdem weitermachen, um den Rest zu prüfen ("Trotzdem weiter prüfen").
- **Hilfe-Tooltips:** Neben jeder Frage ein kleines (i)-Icon, das bei Klick/Hover eine einfache Erklärung zeigt.
- **Keine Pflichtfeld-Fehler in Rot:** Stattdessen sanfte Hinweise. Leere Felder werden als 0 € behandelt.
- **Zurück-Button** auf jeder Seite.
- **Ergebnis-Seite:** Klar, visuell ansprechend, mit Aufschlüsselung der Berechnung.

---

## TEIL 2: WIZARD-SCHRITTE (exakte Spezifikation)

### Schritt 1 von 5: „Über Sie"

**Überschrift:** „Zuerst ein paar Angaben zu Ihrer Person"
**Untertext:** „Damit wir prüfen können, ob die Grundsicherung für Sie in Frage kommt."

| # | Frage (exakter Wortlaut im UI) | Typ | Tooltip-Text (bei Klick auf ℹ️) |
|---|---|---|---|
| 1.1 | „Wann sind Sie geboren?" | Date-Picker (Monat + Jahr reicht, alternativ vollständiges Datum) | „Ihr Geburtsdatum bestimmt, ab wann Sie das gesetzliche Rentenalter erreichen. Das liegt je nach Jahrgang zwischen 65 und 67 Jahren." |
| 1.2 | „Wo leben Sie?" | Radio: ○ In Deutschland / ○ Im Ausland | „Sie müssen Ihren festen Wohnsitz in Deutschland haben, um Grundsicherung zu erhalten." |
| 1.3 | „Wie ist Ihr Familienstand?" | Radio: ○ Alleinstehend / ○ Verheiratet oder in eingetragener Lebenspartnerschaft / ○ Getrennt lebend | „Bei Paaren wird das Einkommen beider Partner gemeinsam betrachtet. Getrennt lebende werden wie Alleinstehende behandelt." |

**Logik nach Schritt 1:**
- Aus Geburtsdatum wird berechnet, ob die Regelaltersgrenze erreicht ist (siehe Berechnungslogik unten).
- `lebtImAusland === true` → Zeige sofort eine Info-Box (gelb/warm): „Hinweis: Grundsicherung setzt einen festen Wohnsitz in Deutschland voraus. Wenn Sie im Ausland leben, haben Sie leider keinen Anspruch. [Button: Trotzdem weiterrechnen] [Button: Mehr erfahren]"
- Wenn Altersgrenze NICHT erreicht → Zeige Zusatzfrage 1.4 (einblenden mit Animation):

| # | Frage | Typ | Tooltip |
|---|---|---|---|
| 1.4 | „Sind Sie dauerhaft voll erwerbsgemindert?" | Radio: ○ Ja / ○ Nein / ○ Ich bin unsicher | „Das bedeutet: Sie können aus gesundheitlichen Gründen dauerhaft weniger als 3 Stunden am Tag arbeiten. Dies muss ärztlich festgestellt worden sein – z.B. durch einen Bescheid der Rentenversicherung. Auch wer in einer Werkstatt für Menschen mit Behinderung arbeitet, gilt automatisch als voll erwerbsgemindert." |

- `altersgrenze_nicht_erreicht AND erwerbsminderung === nein` → Ausschluss-Hinweis: „Die Grundsicherung im Alter richtet sich an Personen, die das Rentenalter erreicht haben oder dauerhaft voll erwerbsgemindert sind. Beides scheint bei Ihnen derzeit nicht zuzutreffen. Möglicherweise kommt für Sie das Bürgergeld (früher Hartz IV) in Frage."
- `erwerbsminderung === unsicher` → Hinweis: „Kein Problem – für die weitere Berechnung nehmen wir an, dass eine Erwerbsminderung vorliegt. Ob das tatsächlich zutrifft, muss ärztlich geprüft werden. Wir empfehlen, sich bei der Deutschen Rentenversicherung beraten zu lassen."

---

### Schritt 2 von 5: „Ihre Wohnsituation"

**Überschrift:** „Wie wohnen Sie?"
**Untertext:** „Die Grundsicherung übernimmt auch angemessene Wohn- und Heizkosten."

| # | Frage | Typ | Tooltip | Default |
|---|---|---|---|---|
| 2.1 | „Wohnen Sie zur Miete oder im Eigentum?" | Radio: ○ Zur Miete / ○ Im eigenen Haus oder Eigentumswohnung | „Auch wenn Sie in Ihrer eigenen Wohnung leben, können Sie Grundsicherung erhalten. Eine angemessene selbstgenutzte Immobilie müssen Sie nicht verkaufen." | — |
| 2.2 | „Wie hoch ist Ihre monatliche Warmmiete (Kaltmiete + Nebenkosten, ohne Heizung)?" | Zahleneingabe in € | „Gemeint ist die Kaltmiete plus Betriebskosten (Wasser, Müll, Hausmeister etc.), aber OHNE Heizung. Wenn Sie im Eigentum wohnen, geben Sie hier Ihre monatlichen Wohnkosten ein (Hausgeld, Grundsteuer etc.)." | 0 |
| 2.3 | „Wie hoch sind Ihre monatlichen Heizkosten?" | Zahleneingabe in € | „Gas, Öl, Fernwärme – der monatliche Betrag. Wenn die Heizkosten in den Nebenkosten enthalten sind, tragen Sie hier 0 ein und geben oben die Gesamtsumme an." | 0 |

**Design-Details für Zahleneingaben:**
- Große Eingabefelder, Schrift mindestens 18px.
- „€" als Suffix im Feld anzeigen (nicht als Prefix).
- Nur Zahlen erlauben, Komma und Punkt akzeptieren.
- Leere Felder = 0 (kein Fehler anzeigen).

---

### Schritt 3 von 5: „Ihr Einkommen"

**Überschrift:** „Welches Einkommen haben Sie?"
**Untertext:** „Tragen Sie Ihre monatlichen Einkünfte ein – jeweils den Betrag, der auf Ihrem Konto ankommt (netto). Felder, die nicht auf Sie zutreffen, lassen Sie einfach leer."

| # | Frage | Typ | Tooltip | Bedingung |
|---|---|---|---|---|
| 3.1 | „Gesetzliche Rente (monatlich netto)" | Zahleneingabe € | „Der Betrag, der nach Abzug von Kranken- und Pflegeversicherung auf Ihr Konto überwiesen wird. Sie finden ihn auf Ihrem Rentenbescheid oder Kontoauszug." | immer |
| 3.2 | „Betriebsrente (monatlich netto)" | Zahleneingabe € | „Auch Direktversicherung, Pensionskasse oder Zusatzversorgung des öffentlichen Dienstes (z.B. VBL)." | immer |
| 3.3 | „Private Rente oder Riester-Auszahlung (monatlich)" | Zahleneingabe € | „Monatliche Auszahlungen aus privater Rentenversicherung, Riester-Vertrag oder Rürup-Rente." | immer |
| 3.4 | „Einkommen aus Arbeit (monatlich brutto)" | Zahleneingabe € | „Falls Sie nebenbei arbeiten, z.B. einen Minijob haben. Hier den Brutto-Betrag angeben – es gibt einen Freibetrag." | immer |
| 3.5 | „Sonstige Einkünfte (monatlich)" | Zahleneingabe € | „z.B. Mieteinnahmen, Unterhaltszahlungen die Sie erhalten, Zinsen, Witwenrente etc." | immer |
| 3.6 | „Einkommen Ihres Partners / Ihrer Partnerin (monatlich netto gesamt)" | Zahleneingabe € | „Die Summe aller Einkünfte Ihres Ehe- oder Lebenspartners. Bei Paaren wird das Einkommen gemeinsam betrachtet." | Nur bei Familienstand = Partnerschaft |
| 3.7 | „Haben Sie mindestens 33 Jahre lang in die Rentenversicherung eingezahlt?" | Radio: ○ Ja / ○ Nein / ○ Ich weiß nicht | „Gemeint sind sogenannte ‚Grundrentenzeiten': Jahre, in denen Pflichtbeiträge zur Rentenversicherung gezahlt wurden – z.B. durch Arbeit, Kindererziehung oder Pflege. Wenn ja, wird ein Teil Ihrer Rente nicht auf die Grundsicherung angerechnet. Sie finden diese Information in Ihrem Rentenversicherungsverlauf." | immer |
| 3.8 | „Erhalten Sie Einkommen aus zusätzlicher Altersvorsorge (Betriebsrente, Riester, freiwillige Rentenversicherung)?" | Automatisch erkannt | — Kein eigenes Feld – wird aus 3.2 + 3.3 berechnet. Wenn > 0, wird der Freibetrag automatisch angewandt. | — |

---

### Schritt 4 von 5: „Ihr Vermögen"

**Überschrift:** „Haben Sie Ersparnisse oder Vermögen?"
**Untertext:** „Bei der Grundsicherung gibt es einen Freibetrag: Sie dürfen bis zu 10.000 € behalten (bei Paaren 20.000 €). Bestimmte Dinge zählen gar nicht als Vermögen."

**Zuerst eine Info-Box anzeigen (hervorgehoben, beruhigend):**
> 💡 **Was zählt NICHT als Vermögen:**
> - Ihre selbstbewohnte Wohnung oder Ihr Haus (solange angemessen)
> - Ihr Auto (ein normaler PKW)
> - Normaler Hausrat und Möbel
> - Staatlich geförderte Riester-Rente
> - Familienstücke mit persönlichem Wert
>
> Diese Dinge müssen Sie **nicht** mitzählen.

| # | Frage | Typ | Tooltip |
|---|---|---|---|
| 4.1 | „Wie hoch ist Ihr Geldvermögen? (Bargeld, Sparbuch, Girokonto, Tagesgeld, Aktien, Fonds)" | Zahleneingabe € | „Zählen Sie zusammen, was auf allen Ihren Konten liegt, plus Bargeld. Denken Sie auch an Aktien-Depots oder Fonds." |
| 4.2 | „Haben Sie eine Lebensversicherung (nicht Riester)? Wenn ja: Wie hoch ist der aktuelle Rückkaufswert?" | Zahleneingabe € | „Den Rückkaufswert finden Sie in Ihrem jährlichen Versicherungsschreiben. Riester-Verträge zählen hier NICHT mit – die sind geschützt." |
| 4.3 | „Haben Sie sonstiges verwertbares Vermögen? (z.B. eine vermietete Wohnung, wertvoller Schmuck)" | Zahleneingabe € | „Nur Dinge, die Sie verkaufen könnten und die einen nennenswerten Wert haben. Normaler Hausrat zählt nicht." |

**Nach Eingabe Berechnung:**
```
gesamtvermoegen = 4.1 + 4.2 + 4.3
schongrenze = (familienstand === 'partnerschaft') ? 20000 : 10000
```

Wenn `gesamtvermoegen > schongrenze` → Gelbe Hinweis-Box:
> „Ihr Vermögen liegt über dem Freibetrag von [10.000 / 20.000] €. In diesem Fall müssten Sie zunächst Ihr Vermögen bis auf diesen Betrag aufbrauchen, bevor Sie Grundsicherung erhalten können. [Button: Trotzdem Berechnung anzeigen]"

---

### Schritt 5 von 5: „Noch zwei kurze Fragen"

**Überschrift:** „Fast geschafft – nur noch zwei Punkte"

| # | Frage | Typ | Tooltip |
|---|---|---|---|
| 5.1 | „Verdient eines Ihrer Kinder oder ein Elternteil mehr als 100.000 € brutto im Jahr?" | Radio: ○ Nein / ○ Ja / ○ Habe keine Kinder/Eltern | „In der Regel werden Kinder und Eltern NICHT zum Unterhalt herangezogen. Nur wenn ein Kind oder Elternteil mehr als 100.000 € im Jahr verdient, kann der Anspruch auf Grundsicherung entfallen. Im Zweifel: ‚Nein' ankreuzen – das Sozialamt prüft dies ohnehin selbst." |
| 5.2 | „Haben Sie einen Schwerbehindertenausweis mit dem Merkzeichen ‚G' (gehbehindert) oder ‚aG' (außergewöhnlich gehbehindert)?" | Radio: ○ Ja / ○ Nein / ○ Ich weiß nicht | „Wenn ja, erhalten Sie einen Zuschlag von 17 % auf den Regelsatz (ca. 96 €). Das Merkzeichen steht auf Ihrem Schwerbehindertenausweis. Wenn Sie unsicher sind, wählen Sie ‚Nein' – Sie können das später noch klären." |
| 5.3 | „Haben Sie in den letzten 10 Jahren Ihr Vermögen absichtlich aufgebraucht, um bedürftig zu werden? (z.B. Vermögen verschenkt, um Grundsicherung zu bekommen)" | Radio: ○ Nein / ○ Ja | „Diese Frage klingt ungewöhnlich, ist aber gesetzlich vorgeschrieben. Gemeint ist bewusstes Herbeiführen der Bedürftigkeit – z.B. wenn jemand sein gesamtes Vermögen verschenkt, um staatliche Hilfe zu beziehen. Wenn Sie einfach nur wenig Geld haben, lautet die Antwort ‚Nein'." |

**Wichtig zu 5.3:** Diese Frage muss UNBEDINGT entschärft werden:
- Stelle sie als letzte Frage
- Verwende beruhigenden Tooltip
- Die Formulierung soll NICHT kriminalisieren
- „Nein" als erste (vorausgewählte) Option

---

## TEIL 3: ERGEBNIS-SEITE

### Variante A: Anspruch besteht (Nettobedarf > 0)

**Großes Element oben:**
```
┌─────────────────────────────────────────────┐
│  ✅ Gute Nachricht!                         │
│                                             │
│  Nach unserer Berechnung haben Sie          │
│  voraussichtlich Anspruch auf               │
│                                             │
│       ca. XXX € pro Monat                   │
│       Grundsicherung                        │
│                                             │
│  Dies ist eine Schätzung. Die genaue Höhe   │
│  bestimmt das Sozialamt.                    │
└─────────────────────────────────────────────┘
```

**Darunter: Aufklappbare Berechnung „So haben wir gerechnet":**

```
Ihr Bedarf (was Ihnen zusteht):
───────────────────────────────────────
  Regelsatz                     XXX €
  Wohnkosten (Miete + NK)      XXX €
  Heizkosten                    XXX €
  Mehrbedarf Schwerbehinderung  XXX €  (nur wenn zutreffend)
  ───────────────────────────────────
  Gesamtbedarf                  XXX €

Ihr angerechnetes Einkommen:
───────────────────────────────────────
  Gesetzliche Rente             XXX €
  Betriebsrente                 XXX €
  ...
  abzüglich Freibeträge       -XXX €
  ───────────────────────────────────
  Angerechnetes Einkommen       XXX €

═══════════════════════════════════════
  Ihr Grundsicherungsanspruch   XXX €
  (Bedarf minus Einkommen)
```

**Darunter: „Was jetzt? – Nächste Schritte" (Card-Layout):**

1. **📋 Antrag stellen** – „Gehen Sie zu Ihrem örtlichen Sozialamt und stellen Sie einen Antrag. Die Leistung wird ab dem Monat der Antragstellung gezahlt – also besser früher als später!"
2. **📞 Beratung** – „Sie können sich kostenlos beraten lassen: Bei Ihrem Sozialamt, bei der Deutschen Rentenversicherung (Tel: 0800 1000 4800), oder bei einem Sozialverband (VdK, SoVD)."
3. **📄 Unterlagen** – „Zum Antrag benötigen Sie in der Regel: Personalausweis, Rentenbescheid, Mietvertrag, Kontoauszüge der letzten 3 Monate."

### Variante B: Kein Anspruch

**Großes Element oben:**
```
┌─────────────────────────────────────────────┐
│  ℹ️ Nach unserer Einschätzung besteht       │
│     derzeit kein Anspruch.                  │
│                                             │
│  Grund: [konkreter Grund in einfacher       │
│  Sprache, z.B. "Ihr Einkommen liegt über    │
│  dem berechneten Bedarf."]                  │
│                                             │
│  Dies ist nur eine Schätzung – im Zweifel   │
│  lohnt sich ein Antrag beim Sozialamt.      │
└─────────────────────────────────────────────┘
```

**Ablehnungsgründe in einfacher Sprache (Mapping):**

| Technischer Grund | UI-Text |
|---|---|
| Kein Aufenthalt in DE | „Die Grundsicherung setzt einen Wohnsitz in Deutschland voraus." |
| Altersgrenze nicht erreicht + keine EM | „Die Grundsicherung im Alter richtet sich an Personen ab dem Rentenalter (bei Ihnen: XX Jahre und X Monate) oder an dauerhaft voll Erwerbsgeminderte. Für Jüngere kann das Bürgergeld in Frage kommen." |
| Vermögen zu hoch | „Ihr Vermögen liegt über dem Freibetrag von [10.000/20.000] €. Sie müssten erst Ihre Ersparnisse bis auf diesen Betrag aufbrauchen." |
| Einkommen reicht | „Ihr monatliches Einkommen ([Betrag] €) deckt Ihren berechneten Bedarf ([Betrag] €). Der Differenzbetrag von [Betrag] € wird nicht als Grundsicherung ausgezahlt." |
| Unterhaltspflichtige > 100k | „Wenn ein Kind oder Elternteil mehr als 100.000 € im Jahr verdient, besteht in der Regel kein Anspruch, weil dann eine Unterhaltspflicht greift." |
| Bedürftigkeit selbst herbeigeführt | „Wenn die Bedürftigkeit in den letzten 10 Jahren selbst herbeigeführt wurde, kann der Anspruch entfallen. Das Sozialamt prüft dies im Einzelfall." |

**Darunter trotzdem:** „Was Sie tun können"-Karten:
- „Stellen Sie trotzdem einen Antrag – unsere Berechnung kann nicht alle Umstände berücksichtigen."
- „Lassen Sie sich beraten: Sozialamt, Rentenversicherung, oder Sozialverband."

### Variante C: Grenzfall (Nettobedarf knapp unter/über 0 – Differenz < 50 €)

Zeige spezielle Meldung:
> „Ihr Einkommen und Ihr Bedarf liegen sehr nah beieinander. Es ist möglich, dass Sie Anspruch haben – kleine Unterschiede in der Berechnung (z.B. die genaue Höhe der Wohnkosten) können das Ergebnis verändern. **Wir empfehlen, einen Antrag beim Sozialamt zu stellen.**"

---

## TEIL 4: BERECHNUNGSLOGIK (vollständiger Pseudocode)

### 4.1 Konstanten

```javascript
const CONFIG = {
  // Regelsätze (Stand 2024/2025/2026 – unverändert)
  REGELSATZ_ALLEINSTEHEND: 563,
  REGELSATZ_PARTNER: 506,       // je Person bei Paaren

  // Schonvermögen
  SCHONVERMOEGEN_PERSON: 10000,
  SCHONVERMOEGEN_PARTNER: 10000, // zusätzlich

  // Mehrbedarfe
  MEHRBEDARF_MERKZEICHEN_G_PROZENT: 0.17,

  // Freibeträge
  FREIBETRAG_ERWERBSTAETIGKEIT_PROZENT: 0.30,
  FREIBETRAG_VORSORGE_GRUNDBETRAG: 100,
  FREIBETRAG_VORSORGE_PROZENT: 0.30,
  FREIBETRAG_GRUNDRENTE_GRUNDBETRAG: 100,
  FREIBETRAG_GRUNDRENTE_PROZENT: 0.30,
  FREIBETRAG_MAX: 281.50,  // 50% von REGELSATZ_ALLEINSTEHEND

  // Unterhaltsgrenze
  UNTERHALT_GRENZE_JAEHRLICH: 100000,

  // Regelaltersgrenze nach Geburtsjahr
  // Format: { jahre, monate }
  ALTERSGRENZEN: {
    // Vor 1947: Default 65+0
    1947: { jahre: 65, monate: 1 },
    1948: { jahre: 65, monate: 2 },
    1949: { jahre: 65, monate: 3 },
    1950: { jahre: 65, monate: 4 },
    1951: { jahre: 65, monate: 5 },
    1952: { jahre: 65, monate: 6 },
    1953: { jahre: 65, monate: 7 },
    1954: { jahre: 65, monate: 8 },
    1955: { jahre: 65, monate: 9 },
    1956: { jahre: 65, monate: 10 },
    1957: { jahre: 65, monate: 11 },
    1958: { jahre: 66, monate: 0 },
    1959: { jahre: 66, monate: 2 },
    1960: { jahre: 66, monate: 4 },
    1961: { jahre: 66, monate: 6 },
    1962: { jahre: 66, monate: 8 },
    1963: { jahre: 66, monate: 10 },
    // Ab 1964: Default 67+0
  }
};
```

### 4.2 Funktion: Altersgrenze prüfen

```javascript
function getAltersgrenze(geburtsjahr) {
  if (geburtsjahr < 1947) return { jahre: 65, monate: 0 };
  if (geburtsjahr >= 1964) return { jahre: 67, monate: 0 };
  return CONFIG.ALTERSGRENZEN[geburtsjahr];
}

function hatAltersgrenzeErreicht(geburtsdatum) {
  const geburtsjahr = geburtsdatum.getFullYear();
  const grenze = getAltersgrenze(geburtsjahr);

  // Berechne das Datum, an dem die Altersgrenze erreicht wird:
  // Geburtstag + grenze.jahre Jahre + grenze.monate Monate
  const grenzdatum = new Date(geburtsdatum);
  grenzdatum.setFullYear(grenzdatum.getFullYear() + grenze.jahre);
  grenzdatum.setMonth(grenzdatum.getMonth() + grenze.monate);

  const heute = new Date();
  return heute >= grenzdatum;
}
```

### 4.3 Funktion: Vermögensprüfung

```javascript
function pruefeVermoegen(gesamtvermoegen, hatPartner) {
  const schongrenze = CONFIG.SCHONVERMOEGEN_PERSON
    + (hatPartner ? CONFIG.SCHONVERMOEGEN_PARTNER : 0);

  return {
    bestanden: gesamtvermoegen <= schongrenze,
    schongrenze: schongrenze,
    ueberschuss: Math.max(0, gesamtvermoegen - schongrenze)
  };
}
```

### 4.4 Funktion: Bedarfsberechnung

```javascript
function berechneBedarf(input) {
  const { familienstand, wohnkosten, heizkosten, hatMerkzeichenG } = input;

  // Regelsatz bestimmen
  let regelsatz;
  if (familienstand === 'partnerschaft') {
    regelsatz = CONFIG.REGELSATZ_PARTNER * 2; // beide Partner
  } else {
    regelsatz = CONFIG.REGELSATZ_ALLEINSTEHEND;
  }

  // Mehrbedarf Schwerbehinderung
  let mehrbedarf = 0;
  if (hatMerkzeichenG) {
    const basisRegelsatz = (familienstand === 'partnerschaft')
      ? CONFIG.REGELSATZ_PARTNER
      : CONFIG.REGELSATZ_ALLEINSTEHEND;
    mehrbedarf = Math.round(basisRegelsatz * CONFIG.MEHRBEDARF_MERKZEICHEN_G_PROZENT * 100) / 100;
  }

  const bruttobedarf = regelsatz + wohnkosten + heizkosten + mehrbedarf;

  return {
    regelsatz,
    wohnkosten,
    heizkosten,
    mehrbedarf,
    bruttobedarf
  };
}
```

### 4.5 Funktion: Einkommensberechnung mit Freibeträgen

```javascript
function berechneAnrechenbaresEinkommen(input) {
  const {
    gesetzlicheRente = 0,
    betriebsrente = 0,
    privateRente = 0,
    erwerbseinkommen = 0,
    sonstigesEinkommen = 0,
    einkommenPartner = 0,
    hatGrundrentenzeiten33Plus,
    familienstand
  } = input;

  let gesamtEinkommen = gesetzlicheRente + betriebsrente + privateRente
                        + erwerbseinkommen + sonstigesEinkommen + einkommenPartner;

  let abzuege = 0;
  let freibetraegeDetails = [];

  // 1. Erwerbstätigkeitsfreibetrag (§ 82 Abs. 3 SGB XII)
  if (erwerbseinkommen > 0) {
    const erwerbsFreibetrag = Math.min(
      erwerbseinkommen * CONFIG.FREIBETRAG_ERWERBSTAETIGKEIT_PROZENT,
      CONFIG.FREIBETRAG_MAX
    );
    abzuege += erwerbsFreibetrag;
    freibetraegeDetails.push({
      name: 'Freibetrag Erwerbstätigkeit (30%)',
      betrag: erwerbsFreibetrag
    });
  }

  // 2. Freibetrag für zusätzliche Altersvorsorge (§ 82 Abs. 4 SGB XII)
  const altersvorsorgeEinkommen = betriebsrente + privateRente;
  if (altersvorsorgeEinkommen > 0) {
    const uebersteigernd = Math.max(0, altersvorsorgeEinkommen - CONFIG.FREIBETRAG_VORSORGE_GRUNDBETRAG);
    const vorsorgeFreibetrag = Math.min(
      CONFIG.FREIBETRAG_VORSORGE_GRUNDBETRAG + (uebersteigernd * CONFIG.FREIBETRAG_VORSORGE_PROZENT),
      CONFIG.FREIBETRAG_MAX
    );
    // Freibetrag darf nicht höher sein als das Einkommen selbst
    const effektiverFreibetrag = Math.min(vorsorgeFreibetrag, altersvorsorgeEinkommen);
    abzuege += effektiverFreibetrag;
    freibetraegeDetails.push({
      name: 'Freibetrag Altersvorsorge',
      betrag: effektiverFreibetrag
    });
  }

  // 3. Freibetrag Grundrentenzeiten (§ 82a SGB XII)
  if (hatGrundrentenzeiten33Plus && gesetzlicheRente > 0) {
    const uebersteigernd = Math.max(0, gesetzlicheRente - CONFIG.FREIBETRAG_GRUNDRENTE_GRUNDBETRAG);
    const grundrenteFreibetrag = Math.min(
      CONFIG.FREIBETRAG_GRUNDRENTE_GRUNDBETRAG + (uebersteigernd * CONFIG.FREIBETRAG_GRUNDRENTE_PROZENT),
      CONFIG.FREIBETRAG_MAX
    );
    const effektiverFreibetrag = Math.min(grundrenteFreibetrag, gesetzlicheRente);
    abzuege += effektiverFreibetrag;
    freibetraegeDetails.push({
      name: 'Freibetrag Grundrentenzeiten (≥33 Jahre)',
      betrag: effektiverFreibetrag
    });
  }

  const anrechenbar = Math.max(0, gesamtEinkommen - abzuege);

  return {
    gesamtEinkommen,
    abzuege,
    freibetraegeDetails,
    anrechenbaresEinkommen: anrechenbar
  };
}
```

### 4.6 Hauptfunktion: Eligibility-Check

```javascript
function berechneAnspruch(allInputs) {
  const ergebnis = {
    hatAnspruch: false,
    ausschlussgruende: [],
    bruttobedarf: 0,
    anrechenbaresEinkommen: 0,
    nettobedarf: 0,
    bedarfsDetails: null,
    einkommensDetails: null,
    istGrenzfall: false
  };

  // ── SCHRITT 1: Aufenthalt ──
  if (!allInputs.wohntInDeutschland) {
    ergebnis.ausschlussgruende.push({
      code: 'KEIN_AUFENTHALT_DE',
      text: 'Die Grundsicherung setzt einen Wohnsitz in Deutschland voraus.'
    });
  }

  // ── SCHRITT 2: Alter oder Erwerbsminderung ──
  const altersgrenze = getAltersgrenze(allInputs.geburtsjahr);
  const hatAlter = hatAltersgrenzeErreicht(allInputs.geburtsdatum);
  const hatEM = allInputs.alter >= 18 && allInputs.istDauerhaftVollErwerbsgemindert;

  if (!hatAlter && !hatEM) {
    const grenzeText = `${altersgrenze.jahre} Jahre und ${altersgrenze.monate} Monate`;
    ergebnis.ausschlussgruende.push({
      code: 'KEIN_ALTER_KEINE_EM',
      text: `Die Grundsicherung im Alter richtet sich an Personen ab dem Rentenalter (bei Ihrem Jahrgang: ${grenzeText}) oder an dauerhaft voll Erwerbsgeminderte ab 18 Jahren.`
    });
  }

  // ── SCHRITT 3: Selbst herbeigeführte Bedürftigkeit ──
  if (allInputs.beduerftigkeitSelbstHerbeigefuehrt) {
    ergebnis.ausschlussgruende.push({
      code: 'SELBST_HERBEIGEFUEHRT',
      text: 'Wenn die Bedürftigkeit in den letzten 10 Jahren absichtlich oder grob fahrlässig herbeigeführt wurde, kann der Anspruch entfallen.'
    });
  }

  // ── SCHRITT 4: Unterhaltspflichtige > 100k ──
  if (allInputs.unterhaltspflichtigeUeber100k) {
    ergebnis.ausschlussgruende.push({
      code: 'UNTERHALT_UEBER_100K',
      text: 'Wenn ein Kind oder Elternteil mehr als 100.000 € brutto im Jahr verdient, greift die Unterhaltspflicht.'
    });
  }

  // ── SCHRITT 5: Vermögensprüfung ──
  const hatPartner = allInputs.familienstand === 'partnerschaft';
  const vermoegensPruefung = pruefeVermoegen(allInputs.gesamtvermoegen, hatPartner);
  if (!vermoegensPruefung.bestanden) {
    ergebnis.ausschlussgruende.push({
      code: 'VERMOEGEN_ZU_HOCH',
      text: `Ihr Vermögen (${allInputs.gesamtvermoegen.toLocaleString('de-DE')} €) liegt über dem Freibetrag von ${vermoegensPruefung.schongrenze.toLocaleString('de-DE')} €.`
    });
  }

  // ── SCHRITT 6: Bedarfs- und Einkommensberechnung ──
  const bedarf = berechneBedarf({
    familienstand: allInputs.familienstand,
    wohnkosten: allInputs.wohnkosten,
    heizkosten: allInputs.heizkosten,
    hatMerkzeichenG: allInputs.hatMerkzeichenG
  });

  const einkommen = berechneAnrechenbaresEinkommen({
    gesetzlicheRente: allInputs.gesetzlicheRente,
    betriebsrente: allInputs.betriebsrente,
    privateRente: allInputs.privateRente,
    erwerbseinkommen: allInputs.erwerbseinkommen,
    sonstigesEinkommen: allInputs.sonstigesEinkommen,
    einkommenPartner: allInputs.einkommenPartner,
    hatGrundrentenzeiten33Plus: allInputs.hatGrundrentenzeiten33Plus,
    familienstand: allInputs.familienstand
  });

  ergebnis.bruttobedarf = bedarf.bruttobedarf;
  ergebnis.anrechenbaresEinkommen = einkommen.anrechenbaresEinkommen;
  ergebnis.nettobedarf = Math.max(0, bedarf.bruttobedarf - einkommen.anrechenbaresEinkommen);
  ergebnis.bedarfsDetails = bedarf;
  ergebnis.einkommensDetails = einkommen;

  if (ergebnis.nettobedarf <= 0 && ergebnis.ausschlussgruende.length === 0) {
    ergebnis.ausschlussgruende.push({
      code: 'EINKOMMEN_REICHT',
      text: `Ihr monatliches angerechnetes Einkommen (${einkommen.anrechenbaresEinkommen.toFixed(2)} €) deckt Ihren Bedarf (${bedarf.bruttobedarf.toFixed(2)} €).`
    });
  }

  // ── ERGEBNIS ──
  ergebnis.hatAnspruch = ergebnis.ausschlussgruende.length === 0 && ergebnis.nettobedarf > 0;
  ergebnis.istGrenzfall = Math.abs(bedarf.bruttobedarf - einkommen.anrechenbaresEinkommen) < 50;

  return ergebnis;
}
```

---

## TEIL 5: ZUSÄTZLICHE UI-ELEMENTE

### 5.1 Disclaimer-Banner (immer sichtbar, am Seitenende fixiert oder prominent oben)

> ⚖️ **Wichtig:** Dieser Rechner liefert eine unverbindliche Ersteinschätzung auf Basis Ihrer Angaben. Er kann nicht alle individuellen Umstände berücksichtigen. Die endgültige Entscheidung trifft das Sozialamt nach Prüfung Ihres Antrags. Rechtsstand: 2026.

### 5.2 Ergebnisseite: „Berechnung neu starten"-Button

### 5.3 Datenschutz-Hinweis (am Seitenende)

> 🔒 **Ihre Daten bleiben bei Ihnen.** Alle Berechnungen finden direkt in Ihrem Browser statt. Es werden keine persönlichen Daten an einen Server gesendet oder gespeichert.

### 5.4 Intro-Seite (vor Schritt 1)

Bevor der Wizard startet, eine kurze Willkommensseite:

**Überschrift:** „Haben Sie Anspruch auf Grundsicherung im Alter?"

**Text:** „Viele Rentnerinnen und Rentner in Deutschland erhalten weniger Geld als ihnen zusteht – oft, weil sie nicht wissen, dass sie Grundsicherung beantragen können. Dieser Rechner hilft Ihnen in wenigen Minuten herauszufinden, ob Sie einen Anspruch haben könnten und wie hoch die Leistung ungefähr wäre."

**Drei kurze Fakten (als kleine Cards):**
- 🕐 „Dauert nur 3-5 Minuten"
- 🔒 „Ihre Daten bleiben in Ihrem Browser"
- 📋 „Sie erhalten eine klare Einschätzung"

**[Großer Button: „Jetzt prüfen →"]**

---

## TEIL 6: TECHNISCHE UMSETZUNG

### Stack
- **React (JSX)** – eine einzelne .jsx-Datei
- **Tailwind CSS** (Utility-Klassen) für Styling
- **Lucide React Icons** für Icons
- **Keine externen APIs** – alles client-side
- **State Management:** `useState` und `useReducer` für den Wizard-State
- **Google Fonts:** Lade via CDN-Link im HTML-Head: Nunito (Body) + Merriweather (Headings) – oder ähnliche warme, gut lesbare Kombination

### Struktur der Komponente

```
<App>
  ├── <Header />              // Titel + Fortschrittsbalken
  ├── <WizardStep>             // Dynamisch basierend auf currentStep
  │   ├── <IntroPage />        // Step 0: Willkommen
  │   ├── <PersonalStep />     // Step 1: Über Sie
  │   ├── <WohnungStep />      // Step 2: Wohnsituation
  │   ├── <EinkommenStep />    // Step 3: Einkommen
  │   ├── <VermoegenStep />    // Step 4: Vermögen
  │   ├── <ZusatzfragenStep /> // Step 5: Letzte Fragen
  │   └── <ErgebnisStep />     // Step 6: Ergebnis
  ├── <NavigationButtons />    // Zurück / Weiter
  └── <Footer />               // Disclaimer + Datenschutz
</App>
```

### Wichtige Implementierungsdetails

1. **Zahlenformatierung:** Immer mit `.toLocaleString('de-DE')` formatieren (1.000,00 €). Eingabefelder akzeptieren Komma UND Punkt als Dezimaltrennzeichen.

2. **Fortschrittsbalken:** 5 Schritte, visuell als verbundene Kreise mit Labels. Aktueller Schritt hervorgehoben, abgeschlossene Schritte mit Häkchen.

3. **Animationen:** Sanfte Slide-Übergänge zwischen Wizard-Schritten (CSS transition, 300ms ease). Tooltips mit fade-in.

4. **Tooltip-Implementierung:** Klickbasiert (nicht hover), weil Touch-Geräte. Schließt bei Klick außerhalb.

5. **Validierung:** Minimal und freundlich. Keine roten Fehlermeldungen. Leere Zahlfelder = 0.

6. **Print-Funktion:** Auf der Ergebnisseite ein „Ergebnis drucken/speichern"-Button, der `window.print()` triggert mit sauberem Print-Stylesheet.

7. **Locale:** Alle Texte hardcoded in Deutsch. Keine i18n nötig.

---

## TEIL 7: TESTFÄLLE

### Test 1: Standard-Rentnerin mit Anspruch
- Geburt: 15.03.1957, lebt in DE, alleinstehend
- Miete: 450€, Heizung: 80€
- Rente: 850€ netto, keine Betriebsrente
- 35 Jahre eingezahlt (Grundrentenzeiten: ja)
- Merkzeichen G: ja
- Vermögen: 3.000€
- **Erwartetes Ergebnis:** Anspruch, ca. 620€

### Test 2: Paar mit ausreichendem Einkommen
- Geburt: 01.06.1955, verheiratet
- Miete: 600€, Heizung: 100€
- Rente Person 1: 900€, Person 2: 800€
- Kein Mehrbedarf
- **Erwartetes Ergebnis:** Kein Anspruch (Einkommen deckt Bedarf)

### Test 3: Junger Mensch mit Erwerbsminderung
- Geburt: 10.10.1990, lebt in DE, alleinstehend
- Dauerhaft voll erwerbsgemindert: ja
- Miete: 350€, Heizung: 60€
- EM-Rente: 400€
- Vermögen: 8.000€
- **Erwartetes Ergebnis:** Anspruch

### Test 4: Vermögen zu hoch
- Geburt: 01.01.1950, alleinstehend
- Rente: 500€
- Vermögen: 25.000€
- **Erwartetes Ergebnis:** Kein Anspruch (Vermögen über 10.000€)

### Test 5: Grenzfall
- Geburt: 01.01.1955, alleinstehend
- Miete: 400€, Heizung: 70€
- Rente: 990€
- **Erwartetes Ergebnis:** Grenzfall-Meldung (Differenz < 50€)

---

## TEIL 8: QUALITÄTS-CHECKLISTE

Vor Auslieferung prüfen:

- [ ] Alle Tooltips sind verständlich ohne juristische Vorkenntnisse
- [ ] Kein juristisches Fachwort ohne Erklärung
- [ ] Zahlen immer im deutschen Format (1.000,00 €)
- [ ] Alle Berechnungen auf 2 Dezimalstellen gerundet
- [ ] Ergebnis-Seite zeigt transparente Aufschlüsselung
- [ ] Disclaimer ist sichtbar
- [ ] Datenschutzhinweis ist vorhanden
- [ ] „Nächste Schritte" mit konkreten Handlungsempfehlungen
- [ ] Fortschrittsbalken funktioniert korrekt
- [ ] Zurück-Navigation auf allen Schritten
- [ ] Mobilfähig (ab 320px Breite)
- [ ] Schrift mindestens 18px
- [ ] Guter Kontrast (WCAG AA)
- [ ] Testfälle 1-5 bestanden

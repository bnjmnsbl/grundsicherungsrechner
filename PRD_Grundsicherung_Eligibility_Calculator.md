# PRD: Eligibility Calculator – Grundsicherung im Alter (SGB XII, 4. Kapitel)

**Version:** 1.0
**Datum:** 16. Februar 2026
**Rechtsstand:** Januar 2026 (Regelsätze 2024/2025/2026 unverändert bei 563 €)
**Rechtsgrundlage:** §§ 41–46a SGB XII (Sozialgesetzbuch XII – Sozialhilfe)

---

## 1. Produktübersicht

### 1.1 Zweck
Ein webbasierter Calculator, der Nutzern ermöglicht festzustellen, ob sie grundsätzlich Anspruch auf **Grundsicherung im Alter und bei Erwerbsminderung** nach dem 4. Kapitel SGB XII haben und eine grobe Schätzung der Leistungshöhe liefert.

### 1.2 Wichtiger Disclaimer (muss im UI angezeigt werden)
> Dieses Tool liefert eine unverbindliche Ersteinschätzung. Es ersetzt keine rechtliche Beratung und keinen offiziellen Antrag beim Sozialamt. Die tatsächliche Bewilligung hängt von einer Einzelfallprüfung ab.

---

## 2. Eligibility-Kriterien (Anspruchsvoraussetzungen)

Alle folgenden Kriterien müssen **gleichzeitig** erfüllt sein, damit ein Anspruch besteht. Ist **ein** Kriterium nicht erfüllt, besteht kein Anspruch.

### 2.1 Personenbezogene Voraussetzungen

#### Kriterium A: Alter ODER dauerhafte volle Erwerbsminderung

Es muss **eine** der folgenden Bedingungen zutreffen:

**Option A1: Altersgrenze erreicht (§ 41 Abs. 2 SGB XII)**

Die Regelaltersgrenze ist abhängig vom Geburtsjahr. Sie muss erreicht oder überschritten sein.

| Geburtsjahr | Regelaltersgrenze (Jahre + Monate) |
|---|---|
| vor 1947 | 65 Jahre + 0 Monate |
| 1947 | 65 Jahre + 1 Monat |
| 1948 | 65 Jahre + 2 Monate |
| 1949 | 65 Jahre + 3 Monate |
| 1950 | 65 Jahre + 4 Monate |
| 1951 | 65 Jahre + 5 Monate |
| 1952 | 65 Jahre + 6 Monate |
| 1953 | 65 Jahre + 7 Monate |
| 1954 | 65 Jahre + 8 Monate |
| 1955 | 65 Jahre + 9 Monate |
| 1956 | 65 Jahre + 10 Monate |
| 1957 | 65 Jahre + 11 Monate |
| 1958 | 66 Jahre + 0 Monate |
| 1959 | 66 Jahre + 2 Monate |
| 1960 | 66 Jahre + 4 Monate |
| 1961 | 66 Jahre + 6 Monate |
| 1962 | 66 Jahre + 8 Monate |
| 1963 | 66 Jahre + 10 Monate |
| 1964 oder später | 67 Jahre + 0 Monate |

**Implementierungslogik:**
```
Input: geburtsdatum (Date)
1. Berechne Geburtsjahr
2. Schlage Regelaltersgrenze aus Tabelle nach
3. Addiere die Monate zum 65./66./67. Geburtstag
4. Vergleiche mit aktuellem Datum
5. Return: hat_altersgrenze_erreicht (boolean)
```

**Option A2: Dauerhafte volle Erwerbsminderung (§ 41 Abs. 3 SGB XII)**

- Person ist mindestens **18 Jahre alt**
- Person ist **dauerhaft voll erwerbsgemindert** = kann wegen Krankheit oder Behinderung auf nicht absehbare Zeit unter den üblichen Bedingungen des allgemeinen Arbeitsmarktes **weniger als 3 Stunden täglich** arbeiten (§ 43 Abs. 2 SGB VI)
- Als dauerhaft voll erwerbsgemindert gelten automatisch:
  - Beschäftigte einer Werkstatt für behinderte Menschen (WfbM)
  - Personen in Tagesförderstätten/Fördergruppen einer WfbM
  - Personen im Eingangsverfahren/Berufsbildungsbereich einer WfbM oder bei anderem Leistungsanbieter (§ 60 SGB IX)

**Implementierungslogik:**
```
Input: alter (number), ist_dauerhaft_voll_erwerbsgemindert (boolean)
Bedingung: alter >= 18 AND ist_dauerhaft_voll_erwerbsgemindert == true
```

> **Hinweis für UI:** Bei Erwerbsminderung handelt es sich um eine ja/nein-Frage im Calculator. Die tatsächliche Feststellung erfolgt durch den Rentenversicherungsträger.

#### Kriterium B: Gewöhnlicher Aufenthalt in Deutschland (§ 41 Abs. 1 SGB XII)

- Die Person muss ihren **gewöhnlichen Aufenthalt im Inland** (Deutschland) haben.
- Wer im Ausland wohnt, hat **keinen Anspruch**.
- Bei Auslandsaufenthalt > 4 Wochen ununterbrochen: Leistungen werden nach Ablauf der 4. Woche eingestellt (§ 41a SGB XII).

**Implementierungslogik:**
```
Input: wohnt_in_deutschland (boolean)
Bedingung: wohnt_in_deutschland == true
```

#### Kriterium C: Keine vorsätzlich/grob fahrlässig herbeigeführte Bedürftigkeit (§ 41 Abs. 4 SGB XII)

- Kein Anspruch, wenn die Person in den **letzten 10 Jahren** die Hilfebedürftigkeit **vorsätzlich oder grob fahrlässig** herbeigeführt hat.
- Beispiel: Verschenken des gesamten Vermögens ohne Rücklagen für das Alter.

**Implementierungslogik:**
```
Input: beduerftikeit_selbst_herbeigefuehrt (boolean)
Bedingung: beduerftikeit_selbst_herbeigefuehrt == false
```

> **Hinweis:** Im Calculator als einfache ja/nein-Frage umsetzen. Die tatsächliche Prüfung obliegt dem Sozialamt.

---

### 2.2 Finanzielle Voraussetzungen (Bedürftigkeitsprüfung)

Die Person (und ggf. Ehe-/Lebenspartner) kann den notwendigen Lebensunterhalt **nicht oder nicht ausreichend** aus eigenem Einkommen und Vermögen bestreiten.

#### Kriterium D: Einkommensprüfung (§§ 82–84, 43 SGB XII)

Das **anrechenbare Einkommen** wird dem **Bedarf** gegenübergestellt. Ist das Einkommen niedriger als der Bedarf, besteht grundsätzlich ein Anspruch.

**D1: Bedarfsberechnung (Bruttobedarf)**

| Bedarfskomponente | Betrag (Stand 2024/2025/2026) |
|---|---|
| **Regelsatz Stufe 1** (Alleinstehend / Alleinerziehend) | 563 € / Monat |
| **Regelsatz Stufe 2** (Ehe-/Lebenspartner, je Person) | 506 € / Monat |
| **Regelsatz Stufe 3** (Erwachsene in Einrichtung / besondere Wohnform) | 506 € / Monat |
| Angemessene Kosten für Unterkunft (Kaltmiete + Nebenkosten) | tatsächliche Kosten (ortsabhängig) |
| Angemessene Heizkosten | tatsächliche Kosten |
| Kranken- und Pflegeversicherungsbeiträge | tatsächliche Kosten |
| Mehrbedarf Schwerbehinderung mit Merkzeichen G oder aG | 17% des Regelsatzes = 95,71 € |
| Mehrbedarf Alleinerziehende | je nach Kinderzahl 12–60% des Regelsatzes |
| Sonstige Mehrbedarfe (z.B. kostenaufwändige Ernährung) | nach Einzelfall |

```
Bruttobedarf = Regelsatz
             + Unterkunftskosten (Miete + Nebenkosten)
             + Heizkosten
             + KV/PV-Beiträge
             + ggf. Mehrbedarfe
```

**D2: Anrechenbares Einkommen**

Folgende Einkommen werden grundsätzlich **angerechnet** (abzüglich Freibeträge):

| Einkommensart | Anrechnung |
|---|---|
| Gesetzliche Altersrente / Erwerbsminderungsrente | Ja, voll (abzgl. Freibeträge) |
| Betriebsrente | Ja, voll (abzgl. Freibeträge für Altersvorsorge) |
| Private Rente / Riester | Ja, voll (abzgl. Freibeträge) |
| Einkommen aus Erwerbstätigkeit | Ja, mit 30%-Freibetrag (max. 50% Regelsatz Stufe 1) |
| Einkommen des Ehe-/Lebenspartners | Ja, wird berücksichtigt |
| Kindergeld (für das Kind selbst) | Ja |
| Wohngeld | Ja, vorrangig (bei Wohngeld-Bezug prüfen ob Grundsicherung nötig) |
| Unterhaltszahlungen (die tatsächlich gezahlt werden) | Ja |

**Freibeträge bei Einkommen:**

| Freibetrag | Höhe | Bedingung |
|---|---|---|
| **Erwerbstätigkeitsfreibetrag** | 30% des Bruttoeinkommens, max. 281,50 € (= 50% von 563 €) | Einkommen aus Erwerbstätigkeit |
| **Freibetrag für zusätzliche Altersvorsorge** (§ 82 Abs. 4 SGB XII) | 100 € Grundfreibetrag + 30% des übersteigenden Betrags, max. 50% Regelsatz Stufe 1 = max. 281,50 € | Betriebsrente, Riester, freiwillige Beiträge zur GRV |
| **Freibetrag Grundrentenzeiten** (§ 82a SGB XII) | 100 € + 30% des übersteigenden Betrags, max. 50% Regelsatz Stufe 1 = max. 281,50 € | Mindestens 33 Jahre Grundrentenzeiten |

```
Anrechenbares_Einkommen = Summe_aller_Einkommen
                        - Erwerbstätigkeitsfreibetrag
                        - Freibetrag_Altersvorsorge
                        - Freibetrag_Grundrentenzeiten
                        - Absetzbeträge (KV/PV-Beiträge aus Einkommen, etc.)
```

**D3: Berechnung Nettobedarf (= Leistungshöhe)**

```
Nettobedarf = Bruttobedarf - Anrechenbares_Einkommen

Wenn Nettobedarf > 0: Anspruch auf Grundsicherung in Höhe des Nettobedarfs
Wenn Nettobedarf <= 0: Kein Anspruch (Einkommen reicht aus)
```

#### Kriterium E: Vermögensprüfung (§ 90 SGB XII + DVO zu § 90)

Das verwertbare Vermögen darf die Schonvermögensgrenzen **nicht überschreiten**.

**Schonvermögen (nicht zu verwerten):**

| Vermögensart | Schongrenze / Regel |
|---|---|
| **Barbetrag / Geldvermögen** | **10.000 € pro Person** (Alleinstehende) |
| **Barbetrag Partner** | **+ 10.000 € für Ehe-/Lebenspartner** (= 20.000 € gesamt) |
| Selbstbewohntes Haus/Eigentumswohnung | Geschützt, wenn **angemessen** (ca. 1 Person: 45–50 m², 2 Personen: 60 m²) |
| Angemessener Hausrat | Geschützt |
| Angemessenes Kraftfahrzeug (seit 01.01.2023) | Geschützt (§ 90 Abs. 2 Nr. 10 SGB XII) |
| Gegenstände für Berufsausbildung/Erwerbstätigkeit | Geschützt |
| Familien-/Erbstücke mit ideellem Wert | Geschützt |
| Riester-Rente (staatlich gefördert, zertifiziert) | Geschützt |

**Verwertbares Vermögen (wird angerechnet):**
- Sparguthaben, Tagesgeld, Aktien über 10.000 € (bzw. 20.000 € bei Paaren)
- Kapitallebensversicherungen (Rückkaufswert)
- Immobilien, die nicht selbst bewohnt werden
- Wertgegenstände

**Implementierungslogik:**
```
Input: verwertbares_vermoegen (number), hat_partner (boolean)

schongrenze = hat_partner ? 20000 : 10000

Wenn verwertbares_vermoegen > schongrenze:
    → Vermögen zu hoch, kein Anspruch (oder: erst aufbrauchen)
Sonst:
    → Vermögensprüfung bestanden
```

#### Kriterium F: Unterhaltspflichtige Kinder/Eltern (§ 43 Abs. 5 SGB XII)

- Einkommen von unterhaltspflichtigen **Kindern oder Eltern** wird **nur** berücksichtigt, wenn deren **jährliches Bruttoeinkommen > 100.000 €** beträgt (pro Kind bzw. pro Elternteil).
- Liegt das Einkommen der Kinder/Eltern **unter 100.000 €/Jahr**, erfolgt **kein Unterhaltsrückgriff**.
- Es wird **vermutet**, dass das Einkommen unter 100.000 € liegt (Beweislast beim Sozialamt).

**Implementierungslogik:**
```
Input: kind_oder_elternteil_einkommen_ueber_100k (boolean)

Wenn kind_oder_elternteil_einkommen_ueber_100k == true:
    → Kein Anspruch auf Grundsicherung (Verweis auf Unterhaltspflicht)
Sonst:
    → Kein Ausschluss durch Unterhaltspflichtige
```

> **Hinweis:** In der Praxis prüft das Sozialamt dies. Im Calculator als Frage aufnehmen: "Verdient eines Ihrer Kinder oder ein Elternteil mehr als 100.000 € brutto pro Jahr?"

---

## 3. Ausschlussgründe (zusammengefasst)

Kein Anspruch besteht, wenn **mindestens einer** der folgenden Punkte zutrifft:

| # | Ausschlussgrund | Rechtsgrundlage |
|---|---|---|
| 1 | Altersgrenze nicht erreicht UND keine dauerhafte volle Erwerbsminderung | § 41 Abs. 2+3 |
| 2 | Kein gewöhnlicher Aufenthalt in Deutschland | § 41 Abs. 1 |
| 3 | Bedürftigkeit in den letzten 10 Jahren vorsätzlich/grob fahrlässig herbeigeführt | § 41 Abs. 4 |
| 4 | Einkommen (inkl. Partner) deckt den Bedarf vollständig | § 43 i.V.m. §§ 82 ff. |
| 5 | Verwertbares Vermögen übersteigt Schonvermögen (10.000 € / 20.000 € bei Paaren) | § 90 SGB XII + DVO |
| 6 | Unterhaltspflichtige Kinder/Eltern mit Jahresbruttoeinkommen > 100.000 € | § 43 Abs. 5 |
| 7 | Leistungsberechtigung nach Asylbewerberleistungsgesetz | § 23 Abs. 2 SGB XII |
| 8 | Auslandsaufenthalt > 4 Wochen ununterbrochen (Leistungseinstellung) | § 41a SGB XII |

---

## 4. Calculator-Logik (Entscheidungsbaum)

```
START
│
├─ Frage 1: Wohnen Sie dauerhaft in Deutschland?
│  ├─ Nein → ❌ KEIN ANSPRUCH (kein gewöhnlicher Aufenthalt im Inland)
│  └─ Ja → weiter
│
├─ Frage 2: Haben Sie die Regelaltersgrenze erreicht?
│  │  (Berechnung aus Geburtsdatum, siehe Tabelle 2.1)
│  ├─ Ja → weiter zu Frage 4
│  └─ Nein → Frage 3
│
├─ Frage 3: Sind Sie mindestens 18 und dauerhaft voll erwerbsgemindert?
│  ├─ Nein → ❌ KEIN ANSPRUCH (weder Altersgrenze noch Erwerbsminderung)
│  └─ Ja → weiter
│
├─ Frage 4: Haben Sie in den letzten 10 Jahren Ihre Bedürftigkeit
│           vorsätzlich oder grob fahrlässig herbeigeführt?
│  ├─ Ja → ❌ KEIN ANSPRUCH (§ 41 Abs. 4)
│  └─ Nein → weiter
│
├─ Frage 5: Verdient eines Ihrer Kinder oder ein Elternteil
│           mehr als 100.000 € brutto pro Jahr?
│  ├─ Ja → ❌ KEIN ANSPRUCH (Unterhaltspflicht greift)
│  └─ Nein → weiter
│
├─ Frage 6: Vermögensprüfung
│  │  Input: Gesamtvermögen (ohne Schonvermögen), Partnerstatus
│  │  Schongrenze: 10.000 € (allein) / 20.000 € (mit Partner)
│  ├─ Vermögen > Schongrenze → ❌ KEIN ANSPRUCH (Vermögen zu hoch)
│  └─ Vermögen <= Schongrenze → weiter
│
├─ Frage 7: Einkommens- und Bedarfsberechnung
│  │  Inputs: Regelsatz, Miete, Heizkosten, KV/PV, Mehrbedarfe,
│  │          alle Einkommen, Freibeträge
│  │  Berechnung: Nettobedarf = Bruttobedarf - anrechenbares Einkommen
│  ├─ Nettobedarf <= 0 → ❌ KEIN ANSPRUCH (Einkommen reicht aus)
│  └─ Nettobedarf > 0 → ✅ ANSPRUCH in Höhe von [Nettobedarf] €/Monat
│
ENDE
```

---

## 5. Eingabefelder (UI-Spezifikation)

### Schritt 1: Persönliche Angaben
| Feld | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Geburtsdatum | Date-Picker | Ja | Für Berechnung der Altersgrenze |
| Wohnort in Deutschland? | Boolean (Ja/Nein) | Ja | |
| Familienstand | Dropdown: Alleinstehend, Verheiratet/Lebenspartnerschaft, Getrennt lebend | Ja | Bestimmt Regelsatz und Schonvermögen |
| Dauerhaft voll erwerbsgemindert? | Boolean | Nur wenn Altersgrenze nicht erreicht | Tooltip mit Definition |
| Bedürftigkeit selbst herbeigeführt? | Boolean | Ja | Tooltip mit Erklärung |
| Kind/Elternteil > 100.000 €/Jahr? | Boolean | Ja | |
| Schwerbehindertenausweis Merkzeichen G oder aG? | Boolean | Nein | Für Mehrbedarf |

### Schritt 2: Wohnsituation
| Feld | Typ | Pflicht |
|---|---|---|
| Monatliche Kaltmiete + Nebenkosten (€) | Number | Ja |
| Monatliche Heizkosten (€) | Number | Ja |
| Selbstgenutztes Wohneigentum? | Boolean | Nein |

### Schritt 3: Einkommen (monatlich)
| Feld | Typ | Pflicht |
|---|---|---|
| Gesetzliche Rente (netto, nach KV/PV-Abzug) | Number | Nein |
| Betriebsrente | Number | Nein |
| Private Rente / Riester-Auszahlung | Number | Nein |
| Einkommen aus Erwerbstätigkeit (brutto) | Number | Nein |
| Sonstiges Einkommen | Number | Nein |
| Einkommen des Partners (Summe aller Einkünfte) | Number | Nur bei Partnerschaft |
| Grundrentenzeiten ≥ 33 Jahre? | Boolean | Nein |

### Schritt 4: Vermögen
| Feld | Typ | Pflicht |
|---|---|---|
| Bargeld, Sparguthaben, Aktien, etc. | Number | Ja |
| Rückkaufswert Lebensversicherung (nicht Riester) | Number | Nein |
| Sonstiges verwertbares Vermögen | Number | Nein |

---

## 6. Berechnungsbeispiel

**Fall: Alleinstehende Rentnerin, 68 Jahre, Berlin**

| Position | Betrag |
|---|---|
| **Bruttobedarf:** | |
| Regelsatz Stufe 1 | 563,00 € |
| Kaltmiete + Nebenkosten | 450,00 € |
| Heizkosten | 80,00 € |
| Mehrbedarf Merkzeichen G (17% von 563) | 95,71 € |
| **Bruttobedarf gesamt** | **1.188,71 €** |
| | |
| **Einkommen:** | |
| Gesetzliche Rente (netto) | 850,00 € |
| Freibetrag Grundrentenzeiten (≥33 J.): 100 + 30% von (850-100) = 100 + 225 = 325, max 281,50 | -281,50 € |
| **Anrechenbares Einkommen** | **568,50 €** |
| | |
| **Nettobedarf (= Leistungshöhe)** | **620,21 €** |

→ **Ergebnis: Anspruch auf ca. 620 € Grundsicherung/Monat**

---

## 7. Technische Anforderungen

### 7.1 Architektur
- **Frontend-only** Berechnung (keine sensiblen Daten an Server senden)
- Responsive Design (Mobile-first)
- Sprache: Deutsch
- Barrierefreiheit: WCAG 2.1 AA

### 7.2 Datenmodell
```typescript
interface PersonalData {
  geburtsdatum: Date;
  wohntInDeutschland: boolean;
  familienstand: 'alleinstehend' | 'partnerschaft' | 'getrennt';
  istDauerhaftVollErwerbsgemindert: boolean;
  beduerftigkeitSelbstHerbeigefuehrt: boolean;
  unterhaltspflichtigeUeber100k: boolean;
  hatMerkzeichenGOderAG: boolean;
}

interface Wohnsituation {
  kaltmieteUndNebenkosten: number;
  heizkosten: number;
}

interface Einkommen {
  gesetzlicheRente: number;
  betriebsrente: number;
  privateRente: number;
  erwerbseinkommen: number;
  sonstigesEinkommen: number;
  einkommenPartner: number;
  hatGrundrentenzeiten33Plus: boolean;
}

interface Vermoegen {
  bargeldSparguthaben: number;
  lebensversicherungRueckkaufswert: number;
  sonstigesVermoegen: number;
}

interface Ergebnis {
  hatAnspruch: boolean;
  ausschlussgrund: string | null;
  bruttobedarf: number;
  anrechenbaresEinkommen: number;
  geschaetzteLeistung: number;  // Nettobedarf
  details: BedarfsDetail[];
}
```

### 7.3 Konstanten (jährlich zu aktualisieren)
```typescript
const REGELSATZ_STUFE_1 = 563;       // Alleinstehend (2024/2025/2026)
const REGELSATZ_STUFE_2 = 506;       // Partner je Person
const REGELSATZ_STUFE_3 = 506;       // Besondere Wohnform
const SCHONVERMOEGEN_PERSON = 10000;  // Pro Person
const SCHONVERMOEGEN_PARTNER = 10000; // Zusätzlich für Partner
const MEHRBEDARF_G_AG_PROZENT = 0.17; // 17% des Regelsatzes
const FREIBETRAG_VORSORGE_GRUND = 100;
const FREIBETRAG_VORSORGE_PROZENT = 0.30;
const FREIBETRAG_MAX = 281.50;       // 50% von REGELSATZ_STUFE_1
const ERWERBSFREIBETRAG_PROZENT = 0.30;
const UNTERHALT_EINKOMMENSGRENZE = 100000; // Jährlich
const GRUNDRENTENZEITEN_MINIMUM = 33; // Jahre

// Regelaltersgrenzen-Tabelle (siehe Abschnitt 2.1)
const ALTERSGRENZE_TABELLE: Record<number, {jahre: number, monate: number}> = {
  // vor 1947: {65, 0} (Default)
  1947: {jahre: 65, monate: 1},
  1948: {jahre: 65, monate: 2},
  1949: {jahre: 65, monate: 3},
  1950: {jahre: 65, monate: 4},
  1951: {jahre: 65, monate: 5},
  1952: {jahre: 65, monate: 6},
  1953: {jahre: 65, monate: 7},
  1954: {jahre: 65, monate: 8},
  1955: {jahre: 65, monate: 9},
  1956: {jahre: 65, monate: 10},
  1957: {jahre: 65, monate: 11},
  1958: {jahre: 66, monate: 0},
  1959: {jahre: 66, monate: 2},
  1960: {jahre: 66, monate: 4},
  1961: {jahre: 66, monate: 6},
  1962: {jahre: 66, monate: 8},
  1963: {jahre: 66, monate: 10},
  // ab 1964: {67, 0} (Default)
};
```

---

## 8. Orientierungswert für schnelle Prüfung

Laut Deutscher Rentenversicherung (Stand 2024): Personen mit einem durchschnittlichen monatlichen Gesamteinkommen **unter ca. 1.015 €** sollten prüfen lassen, ob Anspruch auf Grundsicherung besteht. Dieser Wert kann als Quick-Check vor der detaillierten Berechnung verwendet werden.

---

## 9. Quellen und Rechtsgrundlagen

| Paragraph | Thema |
|---|---|
| § 41 SGB XII | Leistungsberechtigte, Altersgrenze, Erwerbsminderung, Ausschluss |
| § 41a SGB XII | Leistungsausschluss bei Auslandsaufenthalt > 4 Wochen |
| § 42 SGB XII | Bedarfe (Regelsatz, Unterkunft, Heizung, Mehrbedarfe) |
| § 43 SGB XII | Einsatz von Einkommen und Vermögen, 100.000-€-Grenze |
| §§ 82–84 SGB XII | Einkommensanrechnung und Freibeträge |
| § 82a SGB XII | Freibetrag bei Grundrentenzeiten |
| § 90 SGB XII + DVO | Vermögenseinsatz und Schonvermögen |
| § 43 Abs. 2 SGB VI | Definition volle Erwerbsminderung |
| § 28 SGB XII | Regelsätze / Regelbedarfsstufen |
| Anlage zu § 28 SGB XII | Regelbedarfsstufentabelle |

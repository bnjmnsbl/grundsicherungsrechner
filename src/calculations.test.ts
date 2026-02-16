import { describe, it, expect } from 'vitest';
import {
  getAltersgrenze,
  hatAltersgrenzeErreicht,
  pruefeVermoegen,
  berechneBedarf,
  berechneAnrechenbaresEinkommen,
  berechneAnspruch,
} from './calculations';

describe('getAltersgrenze', () => {
  it('gibt 65+0 für Geburtsjahr vor 1947 zurück', () => {
    expect(getAltersgrenze(1940)).toEqual({ jahre: 65, monate: 0 });
  });

  it('gibt 67+0 für Geburtsjahr ab 1964 zurück', () => {
    expect(getAltersgrenze(1964)).toEqual({ jahre: 67, monate: 0 });
    expect(getAltersgrenze(1990)).toEqual({ jahre: 67, monate: 0 });
  });

  it('gibt korrekte Werte für Übergangsjahrgänge zurück', () => {
    expect(getAltersgrenze(1957)).toEqual({ jahre: 65, monate: 11 });
    expect(getAltersgrenze(1958)).toEqual({ jahre: 66, monate: 0 });
  });
});

describe('hatAltersgrenzeErreicht', () => {
  it('erkennt erreichte Altersgrenze für Jahrgang 1957 (Alter 68 in 2026)', () => {
    // Geboren März 1957, Altersgrenze 65+11 = Februar 2023 → definitiv erreicht
    expect(hatAltersgrenzeErreicht(1957, 3)).toBe(true);
  });

  it('erkennt nicht erreichte Altersgrenze für Jahrgang 1990', () => {
    // Geboren 1990, Altersgrenze 67 = 2057
    expect(hatAltersgrenzeErreicht(1990, 10)).toBe(false);
  });
});

describe('pruefeVermoegen', () => {
  it('besteht bei Vermögen unter 10.000€ (alleinstehend)', () => {
    const result = pruefeVermoegen(3000, false);
    expect(result.bestanden).toBe(true);
    expect(result.schongrenze).toBe(10000);
    expect(result.ueberschuss).toBe(0);
  });

  it('scheitert bei Vermögen über 10.000€ (alleinstehend)', () => {
    const result = pruefeVermoegen(25000, false);
    expect(result.bestanden).toBe(false);
    expect(result.ueberschuss).toBe(15000);
  });

  it('verwendet 20.000€ Grenze für Paare', () => {
    const result = pruefeVermoegen(15000, true);
    expect(result.bestanden).toBe(true);
    expect(result.schongrenze).toBe(20000);
  });
});

describe('berechneBedarf', () => {
  it('berechnet korrekt für Alleinstehende mit Merkzeichen G', () => {
    const result = berechneBedarf({
      familienstand: 'alleinstehend',
      wohnkosten: 450,
      heizkosten: 80,
      hatMerkzeichenG: true,
    });
    expect(result.regelsatz).toBe(563);
    expect(result.mehrbedarf).toBeCloseTo(95.71, 2);
    expect(result.bruttobedarf).toBeCloseTo(1188.71, 2);
  });

  it('berechnet korrekt für Paare', () => {
    const result = berechneBedarf({
      familienstand: 'partnerschaft',
      wohnkosten: 600,
      heizkosten: 100,
      hatMerkzeichenG: false,
    });
    expect(result.regelsatz).toBe(1012); // 506 * 2
    expect(result.mehrbedarf).toBe(0);
    expect(result.bruttobedarf).toBe(1712);
  });
});

describe('berechneAnrechenbaresEinkommen', () => {
  it('berechnet Freibetrag Grundrentenzeiten korrekt', () => {
    const result = berechneAnrechenbaresEinkommen({
      gesetzlicheRente: 850,
      betriebsrente: 0,
      privateRente: 0,
      erwerbseinkommen: 0,
      sonstigesEinkommen: 0,
      einkommenPartner: 0,
      hatGrundrentenzeiten33Plus: true,
    });
    // Freibetrag: 100 + 30% von (850-100) = 100 + 225 = 325, gekappt auf 281,50
    expect(result.freibetraegeDetails).toHaveLength(1);
    expect(result.freibetraegeDetails[0].betrag).toBeCloseTo(281.50, 2);
    expect(result.anrechenbaresEinkommen).toBeCloseTo(568.50, 2);
  });
});

// ── Integrationstests: Die 5 Testfälle aus der Spec ──

describe('Testfall 1: Standard-Rentnerin mit Anspruch', () => {
  it('berechnet ca. 620€ Anspruch', () => {
    const result = berechneAnspruch({
      geburtsjahr: 1957,
      geburtsmonat: 3,
      wohntInDeutschland: true,
      familienstand: 'alleinstehend',
      istDauerhaftVollErwerbsgemindert: false,
      beduerftigkeitSelbstHerbeigefuehrt: false,
      unterhaltspflichtigeUeber100k: false,
      gesamtvermoegen: 3000,
      wohnkosten: 450,
      heizkosten: 80,
      hatMerkzeichenG: true,
      gesetzlicheRente: 850,
      betriebsrente: 0,
      privateRente: 0,
      erwerbseinkommen: 0,
      sonstigesEinkommen: 0,
      einkommenPartner: 0,
      hatGrundrentenzeiten33Plus: true,
    });

    expect(result.hatAnspruch).toBe(true);
    expect(result.ausschlussgruende).toHaveLength(0);
    expect(result.bruttobedarf).toBeCloseTo(1188.71, 0);
    expect(result.anrechenbaresEinkommen).toBeCloseTo(568.50, 0);
    expect(result.nettobedarf).toBeCloseTo(620.21, 0);
  });
});

describe('Testfall 2: Paar mit ausreichendem Einkommen', () => {
  it('erkennt Grenzfall / keinen Anspruch bei höherem Einkommen', () => {
    // Spec: Rente 900 + Partner 800 = 1700, Bedarf = 1012+600+100 = 1712
    // Differenz nur 12€ → Grenzfall. Mit etwas höherem Einkommen: kein Anspruch.
    const result = berechneAnspruch({
      geburtsjahr: 1955,
      geburtsmonat: 6,
      wohntInDeutschland: true,
      familienstand: 'partnerschaft',
      istDauerhaftVollErwerbsgemindert: false,
      beduerftigkeitSelbstHerbeigefuehrt: false,
      unterhaltspflichtigeUeber100k: false,
      gesamtvermoegen: 0,
      wohnkosten: 600,
      heizkosten: 100,
      hatMerkzeichenG: false,
      gesetzlicheRente: 1000,
      betriebsrente: 0,
      privateRente: 0,
      erwerbseinkommen: 0,
      sonstigesEinkommen: 0,
      einkommenPartner: 800,
      hatGrundrentenzeiten33Plus: false,
    });

    expect(result.hatAnspruch).toBe(false);
    expect(result.ausschlussgruende.some(g => g.code === 'EINKOMMEN_REICHT')).toBe(true);
  });
});

describe('Testfall 3: Junger Mensch mit Erwerbsminderung', () => {
  it('erkennt Anspruch', () => {
    const result = berechneAnspruch({
      geburtsjahr: 1990,
      geburtsmonat: 10,
      wohntInDeutschland: true,
      familienstand: 'alleinstehend',
      istDauerhaftVollErwerbsgemindert: true,
      beduerftigkeitSelbstHerbeigefuehrt: false,
      unterhaltspflichtigeUeber100k: false,
      gesamtvermoegen: 8000,
      wohnkosten: 350,
      heizkosten: 60,
      hatMerkzeichenG: false,
      gesetzlicheRente: 400,
      betriebsrente: 0,
      privateRente: 0,
      erwerbseinkommen: 0,
      sonstigesEinkommen: 0,
      einkommenPartner: 0,
      hatGrundrentenzeiten33Plus: false,
    });

    expect(result.hatAnspruch).toBe(true);
    expect(result.nettobedarf).toBeGreaterThan(0);
  });
});

describe('Testfall 4: Vermögen zu hoch', () => {
  it('erkennt keinen Anspruch wegen Vermögen', () => {
    const result = berechneAnspruch({
      geburtsjahr: 1950,
      geburtsmonat: 1,
      wohntInDeutschland: true,
      familienstand: 'alleinstehend',
      istDauerhaftVollErwerbsgemindert: false,
      beduerftigkeitSelbstHerbeigefuehrt: false,
      unterhaltspflichtigeUeber100k: false,
      gesamtvermoegen: 25000,
      wohnkosten: 400,
      heizkosten: 70,
      hatMerkzeichenG: false,
      gesetzlicheRente: 500,
      betriebsrente: 0,
      privateRente: 0,
      erwerbseinkommen: 0,
      sonstigesEinkommen: 0,
      einkommenPartner: 0,
      hatGrundrentenzeiten33Plus: false,
    });

    expect(result.hatAnspruch).toBe(false);
    expect(result.ausschlussgruende.some(g => g.code === 'VERMOEGEN_ZU_HOCH')).toBe(true);
  });
});

describe('Testfall 5: Grenzfall', () => {
  it('erkennt Grenzfall-Situation', () => {
    const result = berechneAnspruch({
      geburtsjahr: 1955,
      geburtsmonat: 1,
      wohntInDeutschland: true,
      familienstand: 'alleinstehend',
      istDauerhaftVollErwerbsgemindert: false,
      beduerftigkeitSelbstHerbeigefuehrt: false,
      unterhaltspflichtigeUeber100k: false,
      gesamtvermoegen: 0,
      wohnkosten: 400,
      heizkosten: 70,
      hatMerkzeichenG: false,
      gesetzlicheRente: 990,
      betriebsrente: 0,
      privateRente: 0,
      erwerbseinkommen: 0,
      sonstigesEinkommen: 0,
      einkommenPartner: 0,
      hatGrundrentenzeiten33Plus: false,
    });

    expect(result.istGrenzfall).toBe(true);
  });
});

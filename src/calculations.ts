import { CONFIG } from './constants';
import type {
  BedarfsDetails,
  EinkommensDetails,
  Ergebnis,
  Ausschlussgrund,
  VermoegensPruefung,
  Familienstand,
} from './types';

export type CalcStrings = {
  noResidence: string;
  noAgeNoDisability: (grenzeText: string) => string;
  yearsAndMonths: (jahre: number, monate: number) => string;
  selfInflicted: string;
  maintenanceOver100k: string;
  assetsTooHigh: (vermoegen: string, freibetrag: string) => string;
  incomeCovers: (einkommen: string, bedarf: string) => string;
  employmentAllowance: string;
  retirementAllowance: string;
  basicPensionAllowance: string;
};

export function getAltersgrenze(geburtsjahr: number): { jahre: number; monate: number } {
  if (geburtsjahr < 1947) return { jahre: 65, monate: 0 };
  if (geburtsjahr >= 1964) return { jahre: 67, monate: 0 };
  return CONFIG.ALTERSGRENZEN[geburtsjahr];
}

export function hatAltersgrenzeErreicht(geburtsjahr: number, geburtsmonat: number): boolean {
  const grenze = getAltersgrenze(geburtsjahr);

  // Das Rentenalter wird am 1. des Monats nach dem Geburtsmonat + grenze erreicht
  let grenzeJahr = geburtsjahr + grenze.jahre;
  let grenzeMonat = geburtsmonat + grenze.monate;

  // Monat-Überlauf korrigieren
  while (grenzeMonat > 12) {
    grenzeMonat -= 12;
    grenzeJahr += 1;
  }

  const heute = new Date();
  const aktuellesJahr = heute.getFullYear();
  const aktuellerMonat = heute.getMonth() + 1; // 0-basiert → 1-basiert

  if (aktuellesJahr > grenzeJahr) return true;
  if (aktuellesJahr === grenzeJahr && aktuellerMonat >= grenzeMonat) return true;
  return false;
}

export function pruefeVermoegen(gesamtvermoegen: number, hatPartner: boolean): VermoegensPruefung {
  const schongrenze = CONFIG.SCHONVERMOEGEN_PERSON
    + (hatPartner ? CONFIG.SCHONVERMOEGEN_PARTNER : 0);

  return {
    bestanden: gesamtvermoegen <= schongrenze,
    schongrenze,
    ueberschuss: Math.max(0, gesamtvermoegen - schongrenze),
  };
}

export function berechneBedarf(input: {
  familienstand: Familienstand;
  wohnkosten: number;
  heizkosten: number;
  hatMerkzeichenG: boolean;
}): BedarfsDetails {
  const { familienstand, wohnkosten, heizkosten, hatMerkzeichenG } = input;

  let regelsatz: number;
  if (familienstand === 'partnerschaft') {
    regelsatz = CONFIG.REGELSATZ_PARTNER * 2;
  } else {
    regelsatz = CONFIG.REGELSATZ_ALLEINSTEHEND;
  }

  let mehrbedarf = 0;
  if (hatMerkzeichenG) {
    const basisRegelsatz = familienstand === 'partnerschaft'
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
    bruttobedarf,
  };
}

export function berechneAnrechenbaresEinkommen(input: {
  gesetzlicheRente: number;
  betriebsrente: number;
  privateRente: number;
  erwerbseinkommen: number;
  sonstigesEinkommen: number;
  einkommenPartner: number;
  hatGrundrentenzeiten33Plus: boolean;
}, strings: CalcStrings): EinkommensDetails {
  const {
    gesetzlicheRente,
    betriebsrente,
    privateRente,
    erwerbseinkommen,
    sonstigesEinkommen,
    einkommenPartner,
    hatGrundrentenzeiten33Plus,
  } = input;

  const gesamtEinkommen = gesetzlicheRente + betriebsrente + privateRente
    + erwerbseinkommen + sonstigesEinkommen + einkommenPartner;

  let abzuege = 0;
  const freibetraegeDetails: { name: string; betrag: number }[] = [];

  // 1. Erwerbstätigkeitsfreibetrag (§ 82 Abs. 3 SGB XII)
  if (erwerbseinkommen > 0) {
    const erwerbsFreibetrag = Math.min(
      erwerbseinkommen * CONFIG.FREIBETRAG_ERWERBSTAETIGKEIT_PROZENT,
      CONFIG.FREIBETRAG_MAX,
    );
    abzuege += erwerbsFreibetrag;
    freibetraegeDetails.push({
      name: strings.employmentAllowance,
      betrag: erwerbsFreibetrag,
    });
  }

  // 2. Freibetrag für zusätzliche Altersvorsorge (§ 82 Abs. 4 SGB XII)
  const altersvorsorgeEinkommen = betriebsrente + privateRente;
  if (altersvorsorgeEinkommen > 0) {
    const uebersteigernd = Math.max(0, altersvorsorgeEinkommen - CONFIG.FREIBETRAG_VORSORGE_GRUNDBETRAG);
    const vorsorgeFreibetrag = Math.min(
      CONFIG.FREIBETRAG_VORSORGE_GRUNDBETRAG + (uebersteigernd * CONFIG.FREIBETRAG_VORSORGE_PROZENT),
      CONFIG.FREIBETRAG_MAX,
    );
    const effektiverFreibetrag = Math.min(vorsorgeFreibetrag, altersvorsorgeEinkommen);
    abzuege += effektiverFreibetrag;
    freibetraegeDetails.push({
      name: strings.retirementAllowance,
      betrag: effektiverFreibetrag,
    });
  }

  // 3. Freibetrag Grundrentenzeiten (§ 82a SGB XII)
  if (hatGrundrentenzeiten33Plus && gesetzlicheRente > 0) {
    const uebersteigernd = Math.max(0, gesetzlicheRente - CONFIG.FREIBETRAG_GRUNDRENTE_GRUNDBETRAG);
    const grundrenteFreibetrag = Math.min(
      CONFIG.FREIBETRAG_GRUNDRENTE_GRUNDBETRAG + (uebersteigernd * CONFIG.FREIBETRAG_GRUNDRENTE_PROZENT),
      CONFIG.FREIBETRAG_MAX,
    );
    const effektiverFreibetrag = Math.min(grundrenteFreibetrag, gesetzlicheRente);
    abzuege += effektiverFreibetrag;
    freibetraegeDetails.push({
      name: strings.basicPensionAllowance,
      betrag: effektiverFreibetrag,
    });
  }

  const anrechenbar = Math.max(0, gesamtEinkommen - abzuege);

  return {
    gesamtEinkommen,
    abzuege,
    freibetraegeDetails,
    anrechenbaresEinkommen: anrechenbar,
  };
}

export function berechneAnspruch(allInputs: {
  geburtsjahr: number;
  geburtsmonat: number;
  wohntInDeutschland: boolean;
  familienstand: Familienstand;
  istDauerhaftVollErwerbsgemindert: boolean;
  beduerftigkeitSelbstHerbeigefuehrt: boolean;
  unterhaltspflichtigeUeber100k: boolean;
  gesamtvermoegen: number;
  wohnkosten: number;
  heizkosten: number;
  hatMerkzeichenG: boolean;
  gesetzlicheRente: number;
  betriebsrente: number;
  privateRente: number;
  erwerbseinkommen: number;
  sonstigesEinkommen: number;
  einkommenPartner: number;
  hatGrundrentenzeiten33Plus: boolean;
}, strings: CalcStrings): Ergebnis {
  const ergebnis: Ergebnis = {
    hatAnspruch: false,
    ausschlussgruende: [],
    bruttobedarf: 0,
    anrechenbaresEinkommen: 0,
    nettobedarf: 0,
    bedarfsDetails: null,
    einkommensDetails: null,
    istGrenzfall: false,
  };

  const ausschlussgruende: Ausschlussgrund[] = [];

  // Schritt 1: Aufenthalt
  if (!allInputs.wohntInDeutschland) {
    ausschlussgruende.push({
      code: 'KEIN_AUFENTHALT_DE',
      text: strings.noResidence,
    });
  }

  // Schritt 2: Alter oder Erwerbsminderung
  const altersgrenze = getAltersgrenze(allInputs.geburtsjahr);
  const hatAlter = hatAltersgrenzeErreicht(allInputs.geburtsjahr, allInputs.geburtsmonat);
  const hatEM = allInputs.istDauerhaftVollErwerbsgemindert;

  if (!hatAlter && !hatEM) {
    const grenzeText = strings.yearsAndMonths(altersgrenze.jahre, altersgrenze.monate);
    ausschlussgruende.push({
      code: 'KEIN_ALTER_KEINE_EM',
      text: strings.noAgeNoDisability(grenzeText),
    });
  }

  // Schritt 3: Selbst herbeigeführte Bedürftigkeit
  if (allInputs.beduerftigkeitSelbstHerbeigefuehrt) {
    ausschlussgruende.push({
      code: 'SELBST_HERBEIGEFUEHRT',
      text: strings.selfInflicted,
    });
  }

  // Schritt 4: Unterhaltspflichtige > 100k
  if (allInputs.unterhaltspflichtigeUeber100k) {
    ausschlussgruende.push({
      code: 'UNTERHALT_UEBER_100K',
      text: strings.maintenanceOver100k,
    });
  }

  // Schritt 5: Vermögensprüfung
  const hatPartner = allInputs.familienstand === 'partnerschaft';
  const vermoegensPruefung = pruefeVermoegen(allInputs.gesamtvermoegen, hatPartner);
  if (!vermoegensPruefung.bestanden) {
    ausschlussgruende.push({
      code: 'VERMOEGEN_ZU_HOCH',
      text: strings.assetsTooHigh(
        allInputs.gesamtvermoegen.toLocaleString('de-DE'),
        vermoegensPruefung.schongrenze.toLocaleString('de-DE'),
      ),
    });
  }

  // Schritt 6: Bedarfs- und Einkommensberechnung
  const bedarf = berechneBedarf({
    familienstand: allInputs.familienstand,
    wohnkosten: allInputs.wohnkosten,
    heizkosten: allInputs.heizkosten,
    hatMerkzeichenG: allInputs.hatMerkzeichenG,
  });

  const einkommen = berechneAnrechenbaresEinkommen({
    gesetzlicheRente: allInputs.gesetzlicheRente,
    betriebsrente: allInputs.betriebsrente,
    privateRente: allInputs.privateRente,
    erwerbseinkommen: allInputs.erwerbseinkommen,
    sonstigesEinkommen: allInputs.sonstigesEinkommen,
    einkommenPartner: allInputs.einkommenPartner,
    hatGrundrentenzeiten33Plus: allInputs.hatGrundrentenzeiten33Plus,
  }, strings);

  ergebnis.bruttobedarf = bedarf.bruttobedarf;
  ergebnis.anrechenbaresEinkommen = einkommen.anrechenbaresEinkommen;
  ergebnis.nettobedarf = Math.max(0, bedarf.bruttobedarf - einkommen.anrechenbaresEinkommen);
  ergebnis.bedarfsDetails = bedarf;
  ergebnis.einkommensDetails = einkommen;

  if (ergebnis.nettobedarf <= 0 && ausschlussgruende.length === 0) {
    ausschlussgruende.push({
      code: 'EINKOMMEN_REICHT',
      text: strings.incomeCovers(
        formatEuro(einkommen.anrechenbaresEinkommen),
        formatEuro(bedarf.bruttobedarf),
      ),
    });
  }

  ergebnis.ausschlussgruende = ausschlussgruende;
  ergebnis.hatAnspruch = ausschlussgruende.length === 0 && ergebnis.nettobedarf > 0;
  ergebnis.istGrenzfall = Math.abs(bedarf.bruttobedarf - einkommen.anrechenbaresEinkommen) < 50;

  return ergebnis;
}

export function formatEuro(betrag: number): string {
  return betrag.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20AC';
}

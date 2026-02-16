export type Familienstand = 'alleinstehend' | 'partnerschaft' | 'getrennt';

export type ErwerbsminderungStatus = 'ja' | 'nein' | 'unsicher' | null;

export type JaNeinWeissNicht = 'ja' | 'nein' | 'weiss_nicht';

export type FormData = {
  // Step 1: Persönliche Angaben
  geburtsmonat: number | null;
  geburtsjahr: number | null;
  wohntInDeutschland: boolean | null;
  familienstand: Familienstand | null;
  istErwerbsgemindert: ErwerbsminderungStatus;

  // Step 2: Wohnsituation
  wohntZurMiete: boolean | null;
  wohnkosten: number;
  heizkosten: number;

  // Step 3: Einkommen
  gesetzlicheRente: number;
  betriebsrente: number;
  privateRente: number;
  erwerbseinkommen: number;
  sonstigesEinkommen: number;
  einkommenPartner: number;
  hatGrundrentenzeiten: JaNeinWeissNicht | null;

  // Step 4: Vermögen
  geldvermoegen: number;
  lebensversicherung: number;
  sonstigesVermoegen: number;

  // Step 5: Zusatzfragen
  unterhaltspflichtigeUeber100k: 'ja' | 'nein' | 'keine' | null;
  hatMerkzeichenG: JaNeinWeissNicht | null;
  beduerftigkeitSelbstHerbeigefuehrt: boolean | null;
};

export type WizardState = {
  currentStep: number;
  formData: FormData;
};

export type Ausschlussgrund = {
  code: string;
  text: string;
};

export type FreibetragDetail = {
  name: string;
  betrag: number;
};

export type BedarfsDetails = {
  regelsatz: number;
  wohnkosten: number;
  heizkosten: number;
  mehrbedarf: number;
  bruttobedarf: number;
};

export type EinkommensDetails = {
  gesamtEinkommen: number;
  abzuege: number;
  freibetraegeDetails: FreibetragDetail[];
  anrechenbaresEinkommen: number;
};

export type VermoegensPruefung = {
  bestanden: boolean;
  schongrenze: number;
  ueberschuss: number;
};

export type Ergebnis = {
  hatAnspruch: boolean;
  ausschlussgruende: Ausschlussgrund[];
  bruttobedarf: number;
  anrechenbaresEinkommen: number;
  nettobedarf: number;
  bedarfsDetails: BedarfsDetails | null;
  einkommensDetails: EinkommensDetails | null;
  istGrenzfall: boolean;
};

export type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'UPDATE_FIELD'; field: keyof FormData; value: FormData[keyof FormData] }
  | { type: 'RESET' };

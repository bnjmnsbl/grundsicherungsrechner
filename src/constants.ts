export const CONFIG = {
  // Regelsätze (Stand 2024/2025/2026 – unverändert)
  REGELSATZ_ALLEINSTEHEND: 563,
  REGELSATZ_PARTNER: 506, // je Person bei Paaren

  // Schonvermögen
  SCHONVERMOEGEN_PERSON: 10_000,
  SCHONVERMOEGEN_PARTNER: 10_000,

  // Mehrbedarfe
  MEHRBEDARF_MERKZEICHEN_G_PROZENT: 0.17,

  // Freibeträge
  FREIBETRAG_ERWERBSTAETIGKEIT_PROZENT: 0.30,
  FREIBETRAG_VORSORGE_GRUNDBETRAG: 100,
  FREIBETRAG_VORSORGE_PROZENT: 0.30,
  FREIBETRAG_GRUNDRENTE_GRUNDBETRAG: 100,
  FREIBETRAG_GRUNDRENTE_PROZENT: 0.30,
  FREIBETRAG_MAX: 281.50, // 50% von REGELSATZ_ALLEINSTEHEND

  // Regelaltersgrenze nach Geburtsjahr
  ALTERSGRENZEN: {
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
  } as Record<number, { jahre: number; monate: number }>,
} as const;

export const WIZARD_STEPS = [
  { label: 'Über Sie', shortLabel: 'Person' },
  { label: 'Wohnung', shortLabel: 'Wohnung' },
  { label: 'Einkommen', shortLabel: 'Einkommen' },
  { label: 'Vermögen', shortLabel: 'Vermögen' },
  { label: 'Weitere Fragen', shortLabel: 'Weiteres' },
] as const;

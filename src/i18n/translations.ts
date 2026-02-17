export type Language = 'de' | 'en';

export type Translations = typeof de;

const de = {
  // Common
  common: {
    yes: 'Ja',
    no: 'Nein',
    back: 'Zurück',
    next: 'Weiter',
    moreInfo: 'Mehr Informationen',
    close: 'Schließen',
    month: 'Monat',
    year: 'Jahr',
    hint: 'Hinweis',
    months: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
    ],
  },

  // Header
  header: {
    title: 'Grundsicherungsrechner',
    progress: 'Fortschritt',
  },

  // Stepper labels
  steps: {
    labels: ['Über Sie', 'Wohnung', 'Einkommen', 'Vermögen', 'Weitere Fragen'],
    shortLabels: ['Person', 'Wohnung', 'Einkommen', 'Vermögen', 'Weiteres'],
  },

  // Footer
  footer: {
    important: 'Wichtig:',
    disclaimer:
      'Dieser Rechner liefert eine unverbindliche Ersteinschätzung auf Basis Ihrer Angaben. Er kann nicht alle individuellen Umstände berücksichtigen. Die endgültige Entscheidung trifft das Sozialamt nach Prüfung Ihres Antrags. Rechtsstand: 2026.',
    privacyTitle: 'Ihre Daten bleiben bei Ihnen.',
    privacyText:
      'Alle Berechnungen finden direkt in Ihrem Browser statt. Es werden keine persönlichen Daten an einen Server gesendet oder gespeichert.',
  },

  // Intro page
  intro: {
    heading: 'Haben Sie Anspruch auf Grundsicherung im Alter?',
    description:
      'Viele Rentnerinnen und Rentner in Deutschland erhalten weniger Geld als ihnen zusteht – oft, weil sie nicht wissen, dass sie Grundsicherung beantragen können. Dieser Rechner hilft Ihnen in wenigen Minuten herauszufinden, ob Sie einen Anspruch haben könnten und wie hoch die Leistung ungefähr wäre.',
    duration: 'Dauert nur 3–5 Minuten',
    privacy: 'Ihre Daten bleiben in Ihrem Browser',
    result: 'Sie erhalten eine klare Einschätzung',
    cta: 'Jetzt prüfen',
  },

  // Personal step
  personal: {
    heading: 'Zuerst ein paar Angaben zu Ihrer Person',
    subheading: 'Damit wir prüfen können, ob die Grundsicherung für Sie in Frage kommt.',
    birthDate: 'Wann sind Sie geboren?',
    birthDateTooltip:
      'Ihr Geburtsdatum bestimmt, ab wann Sie das gesetzliche Rentenalter erreichen. Das liegt je nach Jahrgang zwischen 65 und 67 Jahren.',
    location: 'Wo leben Sie?',
    locationTooltip:
      'Sie müssen Ihren festen Wohnsitz in Deutschland haben, um Grundsicherung zu erhalten.',
    inGermany: 'In Deutschland',
    abroad: 'Im Ausland',
    abroadWarning:
      'Grundsicherung setzt einen festen Wohnsitz in Deutschland voraus. Wenn Sie im Ausland leben, haben Sie leider keinen Anspruch.',
    maritalStatus: 'Wie ist Ihr Familienstand?',
    maritalStatusTooltip:
      'Bei Paaren wird das Einkommen beider Partner gemeinsam betrachtet. Getrennt lebende werden wie Alleinstehende behandelt.',
    single: 'Alleinstehend',
    married: 'Verheiratet oder in eingetragener Lebenspartnerschaft',
    separated: 'Getrennt lebend',
    disabilityQuestion: 'Sind Sie dauerhaft voll erwerbsgemindert?',
    disabilityTooltip:
      'Das bedeutet: Sie können aus gesundheitlichen Gründen dauerhaft weniger als 3 Stunden am Tag arbeiten. Dies muss ärztlich festgestellt worden sein – z.B. durch einen Bescheid der Rentenversicherung. Auch wer in einer Werkstatt für Menschen mit Behinderung arbeitet, gilt automatisch als voll erwerbsgemindert.',
    unsure: 'Ich bin unsicher',
    noEligibilityWarning:
      'Die Grundsicherung im Alter richtet sich an Personen, die das Rentenalter erreicht haben oder dauerhaft voll erwerbsgemindert sind. Beides scheint bei Ihnen derzeit nicht zuzutreffen. Möglicherweise kommt für Sie das Bürgergeld (früher Hartz IV) in Frage.',
    unsureInfo:
      'Kein Problem – für die weitere Berechnung nehmen wir an, dass eine Erwerbsminderung vorliegt. Ob das tatsächlich zutrifft, muss ärztlich geprüft werden. Wir empfehlen, sich bei der Deutschen Rentenversicherung beraten zu lassen.',
  },

  // Housing step
  housing: {
    heading: 'Wie wohnen Sie?',
    subheading: 'Die Grundsicherung übernimmt auch angemessene Wohn- und Heizkosten.',
    rentOrOwn: 'Wohnen Sie zur Miete oder im Eigentum?',
    rentOrOwnTooltip:
      'Auch wenn Sie in Ihrer eigenen Wohnung leben, können Sie Grundsicherung erhalten. Eine angemessene selbstgenutzte Immobilie müssen Sie nicht verkaufen.',
    rent: 'Zur Miete',
    own: 'Im eigenen Haus oder Eigentumswohnung',
    warmRent:
      'Wie hoch ist Ihre monatliche Warmmiete (Kaltmiete + Nebenkosten, ohne Heizung)?',
    warmRentTooltip:
      'Gemeint ist die Kaltmiete plus Betriebskosten (Wasser, Müll, Hausmeister etc.), aber OHNE Heizung. Wenn Sie im Eigentum wohnen, geben Sie hier Ihre monatlichen Wohnkosten ein (Hausgeld, Grundsteuer etc.).',
    heating: 'Wie hoch sind Ihre monatlichen Heizkosten?',
    heatingTooltip:
      'Gas, Öl, Fernwärme – der monatliche Betrag. Wenn die Heizkosten in den Nebenkosten enthalten sind, tragen Sie hier 0 ein und geben oben die Gesamtsumme an.',
  },

  // Income step
  income: {
    heading: 'Welches Einkommen haben Sie?',
    subheading:
      'Tragen Sie Ihre monatlichen Einkünfte ein – jeweils den Betrag, der auf Ihrem Konto ankommt (netto). Felder, die nicht auf Sie zutreffen, lassen Sie einfach leer.',
    pension: 'Gesetzliche Rente (monatlich netto)',
    pensionTooltip:
      'Der Betrag, der nach Abzug von Kranken- und Pflegeversicherung auf Ihr Konto überwiesen wird. Sie finden ihn auf Ihrem Rentenbescheid oder Kontoauszug.',
    companyPension: 'Betriebsrente (monatlich netto)',
    companyPensionTooltip:
      'Auch Direktversicherung, Pensionskasse oder Zusatzversorgung des öffentlichen Dienstes (z.B. VBL).',
    privatePension: 'Private Rente oder Riester-Auszahlung (monatlich)',
    privatePensionTooltip:
      'Monatliche Auszahlungen aus privater Rentenversicherung, Riester-Vertrag oder Rürup-Rente.',
    employment: 'Einkommen aus Arbeit (monatlich brutto)',
    employmentTooltip:
      'Falls Sie nebenbei arbeiten, z.B. einen Minijob haben. Hier den Brutto-Betrag angeben – es gibt einen Freibetrag.',
    otherIncome: 'Sonstige Einkünfte (monatlich)',
    otherIncomeTooltip:
      'z.B. Mieteinnahmen, Unterhaltszahlungen die Sie erhalten, Zinsen, Witwenrente etc.',
    partnerIncome:
      'Einkommen Ihres Partners / Ihrer Partnerin (monatlich netto gesamt)',
    partnerIncomeTooltip:
      'Die Summe aller Einkünfte Ihres Ehe- oder Lebenspartners. Bei Paaren wird das Einkommen gemeinsam betrachtet.',
    pensionYears:
      'Haben Sie mindestens 33 Jahre lang in die Rentenversicherung eingezahlt?',
    pensionYearsTooltip:
      'Gemeint sind sogenannte \u201EGrundrentenzeiten\u201C: Jahre, in denen Pflichtbeiträge zur Rentenversicherung gezahlt wurden – z.B. durch Arbeit, Kindererziehung oder Pflege. Wenn ja, wird ein Teil Ihrer Rente nicht auf die Grundsicherung angerechnet. Sie finden diese Information in Ihrem Rentenversicherungsverlauf.',
    dontKnow: 'Ich weiß nicht',
  },

  // Assets step
  assets: {
    heading: 'Haben Sie Ersparnisse oder Vermögen?',
    subheading: (amount: string, isCouple: boolean) =>
      `Bei der Grundsicherung gibt es einen Freibetrag: Sie dürfen bis zu ${amount} \u20AC behalten${isCouple ? ' (bei Paaren)' : ''}. Bestimmte Dinge zählen gar nicht als Vermögen.`,
    notCountedTitle: 'Was zählt NICHT als Vermögen:',
    notCountedItems: [
      'Ihre selbstbewohnte Wohnung oder Ihr Haus (solange angemessen)',
      'Ihr Auto (ein normaler PKW)',
      'Normaler Hausrat und Möbel',
      'Staatlich geförderte Riester-Rente',
      'Familienstücke mit persönlichem Wert',
    ],
    notCountedNote: 'Diese Dinge müssen Sie nicht mitzählen.',
    savings: 'Wie hoch ist Ihr Geldvermögen?',
    savingsTooltip:
      'Zählen Sie zusammen, was auf allen Ihren Konten liegt, plus Bargeld. Denken Sie auch an Aktien-Depots oder Fonds.',
    savingsHint: 'Bargeld, Sparbuch, Girokonto, Tagesgeld, Aktien, Fonds',
    lifeInsurance: 'Haben Sie eine Lebensversicherung (nicht Riester)?',
    lifeInsuranceTooltip:
      'Den Rückkaufswert finden Sie in Ihrem jährlichen Versicherungsschreiben. Riester-Verträge zählen hier NICHT mit – die sind geschützt.',
    lifeInsuranceHint: 'Wenn ja: Wie hoch ist der aktuelle Rückkaufswert?',
    otherAssets: 'Haben Sie sonstiges verwertbares Vermögen?',
    otherAssetsTooltip:
      'Nur Dinge, die Sie verkaufen könnten und die einen nennenswerten Wert haben. Normaler Hausrat zählt nicht.',
    otherAssetsHint: 'z.B. eine vermietete Wohnung, wertvoller Schmuck',
    overLimitWarning: (limit: string) =>
      `Ihr Vermögen liegt über dem Freibetrag von ${limit} \u20AC. In diesem Fall müssten Sie zunächst Ihr Vermögen bis auf diesen Betrag aufbrauchen, bevor Sie Grundsicherung erhalten können.`,
  },

  // Additional questions step
  additional: {
    heading: 'Fast geschafft – nur noch ein paar Punkte',
    maintenanceQuestion:
      'Verdient eines Ihrer Kinder oder ein Elternteil mehr als 100.000 \u20AC brutto im Jahr?',
    maintenanceTooltip:
      'In der Regel werden Kinder und Eltern NICHT zum Unterhalt herangezogen. Nur wenn ein Kind oder Elternteil mehr als 100.000 \u20AC im Jahr verdient, kann der Anspruch auf Grundsicherung entfallen. Im Zweifel: \u201ENein\u201C ankreuzen – das Sozialamt prüft dies ohnehin selbst.',
    noChildren: 'Habe keine Kinder/Eltern',
    disabilityCard:
      'Haben Sie einen Schwerbehindertenausweis mit dem Merkzeichen \u201EG\u201C oder \u201EaG\u201C?',
    disabilityCardTooltip:
      'Wenn ja, erhalten Sie einen Zuschlag von 17 % auf den Regelsatz (ca. 96 \u20AC). Das Merkzeichen steht auf Ihrem Schwerbehindertenausweis. Wenn Sie unsicher sind, wählen Sie \u201ENein\u201C – Sie können das später noch klären.',
    selfInflicted:
      'Haben Sie in den letzten 10 Jahren Ihr Vermögen absichtlich aufgebraucht, um bedürftig zu werden?',
    selfInflictedTooltip:
      'Diese Frage klingt ungewöhnlich, ist aber gesetzlich vorgeschrieben. Gemeint ist bewusstes Herbeiführen der Bedürftigkeit – z.B. wenn jemand sein gesamtes Vermögen verschenkt, um staatliche Hilfe zu beziehen. Wenn Sie einfach nur wenig Geld haben, lautet die Antwort \u201ENein\u201C.',
    selfInflictedHint:
      'z.B. Vermögen verschenkt, um Grundsicherung zu bekommen',
    calculateResult: 'Ergebnis berechnen',
  },

  // Results step
  result: {
    goodNews: 'Gute Nachricht!',
    eligibleIntro:
      'Nach unserer Berechnung haben Sie voraussichtlich Anspruch auf',
    perMonth: 'Grundsicherung pro Monat',
    estimate:
      'Dies ist eine Schätzung. Die genaue Höhe bestimmt das Sozialamt.',
    borderline: 'Grenzfall',
    borderlineText:
      'Ihr Einkommen und Ihr Bedarf liegen sehr nah beieinander. Es ist möglich, dass Sie Anspruch haben – kleine Unterschiede in der Berechnung (z.B. die genaue Höhe der Wohnkosten) können das Ergebnis verändern.',
    borderlineRecommendation:
      'Wir empfehlen, einen Antrag beim Sozialamt zu stellen.',
    noEligibility:
      'Nach unserer Einschätzung besteht derzeit kein Anspruch.',
    noEligibilityHint:
      'Dies ist nur eine Schätzung – im Zweifel lohnt sich ein Antrag beim Sozialamt.',
    calculationTitle: 'So haben wir gerechnet',
    needsTitle: 'Ihr Bedarf (was Ihnen zusteht):',
    standardRate: 'Regelsatz',
    housingCosts: 'Wohnkosten (Miete + NK)',
    heatingCosts: 'Heizkosten',
    disabilityExtra: 'Mehrbedarf Schwerbehinderung',
    totalNeed: 'Gesamtbedarf',
    incomeTitle: 'Ihr angerechnetes Einkommen:',
    totalIncome: 'Gesamteinkommen',
    deductPrefix: 'abzgl. ',
    creditedIncome: 'Angerechnetes Einkommen',
    entitlement: 'Ihr Grundsicherungsanspruch',
    entitlementNote: '(Bedarf minus Einkommen)',
    nextSteps: 'Was jetzt? – Nächste Schritte',
    applyTitle: 'Antrag stellen',
    applyText:
      'Gehen Sie zu Ihrem örtlichen Sozialamt und stellen Sie einen Antrag. Die Leistung wird ab dem Monat der Antragstellung gezahlt – also besser früher als später!',
    counselingTitle: 'Beratung',
    counselingText:
      'Sie können sich kostenlos beraten lassen: Bei Ihrem Sozialamt, bei der Deutschen Rentenversicherung (Tel: 0800 1000 4800), oder bei einem Sozialverband (VdK, SoVD).',
    documentsTitle: 'Unterlagen',
    documentsText:
      'Zum Antrag benötigen Sie in der Regel: Personalausweis, Rentenbescheid, Mietvertrag, Kontoauszüge der letzten 3 Monate.',
    whatYouCanDo: 'Was Sie tun können',
    applyAnyway:
      'Stellen Sie trotzdem einen Antrag – unsere Berechnung kann nicht alle Umstände berücksichtigen.',
    seekCounseling:
      'Lassen Sie sich beraten: Sozialamt, Rentenversicherung (Tel: 0800 1000 4800), oder Sozialverband (VdK, SoVD).',
    print: 'Ergebnis drucken',
    restart: 'Berechnung neu starten',
  },

  // Calculation strings (used in calculations.ts)
  calc: {
    noResidence:
      'Die Grundsicherung setzt einen Wohnsitz in Deutschland voraus.',
    noAgeNoDisability: (grenzeText: string) =>
      `Die Grundsicherung im Alter richtet sich an Personen ab dem Rentenalter (bei Ihrem Jahrgang: ${grenzeText}) oder an dauerhaft voll Erwerbsgeminderte ab 18 Jahren.`,
    yearsAndMonths: (jahre: number, monate: number) =>
      `${jahre} Jahre und ${monate} Monate`,
    selfInflicted:
      'Wenn die Bedürftigkeit in den letzten 10 Jahren absichtlich oder grob fahrlässig herbeigeführt wurde, kann der Anspruch entfallen.',
    maintenanceOver100k:
      'Wenn ein Kind oder Elternteil mehr als 100.000 \u20AC brutto im Jahr verdient, greift die Unterhaltspflicht.',
    assetsTooHigh: (vermoegen: string, freibetrag: string) =>
      `Ihr Vermögen (${vermoegen} \u20AC) liegt über dem Freibetrag von ${freibetrag} \u20AC.`,
    incomeCovers: (einkommen: string, bedarf: string) =>
      `Ihr monatliches angerechnetes Einkommen (${einkommen}) deckt Ihren Bedarf (${bedarf}).`,
    employmentAllowance: 'Freibetrag Erwerbstätigkeit (30%)',
    retirementAllowance: 'Freibetrag Altersvorsorge',
    basicPensionAllowance: 'Freibetrag Grundrentenzeiten (\u226533 Jahre)',
  },

  // Validation messages
  validation: {
    birthDateRequired: 'Bitte geben Sie Ihr Geburtsdatum an.',
    locationRequired: 'Bitte wählen Sie Ihren Wohnort aus.',
    maritalStatusRequired: 'Bitte geben Sie Ihren Familienstand an.',
    disabilityRequired: 'Bitte beantworten Sie die Frage zur Erwerbsminderung.',
    rentOrOwnRequired: 'Bitte wählen Sie aus, ob Sie zur Miete oder im Eigentum wohnen.',
    pensionYearsRequired: 'Bitte beantworten Sie die Frage zu den Grundrentenzeiten.',
  },

  // Language switcher
  language: {
    de: 'DE',
    en: 'EN',
  },
};

const en: Translations = {
  common: {
    yes: 'Yes',
    no: 'No',
    back: 'Back',
    next: 'Next',
    moreInfo: 'More information',
    close: 'Close',
    month: 'Month',
    year: 'Year',
    hint: 'Note',
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
  },

  header: {
    title: 'Basic Security Calculator',
    progress: 'Progress',
  },

  steps: {
    labels: ['About You', 'Housing', 'Income', 'Assets', 'Other Questions'],
    shortLabels: ['You', 'Housing', 'Income', 'Assets', 'Other'],
  },

  footer: {
    important: 'Important:',
    disclaimer:
      'This calculator provides a non-binding initial assessment based on your information. It cannot account for all individual circumstances. The final decision is made by the social welfare office after reviewing your application. Legal status: 2026.',
    privacyTitle: 'Your data stays with you.',
    privacyText:
      'All calculations take place directly in your browser. No personal data is sent to or stored on any server.',
  },

  intro: {
    heading: 'Are you eligible for basic security in old age?',
    description:
      'Many retirees in Germany receive less money than they are entitled to \u2013 often because they don\u2019t know they can apply for basic security (Grundsicherung). This calculator helps you find out in just a few minutes whether you might be eligible and roughly how much the benefit could be.',
    duration: 'Takes only 3\u20135 minutes',
    privacy: 'Your data stays in your browser',
    result: 'You\u2019ll get a clear assessment',
    cta: 'Check now',
  },

  personal: {
    heading: 'First, a few details about you',
    subheading:
      'So we can check whether basic security might be an option for you.',
    birthDate: 'When were you born?',
    birthDateTooltip:
      'Your date of birth determines when you reach the statutory retirement age. Depending on your birth year, this is between 65 and 67 years.',
    location: 'Where do you live?',
    locationTooltip:
      'You must have a permanent residence in Germany to receive basic security.',
    inGermany: 'In Germany',
    abroad: 'Abroad',
    abroadWarning:
      'Basic security requires a permanent residence in Germany. If you live abroad, you are unfortunately not eligible.',
    maritalStatus: 'What is your marital status?',
    maritalStatusTooltip:
      'For couples, the income of both partners is considered together. Those living separately are treated as single.',
    single: 'Single',
    married: 'Married or in a registered civil partnership',
    separated: 'Living separately',
    disabilityQuestion:
      'Are you permanently and fully unable to work (erwerbsgemindert)?',
    disabilityTooltip:
      'This means: due to health reasons, you are permanently unable to work more than 3 hours per day. This must have been medically certified \u2013 e.g. through a decision from the pension insurance. People working in sheltered workshops are also considered fully unable to work.',
    unsure: 'I\u2019m not sure',
    noEligibilityWarning:
      'Basic security in old age is intended for people who have reached retirement age or are permanently and fully unable to work. Neither seems to apply to you currently. You may be eligible for citizen\u2019s benefit (B\u00FCrgergeld, formerly Hartz IV) instead.',
    unsureInfo:
      'No problem \u2013 for the further calculation, we\u2019ll assume that a disability applies. Whether this is actually the case must be medically verified. We recommend seeking advice from the German Pension Insurance (Deutsche Rentenversicherung).',
  },

  housing: {
    heading: 'How do you live?',
    subheading:
      'Basic security also covers reasonable housing and heating costs.',
    rentOrOwn: 'Do you rent or own your home?',
    rentOrOwnTooltip:
      'Even if you live in your own home, you can receive basic security. You do not have to sell a reasonably-sized owner-occupied property.',
    rent: 'Renting',
    own: 'Own house or apartment',
    warmRent:
      'How much is your monthly warm rent (base rent + utilities, excluding heating)?',
    warmRentTooltip:
      'This means the base rent plus utilities (water, waste, caretaker, etc.), but WITHOUT heating. If you own your home, enter your monthly housing costs here (maintenance fees, property tax, etc.).',
    heating: 'How much are your monthly heating costs?',
    heatingTooltip:
      'Gas, oil, district heating \u2013 the monthly amount. If heating costs are included in your utilities, enter 0 here and include the total amount above.',
  },

  income: {
    heading: 'What income do you have?',
    subheading:
      'Enter your monthly income \u2013 the amount that arrives in your account (net). Leave fields empty if they don\u2019t apply to you.',
    pension: 'Statutory pension (monthly net)',
    pensionTooltip:
      'The amount transferred to your account after deducting health and care insurance. You can find it on your pension notice or bank statement.',
    companyPension: 'Company pension (monthly net)',
    companyPensionTooltip:
      'Also includes direct insurance, pension funds, or supplementary public service pensions (e.g. VBL).',
    privatePension: 'Private pension or Riester payments (monthly)',
    privatePensionTooltip:
      'Monthly payments from private pension insurance, Riester contract, or R\u00FCrup pension.',
    employment: 'Employment income (monthly gross)',
    employmentTooltip:
      'If you work on the side, e.g. a mini-job. Enter the gross amount here \u2013 there is an allowance.',
    otherIncome: 'Other income (monthly)',
    otherIncomeTooltip:
      'e.g. rental income, alimony payments you receive, interest, widow\u2019s pension, etc.',
    partnerIncome:
      'Your partner\u2019s income (monthly net total)',
    partnerIncomeTooltip:
      'The sum of all income of your spouse or life partner. For couples, income is considered jointly.',
    pensionYears:
      'Have you paid into the pension insurance for at least 33 years?',
    pensionYearsTooltip:
      'This refers to so-called \u201Cbasic pension periods\u201D (Grundrentenzeiten): years in which mandatory contributions to the pension insurance were paid \u2013 e.g. through work, child-rearing, or caregiving. If yes, part of your pension is not counted against basic security. You can find this information in your pension insurance history.',
    dontKnow: 'I don\u2019t know',
  },

  assets: {
    heading: 'Do you have savings or assets?',
    subheading: (amount: string, isCouple: boolean) =>
      `Basic security has an asset allowance: you may keep up to ${amount} \u20AC${isCouple ? ' (for couples)' : ''}. Certain things do not count as assets at all.`,
    notCountedTitle: 'What does NOT count as assets:',
    notCountedItems: [
      'Your owner-occupied home (as long as it is reasonably sized)',
      'Your car (a normal vehicle)',
      'Normal household items and furniture',
      'State-subsidized Riester pension',
      'Family heirlooms with personal value',
    ],
    notCountedNote: 'You do not need to include these.',
    savings: 'How much are your liquid assets?',
    savingsTooltip:
      'Add up everything in all your accounts, plus cash. Also think about stock portfolios or funds.',
    savingsHint: 'Cash, savings account, checking account, stocks, funds',
    lifeInsurance: 'Do you have a life insurance policy (not Riester)?',
    lifeInsuranceTooltip:
      'You can find the surrender value in your annual insurance statement. Riester contracts do NOT count here \u2013 they are protected.',
    lifeInsuranceHint: 'If yes: What is the current surrender value?',
    otherAssets: 'Do you have other realizable assets?',
    otherAssetsTooltip:
      'Only things you could sell that have significant value. Normal household items don\u2019t count.',
    otherAssetsHint: 'e.g. a rental property, valuable jewelry',
    overLimitWarning: (limit: string) =>
      `Your assets exceed the allowance of ${limit} \u20AC. In this case, you would need to use up your assets down to this amount before you can receive basic security.`,
  },

  additional: {
    heading: 'Almost done \u2013 just a few more questions',
    maintenanceQuestion:
      'Does any of your children or a parent earn more than 100,000 \u20AC gross per year?',
    maintenanceTooltip:
      'As a rule, children and parents are NOT required to pay maintenance. Only if a child or parent earns more than 100,000 \u20AC per year can the entitlement to basic security be affected. If in doubt: select \u201CNo\u201D \u2013 the social welfare office will verify this themselves.',
    noChildren: 'I have no children/parents',
    disabilityCard:
      'Do you have a disability pass with the marking \u201CG\u201D or \u201CaG\u201D?',
    disabilityCardTooltip:
      'If yes, you receive a supplement of 17% on the standard rate (approx. 96 \u20AC). The marking is on your disability pass. If you\u2019re unsure, select \u201CNo\u201D \u2013 you can clarify this later.',
    selfInflicted:
      'Have you deliberately used up your assets in the last 10 years to become needy?',
    selfInflictedTooltip:
      'This question sounds unusual but is legally required. It refers to deliberately bringing about neediness \u2013 e.g. giving away all assets to receive state assistance. If you simply have little money, the answer is \u201CNo\u201D.',
    selfInflictedHint:
      'e.g. gave away assets to receive basic security',
    calculateResult: 'Calculate result',
  },

  result: {
    goodNews: 'Good news!',
    eligibleIntro:
      'Based on our calculation, you are likely entitled to',
    perMonth: 'basic security per month',
    estimate:
      'This is an estimate. The exact amount is determined by the social welfare office.',
    borderline: 'Borderline case',
    borderlineText:
      'Your income and your needs are very close together. It is possible that you are entitled \u2013 small differences in the calculation (e.g. the exact amount of housing costs) can change the result.',
    borderlineRecommendation:
      'We recommend submitting an application to the social welfare office.',
    noEligibility:
      'Based on our assessment, there is currently no entitlement.',
    noEligibilityHint:
      'This is only an estimate \u2013 if in doubt, it\u2019s worth applying to the social welfare office.',
    calculationTitle: 'How we calculated',
    needsTitle: 'Your needs (what you are entitled to):',
    standardRate: 'Standard rate',
    housingCosts: 'Housing costs (rent + utilities)',
    heatingCosts: 'Heating costs',
    disabilityExtra: 'Additional disability allowance',
    totalNeed: 'Total needs',
    incomeTitle: 'Your credited income:',
    totalIncome: 'Total income',
    deductPrefix: 'less ',
    creditedIncome: 'Credited income',
    entitlement: 'Your basic security entitlement',
    entitlementNote: '(Needs minus income)',
    nextSteps: 'What now? \u2013 Next steps',
    applyTitle: 'Submit an application',
    applyText:
      'Go to your local social welfare office and submit an application. Benefits are paid from the month of application \u2013 so sooner is better!',
    counselingTitle: 'Get advice',
    counselingText:
      'You can get free advice: from your social welfare office, from the German Pension Insurance (Tel: 0800 1000 4800), or from a social association (VdK, SoVD).',
    documentsTitle: 'Documents needed',
    documentsText:
      'For the application, you typically need: ID card, pension notice, rental agreement, bank statements for the last 3 months.',
    whatYouCanDo: 'What you can do',
    applyAnyway:
      'Submit an application anyway \u2013 our calculation cannot account for all circumstances.',
    seekCounseling:
      'Get advice: social welfare office, pension insurance (Tel: 0800 1000 4800), or social association (VdK, SoVD).',
    print: 'Print result',
    restart: 'Start new calculation',
  },

  calc: {
    noResidence:
      'Basic security requires a residence in Germany.',
    noAgeNoDisability: (grenzeText: string) =>
      `Basic security in old age is for people who have reached retirement age (for your birth year: ${grenzeText}) or who are permanently and fully unable to work from age 18.`,
    yearsAndMonths: (jahre: number, monate: number) =>
      `${jahre} years and ${monate} months`,
    selfInflicted:
      'If neediness was deliberately or grossly negligently brought about in the last 10 years, the entitlement may be lost.',
    maintenanceOver100k:
      'If a child or parent earns more than 100,000 \u20AC gross per year, the maintenance obligation applies.',
    assetsTooHigh: (vermoegen: string, freibetrag: string) =>
      `Your assets (${vermoegen} \u20AC) exceed the allowance of ${freibetrag} \u20AC.`,
    incomeCovers: (einkommen: string, bedarf: string) =>
      `Your monthly credited income (${einkommen}) covers your needs (${bedarf}).`,
    employmentAllowance: 'Employment allowance (30%)',
    retirementAllowance: 'Retirement savings allowance',
    basicPensionAllowance: 'Basic pension allowance (\u226533 years)',
  },

  validation: {
    birthDateRequired: 'Please enter your date of birth.',
    locationRequired: 'Please select where you live.',
    maritalStatusRequired: 'Please select your marital status.',
    disabilityRequired: 'Please answer the question about disability.',
    rentOrOwnRequired: 'Please select whether you rent or own.',
    pensionYearsRequired: 'Please answer the question about pension years.',
  },

  language: {
    de: 'DE',
    en: 'EN',
  },
};

export const translations: Record<Language, Translations> = { de, en };

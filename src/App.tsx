import { useReducer } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { IntroPage } from './components/steps/IntroPage';
import { PersonalStep } from './components/steps/PersonalStep';
import { WohnungStep } from './components/steps/WohnungStep';
import { EinkommenStep } from './components/steps/EinkommenStep';
import { VermoegenStep } from './components/steps/VermoegenStep';
import { ZusatzfragenStep } from './components/steps/ZusatzfragenStep';
import { ErgebnisStep } from './components/steps/ErgebnisStep';
import { berechneAnspruch } from './calculations';
import type { FormData, WizardAction, WizardState, Ergebnis } from './types';

const initialFormData: FormData = {
  geburtsmonat: null,
  geburtsjahr: null,
  wohntInDeutschland: null,
  familienstand: null,
  istErwerbsgemindert: null,
  wohntZurMiete: null,
  wohnkosten: 0,
  heizkosten: 0,
  gesetzlicheRente: 0,
  betriebsrente: 0,
  privateRente: 0,
  erwerbseinkommen: 0,
  sonstigesEinkommen: 0,
  einkommenPartner: 0,
  hatGrundrentenzeiten: null,
  geldvermoegen: 0,
  lebensversicherung: 0,
  sonstigesVermoegen: 0,
  unterhaltspflichtigeUeber100k: null,
  hatMerkzeichenG: null,
  beduerftigkeitSelbstHerbeigefuehrt: null,
};

const initialState: WizardState = {
  currentStep: 0,
  formData: initialFormData,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case 'GO_TO_STEP':
      return { ...state, currentStep: action.step };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function berechneErgebnis(formData: FormData): Ergebnis {
  return berechneAnspruch({
    geburtsjahr: formData.geburtsjahr ?? 1960,
    geburtsmonat: formData.geburtsmonat ?? 1,
    wohntInDeutschland: formData.wohntInDeutschland ?? true,
    familienstand: formData.familienstand ?? 'alleinstehend',
    istDauerhaftVollErwerbsgemindert:
      formData.istErwerbsgemindert === 'ja' || formData.istErwerbsgemindert === 'unsicher',
    beduerftigkeitSelbstHerbeigefuehrt: formData.beduerftigkeitSelbstHerbeigefuehrt ?? false,
    unterhaltspflichtigeUeber100k: formData.unterhaltspflichtigeUeber100k === 'ja',
    gesamtvermoegen:
      formData.geldvermoegen + formData.lebensversicherung + formData.sonstigesVermoegen,
    wohnkosten: formData.wohnkosten,
    heizkosten: formData.heizkosten,
    hatMerkzeichenG: formData.hatMerkzeichenG === 'ja',
    gesetzlicheRente: formData.gesetzlicheRente,
    betriebsrente: formData.betriebsrente,
    privateRente: formData.privateRente,
    erwerbseinkommen: formData.erwerbseinkommen,
    sonstigesEinkommen: formData.sonstigesEinkommen,
    einkommenPartner: formData.einkommenPartner,
    hatGrundrentenzeiten33Plus: formData.hatGrundrentenzeiten === 'ja',
  });
}

export default function App() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const { currentStep, formData } = state;

  const handleUpdate = (field: keyof FormData, value: FormData[keyof FormData]) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const goNext = () => {
    dispatch({ type: 'NEXT_STEP' });
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    dispatch({ type: 'PREV_STEP' });
    window.scrollTo(0, 0);
  };
  const goToStep = (step: number) => {
    dispatch({ type: 'GO_TO_STEP', step });
    window.scrollTo(0, 0);
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
    window.scrollTo(0, 0);
  };

  const ergebnis = currentStep === 6 ? berechneErgebnis(formData) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentStep={currentStep} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 sm:py-8">
        {currentStep === 0 && (
          <IntroPage onStart={() => goToStep(1)} />
        )}
        {currentStep === 1 && (
          <PersonalStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={goNext}
            onBack={() => goToStep(0)}
          />
        )}
        {currentStep === 2 && (
          <WohnungStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 3 && (
          <EinkommenStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 4 && (
          <VermoegenStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 5 && (
          <ZusatzfragenStep
            formData={formData}
            onUpdate={handleUpdate}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 6 && ergebnis && (
          <ErgebnisStep ergebnis={ergebnis} onReset={reset} />
        )}
      </main>

      <Footer />
    </div>
  );
}

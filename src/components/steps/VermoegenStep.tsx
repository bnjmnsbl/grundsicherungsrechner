import { NumberInput } from '../ui/NumberInput';
import { Tooltip } from '../ui/Tooltip';
import { InfoBox } from '../ui/InfoBox';
import { NavigationButtons } from '../NavigationButtons';
import { pruefeVermoegen } from '../../calculations';
import type { FormData } from '../../types';

type VermoegenStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function VermoegenStep({ formData, onUpdate, onNext, onBack }: VermoegenStepProps) {
  const gesamtvermoegen = formData.geldvermoegen + formData.lebensversicherung + formData.sonstigesVermoegen;
  const hatPartner = formData.familienstand === 'partnerschaft';
  const vermoegensPruefung = pruefeVermoegen(gesamtvermoegen, hatPartner);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          Haben Sie Ersparnisse oder Vermögen?
        </h2>
        <p className="text-gray-600 mt-1">
          Bei der Grundsicherung gibt es einen Freibetrag: Sie dürfen bis zu{' '}
          {hatPartner ? '20.000' : '10.000'} € behalten
          {hatPartner ? ' (bei Paaren)' : ''}.
          Bestimmte Dinge zählen gar nicht als Vermögen.
        </p>
      </div>

      {/* Info-Box: Was zählt nicht */}
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-5 space-y-2">
        <p className="font-bold text-primary-800">Was zählt NICHT als Vermögen:</p>
        <ul className="space-y-1 text-gray-700">
          <li>• Ihre selbstbewohnte Wohnung oder Ihr Haus (solange angemessen)</li>
          <li>• Ihr Auto (ein normaler PKW)</li>
          <li>• Normaler Hausrat und Möbel</li>
          <li>• Staatlich geförderte Riester-Rente</li>
          <li>• Familienstücke mit persönlichem Wert</li>
        </ul>
        <p className="text-sm text-gray-600 font-medium">
          Diese Dinge müssen Sie <strong>nicht</strong> mitzählen.
        </p>
      </div>

      <div className="space-y-5">
        {/* 4.1 Geldvermögen */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              Wie hoch ist Ihr Geldvermögen?
            </span>
            <Tooltip text="Zählen Sie zusammen, was auf allen Ihren Konten liegt, plus Bargeld. Denken Sie auch an Aktien-Depots oder Fonds." />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Bargeld, Sparbuch, Girokonto, Tagesgeld, Aktien, Fonds
          </p>
          <NumberInput
            label=""
            value={formData.geldvermoegen}
            onChange={(v) => onUpdate('geldvermoegen', v)}
          />
        </div>

        {/* 4.2 Lebensversicherung */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              Haben Sie eine Lebensversicherung (nicht Riester)?
            </span>
            <Tooltip text="Den Rückkaufswert finden Sie in Ihrem jährlichen Versicherungsschreiben. Riester-Verträge zählen hier NICHT mit – die sind geschützt." />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Wenn ja: Wie hoch ist der aktuelle Rückkaufswert?
          </p>
          <NumberInput
            label=""
            value={formData.lebensversicherung}
            onChange={(v) => onUpdate('lebensversicherung', v)}
          />
        </div>

        {/* 4.3 Sonstiges Vermögen */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              Haben Sie sonstiges verwertbares Vermögen?
            </span>
            <Tooltip text="Nur Dinge, die Sie verkaufen könnten und die einen nennenswerten Wert haben. Normaler Hausrat zählt nicht." />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            z.B. eine vermietete Wohnung, wertvoller Schmuck
          </p>
          <NumberInput
            label=""
            value={formData.sonstigesVermoegen}
            onChange={(v) => onUpdate('sonstigesVermoegen', v)}
          />
        </div>
      </div>

      {/* Vermögensprüfung Hinweis */}
      {gesamtvermoegen > 0 && !vermoegensPruefung.bestanden && (
        <InfoBox variant="warning">
          <p>
            Ihr Vermögen liegt über dem Freibetrag von{' '}
            {vermoegensPruefung.schongrenze.toLocaleString('de-DE')} €.
            In diesem Fall müssten Sie zunächst Ihr Vermögen bis auf diesen Betrag
            aufbrauchen, bevor Sie Grundsicherung erhalten können.
          </p>
        </InfoBox>
      )}

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

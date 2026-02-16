import { RadioGroup } from '../ui/RadioGroup';
import { NumberInput } from '../ui/NumberInput';
import { Tooltip } from '../ui/Tooltip';
import { NavigationButtons } from '../NavigationButtons';
import type { FormData } from '../../types';

type WohnungStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function WohnungStep({ formData, onUpdate, onNext, onBack }: WohnungStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          Wie wohnen Sie?
        </h2>
        <p className="text-gray-600 mt-1">
          Die Grundsicherung übernimmt auch angemessene Wohn- und Heizkosten.
        </p>
      </div>

      <div className="space-y-6">
        {/* 2.1 Miete/Eigentum */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Wohnen Sie zur Miete oder im Eigentum?
            </span>
            <Tooltip text="Auch wenn Sie in Ihrer eigenen Wohnung leben, können Sie Grundsicherung erhalten. Eine angemessene selbstgenutzte Immobilie müssen Sie nicht verkaufen." />
          </div>
          <RadioGroup
            name="wohnart"
            options={[
              { value: 'miete', label: 'Zur Miete' },
              { value: 'eigentum', label: 'Im eigenen Haus oder Eigentumswohnung' },
            ]}
            value={
              formData.wohntZurMiete === true
                ? 'miete'
                : formData.wohntZurMiete === false
                  ? 'eigentum'
                  : null
            }
            onChange={(v) => onUpdate('wohntZurMiete', v === 'miete')}
          />
        </div>

        {/* 2.2 Warmmiete */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Wie hoch ist Ihre monatliche Warmmiete (Kaltmiete + Nebenkosten, ohne Heizung)?
            </span>
            <Tooltip text="Gemeint ist die Kaltmiete plus Betriebskosten (Wasser, Müll, Hausmeister etc.), aber OHNE Heizung. Wenn Sie im Eigentum wohnen, geben Sie hier Ihre monatlichen Wohnkosten ein (Hausgeld, Grundsteuer etc.)." />
          </div>
          <NumberInput
            label=""
            value={formData.wohnkosten}
            onChange={(v) => onUpdate('wohnkosten', v)}
          />
        </div>

        {/* 2.3 Heizkosten */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Wie hoch sind Ihre monatlichen Heizkosten?
            </span>
            <Tooltip text="Gas, Öl, Fernwärme – der monatliche Betrag. Wenn die Heizkosten in den Nebenkosten enthalten sind, tragen Sie hier 0 ein und geben oben die Gesamtsumme an." />
          </div>
          <NumberInput
            label=""
            value={formData.heizkosten}
            onChange={(v) => onUpdate('heizkosten', v)}
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

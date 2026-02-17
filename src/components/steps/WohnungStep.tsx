import { RadioGroup } from '../ui/RadioGroup';
import { NumberInput } from '../ui/NumberInput';
import { Tooltip } from '../ui/Tooltip';
import { NavigationButtons } from '../NavigationButtons';
import { useTranslation } from '../../i18n/LanguageContext';
import type { FormData } from '../../types';

type WohnungStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function WohnungStep({ formData, onUpdate, onNext, onBack }: WohnungStepProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          {t.housing.heading}
        </h2>
        <p className="text-gray-600 mt-1">
          {t.housing.subheading}
        </p>
      </div>

      <div className="space-y-6">
        {/* 2.1 Miete/Eigentum */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.housing.rentOrOwn}
            </span>
            <Tooltip text={t.housing.rentOrOwnTooltip} />
          </div>
          <RadioGroup
            name="wohnart"
            options={[
              { value: 'miete', label: t.housing.rent },
              { value: 'eigentum', label: t.housing.own },
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
              {t.housing.warmRent}
            </span>
            <Tooltip text={t.housing.warmRentTooltip} />
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
              {t.housing.heating}
            </span>
            <Tooltip text={t.housing.heatingTooltip} />
          </div>
          <NumberInput
            label=""
            value={formData.heizkosten}
            onChange={(v) => onUpdate('heizkosten', v)}
          />
        </div>
      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={formData.wohntZurMiete === null}
      />
    </div>
  );
}

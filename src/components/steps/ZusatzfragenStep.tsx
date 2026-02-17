import { RadioGroup } from '../ui/RadioGroup';
import { Tooltip } from '../ui/Tooltip';
import { NavigationButtons } from '../NavigationButtons';
import { useTranslation } from '../../i18n/LanguageContext';
import type { FormData } from '../../types';

type ZusatzfragenStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ZusatzfragenStep({ formData, onUpdate, onNext, onBack }: ZusatzfragenStepProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          {t.additional.heading}
        </h2>
      </div>

      <div className="space-y-6">
        {/* 5.1 Unterhaltspflichtige */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.additional.maintenanceQuestion}
            </span>
            <Tooltip text={t.additional.maintenanceTooltip} />
          </div>
          <RadioGroup
            name="unterhaltspflichtige"
            options={[
              { value: 'nein', label: t.common.no },
              { value: 'ja', label: t.common.yes },
              { value: 'keine', label: t.additional.noChildren },
            ]}
            value={formData.unterhaltspflichtigeUeber100k}
            onChange={(v) => onUpdate('unterhaltspflichtigeUeber100k', v as FormData['unterhaltspflichtigeUeber100k'])}
          />
        </div>

        {/* 5.2 Merkzeichen G */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.additional.disabilityCard}
            </span>
            <Tooltip text={t.additional.disabilityCardTooltip} />
          </div>
          <RadioGroup
            name="merkzeichen"
            options={[
              { value: 'ja', label: t.common.yes },
              { value: 'nein', label: t.common.no },
              { value: 'weiss_nicht', label: t.income.dontKnow },
            ]}
            value={formData.hatMerkzeichenG}
            onChange={(v) => onUpdate('hatMerkzeichenG', v as FormData['hatMerkzeichenG'])}
          />
        </div>

        {/* 5.3 Bedürftigkeit selbst herbeigeführt */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.additional.selfInflicted}
            </span>
            <Tooltip text={t.additional.selfInflictedTooltip} />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {t.additional.selfInflictedHint}
          </p>
          <RadioGroup
            name="beduerftigkeitSelbst"
            options={[
              { value: 'nein', label: t.common.no },
              { value: 'ja', label: t.common.yes },
            ]}
            value={
              formData.beduerftigkeitSelbstHerbeigefuehrt === true
                ? 'ja'
                : formData.beduerftigkeitSelbstHerbeigefuehrt === false
                  ? 'nein'
                  : null
            }
            onChange={(v) => onUpdate('beduerftigkeitSelbstHerbeigefuehrt', v === 'ja')}
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} nextLabel={t.additional.calculateResult} />
    </div>
  );
}

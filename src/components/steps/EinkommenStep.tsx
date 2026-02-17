import { NumberInput } from '../ui/NumberInput';
import { RadioGroup } from '../ui/RadioGroup';
import { Tooltip } from '../ui/Tooltip';
import { NavigationButtons } from '../NavigationButtons';
import { useTranslation } from '../../i18n/LanguageContext';
import type { FormData } from '../../types';

type EinkommenStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function EinkommenStep({ formData, onUpdate, onNext, onBack }: EinkommenStepProps) {
  const { t } = useTranslation();
  const zeigePartnerEinkommen = formData.familienstand === 'partnerschaft';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          {t.income.heading}
        </h2>
        <p className="text-gray-600 mt-1">
          {t.income.subheading}
        </p>
      </div>

      <div className="space-y-5">
        {/* 3.1 Gesetzliche Rente */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              {t.income.pension}
            </span>
            <Tooltip text={t.income.pensionTooltip} />
          </div>
          <NumberInput
            label=""
            value={formData.gesetzlicheRente}
            onChange={(v) => onUpdate('gesetzlicheRente', v)}
          />
        </div>

        {/* 3.2 Betriebsrente */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              {t.income.companyPension}
            </span>
            <Tooltip text={t.income.companyPensionTooltip} />
          </div>
          <NumberInput
            label=""
            value={formData.betriebsrente}
            onChange={(v) => onUpdate('betriebsrente', v)}
          />
        </div>

        {/* 3.3 Private Rente */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              {t.income.privatePension}
            </span>
            <Tooltip text={t.income.privatePensionTooltip} />
          </div>
          <NumberInput
            label=""
            value={formData.privateRente}
            onChange={(v) => onUpdate('privateRente', v)}
          />
        </div>

        {/* 3.4 Erwerbseinkommen */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              {t.income.employment}
            </span>
            <Tooltip text={t.income.employmentTooltip} />
          </div>
          <NumberInput
            label=""
            value={formData.erwerbseinkommen}
            onChange={(v) => onUpdate('erwerbseinkommen', v)}
          />
        </div>

        {/* 3.5 Sonstige Einkünfte */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              {t.income.otherIncome}
            </span>
            <Tooltip text={t.income.otherIncomeTooltip} />
          </div>
          <NumberInput
            label=""
            value={formData.sonstigesEinkommen}
            onChange={(v) => onUpdate('sonstigesEinkommen', v)}
          />
        </div>

        {/* 3.6 Einkommen Partner */}
        {zeigePartnerEinkommen && (
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-base font-semibold text-gray-800">
                {t.income.partnerIncome}
              </span>
              <Tooltip text={t.income.partnerIncomeTooltip} />
            </div>
            <NumberInput
              label=""
              value={formData.einkommenPartner}
              onChange={(v) => onUpdate('einkommenPartner', v)}
            />
          </div>
        )}

        {/* 3.7 Grundrentenzeiten */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.income.pensionYears}
            </span>
            <Tooltip text={t.income.pensionYearsTooltip} />
          </div>
          <RadioGroup
            name="grundrentenzeiten"
            options={[
              { value: 'ja', label: t.common.yes },
              { value: 'nein', label: t.common.no },
              { value: 'weiss_nicht', label: t.income.dontKnow },
            ]}
            value={formData.hatGrundrentenzeiten}
            onChange={(v) => onUpdate('hatGrundrentenzeiten', v as FormData['hatGrundrentenzeiten'])}
          />
        </div>
      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={formData.hatGrundrentenzeiten === null}
      />
    </div>
  );
}

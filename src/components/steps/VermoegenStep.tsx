import { NumberInput } from '../ui/NumberInput';
import { Tooltip } from '../ui/Tooltip';
import { InfoBox } from '../ui/InfoBox';
import { NavigationButtons } from '../NavigationButtons';
import { pruefeVermoegen } from '../../calculations';
import { useTranslation } from '../../i18n/LanguageContext';
import type { FormData } from '../../types';

type VermoegenStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function VermoegenStep({ formData, onUpdate, onNext, onBack }: VermoegenStepProps) {
  const { t } = useTranslation();
  const gesamtvermoegen = formData.geldvermoegen + formData.lebensversicherung + formData.sonstigesVermoegen;
  const hatPartner = formData.familienstand === 'partnerschaft';
  const vermoegensPruefung = pruefeVermoegen(gesamtvermoegen, hatPartner);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          {t.assets.heading}
        </h2>
        <p className="text-gray-600 mt-1">
          {t.assets.subheading(hatPartner ? '20,000' : '10,000', hatPartner)}
        </p>
      </div>

      {/* Info-Box: Was zählt nicht */}
      <div className="bg-primary-50 border border-primary-200 rounded-2xl p-5 space-y-2">
        <p className="font-bold text-primary-800">{t.assets.notCountedTitle}</p>
        <ul className="space-y-1 text-gray-700">
          {t.assets.notCountedItems.map((item, i) => (
            <li key={i}>{'\u2022'} {item}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 font-medium">
          <strong>{t.assets.notCountedNote}</strong>
        </p>
      </div>

      <div className="space-y-5">
        {/* 4.1 Geldvermögen */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              {t.assets.savings}
            </span>
            <Tooltip text={t.assets.savingsTooltip} />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {t.assets.savingsHint}
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
              {t.assets.lifeInsurance}
            </span>
            <Tooltip text={t.assets.lifeInsuranceTooltip} />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {t.assets.lifeInsuranceHint}
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
              {t.assets.otherAssets}
            </span>
            <Tooltip text={t.assets.otherAssetsTooltip} />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {t.assets.otherAssetsHint}
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
            {t.assets.overLimitWarning(vermoegensPruefung.schongrenze.toLocaleString('de-DE'))}
          </p>
        </InfoBox>
      )}

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

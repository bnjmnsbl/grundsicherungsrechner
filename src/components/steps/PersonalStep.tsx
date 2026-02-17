import { DatePicker } from '../ui/DatePicker';
import { RadioGroup } from '../ui/RadioGroup';
import { Tooltip } from '../ui/Tooltip';
import { InfoBox } from '../ui/InfoBox';
import { NavigationButtons } from '../NavigationButtons';
import { hatAltersgrenzeErreicht } from '../../calculations';
import { useTranslation } from '../../i18n/LanguageContext';
import type { FormData } from '../../types';

type PersonalStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function PersonalStep({ formData, onUpdate, onNext, onBack }: PersonalStepProps) {
  const { t } = useTranslation();

  const hatGeburtsdatum = formData.geburtsmonat !== null && formData.geburtsjahr !== null;
  const alterErreicht = hatGeburtsdatum
    ? hatAltersgrenzeErreicht(formData.geburtsjahr!, formData.geburtsmonat!)
    : null;

  const zeigeErwerbsminderung = hatGeburtsdatum && !alterErreicht;
  const istAusland = formData.wohntInDeutschland === false;
  const keinAlterKeineEM = zeigeErwerbsminderung && formData.istErwerbsgemindert === 'nein';
  const emUnsicher = zeigeErwerbsminderung && formData.istErwerbsgemindert === 'unsicher';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          {t.personal.heading}
        </h2>
        <p className="text-gray-600 mt-1">
          {t.personal.subheading}
        </p>
      </div>

      <div className="space-y-6">
        {/* 1.1 Geburtsdatum */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <label className="text-base font-semibold text-gray-800">
              {t.personal.birthDate}
            </label>
            <Tooltip text={t.personal.birthDateTooltip} />
          </div>
          <DatePicker
            monat={formData.geburtsmonat}
            jahr={formData.geburtsjahr}
            onMonatChange={(m) => onUpdate('geburtsmonat', m)}
            onJahrChange={(j) => onUpdate('geburtsjahr', j)}
          />
        </div>

        {/* 1.2 Wohnort */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.personal.location}
            </span>
            <Tooltip text={t.personal.locationTooltip} />
          </div>
          <RadioGroup
            name="wohnort"
            options={[
              { value: 'deutschland', label: t.personal.inGermany },
              { value: 'ausland', label: t.personal.abroad },
            ]}
            value={
              formData.wohntInDeutschland === true
                ? 'deutschland'
                : formData.wohntInDeutschland === false
                  ? 'ausland'
                  : null
            }
            onChange={(v) => onUpdate('wohntInDeutschland', v === 'deutschland')}
          />
        </div>

        {istAusland && (
          <InfoBox variant="warning">
            <p className="font-semibold">{t.common.hint}</p>
            <p>{t.personal.abroadWarning}</p>
          </InfoBox>
        )}

        {/* 1.3 Familienstand */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              {t.personal.maritalStatus}
            </span>
            <Tooltip text={t.personal.maritalStatusTooltip} />
          </div>
          <RadioGroup
            name="familienstand"
            options={[
              { value: 'alleinstehend', label: t.personal.single },
              { value: 'partnerschaft', label: t.personal.married },
              { value: 'getrennt', label: t.personal.separated },
            ]}
            value={formData.familienstand}
            onChange={(v) => onUpdate('familienstand', v as FormData['familienstand'])}
          />
        </div>

        {/* 1.4 Erwerbsminderung */}
        {zeigeErwerbsminderung && (
          <div className="transition-all duration-300">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-base font-semibold text-gray-800">
                {t.personal.disabilityQuestion}
              </span>
              <Tooltip text={t.personal.disabilityTooltip} />
            </div>
            <RadioGroup
              name="erwerbsminderung"
              options={[
                { value: 'ja', label: t.common.yes },
                { value: 'nein', label: t.common.no },
                { value: 'unsicher', label: t.personal.unsure },
              ]}
              value={formData.istErwerbsgemindert}
              onChange={(v) => onUpdate('istErwerbsgemindert', v as FormData['istErwerbsgemindert'])}
            />
          </div>
        )}

        {keinAlterKeineEM && (
          <InfoBox variant="warning">
            <p className="font-semibold">{t.common.hint}</p>
            <p>{t.personal.noEligibilityWarning}</p>
          </InfoBox>
        )}

        {emUnsicher && (
          <InfoBox variant="info">
            <p>{t.personal.unsureInfo}</p>
          </InfoBox>
        )}
      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={
          formData.geburtsmonat === null ||
          formData.geburtsjahr === null ||
          formData.wohntInDeutschland === null ||
          formData.familienstand === null ||
          (zeigeErwerbsminderung && formData.istErwerbsgemindert === null)
        }
      />
    </div>
  );
}

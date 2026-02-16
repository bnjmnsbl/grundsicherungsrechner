import { DatePicker } from '../ui/DatePicker';
import { RadioGroup } from '../ui/RadioGroup';
import { Tooltip } from '../ui/Tooltip';
import { InfoBox } from '../ui/InfoBox';
import { NavigationButtons } from '../NavigationButtons';
import { hatAltersgrenzeErreicht } from '../../calculations';
import type { FormData } from '../../types';

type PersonalStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function PersonalStep({ formData, onUpdate, onNext, onBack }: PersonalStepProps) {
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
          Zuerst ein paar Angaben zu Ihrer Person
        </h2>
        <p className="text-gray-600 mt-1">
          Damit wir prüfen können, ob die Grundsicherung für Sie in Frage kommt.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1.1 Geburtsdatum */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <label className="text-base font-semibold text-gray-800">
              Wann sind Sie geboren?
            </label>
            <Tooltip text="Ihr Geburtsdatum bestimmt, ab wann Sie das gesetzliche Rentenalter erreichen. Das liegt je nach Jahrgang zwischen 65 und 67 Jahren." />
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
              Wo leben Sie?
            </span>
            <Tooltip text="Sie müssen Ihren festen Wohnsitz in Deutschland haben, um Grundsicherung zu erhalten." />
          </div>
          <RadioGroup
            name="wohnort"
            options={[
              { value: 'deutschland', label: 'In Deutschland' },
              { value: 'ausland', label: 'Im Ausland' },
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
            <p className="font-semibold">Hinweis</p>
            <p>
              Grundsicherung setzt einen festen Wohnsitz in Deutschland voraus.
              Wenn Sie im Ausland leben, haben Sie leider keinen Anspruch.
            </p>
          </InfoBox>
        )}

        {/* 1.3 Familienstand */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Wie ist Ihr Familienstand?
            </span>
            <Tooltip text="Bei Paaren wird das Einkommen beider Partner gemeinsam betrachtet. Getrennt lebende werden wie Alleinstehende behandelt." />
          </div>
          <RadioGroup
            name="familienstand"
            options={[
              { value: 'alleinstehend', label: 'Alleinstehend' },
              { value: 'partnerschaft', label: 'Verheiratet oder in eingetragener Lebenspartnerschaft' },
              { value: 'getrennt', label: 'Getrennt lebend' },
            ]}
            value={formData.familienstand}
            onChange={(v) => onUpdate('familienstand', v as FormData['familienstand'])}
          />
        </div>

        {/* 1.4 Erwerbsminderung (nur wenn Altersgrenze nicht erreicht) */}
        {zeigeErwerbsminderung && (
          <div className="transition-all duration-300">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-base font-semibold text-gray-800">
                Sind Sie dauerhaft voll erwerbsgemindert?
              </span>
              <Tooltip text="Das bedeutet: Sie können aus gesundheitlichen Gründen dauerhaft weniger als 3 Stunden am Tag arbeiten. Dies muss ärztlich festgestellt worden sein – z.B. durch einen Bescheid der Rentenversicherung. Auch wer in einer Werkstatt für Menschen mit Behinderung arbeitet, gilt automatisch als voll erwerbsgemindert." />
            </div>
            <RadioGroup
              name="erwerbsminderung"
              options={[
                { value: 'ja', label: 'Ja' },
                { value: 'nein', label: 'Nein' },
                { value: 'unsicher', label: 'Ich bin unsicher' },
              ]}
              value={formData.istErwerbsgemindert}
              onChange={(v) => onUpdate('istErwerbsgemindert', v as FormData['istErwerbsgemindert'])}
            />
          </div>
        )}

        {keinAlterKeineEM && (
          <InfoBox variant="warning">
            <p className="font-semibold">Hinweis</p>
            <p>
              Die Grundsicherung im Alter richtet sich an Personen, die das Rentenalter
              erreicht haben oder dauerhaft voll erwerbsgemindert sind. Beides scheint bei
              Ihnen derzeit nicht zuzutreffen. Möglicherweise kommt für Sie das Bürgergeld
              (früher Hartz IV) in Frage.
            </p>
          </InfoBox>
        )}

        {emUnsicher && (
          <InfoBox variant="info">
            <p>
              Kein Problem – für die weitere Berechnung nehmen wir an, dass eine
              Erwerbsminderung vorliegt. Ob das tatsächlich zutrifft, muss ärztlich geprüft
              werden. Wir empfehlen, sich bei der Deutschen Rentenversicherung beraten zu
              lassen.
            </p>
          </InfoBox>
        )}
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

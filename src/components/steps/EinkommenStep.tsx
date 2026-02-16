import { NumberInput } from '../ui/NumberInput';
import { RadioGroup } from '../ui/RadioGroup';
import { Tooltip } from '../ui/Tooltip';
import { NavigationButtons } from '../NavigationButtons';
import type { FormData } from '../../types';


type EinkommenStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function EinkommenStep({ formData, onUpdate, onNext, onBack }: EinkommenStepProps) {
  const zeigePartnerEinkommen = formData.familienstand === 'partnerschaft';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          Welches Einkommen haben Sie?
        </h2>
        <p className="text-gray-600 mt-1">
          Tragen Sie Ihre monatlichen Einkünfte ein – jeweils den Betrag, der auf
          Ihrem Konto ankommt (netto). Felder, die nicht auf Sie zutreffen, lassen
          Sie einfach leer.
        </p>
      </div>

      <div className="space-y-5">
        {/* 3.1 Gesetzliche Rente */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-semibold text-gray-800">
              Gesetzliche Rente (monatlich netto)
            </span>
            <Tooltip text="Der Betrag, der nach Abzug von Kranken- und Pflegeversicherung auf Ihr Konto überwiesen wird. Sie finden ihn auf Ihrem Rentenbescheid oder Kontoauszug." />
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
              Betriebsrente (monatlich netto)
            </span>
            <Tooltip text="Auch Direktversicherung, Pensionskasse oder Zusatzversorgung des öffentlichen Dienstes (z.B. VBL)." />
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
              Private Rente oder Riester-Auszahlung (monatlich)
            </span>
            <Tooltip text="Monatliche Auszahlungen aus privater Rentenversicherung, Riester-Vertrag oder Rürup-Rente." />
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
              Einkommen aus Arbeit (monatlich brutto)
            </span>
            <Tooltip text="Falls Sie nebenbei arbeiten, z.B. einen Minijob haben. Hier den Brutto-Betrag angeben – es gibt einen Freibetrag." />
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
              Sonstige Einkünfte (monatlich)
            </span>
            <Tooltip text="z.B. Mieteinnahmen, Unterhaltszahlungen die Sie erhalten, Zinsen, Witwenrente etc." />
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
                Einkommen Ihres Partners / Ihrer Partnerin (monatlich netto gesamt)
              </span>
              <Tooltip text="Die Summe aller Einkünfte Ihres Ehe- oder Lebenspartners. Bei Paaren wird das Einkommen gemeinsam betrachtet." />
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
              Haben Sie mindestens 33 Jahre lang in die Rentenversicherung eingezahlt?
            </span>
            <Tooltip text="Gemeint sind sogenannte ‚Grundrentenzeiten': Jahre, in denen Pflichtbeiträge zur Rentenversicherung gezahlt wurden – z.B. durch Arbeit, Kindererziehung oder Pflege. Wenn ja, wird ein Teil Ihrer Rente nicht auf die Grundsicherung angerechnet. Sie finden diese Information in Ihrem Rentenversicherungsverlauf." />
          </div>
          <RadioGroup
            name="grundrentenzeiten"
            options={[
              { value: 'ja', label: 'Ja' },
              { value: 'nein', label: 'Nein' },
              { value: 'weiss_nicht', label: 'Ich weiß nicht' },
            ]}
            value={formData.hatGrundrentenzeiten}
            onChange={(v) => onUpdate('hatGrundrentenzeiten', v as FormData['hatGrundrentenzeiten'])}
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

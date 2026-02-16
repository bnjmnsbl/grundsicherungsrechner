import { RadioGroup } from '../ui/RadioGroup';
import { Tooltip } from '../ui/Tooltip';
import { NavigationButtons } from '../NavigationButtons';
import type { FormData } from '../../types';

type ZusatzfragenStepProps = {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: FormData[keyof FormData]) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ZusatzfragenStep({ formData, onUpdate, onNext, onBack }: ZusatzfragenStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-800">
          Fast geschafft – nur noch ein paar Punkte
        </h2>
      </div>

      <div className="space-y-6">
        {/* 5.1 Unterhaltspflichtige */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Verdient eines Ihrer Kinder oder ein Elternteil mehr als 100.000 € brutto im Jahr?
            </span>
            <Tooltip text="In der Regel werden Kinder und Eltern NICHT zum Unterhalt herangezogen. Nur wenn ein Kind oder Elternteil mehr als 100.000 € im Jahr verdient, kann der Anspruch auf Grundsicherung entfallen. Im Zweifel: ‚Nein' ankreuzen – das Sozialamt prüft dies ohnehin selbst." />
          </div>
          <RadioGroup
            name="unterhaltspflichtige"
            options={[
              { value: 'nein', label: 'Nein' },
              { value: 'ja', label: 'Ja' },
              { value: 'keine', label: 'Habe keine Kinder/Eltern' },
            ]}
            value={formData.unterhaltspflichtigeUeber100k}
            onChange={(v) => onUpdate('unterhaltspflichtigeUeber100k', v as FormData['unterhaltspflichtigeUeber100k'])}
          />
        </div>

        {/* 5.2 Merkzeichen G */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Haben Sie einen Schwerbehindertenausweis mit dem Merkzeichen „G" oder „aG"?
            </span>
            <Tooltip text="Wenn ja, erhalten Sie einen Zuschlag von 17 % auf den Regelsatz (ca. 96 €). Das Merkzeichen steht auf Ihrem Schwerbehindertenausweis. Wenn Sie unsicher sind, wählen Sie ‚Nein' – Sie können das später noch klären." />
          </div>
          <RadioGroup
            name="merkzeichen"
            options={[
              { value: 'ja', label: 'Ja' },
              { value: 'nein', label: 'Nein' },
              { value: 'weiss_nicht', label: 'Ich weiß nicht' },
            ]}
            value={formData.hatMerkzeichenG}
            onChange={(v) => onUpdate('hatMerkzeichenG', v as FormData['hatMerkzeichenG'])}
          />
        </div>

        {/* 5.3 Bedürftigkeit selbst herbeigeführt */}
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-base font-semibold text-gray-800">
              Haben Sie in den letzten 10 Jahren Ihr Vermögen absichtlich aufgebraucht, um bedürftig zu werden?
            </span>
            <Tooltip text="Diese Frage klingt ungewöhnlich, ist aber gesetzlich vorgeschrieben. Gemeint ist bewusstes Herbeiführen der Bedürftigkeit – z.B. wenn jemand sein gesamtes Vermögen verschenkt, um staatliche Hilfe zu beziehen. Wenn Sie einfach nur wenig Geld haben, lautet die Antwort ‚Nein'." />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            z.B. Vermögen verschenkt, um Grundsicherung zu bekommen
          </p>
          <RadioGroup
            name="beduerftigkeitSelbst"
            options={[
              { value: 'nein', label: 'Nein' },
              { value: 'ja', label: 'Ja' },
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

      <NavigationButtons onBack={onBack} onNext={onNext} nextLabel="Ergebnis berechnen" />
    </div>
  );
}

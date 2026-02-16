import { useState } from 'react';
import { CheckCircle, Info, ChevronDown, ChevronUp, ClipboardList, Phone, FileText, Printer, RotateCcw } from 'lucide-react';
import { InfoBox } from '../ui/InfoBox';
import { formatEuro } from '../../calculations';
import type { Ergebnis } from '../../types';

type ErgebnisStepProps = {
  ergebnis: Ergebnis;
  onReset: () => void;
};

export function ErgebnisStep({ ergebnis, onReset }: ErgebnisStepProps) {
  const [detailsOffen, setDetailsOffen] = useState(false);

  const hatAnspruch = ergebnis.hatAnspruch;
  const istGrenzfall = ergebnis.istGrenzfall && ergebnis.nettobedarf > 0 && ergebnis.nettobedarf < 50;

  return (
    <div className="space-y-8">
      {/* Hauptergebnis */}
      {hatAnspruch && !istGrenzfall && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <CheckCircle size={48} className="text-success-500 mx-auto" />
          <p className="text-lg font-semibold text-success-600">Gute Nachricht!</p>
          <p className="text-gray-700">
            Nach unserer Berechnung haben Sie voraussichtlich Anspruch auf
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-success-600">
            ca. {formatEuro(ergebnis.nettobedarf)}
          </p>
          <p className="text-lg text-gray-700">Grundsicherung pro Monat</p>
          <p className="text-sm text-gray-500 mt-2">
            Dies ist eine Schätzung. Die genaue Höhe bestimmt das Sozialamt.
          </p>
        </div>
      )}

      {istGrenzfall && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <Info size={48} className="text-accent-500 mx-auto" />
          <p className="text-lg font-semibold text-gray-800">Grenzfall</p>
          <p className="text-gray-700 leading-relaxed">
            Ihr Einkommen und Ihr Bedarf liegen sehr nah beieinander. Es ist
            möglich, dass Sie Anspruch haben – kleine Unterschiede in der
            Berechnung (z.B. die genaue Höhe der Wohnkosten) können das Ergebnis
            verändern. <strong>Wir empfehlen, einen Antrag beim Sozialamt zu stellen.</strong>
          </p>
        </div>
      )}

      {!hatAnspruch && !istGrenzfall && (
        <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <Info size={48} className="text-primary-500 mx-auto" />
          <p className="text-lg font-semibold text-gray-800">
            Nach unserer Einschätzung besteht derzeit kein Anspruch.
          </p>
          {ergebnis.ausschlussgruende.map((grund, i) => (
            <p key={i} className="text-gray-700">{grund.text}</p>
          ))}
          <p className="text-sm text-gray-500 mt-2">
            Dies ist nur eine Schätzung – im Zweifel lohnt sich ein Antrag beim Sozialamt.
          </p>
        </div>
      )}

      {/* Aufschlüsselung */}
      {ergebnis.bedarfsDetails && ergebnis.einkommensDetails && (
        <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setDetailsOffen(!detailsOffen)}
            className="w-full flex items-center justify-between p-5 text-left font-semibold text-primary-700 hover:bg-cream-50 transition-colors"
          >
            <span>So haben wir gerechnet</span>
            {detailsOffen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {detailsOffen && (
            <div className="p-5 pt-0 space-y-6 text-base">
              {/* Bedarf */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">
                  Ihr Bedarf (was Ihnen zusteht):
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Regelsatz</span>
                    <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.regelsatz)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wohnkosten (Miete + NK)</span>
                    <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.wohnkosten)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heizkosten</span>
                    <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.heizkosten)}</span>
                  </div>
                  {ergebnis.bedarfsDetails.mehrbedarf > 0 && (
                    <div className="flex justify-between">
                      <span>Mehrbedarf Schwerbehinderung</span>
                      <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.mehrbedarf)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-cream-200 font-bold">
                    <span>Gesamtbedarf</span>
                    <span>{formatEuro(ergebnis.bedarfsDetails.bruttobedarf)}</span>
                  </div>
                </div>
              </div>

              {/* Einkommen */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">
                  Ihr angerechnetes Einkommen:
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gesamteinkommen</span>
                    <span className="font-medium">{formatEuro(ergebnis.einkommensDetails.gesamtEinkommen)}</span>
                  </div>
                  {ergebnis.einkommensDetails.freibetraegeDetails.map((fb, i) => (
                    <div key={i} className="flex justify-between text-success-600">
                      <span>abzgl. {fb.name}</span>
                      <span className="font-medium">-{formatEuro(fb.betrag)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-cream-200 font-bold">
                    <span>Angerechnetes Einkommen</span>
                    <span>{formatEuro(ergebnis.einkommensDetails.anrechenbaresEinkommen)}</span>
                  </div>
                </div>
              </div>

              {/* Ergebnis */}
              <div className="bg-cream-100 rounded-xl p-4">
                <div className="flex justify-between text-lg font-bold text-primary-800">
                  <span>Ihr Grundsicherungsanspruch</span>
                  <span>{formatEuro(ergebnis.nettobedarf)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">(Bedarf minus Einkommen)</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nächste Schritte */}
      {(hatAnspruch || istGrenzfall) && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary-800">
            Was jetzt? – Nächste Schritte
          </h3>
          <div className="grid gap-4">
            <NaechsterSchrittCard
              icon={<ClipboardList size={24} />}
              title="Antrag stellen"
              text="Gehen Sie zu Ihrem örtlichen Sozialamt und stellen Sie einen Antrag. Die Leistung wird ab dem Monat der Antragstellung gezahlt – also besser früher als später!"
            />
            <NaechsterSchrittCard
              icon={<Phone size={24} />}
              title="Beratung"
              text="Sie können sich kostenlos beraten lassen: Bei Ihrem Sozialamt, bei der Deutschen Rentenversicherung (Tel: 0800 1000 4800), oder bei einem Sozialverband (VdK, SoVD)."
            />
            <NaechsterSchrittCard
              icon={<FileText size={24} />}
              title="Unterlagen"
              text="Zum Antrag benötigen Sie in der Regel: Personalausweis, Rentenbescheid, Mietvertrag, Kontoauszüge der letzten 3 Monate."
            />
          </div>
        </div>
      )}

      {!hatAnspruch && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary-800">Was Sie tun können</h3>
          <InfoBox variant="info">
            <p>
              Stellen Sie trotzdem einen Antrag – unsere Berechnung kann nicht alle
              Umstände berücksichtigen.
            </p>
          </InfoBox>
          <InfoBox variant="info">
            <p>
              Lassen Sie sich beraten: Sozialamt, Rentenversicherung (Tel: 0800 1000 4800),
              oder Sozialverband (VdK, SoVD).
            </p>
          </InfoBox>
        </div>
      )}

      {/* Aktionen */}
      <div className="flex flex-col sm:flex-row gap-3 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium border-2 border-primary-500 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
        >
          <Printer size={18} />
          Ergebnis drucken
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium border-2 border-cream-300 text-gray-600 hover:bg-cream-100 rounded-xl transition-colors"
        >
          <RotateCcw size={18} />
          Berechnung neu starten
        </button>
      </div>
    </div>
  );
}

function NaechsterSchrittCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4 bg-white p-5 rounded-2xl border border-cream-200">
      <div className="text-primary-500 shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  );
}

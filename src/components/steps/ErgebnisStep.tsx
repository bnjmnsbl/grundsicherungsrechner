import { useState } from 'react';
import { CheckCircle, Info, ChevronDown, ChevronUp, ClipboardList, Phone, FileText, Printer, RotateCcw } from 'lucide-react';
import { InfoBox } from '../ui/InfoBox';
import { formatEuro } from '../../calculations';
import { useTranslation } from '../../i18n/LanguageContext';
import type { Ergebnis } from '../../types';

type ErgebnisStepProps = {
  ergebnis: Ergebnis;
  onReset: () => void;
};

export function ErgebnisStep({ ergebnis, onReset }: ErgebnisStepProps) {
  const [detailsOffen, setDetailsOffen] = useState(false);
  const { t } = useTranslation();

  const hatAnspruch = ergebnis.hatAnspruch;
  const istGrenzfall = ergebnis.istGrenzfall && ergebnis.nettobedarf > 0 && ergebnis.nettobedarf < 50;

  return (
    <div className="space-y-8">
      {/* Hauptergebnis */}
      {hatAnspruch && !istGrenzfall && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <CheckCircle size={48} className="text-success-500 mx-auto" />
          <p className="text-lg font-semibold text-success-600">{t.result.goodNews}</p>
          <p className="text-gray-700">
            {t.result.eligibleIntro}
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-success-600">
            ca. {formatEuro(ergebnis.nettobedarf)}
          </p>
          <p className="text-lg text-gray-700">{t.result.perMonth}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t.result.estimate}
          </p>
        </div>
      )}

      {istGrenzfall && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <Info size={48} className="text-accent-500 mx-auto" />
          <p className="text-lg font-semibold text-gray-800">{t.result.borderline}</p>
          <p className="text-gray-700 leading-relaxed">
            {t.result.borderlineText}{' '}
            <strong>{t.result.borderlineRecommendation}</strong>
          </p>
        </div>
      )}

      {!hatAnspruch && !istGrenzfall && (
        <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <Info size={48} className="text-primary-500 mx-auto" />
          <p className="text-lg font-semibold text-gray-800">
            {t.result.noEligibility}
          </p>
          {ergebnis.ausschlussgruende.map((grund, i) => (
            <p key={i} className="text-gray-700">{grund.text}</p>
          ))}
          <p className="text-sm text-gray-500 mt-2">
            {t.result.noEligibilityHint}
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
            <span>{t.result.calculationTitle}</span>
            {detailsOffen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {detailsOffen && (
            <div className="p-5 pt-0 space-y-6 text-base">
              {/* Bedarf */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">
                  {t.result.needsTitle}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t.result.standardRate}</span>
                    <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.regelsatz)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.result.housingCosts}</span>
                    <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.wohnkosten)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.result.heatingCosts}</span>
                    <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.heizkosten)}</span>
                  </div>
                  {ergebnis.bedarfsDetails.mehrbedarf > 0 && (
                    <div className="flex justify-between">
                      <span>{t.result.disabilityExtra}</span>
                      <span className="font-medium">{formatEuro(ergebnis.bedarfsDetails.mehrbedarf)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-cream-200 font-bold">
                    <span>{t.result.totalNeed}</span>
                    <span>{formatEuro(ergebnis.bedarfsDetails.bruttobedarf)}</span>
                  </div>
                </div>
              </div>

              {/* Einkommen */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">
                  {t.result.incomeTitle}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t.result.totalIncome}</span>
                    <span className="font-medium">{formatEuro(ergebnis.einkommensDetails.gesamtEinkommen)}</span>
                  </div>
                  {ergebnis.einkommensDetails.freibetraegeDetails.map((fb, i) => (
                    <div key={i} className="flex justify-between text-success-600">
                      <span>{t.result.deductPrefix}{fb.name}</span>
                      <span className="font-medium">-{formatEuro(fb.betrag)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-cream-200 font-bold">
                    <span>{t.result.creditedIncome}</span>
                    <span>{formatEuro(ergebnis.einkommensDetails.anrechenbaresEinkommen)}</span>
                  </div>
                </div>
              </div>

              {/* Ergebnis */}
              <div className="bg-cream-100 rounded-xl p-4">
                <div className="flex justify-between text-lg font-bold text-primary-800">
                  <span>{t.result.entitlement}</span>
                  <span>{formatEuro(ergebnis.nettobedarf)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{t.result.entitlementNote}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nächste Schritte */}
      {(hatAnspruch || istGrenzfall) && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary-800">
            {t.result.nextSteps}
          </h3>
          <div className="grid gap-4">
            <NaechsterSchrittCard
              icon={<ClipboardList size={24} />}
              title={t.result.applyTitle}
              text={t.result.applyText}
            />
            <NaechsterSchrittCard
              icon={<Phone size={24} />}
              title={t.result.counselingTitle}
              text={t.result.counselingText}
            />
            <NaechsterSchrittCard
              icon={<FileText size={24} />}
              title={t.result.documentsTitle}
              text={t.result.documentsText}
            />
          </div>
        </div>
      )}

      {!hatAnspruch && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary-800">{t.result.whatYouCanDo}</h3>
          <InfoBox variant="info">
            <p>{t.result.applyAnyway}</p>
          </InfoBox>
          <InfoBox variant="info">
            <p>{t.result.seekCounseling}</p>
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
          {t.result.print}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium border-2 border-cream-300 text-gray-600 hover:bg-cream-100 rounded-xl transition-colors"
        >
          <RotateCcw size={18} />
          {t.result.restart}
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

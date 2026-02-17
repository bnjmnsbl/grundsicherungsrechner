import { Check } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

type HeaderProps = {
  currentStep: number; // 0=Intro, 1-5=Steps, 6=Ergebnis
};

export function Header({ currentStep }: HeaderProps) {
  const { t, language, setLanguage } = useTranslation();
  const showStepper = currentStep >= 1 && currentStep <= 5;

  return (
    <header className="bg-white border-b border-cream-200 no-print">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="w-16" />
          <h1 className="text-xl sm:text-2xl font-bold text-primary-700 text-center flex-1">
            {t.header.title}
          </h1>
          <div className="flex items-center gap-1 w-16 justify-end">
            <button
              type="button"
              onClick={() => setLanguage('de')}
              className={`px-2 py-1 text-sm font-semibold rounded transition-colors ${
                language === 'de'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              {t.language.de}
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-sm font-semibold rounded transition-colors ${
                language === 'en'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              {t.language.en}
            </button>
          </div>
        </div>
        {showStepper && (
          <nav className="mt-4" aria-label={t.header.progress}>
            <ol className="flex items-center justify-between">
              {t.steps.labels.map((label, index) => {
                const stepNum = index + 1;
                const isActive = currentStep === stepNum;
                const isComplete = currentStep > stepNum;

                return (
                  <li key={index} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          isComplete
                            ? 'bg-primary-500 text-white'
                            : isActive
                              ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                              : 'bg-cream-200 text-gray-400'
                        }`}
                      >
                        {isComplete ? <Check size={18} /> : stepNum}
                      </div>
                      <span
                        className={`mt-1 text-xs sm:text-sm hidden sm:block ${
                          isActive ? 'text-primary-700 font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {label}
                      </span>
                      <span
                        className={`mt-1 text-xs sm:hidden ${
                          isActive ? 'text-primary-700 font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {t.steps.shortLabels[index]}
                      </span>
                    </div>
                    {index < t.steps.labels.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 sm:mx-2 ${
                          currentStep > stepNum ? 'bg-primary-500' : 'bg-cream-200'
                        }`}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </header>
  );
}

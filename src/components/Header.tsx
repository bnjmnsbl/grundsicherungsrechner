import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '../constants';

type HeaderProps = {
  currentStep: number; // 0=Intro, 1-5=Steps, 6=Ergebnis
};

export function Header({ currentStep }: HeaderProps) {
  // Intro (0) und Ergebnis (6) zeigen keinen Stepper
  const showStepper = currentStep >= 1 && currentStep <= 5;

  return (
    <header className="bg-white border-b border-cream-200 no-print">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <h1 className="text-xl sm:text-2xl font-bold text-primary-700 text-center">
          Grundsicherungsrechner
        </h1>
        {showStepper && (
          <nav className="mt-4" aria-label="Fortschritt">
            <ol className="flex items-center justify-between">
              {WIZARD_STEPS.map((step, index) => {
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
                        {step.label}
                      </span>
                      <span
                        className={`mt-1 text-xs sm:hidden ${
                          isActive ? 'text-primary-700 font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {step.shortLabel}
                      </span>
                    </div>
                    {index < WIZARD_STEPS.length - 1 && (
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

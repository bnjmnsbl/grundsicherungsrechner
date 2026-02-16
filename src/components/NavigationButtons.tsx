import { ArrowLeft, ArrowRight } from 'lucide-react';

type NavigationButtonsProps = {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showNext?: boolean;
};

export function NavigationButtons({
  onBack,
  onNext,
  nextLabel = 'Weiter',
  showBack = true,
  showNext = true,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-cream-200">
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors"
        >
          <ArrowLeft size={18} />
          Zurück
        </button>
      ) : (
        <div />
      )}
      {showNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors shadow-sm"
        >
          {nextLabel}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

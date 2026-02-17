import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

type NavigationButtonsProps = {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  showNext?: boolean;
};

export function NavigationButtons({
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
  showBack = true,
  showNext = true,
}: NavigationButtonsProps) {
  const { t } = useTranslation();
  const label = nextLabel ?? t.common.next;

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-cream-200">
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-colors"
        >
          <ArrowLeft size={18} />
          {t.common.back}
        </button>
      ) : (
        <div />
      )}
      {showNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl transition-colors shadow-sm ${nextDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'text-white bg-primary-500 hover:bg-primary-600'
            }`}
        >
          {label}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

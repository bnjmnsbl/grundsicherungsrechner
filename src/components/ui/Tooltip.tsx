import { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

type TooltipProps = {
  text: string;
};

export function Tooltip({ text }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <span className="relative inline-block ml-1.5 align-middle" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label={t.common.moreInfo}
      >
        <Info size={14} />
      </button>
      {open && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-4 bg-white rounded-xl shadow-lg border border-cream-200 text-sm text-gray-700 leading-relaxed animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label={t.common.close}
          >
            <X size={14} />
          </button>
          {text}
        </div>
      )}
    </span>
  );
}

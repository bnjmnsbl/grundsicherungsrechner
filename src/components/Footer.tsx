import { Scale, Lock } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-cream-200 mt-8 no-print">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="flex gap-3 text-sm text-gray-600">
          <Scale size={18} className="shrink-0 mt-0.5 text-primary-500" />
          <p>
            <strong>{t.footer.important}</strong> {t.footer.disclaimer}
          </p>
        </div>
        <div className="flex gap-3 text-sm text-gray-600">
          <Lock size={18} className="shrink-0 mt-0.5 text-primary-500" />
          <p>
            <strong>{t.footer.privacyTitle}</strong> {t.footer.privacyText}
          </p>
        </div>
      </div>
    </footer>
  );
}

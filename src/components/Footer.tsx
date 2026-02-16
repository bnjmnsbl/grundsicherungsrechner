import { Scale, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-cream-200 mt-8 no-print">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="flex gap-3 text-sm text-gray-600">
          <Scale size={18} className="shrink-0 mt-0.5 text-primary-500" />
          <p>
            <strong>Wichtig:</strong> Dieser Rechner liefert eine unverbindliche
            Ersteinschätzung auf Basis Ihrer Angaben. Er kann nicht alle individuellen
            Umstände berücksichtigen. Die endgültige Entscheidung trifft das Sozialamt
            nach Prüfung Ihres Antrags. Rechtsstand: 2026.
          </p>
        </div>
        <div className="flex gap-3 text-sm text-gray-600">
          <Lock size={18} className="shrink-0 mt-0.5 text-primary-500" />
          <p>
            <strong>Ihre Daten bleiben bei Ihnen.</strong> Alle Berechnungen finden direkt
            in Ihrem Browser statt. Es werden keine persönlichen Daten an einen Server
            gesendet oder gespeichert.
          </p>
        </div>
      </div>
    </footer>
  );
}

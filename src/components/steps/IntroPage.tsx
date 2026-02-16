import { Clock, Lock, ClipboardList } from 'lucide-react';

type IntroPageProps = {
  onStart: () => void;
};

export function IntroPage({ onStart }: IntroPageProps) {
  return (
    <div className="text-center space-y-8 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary-800 leading-snug">
          Haben Sie Anspruch auf Grundsicherung im Alter?
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          Viele Rentnerinnen und Rentner in Deutschland erhalten weniger Geld als
          ihnen zusteht – oft, weil sie nicht wissen, dass sie Grundsicherung
          beantragen können. Dieser Rechner hilft Ihnen in wenigen Minuten
          herauszufinden, ob Sie einen Anspruch haben könnten und wie hoch die
          Leistung ungefähr wäre.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg sm:max-w-2xl mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-cream-200 space-y-2">
          <Clock size={28} className="text-primary-500 mx-auto" />
          <p className="text-base font-semibold text-gray-700">Dauert nur 3–5 Minuten</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-cream-200 space-y-2">
          <Lock size={28} className="text-primary-500 mx-auto" />
          <p className="text-base font-semibold text-gray-700">Ihre Daten bleiben in Ihrem Browser</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-cream-200 space-y-2">
          <ClipboardList size={28} className="text-primary-500 mx-auto" />
          <p className="text-base font-semibold text-gray-700">Sie erhalten eine klare Einschätzung</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-primary-500 hover:bg-primary-600 rounded-2xl transition-colors shadow-md"
      >
        Jetzt prüfen
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

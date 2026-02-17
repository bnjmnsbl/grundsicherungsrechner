import { useTranslation } from '../../i18n/LanguageContext';

type DatePickerProps = {
  monat: number | null;
  jahr: number | null;
  onMonatChange: (monat: number) => void;
  onJahrChange: (jahr: number) => void;
};

export function DatePicker({ monat, jahr, onMonatChange, onJahrChange }: DatePickerProps) {
  const { t } = useTranslation();
  const aktuellesJahr = new Date().getFullYear();
  const jahre: number[] = [];
  for (let j = aktuellesJahr; j >= 1920; j--) {
    jahre.push(j);
  }

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-600 mb-1">{t.common.month}</label>
        <select
          value={monat ?? ''}
          onChange={(e) => onMonatChange(parseInt(e.target.value, 10))}
          className="w-full p-4 text-lg border-2 border-cream-200 rounded-xl bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
        >
          <option value="">{'\u2013'}</option>
          {t.common.months.map((name, i) => (
            <option key={i} value={i + 1}>{name}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-600 mb-1">{t.common.year}</label>
        <select
          value={jahr ?? ''}
          onChange={(e) => onJahrChange(parseInt(e.target.value, 10))}
          className="w-full p-4 text-lg border-2 border-cream-200 rounded-xl bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
        >
          <option value="">{'\u2013'}</option>
          {jahre.map((j) => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

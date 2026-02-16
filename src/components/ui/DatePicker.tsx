type DatePickerProps = {
  monat: number | null;
  jahr: number | null;
  onMonatChange: (monat: number) => void;
  onJahrChange: (jahr: number) => void;
};

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function DatePicker({ monat, jahr, onMonatChange, onJahrChange }: DatePickerProps) {
  const aktuellesJahr = new Date().getFullYear();
  const jahre: number[] = [];
  for (let j = aktuellesJahr; j >= 1920; j--) {
    jahre.push(j);
  }

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-600 mb-1">Monat</label>
        <select
          value={monat ?? ''}
          onChange={(e) => onMonatChange(parseInt(e.target.value, 10))}
          className="w-full p-4 text-lg border-2 border-cream-200 rounded-xl bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
        >
          <option value="">–</option>
          {MONATE.map((name, i) => (
            <option key={i} value={i + 1}>{name}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-600 mb-1">Jahr</label>
        <select
          value={jahr ?? ''}
          onChange={(e) => onJahrChange(parseInt(e.target.value, 10))}
          className="w-full p-4 text-lg border-2 border-cream-200 rounded-xl bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
        >
          <option value="">–</option>
          {jahre.map((j) => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

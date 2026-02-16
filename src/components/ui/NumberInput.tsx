type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

export function NumberInput({ label, value, onChange, placeholder = '0' }: NumberInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === '') {
      onChange(0);
      return;
    }
    // Komma als Dezimaltrennzeichen akzeptieren
    const normalized = raw.replace(',', '.');
    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-base font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-4 pr-12 text-lg border-2 border-cream-200 rounded-xl bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium pointer-events-none">
          €
        </span>
      </div>
    </div>
  );
}

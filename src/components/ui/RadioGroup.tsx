type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
};

export function RadioGroup({ name, options, value, onChange, label }: RadioGroupProps) {
  return (
    <fieldset className="space-y-3">
      {label && (
        <legend className="text-lg font-semibold text-gray-800 mb-2">{label}</legend>
      )}
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            value === option.value
              ? 'border-primary-500 bg-primary-50'
              : 'border-cream-200 bg-white hover:border-primary-200'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="w-5 h-5 text-primary-500 accent-primary-500"
          />
          <span className="text-base">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

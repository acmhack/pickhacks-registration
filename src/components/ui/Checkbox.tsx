import { type ReactNode } from "react";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  required?: boolean;
  className?: string;
}

export function Checkbox({
  name,
  checked,
  onChange,
  label,
  required = false,
  className = "",
}: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-[#44ab48] focus:ring-2 focus:ring-[#44ab48]/20 cursor-pointer"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

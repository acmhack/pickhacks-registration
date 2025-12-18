interface FormInputProps {
  type: "email" | "password" | "text" | "tel" | "url" | "number";
  name: string;
  placeholder: string;
  bgColor?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
}

export function FormInput({
  type,
  name,
  placeholder,
  bgColor = "bg-white",
  value,
  onChange,
  required = false,
  min,
  max,
}: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      className={`w-full rounded-lg border border-gray-300 ${bgColor} px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-[#44ab48] focus:outline-none focus:ring-2 focus:ring-[#44ab48]/20`}
    />
  );
}

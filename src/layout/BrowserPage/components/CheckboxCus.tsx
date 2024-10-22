import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <label
      className={`mb-1 flex cursor-pointer items-center justify-between rounded px-4 py-3 ${checked && "bg-bgCheckBox text-white"}`}
    >
      {/* Checkbox ẩn */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden" // Ẩn checkbox mặc định
      />

      <span className="text-sm">{label}</span>
      {checked && (
        <span className="font-bold">✓</span> // Hiển thị dấu check khi checkbox được chọn
      )}
    </label>
  );
};

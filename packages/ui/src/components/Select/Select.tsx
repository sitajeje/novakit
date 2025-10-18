import React from 'react';
import clsx from 'clsx';

export type Option = {
  label: string;
  value: string;
};
export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string | null;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function Select({ options, value, onValueChange, label, className = "", ...props } :SelectProps){
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="mr-2">{label}</label>}
      <select
        value={value ?? ""}
        onChange={(e) => onValueChange(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};



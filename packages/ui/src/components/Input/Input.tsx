// packages/ui/src/components/Input/Input.tsx
import React from 'react';
import clsx from 'clsx';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;  
  value?: string;
}

export function Input({ label, className,value, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <input
        {...props}
        className={clsx(
          'rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
          className
        )}
      />
    </label>
  );
}


import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions?: { label: string; onClick?: () => void }[];
}

export default function Card ({ title, actions = [],children, className, ...props }:CardProps) {
  return (
    <div className={`rounded-xl shadow p-4 bg-white ${className}`} {...props}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="mb-3">{children}</div>

      {actions.length > 0 && (
        <div className="flex gap-2 border-t pt-2 justify-end">
          {actions.map((action, i) => (
            <button
              key={i}
              className="text-blue-500 hover:underline text-sm"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


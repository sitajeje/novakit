import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        'rounded-2xl border border-gray-200 bg-white shadow-sm p-4',
        className
      )}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

import React from 'react';

export function Badge({ children, className = '', variant = 'default' }) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';

  const variants = {
    default: 'bg-[#009CA6] text-white',
    secondary: 'bg-gray-100 text-gray-900',
    outline: 'border border-[#009CA6] text-[#009CA6]',
  };

  return (
    <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </div>
  );
}

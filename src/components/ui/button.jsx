import React from 'react';

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  title,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-[#009CA6] text-white hover:bg-[#008A94] focus-visible:ring-[#009CA6]',
    link: 'text-[#009CA6] underline-offset-4 hover:underline',
    outline: 'border border-[#009CA6] text-[#009CA6] hover:bg-[#009CA6] hover:text-white',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8',
    link: 'h-auto p-0',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
}

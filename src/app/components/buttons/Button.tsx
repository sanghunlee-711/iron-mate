import React, { PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {}

const Button: React.FC<ButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button
      type={type}
      className="bg-slate-200	rounded text-slate-400 py-2 px-4"
    >
      {children}
    </button>
  );
};

export default Button;

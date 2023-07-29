import React, { PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {}

const Button: React.FC<ButtonProps> = ({ children, type }) => {
  return <button type={type}>{children}</button>;
};

export default Button;

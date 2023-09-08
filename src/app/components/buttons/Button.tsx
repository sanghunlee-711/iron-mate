import React, { PropsWithChildren } from 'react';

type TButtonSize = 's' | 'm' | 'l';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: TButtonSize;
  isBorder?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  size = 'm',
  isBorder = false,
  ...props
}) => {
  const sizeMap = new Map<TButtonSize, string>([
    ['s', 'py-2 px-2 w-8 h-8 min-w-fit min-h-fit text-xs'],
    ['m', 'py-2 px-4 w-fit h-fit text-sm'],
    ['l', 'py-2 px-4 w-fit h-fit text-base'],
  ]);
  const normalClass = `border-2 bg-slate-200 rounded text-slate-400 inline-flex items-center justify-center	${
    isBorder ? 'rounded-full' : ''
  } `;

  return (
    <button {...props} type={type} className={normalClass + sizeMap.get(size)}>
      {children}
    </button>
  );
};

export default Button;

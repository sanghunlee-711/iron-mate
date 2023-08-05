'use client';

import React, { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {}

const RoundButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <div className="rounded-full	border inline-flex items-center justify-center w-8 h-8 text-purple-400 text-base font-semibold">
      {children}
    </div>
  );
};

export default RoundButton;

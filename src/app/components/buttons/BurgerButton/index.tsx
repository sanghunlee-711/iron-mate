'use client';

import React from 'react';
import './BurgerButton.css';

interface IBurgerButtonPops {
  isToggled: boolean;
  handleToggle: (visibility: boolean) => void;
}

const BurgerButton: React.FC<IBurgerButtonPops> = ({
  isToggled,
  handleToggle,
}) => {
  return (
    <button
      className={`menu__btn ${isToggled ? 'toggle' : ''}`}
      onClick={() => handleToggle(!isToggled)}
    >
      <span></span>
    </button>
  );
};

export default BurgerButton;

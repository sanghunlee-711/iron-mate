'use client';

import React from 'react';
import Sidebar from '../../SideBar';
import './index.css';

const BurgerButton = () => {
  const [isToggle, setIsToggled] = React.useState<boolean>(false);

  return (
    <div className="hamburger-menu">
      <button
        className={`menu__btn ${isToggle ? 'toggle' : ''}`}
        onClick={() => setIsToggled((prev) => !prev)}
      >
        <span></span>
      </button>
      <Sidebar handleClicked={(visibility) => setIsToggled(visibility)} />
    </div>
  );
};

export default BurgerButton;

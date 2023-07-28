'use client';

import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import BurgerButton from '../buttons/BurgerButton';
import Sidebar from '../SideBar';
import './BasicLayout.css';
import Image from 'next/image';

const BasicLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isToggle, setIsToggled] = React.useState<boolean>(false);

  const handleToggle = (visibility: boolean) => {
    setIsToggled(visibility);
  };

  return (
    <>
      <header className="header_container">
        <BurgerButton isToggled={isToggle} handleToggle={handleToggle} />
        <Image src="muscle-logo.svg" alt="logo" width={42} height={36} />
      </header>
      <Sidebar isVisible={isToggle} handleClicked={handleToggle} />
      <main className="main_container">{children}</main>
      <footer className="footer_container">저작권내꺼</footer>
    </>
  );
};

export default BasicLayout;

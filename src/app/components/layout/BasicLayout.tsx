'use client';

import React, { PropsWithChildren } from 'react';
import BurgerButton from '../buttons/BurgerButton';
import Sidebar from '../SideBar';
import './BasicLayout.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';

const BasicLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const route = useRouter();
  const [isToggle, setIsToggled] = React.useState<boolean>(false);

  const handleToggle = (visibility: boolean) => {
    setIsToggled(visibility);
  };

  const sideBarRef = useOutsideClick(() => {
    isToggle && handleToggle(false);
  });

  return (
    <>
      <header className="header_container">
        <BurgerButton isToggled={isToggle} handleToggle={handleToggle} />
        <Image
          className="icon"
          src="/images/logo/muscle-logo.svg"
          alt="logo"
          width={42}
          height={36}
          onClick={() => route.push('/')}
        />
      </header>
      <div ref={sideBarRef}>
        <Sidebar isVisible={isToggle} handleClicked={handleToggle} />
      </div>
      <main className="main_container">{children}</main>
      <footer className="footer_container text-base font-bold	">
        A project by{' '}
        <Link
          href="https://www.cloud-sanghun.com/"
          target="_blank"
          className=" text-gray-300"
        >
          cloud sanghun lee
        </Link>
      </footer>
    </>
  );
};

export default BasicLayout;

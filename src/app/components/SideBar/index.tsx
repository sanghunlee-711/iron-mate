'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import './SideBar.css';

const SIDE_BAR_MAP = [
  {
    to: '/',
    name: 'History',
  },
  {
    to: '/train',
    name: 'Train',
  },
];

interface ISidebarProps {
  isVisible: boolean;
  handleClicked: (visiblity: boolean) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ handleClicked, isVisible }) => {
  const pathname = usePathname();

  return (
    <aside className={`menu__box ${isVisible ? 'visible' : ''}`}>
      <h1 className="text-3xl	subpixel-antialiased italic p-6">Iron mate</h1>
      <ul>
        {SIDE_BAR_MAP.map(({ to, name }) => (
          <li key={to} className={to === pathname ? 'active' : ''}>
            <Link
              className="menu__item"
              href={to}
              onClick={() => handleClicked(false)}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

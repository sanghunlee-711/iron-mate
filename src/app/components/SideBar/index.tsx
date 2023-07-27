'use client';

import Link from 'next/link';
import React from 'react';

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
  handleClicked: (visiblity: boolean) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ handleClicked }) => {
  return (
    <ul className="menu__box">
      {SIDE_BAR_MAP.map(({ to, name }) => (
        <li key={to}>
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
  );
};

export default Sidebar;

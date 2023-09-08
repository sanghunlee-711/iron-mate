import './globals.css';
import './tailwind.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import BasicLayout from './components/layout/BasicLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Iron mate',
  description: 'Optmize your weight lifting with your own data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}

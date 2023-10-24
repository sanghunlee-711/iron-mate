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
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
      <link
        href="images/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="images/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="images/icon-base.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="images/icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="images/icon-167x167.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="images/icon-180x180.png"
      />
      <meta name="msapplication-TileColor" content="#fffff"></meta>
      <link
        href="images/splashscreens/iphone5_splash.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/iphone6_splash.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/iphoneplus_splash.png"
        media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/iphonex_splash.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/iphonexr_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/iphonexsmax_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/ipad_splash.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/ipadpro1_splash.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/ipadpro3_splash.png"
        media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="images/splashscreens/ipadpro2_splash.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <meta name="theme-color" content="#fffff" />
      <body className={inter.className} suppressHydrationWarning={true}>
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'Santhosh — Developer & Flutter Engineer',
  description:
    'Personal portfolio of Santhosh — Full Stack Developer, Flutter Engineer, and Open Source Builder crafting digital experiences that feel alive.',
  keywords: ['Santhosh', 'Flutter', 'Developer', 'Portfolio', 'Full Stack', 'Python', 'JavaScript'],
  authors: [{ name: 'Santhosh' }],
  openGraph: {
    title: 'Santhosh — Developer & Flutter Engineer',
    description: 'I craft digital experiences that feel alive.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

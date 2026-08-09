import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'REFOUND - Reconnecting Found Items with Owners Digitally',
  description:
    'Sistem Lost & Found Tertutup Komunitas Gedung Lab TIF & SI Universitas Trunodjoyo Madura (TCC Vibe Code 2026)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F5F7FA] dark:bg-[#070D1E] text-[#0B1633] dark:text-[#F5F7FA]">
        {children}
      </body>
    </html>
  );
}

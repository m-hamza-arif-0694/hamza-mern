import type { Metadata } from 'next';
import { AuthProvider } from '../context/AuthContext';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'HisabDo',
  description: 'Financial Management App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
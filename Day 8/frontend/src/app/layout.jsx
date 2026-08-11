import './globals.css';

export const metadata = {
  title: 'HisabDo — Digital Ledger & Cashbook Management',
  description: 'Next.js 14 Web Portal & Application for HisabDo Capstone Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

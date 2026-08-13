import React from 'react';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'HisabDo — Digital Cashbook & Udhar Management Web App (Day 9)',
  description: 'Pakistan leading digital financial management solution for small businesses, shopkeepers, and retailers.',
  keywords: 'HisabDo, Digital Cashbook, Udhar Book, Gave Got Ledger, MERN Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

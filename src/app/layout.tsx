import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HisabDo — Digital Ledger & Expense Tracker",
  description: "Local-first digital ledger, Khata, and daily expense management for businesses and individuals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
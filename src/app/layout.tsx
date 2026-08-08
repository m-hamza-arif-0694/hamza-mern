import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HisabDo Web Application",
  description: "Modern web ledger and expense tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
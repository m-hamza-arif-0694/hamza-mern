# HisabDo — Digital Ledger & Expense Tracker

HisabDo is a local-first digital ledger, Khata, and daily expense management web application designed for shopkeepers, freelancers, and small businesses. Built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## 🚀 Features (Day 9 Progress)

- **Responsive Marketing Layout:** Navigation bar, hero section, feature cards, and footer.
- **Dashboard Overview:** Sidebar navigation, total receivables, total payables, net balance display, and recent transaction table.
- **App Router Architecture:** Modular route organization using Next.js route groups `(marketing)` and `(dashboard)`.
- **Modern UI:** Tailwind CSS dark mode styling with Lucide React iconography.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS, Lucide Icons
- **Client Storage:** Dexie.js (IndexedDB wrapper - *Upcoming*)

## 🚦 Getting Started

First, install dependencies:

```bash
npm install

```
Then, run the development server:

```bash
npm run dev

```
Open http://localhost:3000 in your browser to view the application.

## 📁 Project Structure

hisabdo-capstone/
├── .next/
├── node_modules/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── customers/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── expenses/
│   │   │   ├── reports/
│   │   │   └── layout.tsx
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── lib/
│   └── types/
├── .gitignore
├── ANALYSIS.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json


import Link from "next/link";
import { ShieldCheck, BookOpen, Receipt, ArrowRight, Mic, HardDrive } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-20 py-12 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20">
          Smart Local-First Khata
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Manage Your <span className="text-emerald-400">Ledger & Expenses</span> Effortlessly
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg">
          HisabDo helps shopkeepers, freelancers, and small businesses log balances, track payments, and manage daily expenses offline and securely.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center space-x-2 transition"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/features"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-lg border border-slate-700 transition"
          >
            Explore Features
          </Link>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <BookOpen className="h-8 w-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Digital Khata</h3>
          <p className="text-slate-400 text-sm">
            Keep clear track of "Gave Money" (Udhar) and "Got Money" with exact dates, categories, and payment notes.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <Receipt className="h-8 w-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Daily Expense Tracker</h3>
          <p className="text-slate-400 text-sm">
            Categorize daily business overheads like rent, utilities, and stock inventory to stay on top of daily cash flow.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
          <HardDrive className="h-8 w-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Offline-First Architecture</h3>
          <p className="text-slate-400 text-sm">
            Your data is stored locally on your device for lightning-fast loading and full control over your private records.
          </p>
        </div>
      </section>
    </div>
  );
}
"use client";

import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-emerald-400">
            <Wallet className="h-6 w-6" />
            <span>HisabDo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
            <Link href="/about" className="hover:text-emerald-400 transition">About</Link>
            <Link href="/features" className="hover:text-emerald-400 transition">Features</Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-lg font-semibold text-sm transition"
            >
              Open Dashboard
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 hover:text-white">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 pt-2 pb-4 space-y-2 text-sm font-medium text-slate-200">
          <Link href="/" className="block py-2 hover:text-emerald-400">Home</Link>
          <Link href="/about" className="block py-2 hover:text-emerald-400">About</Link>
          <Link href="/features" className="block py-2 hover:text-emerald-400">Features</Link>
          <Link href="/pricing" className="block py-2 hover:text-emerald-400">Pricing</Link>
          <Link href="/contact" className="block py-2 hover:text-emerald-400">Contact</Link>
          <Link href="/dashboard" className="block mt-2 bg-emerald-500 text-slate-950 text-center py-2 rounded-lg font-bold">
            Open Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
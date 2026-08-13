"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft, Wallet, Plus, Pencil, Trash2 } from "lucide-react";
import {
  TransactionModal,
  TransactionFormData,
  TransactionItem,
} from "../../../components/TransactionModal";

const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  { id: "1", partyName: "Ali Traders", type: "Got Money", amount: 5000, date: "Today, 2:15 PM" },
  { id: "2", partyName: "Shop Rent (Monthly)", type: "Gave Money", amount: 15000, date: "Yesterday" },
  { id: "3", partyName: "Usman Khan", type: "Gave Money", amount: 2500, date: "08 Aug 2026" },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [editingItem, setEditingItem] = useState<TransactionItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("hisabdo_dashboard_transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      setTransactions(DEFAULT_TRANSACTIONS);
      localStorage.setItem("hisabdo_dashboard_transactions", JSON.stringify(DEFAULT_TRANSACTIONS));
    }
  }, []);

  const saveToStorage = (updated: TransactionItem[]) => {
    setTransactions(updated);
    localStorage.setItem("hisabdo_dashboard_transactions", JSON.stringify(updated));
  };

  const handleCreateOrUpdate = (data: TransactionFormData) => {
    if (editingItem) {
      const updated = transactions.map((item) =>
        item.id === editingItem.id ? { ...data, id: editingItem.id } : item
      );
      saveToStorage(updated);
    } else {
      const newItem: TransactionItem = {
        ...data,
        id: Date.now().toString(),
      };
      saveToStorage([newItem, ...transactions]);
    }
    setEditingItem(null);
  };

  const handleEdit = (item: TransactionItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const updated = transactions.filter((item) => item.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">
            Welcome back! Here is your business activity summary.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Total Receivables (You'll Get)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mt-2">Rs. 45,200</h2>
          <p className="text-xs text-slate-500 mt-1">Across pending entries</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Total Payables (You'll Give)</span>
            <ArrowDownLeft className="w-4 h-4 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-rose-400 mt-2">Rs. 12,800</h2>
          <p className="text-xs text-slate-500 mt-1">Across supplier invoices</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Net Balance</span>
            <Wallet className="w-4 h-4 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-2">Rs. 32,400</h2>
          <p className="text-xs text-slate-500 mt-1">Positive net liquidity</p>
        </div>
      </div>

      {/* Full CRUD Recent Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white">Recent Transactions</h3>
          <span className="text-xs text-slate-500 hover:text-emerald-400 cursor-pointer">
            View All
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name / Description</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.partyName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        item.type === "Got Money"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{item.date}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      item.type === "Got Money" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {item.type === "Got Money" ? "+" : "-"} Rs. {Number(item.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition"
                      title="Edit Transaction"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                      title="Delete Transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingItem}
      />
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { SummaryCards } from "../../../components/dashboard-analytics/SummaryCards";
import { CashFlowChart } from "../../../components/dashboard-analytics/CashFlowChart";
import { ExpenseModal } from "../../../components/ExpenseModal";

interface Transaction {
  id: string;
  name: string;
  type: "in" | "out";
  amount: number;
  date: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      // 1. Read Expenses (Cash Outflow)
      const savedExpenses = localStorage.getItem("hisabdo_expenses");
      const expensesList = savedExpenses ? JSON.parse(savedExpenses) : [];

      // 2. Read Customers/Khata (Cash Inflow / Receivables)
      const savedCustomers = localStorage.getItem("hisabdo_customers");
      const customersList = savedCustomers ? JSON.parse(savedCustomers) : [];

      const normalizedExpenses: Transaction[] = expensesList.map((item: any) => ({
        id: item.id || Date.now().toString(),
        name: item.title || item.name || "Expense Entry",
        type: "out",
        amount: Number(item.amount || 0),
        date: item.date || new Date().toLocaleDateString(),
      }));

      const normalizedCustomers: Transaction[] = customersList.map((item: any) => {
        const amount = Number(item.openingBalance || item.amount || item.balance || 0);
        
        const rawType = String(item.type || "").toLowerCase();
        const isCustomer = rawType === "customer" || rawType === "got" || rawType === "in" || !item.type;

        return {
          id: item.id || Date.now().toString(),
          name: item.name || "Party Entry",
          type: isCustomer ? "in" : "out",
          amount: amount,
          date: item.date || new Date().toLocaleDateString(),
        };
      });

      setTransactions([...normalizedExpenses, ...normalizedCustomers]);
    } catch (err) {
      console.error("Failed to fetch metrics", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const totalCashIn = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalCashOut = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const netBalance = totalCashIn - totalCashOut;

  const handleSaveExpense = (formData: any) => {
    try {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        name: formData.title || formData.name || "New Transaction",
        type: formData.type === "in" || formData.type === "got" ? "in" : "out",
        amount: Number(formData.amount || 0),
        date: new Date().toLocaleDateString(),
      };

      const updated = [newTransaction, ...transactions];
      setTransactions(updated);

      const currentExpenses = JSON.parse(localStorage.getItem("hisabdo_expenses") || "[]");
      localStorage.setItem("hisabdo_expenses", JSON.stringify([newTransaction, ...currentExpenses]));
    } catch (err) {
      console.error("Error saving transaction", err);
    } finally {
      setIsModalOpen(false);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Transaction</span>
        </button>
      </div>

      <SummaryCards
        totalCashIn={totalCashIn}
        totalCashOut={totalCashOut}
        netBalance={netBalance}
        isLoading={isLoading}
      />

      <CashFlowChart
        totalCashIn={totalCashIn}
        totalCashOut={totalCashOut}
        isLoading={isLoading}
      />

      {isModalOpen && (
        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveExpense}
        />
      )}
    </div>
  );
}
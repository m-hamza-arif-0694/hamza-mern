import { ArrowUpRight, ArrowDownLeft, Users, Wallet, Plus, Download } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">Welcome back! Here is your business activity summary.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition">
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase">
            <span>Total Receivables (You'll Get)</span>
            <ArrowUpRight className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">Rs. 45,200</div>
          <p className="text-xs text-slate-500">Across 12 pending customer entries</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase">
            <span>Total Payables (You'll Give)</span>
            <ArrowDownLeft className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">Rs. 12,800</div>
          <p className="text-xs text-slate-500">Across 4 supplier invoices</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase">
            <span>Net Balance</span>
            <Wallet className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">Rs. 32,400</div>
          <p className="text-xs text-slate-500">Positive net liquidity</p>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
          <button className="text-xs text-emerald-400 hover:underline">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 rounded-l-lg">Name / Description</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Ali Traders</td>
                <td className="py-3.5 px-4"><span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Got Money</span></td>
                <td className="py-3.5 px-4 text-xs text-slate-400">Today, 2:15 PM</td>
                <td className="py-3.5 px-4 text-right font-semibold text-emerald-400">+ Rs. 5,000</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Shop Rent (Monthly)</td>
                <td className="py-3.5 px-4"><span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">Expense</span></td>
                <td className="py-3.5 px-4 text-xs text-slate-400">Yesterday</td>
                <td className="py-3.5 px-4 text-right font-semibold text-rose-400">- Rs. 15,000</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Usman Khan</td>
                <td className="py-3.5 px-4"><span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">Gave Money</span></td>
                <td className="py-3.5 px-4 text-xs text-slate-400">08 Aug 2026</td>
                <td className="py-3.5 px-4 text-right font-semibold text-rose-400">- Rs. 2,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
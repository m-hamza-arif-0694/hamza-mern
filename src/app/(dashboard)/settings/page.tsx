"use client";

import React, { useState } from "react";
import { Bell, Lock, Globe, Database, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [currency, setCurrency] = useState("PKR");
  const [offlineSync, setOfflineSync] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Application Settings</h1>
        <p className="text-slate-400 text-sm">Configure your app preferences and local database</p>
      </div>

      <div className="space-y-4">
        {/* General Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            General Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Default Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="PKR">PKR - Pakistani Rupee (Rs.)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Theme</label>
              <input
                disabled
                value="Dark Slate (Default)"
                className="w-full bg-slate-950/50 border border-slate-800 text-slate-500 rounded-lg px-3 py-2 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Local Storage & Data */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Local Storage & Sync
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <div>
              <p className="text-sm font-medium text-white">Offline Local Cache</p>
              <p className="text-xs text-slate-400">Save transactions to local browser memory automatically</p>
            </div>
            <input
              type="checkbox"
              checked={offlineSync}
              onChange={(e) => setOfflineSync(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear local storage cache?")) {
                localStorage.clear();
                window.location.href = "/login";
              }
            }}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium transition"
          >
            Clear Local Application Storage
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2.5 rounded-lg transition flex items-center gap-2 text-sm cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("hisabdo_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Profile</h1>
        <p className="text-slate-400 text-sm">Manage your personal account information</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        {/* Avatar Banner */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.name || "User"}</h2>
            <p className="text-slate-400 text-xs">Account Owner</p>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white">
              <User className="w-4 h-4 text-slate-500" />
              <span>{user?.name || "N/A"}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>{user?.email || "N/A"}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Account Role</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white">
              <Shield className="w-4 h-4 text-slate-500" />
              <span>Admin / Owner</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Member Since</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>August 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
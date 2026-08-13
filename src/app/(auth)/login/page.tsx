"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setAuthError(null);

    // Get registered user from local storage
    const storedUserRaw = localStorage.getItem("hisabdo_registered_user");

    if (!storedUserRaw) {
      setAuthError("No account found with this email. Please register first!");
      return;
    }

    const storedUser = JSON.parse(storedUserRaw);

    // Verify credentials match registered account
    if (
      storedUser.email.toLowerCase() === data.email.toLowerCase() &&
      storedUser.password === data.password
    ) {
      // Valid user: set session token & user session
      localStorage.setItem("hisabdo_auth_token", "mock-jwt-token");
      localStorage.setItem(
        "hisabdo_user",
        JSON.stringify({ name: storedUser.name, email: storedUser.email })
      );
      router.push("/dashboard");
    } else {
      // Invalid credentials
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  return (
        <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Welcome Back</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">Log in to manage your business ledger</p>

        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center gap-2 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
            <input
              {...register("email")}
              placeholder="name@company.com"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-400">Password</label>
              <Link href="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Log In
          </button>
        </form>

        <p className="text-slate-400 text-xs text-center mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-emerald-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Save registered user credentials locally for login verification
    localStorage.setItem(
      "hisabdo_registered_user",
      JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );

    // Set auth session and redirect to dashboard
    localStorage.setItem("hisabdo_auth_token", "mock-jwt-token");
    localStorage.setItem("hisabdo_user", JSON.stringify({ name: data.name, email: data.email }));
    router.push("/dashboard");
  };

  return (
        <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-1 text-center">Create Account</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">Start managing your business transactions</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <input
              {...register("name")}
              placeholder="Shazain Sherazi"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
          </div>

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
            <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-slate-400 text-xs text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
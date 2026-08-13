"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("hisabdo_auth_token");
    if (!token) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("hisabdo_auth_token");
    localStorage.removeItem("hisabdo_user");
    router.push("/login");
  };

  return { isAuthenticated, logout };
}
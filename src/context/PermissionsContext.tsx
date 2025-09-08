"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type PermissionsContextType = {
  permissions: string[];
  roles: string[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession(); // 🔹 Cek status login
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Bersihkan sessionStorage saat logout
  useEffect(() => {
    if (status === "unauthenticated") {
      sessionStorage.removeItem("userPermissions");
      setPermissions([]);
      setRoles([]);
      setLoading(false);
    }
  }, [status]);

  // 🔹 Ambil dari cache saat pertama kali mount
  useEffect(() => {
    const cached = sessionStorage.getItem("userPermissions");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setPermissions(parsed.permissions || []);
        setRoles(parsed.roles || []);
        setLoading(false);
      } catch {
        console.warn("Failed to parse userPermissions from sessionStorage");
      }
    }
    if (status === "authenticated") {
      fetchPermissions();
      const interval = setInterval(fetchPermissions, 60_000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // 🔹 Fetch API
  async function fetchPermissions() {
    try {
      const res = await fetch("/api/backend/me/permissions", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Gagal memuat permissions");

      const data = await res.json();
      const newPermissions = data.user.permissions || [];
      const newRoles = data.user.roles || [];

      setPermissions(newPermissions);
      setRoles(newRoles);

      sessionStorage.setItem(
        "userPermissions",
        JSON.stringify({ permissions: newPermissions, roles: newRoles })
      );
    } catch (err) {
      console.error("fetchPermissions error:", err);
      setPermissions([]);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PermissionsContext.Provider value={{ permissions, roles, loading, refresh: fetchPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const ctx = useContext(PermissionsContext);
  if (!ctx) throw new Error("usePermissionsContext must be used within PermissionsProvider");
  return ctx;
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type PermissionsContextType = {
  permissions: string[];
  roles: string[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined
);

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPermissions() {
    try {
      const res = await fetch("/api/backend/me/permissions", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Gagal memuat permissions");

      const data = await res.json();
      setPermissions(data.user.permissions || []);
      setRoles(data.user.roles || []);
    } catch (err) {
      console.error("Error fetch permissions:", err);
      setPermissions([]);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPermissions();

    // Auto refresh tiap 60 detik
    const interval = setInterval(fetchPermissions, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PermissionsContext.Provider
      value={{ permissions, roles, loading, refresh: fetchPermissions }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions harus dipakai di dalam <PermissionsProvider>");
  }
  return context;
}

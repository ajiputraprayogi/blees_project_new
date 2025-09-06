import { useState, useEffect } from "react";

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPermissions() {
    try {
      const res = await fetch("/api/backend/me/permissions", {
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error("Gagal memuat permissions");

      const data = await res.json();
      setPermissions(data.user.permissions || []);
      setRoles(data.user.roles || []);
    } catch (err) {
      console.error(err);
      setPermissions([]);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPermissions();
    const interval = setInterval(fetchPermissions, 60_000); // refresh tiap 60 detik
    return () => clearInterval(interval);
  }, []);

  return { permissions, roles, loading, refresh: fetchPermissions };
}

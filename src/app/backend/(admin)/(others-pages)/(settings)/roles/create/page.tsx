"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

type Permission = {
  id: number;
  name: string;
};

// ✅ Cache global permissions biar gak fetch ulang terus
let permissionsCache: Permission[] | null = null;

export default function CreateRole() {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>(permissionsCache || []);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!permissionsCache);
  const router = useRouter();

  // Ambil list permissions (pakai cache kalau ada)
  useEffect(() => {
    if (permissionsCache) return; // langsung pakai cache

    let abortController = new AbortController();

    async function fetchPermissions() {
      try {
        const res = await fetch("/api/backend/permissions", { signal: abortController.signal });
        if (!res.ok) throw new Error("Gagal mengambil permissions");
        const data: Permission[] = await res.json();

        permissionsCache = data; // ✅ simpan ke cache
        setPermissions(data);
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          console.error(error);
          alert("Gagal mengambil permissions");
        }
      } finally {
        setInitialLoading(false);
      }
    }

    fetchPermissions();

    return () => abortController.abort();
  }, []);

  // Toggle checkbox permission
  function togglePermission(id: number) {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama role wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/backend/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          permissions: selectedPermissions, // kirim array permission ids
        }),
      });

      if (!res.ok) throw new Error("Gagal membuat role");

      router.push("/backend/roles");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan role");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <>
        <PageBreadcrumb pageTitle="Data Roles" />
        <ComponentCard title="Form Tambah Role">
          <p>Loading permissions...</p>
        </ComponentCard>
      </>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Roles" />
      <ComponentCard title="Form Tambah Role">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <Label>Nama Role</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Input Nama Role"
              value={name}
              disabled={loading}
            />
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto border rounded p-2">
              {permissions.length === 0 ? (
                <p className="text-gray-500">Tidak ada permissions</p>
              ) : (
                permissions.map((perm) => (
                  <label key={perm.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm.id)}
                      onChange={() => togglePermission(perm.id)}
                      disabled={loading}
                    />
                    <span>{perm.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              className="mr-2"
              variant="danger"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
              disabled={loading}
            >
              Kembali
            </Button>

            <Button size="sm" variant="green" type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}

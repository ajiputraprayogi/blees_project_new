"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

type Permission = {
  id: number;
  name: string;
};

type RoleHasPermission = {
  permission_id: number;
};

type RoleWithPermissions = {
  id: number;
  name: string;
  role_has_permissions: RoleHasPermission[];
};

// ✅ Cache global biar permissions tidak di-fetch berulang
let permissionsCache: Permission[] | null = null;

export default function EditRole() {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>(permissionsCache || []);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    let abortController = new AbortController();

    async function fetchData() {
      try {
        // ✅ kalau cache sudah ada, gunakan langsung
        if (permissionsCache) {
          setPermissions(permissionsCache);
        }

        // ✅ jalankan fetch paralel
        const [roleRes, permRes] = await Promise.all([
          fetch(`/api/backend/roles/${params.id}`, { signal: abortController.signal }),
          permissionsCache
            ? null
            : fetch("/api/backend/permissions", { signal: abortController.signal }),
        ]);

        if (!roleRes.ok) throw new Error("Gagal memuat role");
        const roleData: RoleWithPermissions = await roleRes.json();

        setName(roleData.name);
        setSelectedPermissionIds(
          roleData.role_has_permissions.map((rp) => rp.permission_id)
        );

        if (permRes) {
          if (!permRes.ok) throw new Error("Gagal memuat permissions");
          const permData: Permission[] = await permRes.json();
          permissionsCache = permData; // ✅ simpan ke cache
          setPermissions(permData);
        }
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          alert(error instanceof Error ? error.message : "Terjadi kesalahan");
        }
      } finally {
        setInitialLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [params.id]);

  // Toggle checkbox permission
  function togglePermission(id: number) {
    setSelectedPermissionIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/backend/roles/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          permissionIds: selectedPermissionIds,
        }),
      });

      if (!res.ok) throw new Error("Gagal update role");

      router.push("/backend/roles");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal update role");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <>
        <PageBreadcrumb pageTitle="Data Roles" />
        <ComponentCard title="Form Edit Role">
          <p>Loading...</p>
        </ComponentCard>
      </>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Edit Role" />
      <ComponentCard title="Form Edit Role">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <Label>Nama Role</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Input Nama Role"
              disabled={loading}
            />
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto border rounded p-2">
              {permissions.length === 0 ? (
                <p className="text-gray-500">Memuat permissions...</p>
              ) : (
                permissions.map((perm) => (
                  <label key={perm.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedPermissionIds.includes(perm.id)}
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

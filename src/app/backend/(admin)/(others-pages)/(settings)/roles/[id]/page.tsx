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

export default function EditRole() {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!params.id) throw new Error("Role ID tidak ditemukan");

        // Fetch role detail termasuk permissions yang sudah dipilih
        const roleRes = await fetch(`/api/backend/roles/${params.id}`);
        if (!roleRes.ok) throw new Error("Gagal memuat role");
        const roleData: RoleWithPermissions = await roleRes.json();

        setName(roleData.name);
        setSelectedPermissionIds(
          roleData.role_has_permissions.map((rp) => rp.permission_id)
        );

        // Fetch semua permissions
        const permRes = await fetch("/api/backend/permissions");
        if (!permRes.ok) throw new Error("Gagal memuat permissions");
        const permData: Permission[] = await permRes.json();
        setPermissions(permData);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message || "Terjadi kesalahan");
        } else {
          alert("Terjadi kesalahan tidak diketahui");
        }
      } finally {
        setInitialLoading(false);
      }
    }

    fetchData();
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
      if (error instanceof Error) {
        alert(error.message || "Gagal update role");
      } else {
        alert("Terjadi kesalahan tidak diketahui");
      }
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
              {permissions.map((perm) => (
                <label key={perm.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissionIds.includes(perm.id)}
                    onChange={() => togglePermission(perm.id)}
                    disabled={loading}
                  />
                  <span>{perm.name}</span>
                </label>
              ))}
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

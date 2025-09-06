"use client";

import React, { useEffect, useState } from "react";

// Permission User Login
import { hasPermission } from "@/utils/hasPermission";
import { usePermissions } from "@/hooks/usePermissions";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import AddPermissionsButton from "./AddPermissionsButton";
import SkeletonTable from "@/components/skeleton/Table";

type Permission = {
  id: number;
  name: string;
};

export default function PermissionsPage() {
  const { permissions: userPermissions, loading: permissionsLoading } = usePermissions();
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    document.title = "Data Permissions | Admin Panel";
    fetchPermissions();
  }, []);

  async function fetchPermissions() {
    setLoading(true);
    try {
      const res = await fetch("/api/backend/permissions");
      if (!res.ok) throw new Error("Gagal memuat data permissions");
      const data = await res.json();
      setAllPermissions(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        Swal.fire("Error", err.message, "error");
      } else {
        console.error(err);
        Swal.fire("Error", "Terjadi kesalahan", "error");
      }
    } finally {
      setLoading(false);
    }
  }


  function handleEdit(id: number) {
    router.push(`/backend/permissions/${id}`);
  }

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus permission ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/backend/permissions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus permission");
      Swal.fire("Terhapus!", "Permissions berhasil dihapus.", "success");
      fetchPermissions();
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire("Error", err.message, "error");
      } else {
        Swal.fire("Error", "Terjadi kesalahan", "error");
      }
    }
  }

  if (loading || permissionsLoading) return (
    <>
      <PageBreadcrumb pageTitle="Data Permissions" />
      <ComponentCard title="Data Permissions Table" headerRight={hasPermission(userPermissions, "add-permissions") && (<AddPermissionsButton />)}>
        <SkeletonTable />
      </ComponentCard>
    </>
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Permissions" />
      <ComponentCard title="Data Permissions Table" headerRight={hasPermission(userPermissions, "add-permissions") && (<AddPermissionsButton />)}>
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nama Permissions
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {allPermissions.map((permission) => (
              <TableRow key={`${permission.id}-${permission.name}`}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {permission.name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  {hasPermission(userPermissions, "edit-permissions") && (
                    <Button size="xs" variant="warning" onClick={() => handleEdit(permission.id)}>
                      Edit
                    </Button>
                  )}
                  {hasPermission(userPermissions, "delete-permissions") && (
                    <Button size="xs" variant="danger" className="ml-2" onClick={() => handleDelete(permission.id)}>
                      Delete
                    </Button>
                  )}
                  {!hasPermission(userPermissions, "edit-permissions") && !userPermissions.includes("delete-permissions") && (
                    <span className="text-gray-400">No Actions</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentCard>
    </div>
  );
}

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
} from "@/components/ui/table"; // sesuaikan import sesuai pathmu
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import AddRolesButton from "./AddRolesButton";
import SkeletonTable from "@/components/skeleton/Table";


type Role = {
  id: number;
  name: string;
};

export default function RolesPage() {
  const { permissions: userPermissions } = usePermissions();

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
      document.title = "Data Roles | Admin Panel";
      fetchRoles();
    }, []);

  async function fetchRoles() {
    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    setLoading(true);
    try {
      const res = await fetch("/api/backend/roles");
      const data = await res.json();
      // await delay(200); 
      setRoles(data);
    } catch {
      Swal.fire("Error", "Gagal memuat data roles", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(id: number) {
    router.push(`/backend/roles/${id}`);
  }

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus role ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/backend/roles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus role");
      Swal.fire("Terhapus!", "Role berhasil dihapus.", "success");
      fetchRoles();
    } catch (err: unknown) {
      if (err instanceof Error) {
        Swal.fire("Error", err.message || "Terjadi kesalahan", "error");
      } else {
        Swal.fire("Error", "Terjadi kesalahan yang tidak diketahui", "error");
      }
    }

  }

  if (loading) return <>
      <PageBreadcrumb pageTitle="Data Users" />
      <ComponentCard title="Data Users Table" headerRight={hasPermission(userPermissions, "add-roles") && ( <AddRolesButton /> )}>
        <SkeletonTable />
      </ComponentCard>
    </>;

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Roles" />
        <ComponentCard title="Data Roles Table" headerRight={hasPermission(userPermissions, "add-roles") && ( <AddRolesButton /> )}>
            <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                    Nama Role
                </TableCell>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                >
                    Actions
                </TableCell>
                </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {roles.map((role) => (
                <TableRow key={role.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {role.name}
                    </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {hasPermission(userPermissions, "edit-roles") && (
                      <Button
                        size="xs"
                        variant="warning"
                        onClick={() => handleEdit(role.id)}
                    >
                        Edit
                    </Button>
                    )}
                    
                    {hasPermission(userPermissions, "delete-roles") && (
                      <Button
                          size="xs"
                          variant="danger"
                          className="ml-2"
                          onClick={() => handleDelete(role.id)}
                      >
                          Delete
                      </Button>
                    )}
                    {!hasPermission(userPermissions, "edit-roles") && !userPermissions.includes("delete-roles") && (
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

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

// ... import statements tetap sama

type RoleOption = {
  value: number;
  label: string;
};

interface User {
  id: number;
  nama: string;
  email: string;
  roleId: number | null;
}

export default function EditUserForm({ user }: { user: User }) {
  const router = useRouter();

  const [nama, setNama] = useState(user.nama);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | "">(user.roleId ?? "");

  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch("/api/backend/roles");
        if (!res.ok) throw new Error("Failed to fetch roles");

        const data = await res.json();
        const options: RoleOption[] = data.map((role: { id: number; name: string }) => ({
          value: role.id,
          label: role.name,
        }));

        setRoleOptions(options);

        // Validasi jika roleId user tidak ada di options
        if (user.roleId && !options.some((opt: RoleOption) => opt.value === user.roleId)) {
          setSelectedRole("");
        }
      } catch (error) {
        console.error("Gagal ambil roles:", error);
        setRoleOptions([]);
      }
    }

    fetchRoles();
  }, [user.roleId]);

  // Jika props user berubah, update state form
  useEffect(() => {
    setNama(user.nama);
    setEmail(user.email);
    setSelectedRole(user.roleId ?? "");
    setPassword("");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Silakan pilih role");
      return;
    }

    setLoading(true);

    try {
      const body: { nama: string; email: string; roleId: number; password?: string } = {
        nama,
        email,
        roleId: selectedRole as number,
      };

      if (password.trim() !== "") {
        body.password = password;
      }

      const res = await fetch(`/api/backend/users/edit/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update user");

      router.push("/backend/users");
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate user");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <Label>Nama</Label>
        <Input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          disabled={loading}
          placeholder="Input Nama"
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          placeholder="Input Email"
        />
      </div>
      <div>
        <Label>Role</Label>
        <Select
          options={roleOptions}
          value={selectedRole}
          onChange={(val: string | number) => {
            const num = Number(val);
            if (!isNaN(num)) setSelectedRole(num);
          }}
          placeholder="Pilih Role"
          className="dark:bg-dark-900"
          defaultValue=""
        />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          placeholder="Kosongkan jika tidak ingin mengganti password"
          value={password}
        />
      </div>
      <div></div>
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
  );
}

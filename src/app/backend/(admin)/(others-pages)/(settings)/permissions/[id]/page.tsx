"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Button from "@/components/ui/button/Button";


export default function EditRole() {
  useEffect(() => {
      document.title = "Edit Permission | Admin Panel";
  }, []);

  const router = useRouter();
  const params = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const Loading = async () => {
      // await delay(2000); // Simulasi loading awal 5 detik
      setInitialLoading(false);
    };

    Loading();
    
    fetch(`/api/backend/permissions/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
      })
      .catch(() => alert("Gagal memuat permission"));
  }, [params.id]);

  if (initialLoading) {
    return <>
      <PageBreadcrumb pageTitle="Data Roles" />
      <ComponentCard title="Form Edit Role">
        <p>Loading...</p>
      </ComponentCard>
    </>
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/backend/permissions/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/backend/permissions");
    } else {
      alert("Gagal update permission");
    }
  }


//   if (!permission) return <div>Loading...</div>;

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Users" />
      <ComponentCard title="Form Edit User">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
                <Label>Nama Permission</Label>
                <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Input Nama Permission"/>
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

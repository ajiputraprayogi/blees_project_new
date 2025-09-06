"use client";

import React, { useEffect }  from "react";
import CreateUserForm from "./CreateUserForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";

export default function CreateUserPage() {
    useEffect(() => {
        document.title = "Tambah Users | Admin Panel";
    }, []);
    return (
        <div>
            <PageBreadcrumb pageTitle="Data Users" />
            <div className="space-y-6">
                <ComponentCard title="Form Tambah User">
                    <CreateUserForm />
                </ComponentCard>
            </div>
        </div>
    );
}

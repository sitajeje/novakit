import React from "react";
import { Select, type Option } from "./Select/Select";

export type Tenant = { id: string; name: string };

type TenantSelectProps = {
    tenants: Tenant[];
    selectedTenant: string | null;
    onValueChange: (tenantId: string) => void;
};

export default function TenantSelect ({ tenants, selectedTenant, onValueChange }:TenantSelectProps) {
    const options: Option[] = tenants.map((t, i) => ({
        label: t.name || `Tenant ${i + 1}`,
        value: t.id,
    }));

    return (
        <Select
            options={options}
            value={selectedTenant}
            onValueChange={onValueChange}
            label="Tenants:"
            placeholder="Select a tenant"
        />
    );
};

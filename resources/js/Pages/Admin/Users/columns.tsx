import { ColumnDef } from "@tanstack/react-table"

export type User = {
    id: number
    name: string
    email: string
    role: string
    created_at: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            if (!role) return "-";
            return role.charAt(0).toUpperCase() + role.slice(1);
        },
    },
    {
        accessorKey: "created_at",
        header: "Bergabung Sejak",
        cell: ({ row }) => {
            const rawDate = row.getValue("created_at") as string;
            if (!rawDate) return "-";
            return rawDate.replace("T", " ").substring(0, 16);
        },
    },
]
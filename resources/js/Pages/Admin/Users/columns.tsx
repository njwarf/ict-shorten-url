import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/components/ui/label"

export type User = {
    id: number
    name: string
    email: string
    role: string
    urls_count: number // Menggunakan urls_count yang dikirim oleh Controller withCount('urls')
    created_at: string
}

// Komponen terpisah untuk Aksi agar bisa menggunakan state (Modal & Checkbox)
const ActionCell = ({ user }: { user: User }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // Fungsi untuk mengeksekusi penghapusan data via Laravel Route
    const handleDelete = () => {
        if (isChecked) {
            router.delete(`/admin/users/${user.id}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setIsChecked(false);
                }
            });
        }
    };

    return (
        <div className="flex items-center justify-end gap-2 pr-2">
            {/* Tombol Edit */}
            <Button
                variant="outline"
                size="sm"
                className="h-8 px-2.5 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => {
                    // Mengarahkan ke halaman edit user
                    router.get(`/admin/users/${user.id}/edit`);
                }}
            >
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
            </Button>

            {/* Tombol Hapus dengan Dialog & Checkbox */}
            <Dialog open={isDeleteOpen} onOpenChange={(open) => {
                setIsDeleteOpen(open);
                if (!open) setIsChecked(false); // Reset checkbox saat modal ditutup
            }}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Hapus
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus Pengguna</DialogTitle>
                        <DialogDescription>
                            Apakah kamu yakin ingin menghapus pengguna <span className="font-semibold text-foreground">{user.name}</span>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Checkbox Persetujuan Hapus */}
                    <div className="flex items-center space-x-2 py-4">
                        <Checkbox
                            id={`confirm-delete-${user.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => setIsChecked(checked === true)}
                        />
                        <Label
                            htmlFor={`confirm-delete-${user.id}`}
                            className="text-sm font-medium leading-none cursor-pointer"
                        >
                            Ya, saya yakin ingin menghapus pengguna ini
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteOpen(false);
                                setIsChecked(false);
                            }}
                        >
                            Batal
                        </Button>
                        {/* Tombol Hapus terkunci (disabled) jika checkbox belum dicentang */}
                        <Button
                            variant="destructive"
                            disabled={!isChecked}
                            onClick={handleDelete}
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

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
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            if (!role) return "-";

            const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

            return (
                <Badge variant={role.toLowerCase() === 'admin' ? 'default' : 'secondary'}>
                    {formattedRole}
                </Badge>
            );
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
    {
        accessorKey: "urls_count", // Disesuaikan dengan withCount('urls') dari Laravel
        header: "Total Links",
        cell: ({ row }) => {
            const total = row.getValue("urls_count") as number;
            return <div className="font-medium">{total ?? 0} Link</div>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right pr-12">Aksi</div>,
        cell: ({ row }) => <ActionCell user={row.original} />,
    },
]
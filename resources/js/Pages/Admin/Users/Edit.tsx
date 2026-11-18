import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/app-sidebar";
import { SiteHeader } from "@/Components/site-header";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/components/ui/label";

export default function Edit({ user }: { user: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <Head title="Edit Pengguna" />
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-xl">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Edit Pengguna: {user.name}
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
                                <div>
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                    />
                                    {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                                </div>

                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        value={data.role}
                                        onChange={(e) => setData("role", e.target.value)}
                                        className="w-full border rounded-md p-2 text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="submit" disabled={processing}>
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </form>
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
}
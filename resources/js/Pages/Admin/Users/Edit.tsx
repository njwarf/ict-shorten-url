import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { UserCog, ArrowLeft } from "lucide-react";

export default ({ user }: { user: any }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <UserCog className="size-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                            Edit Pengguna: {user.name}
                        </h2>
                        <p className="text-sm text-slate-500">
                            Perbarui informasi akun dan hak akses pengguna.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Edit User - ${user.name}`} />

            <div className="py-8">
                {/* Menggunakan max-w-full dengan padding horizontal agar melebar penuh satu layar */}
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tombol Kembali */}
                    <div className="mb-4">
                        <Link
                            href="/admin/users"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali ke Daftar Pengguna
                        </Link>
                    </div>

                    {/* Card Form Full Width dengan tema soft blue & white */}
                    <div className="bg-white overflow-hidden shadow-sm border border-blue-100 rounded-2xl p-6 md:p-8 w-full">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Nama */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700 font-medium">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="border-blue-100 focus:border-blue-500 focus:ring-blue-500 rounded-xl w-full"
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 font-medium">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="border-blue-100 focus:border-blue-500 focus:ring-blue-500 rounded-xl w-full"
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-slate-700 font-medium">Hak Akses Role</Label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData("role", e.target.value)}
                                    className="flex h-10 w-full rounded-xl border border-blue-100 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="user">User (Pengguna Biasa)</option>
                                    <option value="admin">Admin (Administrator)</option>
                                </select>
                                {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-900 hover:bg-blue-800 text-white rounded-xl px-6 shadow-sm"
                                >
                                    Simpan Perubahan
                                </Button>
                                <Link
                                    href="/admin/users"
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
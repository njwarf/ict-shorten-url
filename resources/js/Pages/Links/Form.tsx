import { AppSidebar } from "@/Components/app-sidebar";
import { SiteHeader } from "@/Components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useForm } from "@inertiajs/react";

interface Props {
  link?: {
    id: string;
    title: string;
    original_url: string;
    short_code: string;
  };
}

export default function Form({ link }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    title: link?.title ?? "",
    original_url: link?.original_url ?? "",
    short_code: link?.short_code ?? "",
  });
  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (link) {
      put(route("links.update", link.id));
    } else {
      post(route("links.store"));
    }
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="p-6 max-w-xl">
              <h1 className="text-2xl font-bold mb-6">
                {link ? "Edit Link" : "Tambah Link"}
              </h1>

              <form onSubmit={submit}>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Title
                  </label>

                  <input
                    type="text"
                    className="w-full rounded border p-2"
                    placeholder="Masukkan judul"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                  />

                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Original URL
                  </label>

                  <input
                    type="url"
                    className="w-full rounded border p-2"
                    placeholder="https://..."
                    value={data.original_url}
                    onChange={(e) => setData("original_url", e.target.value)}
                  />

                  {errors.original_url && (
                    <p className="text-red-500 text-sm">{errors.original_url}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-medium">
                    Short Code
                  </label>

                  <input
                    type="text"
                    className="w-full rounded border p-2"
                    placeholder="Kosongkan jika ingin generate otomatis"
                    value={data.short_code}
                    onChange={(e) => setData("short_code", e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {processing ? "Menyimpan..." : "Simpan"}
                </button>
              </form>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

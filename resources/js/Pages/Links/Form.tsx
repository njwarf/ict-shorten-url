import {AppSidebar} from "@/Components/app-sidebar";
import {SiteHeader} from "@/Components/site-header";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {useForm, router} from "@inertiajs/react";
import {ArrowLeft, QrCode, RefreshCw, Download, Printer, Palette, Lightbulb, Save} from "lucide-react";
import {Button} from "@/Components/ui/button";
import {Input} from "@/Components/ui/input";

interface Props {
  link?: {
    id: string;
    title: string;
    original_url: string;
    short_code: string;
  };
}

export default function Form({link}: Props) {
  const {data, setData, post, put, processing, errors} = useForm({
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

  function generateShortCode() {
    const characters =
      "abcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setData("short_code", result);
  }

  function handleCancel() {
    router.get("/links");
  }

  const shortUrl = data.short_code
    ? `${window.location.origin}/${data.short_code}`
    : `${window.location.origin}/your-code`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=000000&bgcolor=ffffff&data=${encodeURIComponent(
    shortUrl
  )}`;

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader/>

        <div className="flex flex-1">
          <AppSidebar/>

          <SidebarInset>
            <div className="min-h-full p-6 transition-colors md:p-8">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    size="icon"
                    className={"p-5"}
                  >
                    <ArrowLeft className="h-4 w-4"/>
                  </Button>

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-foreground">
                      Management
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      {link ? "Edit Link" : "Create New Link"}
                    </h1>
                  </div>
                </div>

                <Button
                  type="submit"
                  form="link-form"
                  disabled={processing}
                  className={"px-7 py-5"}
                >
                  <Save className="mr-2 h-4 w-4"/>
                  {processing ? "Saving..." : "Save Link"}
                </Button>
              </div>

              {/* Main Content */}
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
                {/* LEFT */}
                <div className="space-y-6">
                  {/* Link Information */}
                  <div
                    className="rounded-lg border border-border p-5 shadow-sm bg-card">
                    <form id="link-form" onSubmit={submit}>
                      {/* Link Title */}
                      <div className="mb-5">
                        <label className="mb-2 block text-[11px] font-medium ">
                          Link Title
                        </label>

                        <Input
                          type="text"
                          value={data.title}
                          onChange={(e) =>
                            setData("title", e.target.value)
                          }
                          placeholder="Campaign: Summer 2024 Launch"
                        />

                        {errors.title && (
                          <p className="mt-1 text-xs text-destructive">
                            {errors.title}
                          </p>
                        )}
                      </div>

                      {/* Destination URL */}
                      <div className="mb-5">
                        <label className="mb-2 block text-[11px] font-medium">
                          Destination URL
                        </label>

                        <Input
                          type="url"
                          value={data.original_url}
                          onChange={(e) =>
                            setData("original_url", e.target.value)
                          }
                          placeholder="https://example.com/your-long-product-marketing-url"
                        />

                        <p className="mt-1.5 text-[10px] text-muted-foreground">
                          Users will be redirected to this location when
                          visiting your short link.
                        </p>

                        {errors.original_url && (
                          <p className="mt-1 text-xs text-destructive">
                            {errors.original_url}
                          </p>
                        )}
                      </div>

                      {/* Short Code */}
                      <div>
                        <label className="mb-2 block text-[11px] font-medium">
                          Custom Short Code
                        </label>

                        <div className="flex gap-2">
                          <div
                            className="flex flex-1 items-center overflow-hidden rounded-md border border-border bg-card">
                            <span
                              className="whitespace-nowrap px-3 text-xs text-muted-foreground"> http://127.0.0.1:8000
                            </span>

                            <input
                              type="text"
                              value={data.short_code}
                              onChange={(e) =>
                                setData("short_code", e.target.value)
                              }
                              placeholder="summer-sale"
                              className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={generateShortCode}
                            className="flex items-center gap-1.5 rounded-md bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                          >
                            <RefreshCw className="h-3.5 w-3.5"/>
                            Generate
                          </button>
                        </div>

                        <p className="mt-1.5 text-[10px] text-muted-foreground">
                          Leave blank to use a random ID, or enter a custom
                          path (e.g. ict.sh/my-slug).
                        </p>

                        {errors.short_code && (
                          <p className="mt-1 text-xs text-destructive">
                            {errors.short_code}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Advanced Options */}
                  <div
                    className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <h2 className="mb-4 text-sm font-semibold text-foreground">
                      Advanced Options
                    </h2>

                    {/* Password */}
                    <div
                      className="flex items-center justify-between rounded-md bg-muted px-3 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">•••</span>

                        <div>
                          <p className="text-xs font-medium text-foreground">
                            Password Protection
                          </p>

                          <p className="text-[10px] text-muted-foreground">
                            Require a password to access the link
                          </p>
                        </div>
                      </div>

                      <div className="h-4 w-8 rounded-full bg-input p-0.5">
                        <div className="h-3 w-3 rounded-full bg-background shadow-sm"/>
                      </div>
                    </div>

                    {/* Expiration */}
                    <div className="mt-2 flex items-center justify-between rounded-md px-3 py-3 opacity-50">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">◷</span>

                        <div>
                          <p className="text-xs font-medium text-foreground">
                            Link Expiration
                          </p>

                          <p className="text-[10px] text-muted-foreground">
                            Automatically disable after a set date
                          </p>
                        </div>
                      </div>

                      <span className="text-muted-foreground">›</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-5">
                  {/* QR Preview */}
                  <div
                    className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <div
                      className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        QR Code Preview
                      </p>

                      <QrCode className="h-4 w-4 text-muted-foreground"/>
                    </div>

                    <div className="px-5 pb-5 pt-6 text-center">
                      <div className="mx-auto mb-4 flex h-[180px] w-[180px] items-center justify-center">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code Preview"
                          className="h-[170px] w-[170px] object-contain"
                        />
                      </div>

                      <p className="mb-1 text-xs font-medium text-foreground">
                        http://127.0.0.1:8000/{data.short_code || "waiting-for-code"}
                      </p>

                      <p className="mb-4 text-[10px] text-muted-foreground">
                        Scannable and ready to download
                      </p>

                      <button
                        type="button"
                        className="mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                      >
                        <Download className="h-3.5 w-3.5"/>
                        Download QR Code
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-[10px] font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                          <Printer className="h-3 w-3"/>
                          Print Asset
                        </button>

                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-[10px] font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                          <Palette className="h-3 w-3"/>
                          Customize
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div
                    className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <div className="flex gap-3">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"/>

                      <div>
                        <h3 className="mb-2 text-xs font-semibold text-foreground">
                          Pro Tip
                        </h3>

                        <p className="text-[10px] leading-5 text-muted-foreground">
                          Using descriptive short codes (like{" "}
                          <span className="font-medium text-foreground">
                            /summer-sale
                          </span>{" "}
                          ) can increase click-through rates by up to 34%
                          compared to random strings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

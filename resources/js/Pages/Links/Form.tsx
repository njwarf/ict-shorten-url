import { useState } from "react"
import { Head, Link, useForm } from "@inertiajs/react"
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  Lightbulb,
  Lock,
  QrCode,
  RefreshCw,
  Save,
  Timer,
} from "lucide-react"

import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"
import {
  SidebarInset,
  SidebarProvider,
} from "@/Components/ui/sidebar"
import type { LinkFormProps } from "./types"

export default function Form({ link }: LinkFormProps) {
  const isEditing = Boolean(link)

  const { data, setData, post, put, processing, errors } = useForm({
    title: link?.title ?? "",
    original_url: link?.original_url ?? "",
    short_code: link?.short_code ?? "",
  })

  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()

    if (link) {
      put(route("links.update", link.id))
    } else {
      post(route("links.store"))
    }
  }

  function generateShortCode() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setData("short_code", result)
  }

  const origin = typeof window !== "undefined" ? window.location.origin : ""
  const displayCode = data.short_code || "your-code"
  const shortUrl = `${origin}/${displayCode}`

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=000000&bgcolor=ffffff&data=${encodeURIComponent(
    shortUrl
  )}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadQr = async () => {
    setDownloading(true)
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-${data.short_code || "shortlink"}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch {
      window.open(qrCodeUrl, "_blank")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Head title={isEditing ? `Edit - ${link?.title}` : "Create New Link"} />

      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              {/* PAGE HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" asChild className="size-8">
                    <Link href="/links">
                      <ArrowLeft className="size-4" />
                      <span className="sr-only">Back to Links</span>
                    </Link>
                  </Button>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      {isEditing ? "Edit Link" : "Create New Link"}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      {isEditing
                        ? "Update destination URL and link details."
                        : "Configure your target URL and customize short slug."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/links">Cancel</Link>
                  </Button>

                  <Button
                    type="submit"
                    form="link-form"
                    disabled={processing}
                    size="sm"
                    className="gap-1.5"
                  >
                    <Save className="size-4" />
                    <span>{processing ? "Saving..." : "Save Link"}</span>
                  </Button>
                </div>
              </div>

              {/* MAIN CONTENT GRID */}
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
                {/* LEFT: FORM FIELDS */}
                <div className="flex flex-col gap-6">
                  <Card>
                    <CardHeader className="border-b pb-3">
                      <CardTitle className="text-sm font-semibold">
                        Link Information
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Enter the title, original destination, and custom code.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-5">
                      <form id="link-form" onSubmit={submit}>
                        <FieldGroup>
                          {/* LINK TITLE */}
                          <Field data-invalid={!!errors.title}>
                            <FieldLabel htmlFor="title" className="text-xs font-medium">
                              Link Title
                            </FieldLabel>
                            <Input
                              id="title"
                              type="text"
                              value={data.title}
                              onChange={(e) => setData("title", e.target.value)}
                              placeholder="e.g. Summer Sale 2026 Promo"
                              aria-invalid={!!errors.title}
                              className="h-9 text-xs"
                            />
                            <FieldDescription>
                              An internal name to easily recognize this link on your dashboard.
                            </FieldDescription>
                            {errors.title && <FieldError>{errors.title}</FieldError>}
                          </Field>

                          {/* DESTINATION URL */}
                          <Field data-invalid={!!errors.original_url}>
                            <FieldLabel
                              htmlFor="original_url"
                              className="text-xs font-medium"
                            >
                              Destination URL
                            </FieldLabel>
                            <Input
                              id="original_url"
                              type="url"
                              value={data.original_url}
                              onChange={(e) =>
                                setData("original_url", e.target.value)
                              }
                              placeholder="https://example.com/long-product-campaign-url"
                              aria-invalid={!!errors.original_url}
                              className="h-9 text-xs"
                            />
                            <FieldDescription>
                              Visitors will be immediately redirected to this URL upon clicking.
                            </FieldDescription>
                            {errors.original_url && (
                              <FieldError>{errors.original_url}</FieldError>
                            )}
                          </Field>

                          {/* SHORT CODE */}
                          <Field data-invalid={!!errors.short_code}>
                            <FieldLabel
                              htmlFor="short_code"
                              className="text-xs font-medium"
                            >
                              Custom Short Code
                            </FieldLabel>

                            <div className="flex flex-col gap-2 sm:flex-row">
                              <div className="flex flex-1 items-center overflow-hidden rounded-md border border-input bg-input/20 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
                                <span className="flex h-9 items-center border-r border-input bg-muted/40 px-3 font-mono text-xs text-muted-foreground select-none">
                                  {origin}/
                                </span>
                                <input
                                  id="short_code"
                                  type="text"
                                  value={data.short_code}
                                  onChange={(e) =>
                                    setData(
                                      "short_code",
                                      e.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9-_]/g, "")
                                    )
                                  }
                                  placeholder="custom-slug"
                                  aria-invalid={!!errors.short_code}
                                  className="h-9 min-w-0 flex-1 border-0 bg-transparent px-3 text-xs font-mono text-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
                                />
                              </div>

                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={generateShortCode}
                                className="h-9 shrink-0 gap-1.5 text-xs"
                              >
                                <RefreshCw className="size-3.5" />
                                <span>Generate</span>
                              </Button>
                            </div>

                            <FieldDescription>
                              Leave blank to generate a random 6-character code, or enter your own slug.
                            </FieldDescription>
                            {errors.short_code && (
                              <FieldError>{errors.short_code}</FieldError>
                            )}
                          </Field>
                        </FieldGroup>
                      </form>
                    </CardContent>
                  </Card>

                  {/* ADVANCED SETTINGS */}
                  <Card>
                    <CardHeader className="border-b pb-3">
                      <CardTitle className="text-sm font-semibold">
                        Advanced Settings
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Optional security and lifecycle configurations.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3 pt-4">
                      {/* PASSWORD PROTECTION */}
                      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Lock className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              Password Protection
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              Require visitors to provide a password before redirection.
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Coming Soon
                        </span>
                      </div>

                      {/* EXPIRATION DATE */}
                      <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Timer className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              Link Expiration
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              Automatically disable redirect after a chosen date.
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Coming Soon
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* RIGHT: QR PREVIEW & TIPS */}
                <div className="flex flex-col gap-6">
                  {/* QR PREVIEW CARD */}
                  <Card>
                    <CardHeader className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm font-semibold">
                            QR Code Preview
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Live scannable asset for your link
                          </CardDescription>
                        </div>
                        <QrCode className="size-4 text-muted-foreground" />
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
                      <div className="rounded-xl border border-border bg-white p-3 shadow-xs">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code"
                          className="size-44 object-contain"
                        />
                      </div>

                      <div className="w-full">
                        <p className="truncate text-xs font-medium text-foreground">
                          {shortUrl}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          Scans will route straight to your target URL.
                        </p>
                      </div>

                      <div className="flex w-full flex-col gap-2">
                        <Button
                          type="button"
                          onClick={handleDownloadQr}
                          disabled={downloading}
                          size="sm"
                          className="w-full gap-2 text-xs"
                        >
                          <Download className="size-3.5" />
                          <span>{downloading ? "Downloading..." : "Download QR Code"}</span>
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className="gap-1.5 text-xs"
                          >
                            {copied ? (
                              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                            <span>{copied ? "Copied!" : "Copy URL"}</span>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            asChild
                            className="gap-1.5 text-xs"
                          >
                            <a
                              href={shortUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="size-3.5" />
                              <span>Visit</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PRO TIP CARD */}
                  <Card className="bg-muted/30">
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Lightbulb className="size-4" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-foreground">
                          Pro Tip
                        </p>
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          Custom slugs like{" "}
                          <span className="font-mono font-medium text-foreground">
                            /summer-sale
                          </span>{" "}
                          yield up to 34% higher click-through rates compared to random characters.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

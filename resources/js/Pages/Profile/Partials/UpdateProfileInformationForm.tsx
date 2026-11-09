import { type FormEventHandler } from "react"
import { Link, useForm, usePage } from "@inertiajs/react"
import { Check, CheckCircle2, Save, User as UserIcon } from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import type { PageProps } from "@/types"

interface Props {
  mustVerifyEmail: boolean
  status?: string
  className?: string
}

export default function UpdateProfileInformationForm({
  mustVerifyEmail,
  status,
  className = "",
}: Props) {
  const user = usePage<PageProps>().props.auth.user!

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    patch(route("profile.update"))
  }

  return (
    <Card className={className}>
      <CardHeader className="border-b pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <UserIcon className="size-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">
              Profile Information
            </CardTitle>
            <CardDescription className="text-xs">
              Update your account's display name and primary email address.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={submit}>
        <CardContent className="pt-5">
          <FieldGroup>
            {/* NAME */}
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name" className="text-xs font-medium">
                Full Name
              </FieldLabel>
              <Input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={!!errors.name}
                className="h-9 text-xs"
              />
              <FieldDescription>
                This name will be displayed across your shortened links and account profile.
              </FieldDescription>
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            {/* EMAIL */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email" className="text-xs font-medium">
                Email Address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                autoComplete="username"
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
                className="h-9 text-xs"
              />
              <FieldDescription>
                Used for account notifications and password recovery.
              </FieldDescription>
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            {/* EMAIL VERIFICATION NOTICE */}
            {mustVerifyEmail && user.email_verified_at === null && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-900 dark:text-amber-200">
                <p>
                  Your email address is currently unverified.{" "}
                  <Link
                    href={route("verification.send")}
                    method="post"
                    as="button"
                    className="font-medium underline underline-offset-2 hover:text-amber-950 dark:hover:text-amber-100"
                  >
                    Click here to re-send the verification email.
                  </Link>
                </p>

                {status === "verification-link-sent" && (
                  <p className="mt-2 flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    <span>A new verification link has been sent to your email address.</span>
                  </p>
                )}
              </div>
            )}
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
          <div className="flex items-center gap-2">
            {recentlySuccessful && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="size-3.5" />
                <span>Profile saved</span>
              </span>
            )}
          </div>

          <Button type="submit" disabled={processing} size="sm" className="gap-1.5">
            <Save className="size-3.5" />
            <span>{processing ? "Saving..." : "Save Changes"}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

import { type FormEventHandler, useRef } from "react"
import { useForm } from "@inertiajs/react"
import { Check, KeyRound, Save } from "lucide-react"

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

interface Props {
  className?: string
}

export default function UpdatePasswordForm({ className = "" }: Props) {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)

  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful,
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault()

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation")
          passwordInput.current?.focus()
        }

        if (errors.current_password) {
          reset("current_password")
          currentPasswordInput.current?.focus()
        }
      },
    })
  }

  return (
    <Card className={className}>
      <CardHeader className="border-b pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <KeyRound className="size-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">
              Update Password
            </CardTitle>
            <CardDescription className="text-xs">
              Ensure your account uses a strong, random password to maintain security.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={updatePassword}>
        <CardContent className="pt-5">
          <FieldGroup>
            {/* CURRENT PASSWORD */}
            <Field data-invalid={!!errors.current_password}>
              <FieldLabel
                htmlFor="current_password"
                className="text-xs font-medium"
              >
                Current Password
              </FieldLabel>
              <Input
                id="current_password"
                ref={currentPasswordInput}
                type="password"
                value={data.current_password}
                onChange={(e) => setData("current_password", e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.current_password}
                className="h-9 text-xs"
              />
              <FieldDescription>
                Provide your current password for security verification.
              </FieldDescription>
              {errors.current_password && (
                <FieldError>{errors.current_password}</FieldError>
              )}
            </Field>

            {/* NEW PASSWORD */}
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password" className="text-xs font-medium">
                New Password
              </FieldLabel>
              <Input
                id="password"
                ref={passwordInput}
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className="h-9 text-xs"
              />
              <FieldDescription>
                Must be at least 8 characters with a mix of letters and numbers.
              </FieldDescription>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            {/* CONFIRM PASSWORD */}
            <Field data-invalid={!!errors.password_confirmation}>
              <FieldLabel
                htmlFor="password_confirmation"
                className="text-xs font-medium"
              >
                Confirm New Password
              </FieldLabel>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password_confirmation}
                className="h-9 text-xs"
              />
              <FieldDescription>
                Re-type your new password to verify accuracy.
              </FieldDescription>
              {errors.password_confirmation && (
                <FieldError>{errors.password_confirmation}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
          <div className="flex items-center gap-2">
            {recentlySuccessful && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Check className="size-3.5" />
                <span>Password updated</span>
              </span>
            )}
          </div>

          <Button type="submit" disabled={processing} size="sm" className="gap-1.5">
            <Save className="size-3.5" />
            <span>{processing ? "Saving..." : "Update Password"}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

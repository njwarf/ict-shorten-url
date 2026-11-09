import { type FormEventHandler, useRef, useState } from "react"
import { useForm } from "@inertiajs/react"
import { AlertTriangle, Trash2 } from "lucide-react"

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"

interface Props {
  className?: string
}

export default function DeleteUserForm({ className = "" }: Props) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
  const passwordInput = useRef<HTMLInputElement>(null)

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: "",
  })

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true)
  }

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault()

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    })
  }

  const closeModal = () => {
    setConfirmingUserDeletion(false)
    clearErrors()
    reset()
  }

  return (
    <>
      <Card className={`border-destructive/30 ${className}`}>
        <CardHeader className="border-b border-destructive/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <AlertTriangle className="size-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-destructive">
                Delete Account
              </CardTitle>
              <CardDescription className="text-xs">
                Permanently delete your account and all associated URLs and logs.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Once your account is deleted, all resources and data will be permanently wiped.
            Before proceeding, please ensure you have saved or redirected any important URLs.
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-end border-t border-destructive/10 px-6 py-3">
          <Button
            variant="destructive"
            size="sm"
            onClick={confirmUserDeletion}
            className="gap-1.5"
          >
            <Trash2 className="size-3.5" />
            <span>Delete Account</span>
          </Button>
        </CardFooter>
      </Card>

      {/* CONFIRMATION DIALOG */}
      <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-4" />
              <span>Are you absolutely sure?</span>
            </DialogTitle>
            <DialogDescription className="text-xs">
              This action cannot be undone. Please enter your password to confirm that
              you would like to permanently delete your account.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={deleteUser}>
            <div className="py-3">
              <FieldGroup>
                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="delete-password" className="text-xs font-medium">
                    Confirm with Password
                  </FieldLabel>
                  <Input
                    id="delete-password"
                    type="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    className="h-9 text-xs"
                    autoFocus
                  />
                  {errors.password && <FieldError>{errors.password}</FieldError>}
                </Field>
              </FieldGroup>
            </div>

            <DialogFooter className="mt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={closeModal}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="destructive"
                size="sm"
                disabled={processing}
              >
                {processing ? "Deleting..." : "Permanently Delete"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

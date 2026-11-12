import umtLogo from "@/Components/umt-logo.svg"
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Checkbox } from "@/Components/ui/checkbox";

import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/Components/ui/input";

export default function Login({
  status,
  error,
}: {
  status?: string;
  error?: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <>
      <Head title="Masuk" />

      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Masuk ke akun Anda</CardTitle>

                <CardDescription>
                  Masukkan email dan kata sandi untuk masuk ke akun Anda
                </CardDescription>
              </CardHeader>

              <CardContent>
                {status && (
                  <div className="mb-4 text-sm text-green-600">
                    {status}
                  </div>
                )}

                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={submit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="email">
                        Email
                      </FieldLabel>

                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) =>
                          setData("email", e.target.value)
                        }
                      />

                      {errors.email && (
                        <FieldError>
                          {errors.email}
                        </FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="password">
                        Kata Sandi
                      </FieldLabel>

                      <Input
                        id="password"
                        type="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) =>
                          setData("password", e.target.value)
                        }
                      />

                      {errors.password && (
                        <FieldError>
                          {errors.password}
                        </FieldError>
                      )}
                    </Field>

                    <Field>
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={data.remember}
                          onCheckedChange={(checked) =>
                            setData("remember", checked === true)
                          }
                        />

                        Ingat saya
                      </label>
                    </Field>

                    <Field>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                      >
                        {processing ? "Sedang masuk..." : "Masuk"}
                      </Button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center text-xs">
                          <span className="bg-card px-2 text-muted-foreground">
                            Atau masuk dengan
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        className="w-full text-white hover:opacity-90"
                        style={{ backgroundColor: "#3a57e8" }}
                        onClick={() => {
                          window.location.href = route("sso.redirect");
                        }}
                      >
                        <span>Masuk dengan</span>
                        <img
                          src={umtLogo}
                          alt="Logo UMTAS"
                          className="h-15 w-15 object-contain"
                        />
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

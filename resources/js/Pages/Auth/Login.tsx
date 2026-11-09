import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Checkbox } from "@/Components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Login({
  status,
  error,
  canResetPassword,
}: {
  status?: string;
  error?: string;
  canResetPassword: boolean;
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
      <Head title="Log in" />

      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Login to your account
                </CardTitle>

                <CardDescription>
                  Enter your email below to login to your
                  account
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
                        placeholder="m@example.com"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) =>
                          setData(
                            "email",
                            e.target.value
                          )
                        }
                      />

                      {errors.email && (
                        <FieldError>
                          {errors.email}
                        </FieldError>
                      )}
                    </Field>

                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">
                          Password
                        </FieldLabel>

                        {canResetPassword && (
                          <Link
                            href={route(
                              "password.request"
                            )}
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        )}
                      </div>

                      <Input
                        id="password"
                        type="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) =>
                          setData(
                            "password",
                            e.target.value
                          )
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

                        Remember me
                      </label>
                    </Field>
                    <Field>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                      >
                        {processing ? "Logging in..." : "Login"}
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
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.location.href = route("sso.redirect");
                        }}
                      >
                        Login via SSO UMTAS
                      </Button>

                      <FieldDescription className="text-center">
                        Don't have an account?{" "}
                        <Link
                          href={route("register")}
                          className="underline underline-offset-4"
                        >
                          Sign up
                        </Link>
                      </FieldDescription>
                    </Field>

                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div >
    </>
  );
}

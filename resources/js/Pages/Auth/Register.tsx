import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

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

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Create your account
                                </CardTitle>

                                <CardDescription>
                                    Enter your information below to register
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={submit}>
                                    <FieldGroup>

                                        <Field>
                                            <FieldLabel htmlFor="name">
                                                Name
                                            </FieldLabel>

                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                autoComplete="name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            {errors.name && (
                                                <FieldError>
                                                    {errors.name}
                                                </FieldError>
                                            )}
                                        </Field>

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
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>

                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                autoComplete="new-password"
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
                                            <FieldLabel htmlFor="password_confirmation">
                                                Confirm Password
                                            </FieldLabel>

                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            {errors.password_confirmation && (
                                                <FieldError>
                                                    {errors.password_confirmation}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? "Registering..."
                                                    : "Register"}
                                            </Button>

                                            <FieldDescription className="text-center">
                                                Already have an account?{" "}
                                                <Link
                                                    href={route("login")}
                                                    className="underline underline-offset-4"
                                                >
                                                    Login
                                                </Link>
                                            </FieldDescription>
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

"use client";
import { logIn, useUser } from "@/api/users";
import { EyeClosedIcon, EyeOpenedIcon } from "@/components/Shared/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useUser();
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();
  const logInMutation = useMutation({
    mutationFn: logIn,
  });

  const onSubmit = (values: FormValues) => {
    logInMutation.mutateAsync({ ...values, staySignedIn: true }).then((r) => {
      if (r.status === 200) {
        setToken(r.data.token);
      } else if (r.status === 400) {
        for (let error of r.data) {
          form.setError(error.propertyName as "email" | "password", {
            message: error.errorMessage,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      router.push("/admin/categories");
    }
  }, [user, router]);

  return (
    <main className="h-screen grid place-items-center">
      <div className="max-w-md w-full flex flex-col items-center gap-[13vh]">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl lg:text-4xl font-semibold">
            Welcome to admin panel
          </h1>
          <p className="text-lg lg:text-2xl">Login into your account</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
            id="admin-login-form"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="relative">
                    <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute top-0 bottom-0 right-6"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                    </button>
                  </div>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
            {!!user && !user.isAdmin && (
              <FormMessage className="px-4">
                You don&apos;t have privileges to use admin panel
              </FormMessage>
            )}
          </form>
        </Form>
        <Button
          type="submit"
          form="admin-login-form"
          className="w-full"
          disabled={logInMutation.isPending}
        >
          Log in
        </Button>
      </div>
    </main>
  );
}

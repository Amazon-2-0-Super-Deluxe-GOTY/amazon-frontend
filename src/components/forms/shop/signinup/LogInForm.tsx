"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "@/api/users";

const FormSchema = z.object({
  email: z.string().email({
    message: "Wrong or Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
  staySignedIn: z.boolean(),
});

export function LogInForm({
  onSubmit,
  onRestorePassword,
}: {
  onSubmit: (token: string) => void;
  onRestorePassword: () => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      staySignedIn: false,
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const logInMutations = useMutation({
    mutationFn: logIn,
  });

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    logInMutations.mutateAsync(values).then((res) => {
      if (res.status === 200) {
        onSubmit(res.data.token);
      } else if (res.status === 400) {
        for (let error of res.data) {
          form.setError(error.propertyName as "email" | "password", {
            message: error.errorMessage,
          });
        }
      } else if (res.status === 404) {
        form.setError("email", { message: res.message });
      } else if (res.status === 403) {
        form.setError("email", { message: "This account was deleted" });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="space-y-6 flex flex-col justify-center h-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-background p-0.5">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="text"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="max-md:text-xs px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-background p-0.5">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute top-0 bottom-0 right-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
                <FormMessage className="max-md:text-xs px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="staySignedIn"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center gap-1 -mt-6">
                  <div className="flex gap-1">
                    <FormControl>
                      <Checkbox
                        id="idStaySignIn"
                        {...field}
                        value={field.value.toString()}
                        checked={field.value}
                        onCheckedChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="idStaySignIn"
                      className="text-sm max-md:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Stay signed in
                    </FormLabel>
                  </div>
                  <div>
                    <Button
                      variant={"link"}
                      type="button"
                      className="text-xs p-0"
                      onClick={onRestorePassword}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={logInMutations.isPending}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
}

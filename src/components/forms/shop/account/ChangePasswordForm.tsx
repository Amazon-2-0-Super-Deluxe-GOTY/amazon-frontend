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
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/users";
import { EyeClosedIcon, EyeOpenedIcon } from "@/components/Shared/Icons";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const FormSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "This field is necessary to continue!",
    }),
    newPassword: z.string().refine((value) => passwordRegex.test(value), {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Passwords must match",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ChangePasswordForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    updateUserMutation.mutateAsync(data).then((res) => {
      if (res.status === 200) {
        onSubmit();
      } else if (res.status === 400) {
        // dumb case that is not validation error for some reason
        if (res.data === null) {
          return form.setError("oldPassword", {
            message: (res as { message: string }).message,
          });
        }

        for (let error of res.data) {
          form.setError(error.propertyName as "oldPassword" | "newPassword", {
            message: error.errorMessage,
          });
        }
      }
    });
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full h-full flex flex-col justify-between gap-6"
      >
        <div className="flex flex-col justify-center h-full gap-5">
          <div className="flex flex-col justify-center gap-3">
            <span className="text-xl md:text-2xl font-medium mb-3">
              Enter password
            </span>
            <Separator />
            <span className="text-sm md:text-base">
              Firstly, enter your current password to confirm this is you.
            </span>
          </div>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 bg-background p-0.5">
                    Password
                  </FormLabel>
                  <div className="flex justify-end">
                    <FormControl>
                      <Input
                        placeholder="Enter current password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant={"tertiary"}
                      type="button"
                      className="absolute h-[36px] mt-[2px] mr-[1px] max-md:px-6 max-md:mr-0.5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                </div>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col justify-center h-full gap-5">
          <div className="flex flex-col justify-center gap-3">
            <span className="text-xl md:text-2xl font-medium mb-3">
              Change password
            </span>
            <Separator />
            <span className="text-sm md:text-base">
              Enter new password for your account.
            </span>
          </div>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 bg-background p-0.5">
                    New password
                  </FormLabel>
                  <div className="flex justify-end">
                    <FormControl>
                      <Input
                        placeholder="Create your password"
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant={"tertiary"}
                      type="button"
                      className="absolute h-[36px] mt-[2px] mr-[1px] max-md:px-6 max-md:mr-0.5"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                </div>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 bg-background p-0.5">
                    Confirm password
                  </FormLabel>
                  <div className="flex justify-end">
                    <FormControl>
                      <Input
                        placeholder="Repeat your password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="repeat-password"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant={"tertiary"}
                      type="button"
                      className="absolute h-[36px] mt-[2px] mr-[1px] max-md:px-6 max-md:mr-0.5"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                </div>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <Button
            type="reset"
            variant={"secondary"}
            className="w-full"
            onClick={onCancel}
            disabled={updateUserMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={updateUserMutation.isPending}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}

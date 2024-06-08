"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const FormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "This field is necessary to continue!",
  }),
  newPassword: z.string().refine((value) => passwordRegex.test(value), {
    message:
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Passwords must match",
  }),
}).refine((data => data.newPassword === data.confirmPassword), {
  message: "Passwords do not match",
  path: ['confirmPassword'],
});

export function ChangePasswordForm({
  onCancel,
} : {
  onCancel: () => void;
}) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-between gap-6">
        <div className="flex flex-col justify-center h-full gap-5">
          <div className="flex flex-col justify-center gap-3">
            <span className="text-xl md:text-2xl font-medium mb-3">Enter password</span>
            <Separator />
            <span className="text-sm md:text-base">Firstly, enter your current password to confirm this is you.</span>
          </div>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">Password</FormLabel>
                  <div className="flex justify-end">
                    <FormControl>
                      <Input placeholder="Enter current password" type={showPassword ? "text" : "password"} autoComplete="current-password" {...field} />
                    </FormControl>
                    <Button variant={"ghost"} type="button" className="absolute" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeIcon/> : <EyeOffIcon/> }
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
            <span className="text-xl md:text-2xl font-medium mb-3">Change password</span>
            <Separator />
            <span className="text-sm md:text-base">Enter new password for your account.</span>
          </div>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                    New password
                  </FormLabel>
                  <div className="flex justify-end">
                    <FormControl>
                      <Input placeholder="Create your password" type={showNewPassword ? "text" : "password"} autoComplete="new-password" {...field} />
                    </FormControl>
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="absolute"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeIcon /> : <EyeOffIcon />}
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
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                    Confirm password
                  </FormLabel>
                  <div className="flex justify-end">
                    <FormControl>
                      <Input placeholder="Repeat your password" type={showConfirmPassword ? "text" : "password"} autoComplete="repeat-password" {...field} />
                    </FormControl>
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="absolute"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </div>
                </div>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <Button type="reset" variant={"outline"} className="w-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  )
}

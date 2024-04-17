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

const FormSchema = z.object({
  email: z.string().min(6, {
    message: "Wrong or Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Your password is incorrect",
  }),
})

export function LogInForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">Password</FormLabel>
                <div className="flex justify-end">
                  <FormControl>
                    <Input placeholder="Enter your password" type={showPassword ? "text" : "password"} {...field} />
                  </FormControl>
                  <Button variant={"ghost"} type="button" className="absolute" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon/> : <EyeOffIcon/> }
                  </Button>
                </div>
                <div className="w-full flex justify-end p-0">
                  <Button variant={"link"} type="button" className="text-xs p-0">Forgot password?</Button>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Log in</Button>
      </form>
    </Form>
  )
}

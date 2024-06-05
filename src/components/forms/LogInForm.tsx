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
import { Checkbox } from "@/components/ui/checkbox"

const FormSchema = z.object({
  email: z.string().email({
    message: "Wrong or Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
  staySignedIn: z.boolean()
})

export function LogInForm({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      staySignedIn: false,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex flex-col justify-center h-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="text" autoComplete="email" {...field} />
                </FormControl>
              </div>
              <FormMessage className="max-md:text-xs" />
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
                    <Input placeholder="Enter your password" type={showPassword ? "text" : "password"} autoComplete="current-password" {...field} />
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
                      onCheckedChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormLabel htmlFor="idStaySignIn" className="text-sm max-md:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >Stay signed in</FormLabel>
                </div>
                <div>
                  <Button variant={"link"} type="button" className="text-xs p-0" onClick={() => changeModal("restore-password")}>Forgot password?</Button>
                </div>
              </div>
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" className="w-full">Log in</Button>
      </form>
    </Form>
  )
}

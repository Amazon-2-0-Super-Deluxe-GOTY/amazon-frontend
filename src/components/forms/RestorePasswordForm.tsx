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

const FormSchema = z.object({
  email: z.string().email({
    message: "Wrong or Invalid email address",
  }),
});

export function RestorePasswordForm({
  changeModal,
}: {
  changeModal: (modal: string) => void;
}) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));

    changeModal("reset-password");
  }

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
        </div>
        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  )
}

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
import type { SignInUpModalVariants } from "../SignInUpModal/types";

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
});

export function SignUpFirstLastNameForm({
  onChangeModal,
}: {
  onChangeModal: (modal: SignInUpModalVariants) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("SignUpFirstLastName :: You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));

    onChangeModal("successful-registration");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="space-y-6 flex flex-col justify-center h-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      type="text"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      type="text"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
    </Form>
  );
}

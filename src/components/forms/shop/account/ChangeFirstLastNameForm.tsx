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

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
});

export function ChangeFirstLastNameForm({
  onCancel,
}: {
  onCancel: () => void;
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

    console.log(
      "ChangeFirstLastNameForm :: You submitted the following values:"
    );
    console.log(JSON.stringify(data, null, 2));
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
                      placeholder="Enter new first name"
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
                      placeholder="Enter new last name"
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
        <div className="flex justify-between items-center gap-3 mt-6">
          <Button
            type="reset"
            variant={"secondary"}
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/users";

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
  onSubmit,
  defaultValues,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  defaultValues: z.infer<typeof FormSchema>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const updateUserMutation = useMutation({ mutationFn: updateUser });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    updateUserMutation.mutateAsync(data).then((res) => {
      if (res.status === 200) {
        onSubmit();
      } else if (res.status === 400) {
        for (let error of res.data) {
          form.setError(error.propertyName as "firstName" | "lastName", {
            message: error.errorMessage,
          });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
            variant={"outline"}
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

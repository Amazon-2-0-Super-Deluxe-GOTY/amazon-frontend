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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllIcons } from "@/lib/categories";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { InfoIcon } from "lucide-react";
import type { Category } from "@/api/categories";

const formSchema = z.object({
  iconId: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(1, {
      message: "Description must be at least 1 character.",
    })
    .max(300, {
      message: "Description must be less than 300 characters.",
    }),
  status: z.enum(["active", "inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  category: Category;
  // allCategories: Category[];
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

export function CategoryPrimaryForm({ category, onSubmit, onCancel }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      iconId: category.iconId,
      name: category.title,
      description: category.description,
      status: category.isDeleted ? "inactive" : "active",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grow flex flex-col gap-6"
      >
        <fieldset className="flex items-center gap-6">
          {!!category.iconId && (
            <FormField
              control={form.control}
              name="iconId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Icon</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="gap-3.5 p-0 border-none w-max h-max">
                        <div className="p-3 border-2 rounded-sm">
                          <SelectValue className="border-2" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="w-max min-w-max">
                        <div className="grid grid-cols-9 gap-2 p-4">
                          {getAllIcons().map((icon) => (
                            <SelectItem
                              value={icon.id}
                              key={icon.id}
                              className="w-max p-2 data-[state=checked]:ring-1 ring-black"
                              showCheck={false}
                            >
                              {icon.render("w-8 h-8")}
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription hidden>
                    Icon displayed for category
                  </FormDescription>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="absolute left-3 -top-0.5 font-light bg-white p-0.5">
                  Category name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormDescription hidden>
                  This is category public display name.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Category description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe a category"
                    className="resize-none min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="absolute right-3 -bottom-2.5 mt-0 font-light bg-white p-0.5">
                  {field.value.length}/300
                </FormDescription>
              </div>
              <FormMessage className="px-4" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="relative flex items-center justify-between">
              <FormLabel className="text-xl font-semibold">Status</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  className="gap-3.5"
                  onValueChange={(value) => value && field.onChange(value)}
                  {...field}
                >
                  <ToggleGroupItem value="active">Active</ToggleGroupItem>
                  <ToggleGroupItem value="inactive">Not active</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormDescription hidden>Active or inactive</FormDescription>
              <FormMessage className="px-4" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Role</p>
          <div className="flex items-center gap-3.5">
            <p className="text-lg">
              {category.parentId ? "Child category" : "Parent category"}
            </p>
            <Popover>
              <PopoverTrigger className="group">
                <InfoIcon className="w-6 h-6 group-data-[state=closed]:stroke-gray-400" />
              </PopoverTrigger>
              <PopoverContent align="end" className="max-w-sm w-full">
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold">Parent category</p>
                    <p>
                      This is the main section of goods or services on the
                      marketplace, for example, &quot;Electronics&quot;,
                      &quot;Clothing&quot;.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Subcategory</p>
                    <p>
                      This is a more specific part of the parent category, for
                      example, &quot;Smartphones&quot; in the category
                      &quot;Electronics&quot;.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-auto ml-auto space-x-3.5 pt-14">
          <Button type="reset" variant={"secondary"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}

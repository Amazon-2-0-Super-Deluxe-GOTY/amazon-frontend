"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useEffect, useMemo, useState } from "react";
import { type TreeNodeType, treeToArray } from "@/lib/checkboxTree";
import { getAllIcons } from "@/lib/categories";
import { Separator } from "../ui/separator";
import { MinusIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import clsx from "clsx";
import type { Category } from "@/api/categories";
import { CategorySelect } from "../Admin/Category/CategorySelect";

const formSchema = z
  .object({
    // just helper field
    isRoot: z.boolean().optional(),
    iconId: z.string().optional(),
    parentId: z.string().optional(),
    name: z.string().min(1, {
      message: "Category name must not be empty.",
    }),
    description: z
      .string()
      .min(1, {
        message: "Category description must not be empty.",
      })
      .max(300, {
        message: "Category description must not be more than 300 characters.",
      }),
    status: z.enum(["active", "inactive"]),
    options: z.array(
      z.object({
        title: z.string().min(1, {
          message: "Option must not be empty.",
        }),
        appearance: z.enum(["tiles", "rows"]),
      })
    ),
  })
  .superRefine((values, ctx) => {
    if (values.isRoot && !values.iconId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please, select icon",
        path: ["iconId"],
      });
    } else if (!values.isRoot && !values.parentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please, select parentCategory",
        path: ["parentId"],
      });
    }
  });

const optionFormSchema = z.object({
  title: z.string().min(1, {
    message: "Option name must not be empty.",
  }),
  appearance: z.enum(["tiles", "rows"]),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  isRoot: boolean;
  defaultRootId?: string;
  allCategories: Category[];
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

export const CreateCategoryForm = ({
  onSubmit,
  onCancel,
  isRoot,
  defaultRootId,
  allCategories,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isRoot,
      name: "",
      description: "",
      parentId: defaultRootId,
      status: "active",
      iconId: "shirt",
    },
  });
  const optionForm = useForm<z.infer<typeof optionFormSchema>>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: {
      title: "",
      appearance: "tiles",
    },
  });
  const optionsArray = useFieldArray({
    name: "options",
    control: form.control,
  });

  const [selectedRootId, setSelectedRootId] = useState(defaultRootId);

  useEffect(() => {
    setSelectedRootId(defaultRootId);
  }, [defaultRootId]);

  const handleSubmit = (values: FormValues) => {
    // for some reason form methods doesn't reset fields, so just form the object manually
    const cleanValues = isRoot
      ? {
          name: values.name,
          description: values.description,
          status: values.status,
          options: values.options,
          iconId: values.iconId,
        }
      : {
          name: values.name,
          description: values.description,
          status: values.status,
          options: values.options,
          parentId: values.parentId,
        };
    onSubmit(cleanValues);
  };

  const onCreateOption = (value: z.infer<typeof optionFormSchema>) => {
    if (optionsArray.fields.some((v) => v.title === value.title)) {
      return optionForm.setError(
        "title",
        {
          type: "duplicate",
          message: "Option with this name already exist",
        },
        { shouldFocus: true }
      );
    }
    optionsArray.append(value);
    optionForm.reset({ title: "", appearance: "tiles" });
  };

  const onDeleteOption = (index: number) => () => {
    optionsArray.remove(index);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-6" id="info">
          <div className="space-y-3.5">
            <h2 className="text-3xl font-semibold">
              {isRoot ? "Create category" : "Create subcategory"}
            </h2>
            <Separator />
          </div>
          <fieldset className="flex items-center gap-6">
            {isRoot && (
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
          {!isRoot && (
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                    Parent category
                  </FormLabel>
                  <FormControl>
                    <CategorySelect
                      categories={allCategories}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    This is parent category of subcategory.
                  </FormDescription>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
          )}
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
                    <ToggleGroupItem value="inactive">
                      Not active
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormDescription hidden>Active or inactive</FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          {/* <div className="pt-2">
            <Separator />
          </div> */}
        </div>

        {/* <div className="space-y-6" id="options">
          <div className="space-y-3.5">
            <h2 className="text-3xl font-semibold">Option configuration</h2>
            <Separator />
          </div>
          <div className="flex flex-col gap-4 px-1">
            <FormField
              control={optionForm.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="absolute left-3 -top-0.5 font-light bg-white p-0.5">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option name" {...field} />
                  </FormControl>
                  <FormDescription hidden>
                    This is option display name.
                  </FormDescription>
                  <FormMessage className="px-4">{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={optionForm.control}
              name="appearance"
              render={({ field, fieldState }) => (
                <FormItem className="relative space-y-3.5">
                  <FormLabel className="text-xl font-semibold">
                    Display appearance
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      className="grid grid-cols-2 gap-3.5"
                      onValueChange={(value) => value && field.onChange(value)}
                      {...field}
                    >
                      <ToggleGroupItem className="h-full p-6" value="tiles">
                        <div className="space-y-3.5 text-start">
                          <p className="text-xl space-x-3">
                            <span className="font-normal">Option</span>
                            <span className="font-semibold">Name</span>
                          </p>
                          <div className="flex gap-3">
                            <div className="p-2 rounded-sm">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                            </div>
                            <div className="p-2 rounded-sm">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                            </div>
                            <div className="p-2 ring-1 ring-black rounded-sm">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                            </div>
                            <div className="p-2 rounded-sm">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                            </div>
                            <div className="p-2 rounded-sm">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                            </div>
                          </div>
                        </div>
                      </ToggleGroupItem>
                      <ToggleGroupItem className="h-full p-6" value="rows">
                        <div className="space-y-3.5 text-start w-[70%]">
                          <p className="text-xl space-x-3">
                            <span className="font-normal">Option</span>
                            <span className="font-semibold">Name</span>
                          </p>
                          <div className="flex flex-col gap-3">
                            <div className="p-2 rounded-sm flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                              <span>Name</span>
                            </div>
                            <div className="p-2 rounded-sm flex items-center gap-2 ring-1 ring-black">
                              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
                              <span>Name</span>
                            </div>
                          </div>
                        </div>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription hidden>Active or inactive</FormDescription>
                  <FormMessage className="px-4">{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="ml-auto"
              onClick={optionForm.handleSubmit(onCreateOption)}
            >
              Create option
            </Button>
          </div>
          <div className="space-y-5">
            <div className="space-y-4">
              <Separator />
              <p className="px-4 text-xl">Name</p>
              <Separator />
            </div>
            <ScrollArea>
              <div
                className={clsx(
                  "flex flex-col gap-4 px-4 h-32",
                  optionsArray.fields.length === 0 &&
                    "justify-center items-center"
                )}
              >
                {optionsArray.fields.length > 0 ? (
                  optionsArray.fields.map((option, i) => (
                    <div
                      key={option.id}
                      className="flex justify-between items-center"
                    >
                      <p className="text-xl">{option.title}</p>
                      <button
                        type="button"
                        className="w-4 h-4"
                        onClick={onDeleteOption(i)}
                      >
                        <MinusIcon />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xl">
                    There are no specifics in this category
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div> */}
        <div className="flex items-center gap-3 ml-auto pt-12">
          <Button type="reset" variant={"secondary"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

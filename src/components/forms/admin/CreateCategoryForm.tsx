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
import { Textarea } from "../../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { useEffect, useTransition } from "react";
import { getAllIcons } from "@/lib/categories";
import { Separator } from "@/components/ui/separator";
import { uploadCategoryImage, type Category } from "@/api/categories";
import { CategorySelect } from "../../Admin/Category/CategorySelect";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { isImageValid } from "@/lib/products";
import { AlertDialog } from "../../Admin/AlertDialog";
import { useModal } from "../../Shared/Modal";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoIcon, PlusIcon, TrashIcon } from "@/components/Shared/Icons";

const formSchema = z
  .object({
    logo: z.string().optional().nullable(),
    parentId: z.number().optional().nullable(),
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
    isActive: z.boolean(),
    image: z.object(
      {
        id: z.string(),
        imageUrl: z.string(),
      },
      { required_error: "Please, select image" }
    ),
    categoryPropertyKeys: z.array(
      z.object({
        name: z.string().min(1, {
          message: "Property key must not be empty.",
        }),
      })
    ),
  })
  .superRefine((values, ctx) => {
    if (!values.logo && !values.parentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please, select parent category",
        path: ["parentId"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

interface FormReturnValues {
  name: string;
  description: string;
  isActive: boolean;
  categoryPropertyKeys: {
    name: string;
  }[];
  image: {
    id: string;
    imageUrl: string;
  };
  logo: string | null | undefined;
  parentId: number | null | undefined;
}

interface Props {
  isRoot: boolean;
  defaultValues?: FormValues;
  allCategories: Category[];
  onSubmit: (values: FormReturnValues) => void;
}

export const CreateCategoryForm = ({
  onSubmit,
  isRoot,
  defaultValues,
  allCategories,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          name: "",
          description: "",
          isActive: true,
          logo: isRoot ? "clothes" : undefined,
          categoryPropertyKeys: [],
        },
  });
  const propertyKeysArray = useFieldArray({
    name: "categoryPropertyKeys",
    control: form.control,
  });
  const [isUploading, startUploadTransition] = useTransition();
  const { showModal } = useModal();

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const isEdit = !!defaultValues;

  const handleSubmit = (values: FormValues) => {
    // for some reason form methods doesn't reset fields, so just form the object manually
    const cleanValues: FormReturnValues = isRoot
      ? {
          name: values.name,
          description: values.description,
          isActive: values.isActive,
          categoryPropertyKeys: values.categoryPropertyKeys,
          image: values.image,
          logo: values.logo,
          parentId: null,
        }
      : {
          name: values.name,
          description: values.description,
          isActive: values.isActive,
          categoryPropertyKeys: values.categoryPropertyKeys,
          image: values.image,
          parentId: values.parentId,
          logo: null,
        };
    onSubmit(cleanValues);
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const image = files[0];

    if (!isImageValid(image)) {
      showModal({
        component: AlertDialog,
        props: {
          title: "Error",
          text: "Your file exceeds 5 MB or does not match any format, namely JPEG or PNG.",
          buttonConfirmText: "Try again",
          buttonCloseText: "Back",
          colorVariant: "primary",
        },
      });
      return;
    }

    startUploadTransition(async () => {
      const uploadedImage = await uploadCategoryImage(image);

      if (uploadedImage.status === 201) {
        form.setValue("image", uploadedImage.data[0]);
      }
    });
  };

  const onAddPropertyKey = () => {
    propertyKeysArray.append({ name: "" });
  };
  const onRemovePropertyKey = (index: number) => () => {
    propertyKeysArray.remove(index);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 h-full relative p-1"
        id="create-category-form"
      >
        <fieldset className="space-y-6" id="info">
          <div className="flex items-center gap-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="relative flex flex-col items-center justify-between">
                  <FormControl>
                    <div className="w-32 h-32 flex justify-center items-center bg-secondary-light rounded-lg overflow-hidden relative">
                      {isUploading ? (
                        <Skeleton className="absolute inset-0 z-20 rounded-lg" />
                      ) : field.value?.imageUrl ? (
                        <Image
                          src={field.value.imageUrl}
                          alt={"Category image"}
                          width={256}
                          height={256}
                          className="object-cover aspect-square"
                        />
                      ) : (
                        <PlusIcon className="w-16 h-16" />
                      )}
                      {!isUploading && (
                        <Input
                          className="absolute p-0 h-full inset-0 opacity-0 z-10 cursor-pointer"
                          type="file"
                          accept="image/jpg,image/jpeg,image/png"
                          placeholder=""
                          multiple
                          value={""}
                          onChange={onUploadImage}
                          disabled={isUploading}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
            <div className="w-full h-full flex flex-col justify-between gap-4">
              <div className="flex items-center gap-6">
                {isRoot && (
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel hidden>Icon</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value ?? undefined}
                          >
                            <SelectTrigger className="gap-3.5 p-0 border-none w-max h-max">
                              <div className="p-3 border-2 border-halftone rounded-sm">
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
                                    {icon.render("w-6 h-6")}
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
                      <FormLabel className="absolute left-3 -top-0.5 bg-background p-0.5">
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
              </div>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="relative flex items-center justify-between">
                    <FormLabel className="text-lg font-bold">Status</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        className="gap-3.5"
                        value={field.value ? "true" : "false"}
                        onValueChange={(value) =>
                          value && field.onChange(value === "true")
                        }
                      >
                        <ToggleGroupItem value="true">Active</ToggleGroupItem>
                        <ToggleGroupItem value="false">
                          Not active
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormDescription hidden>Active or inactive</FormDescription>
                    <FormMessage className="px-4" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                    Category description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe a category"
                      className="resize-none min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="absolute right-3 -bottom-2.5 mt-0 bg-background p-0.5">
                    {field.value?.length}/300
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
                  <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
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

          {isEdit && (
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Role</p>
              <div className="flex items-center gap-3.5">
                <p className="text-lg">
                  {!isRoot ? "Child category" : "Parent category"}
                </p>
                <Popover>
                  <PopoverTrigger className="group">
                    <InfoIcon className="w-6 h-6 group-data-[state=closed]:stroke-halftone" />
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
                          This is a more specific part of the parent category,
                          for example, &quot;Smartphones&quot; in the category
                          &quot;Electronics&quot;.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </fieldset>
        {!isRoot && (
          <fieldset className="space-y-6 pt-2">
            <div className="space-y-3.5">
              <h3 className="text-xl font-semibold">Property keys</h3>
              <Separator />
            </div>
            {propertyKeysArray.fields.map((value, i) => (
              <div className="flex items-center gap-3.5" key={value.id}>
                <FormField
                  control={form.control}
                  name={`categoryPropertyKeys.${i}.name`}
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                        Property key
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter property key name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="px-4" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant={"destructive"}
                  className="h-max p-2 text-destructive"
                  onClick={onRemovePropertyKey(i)}
                >
                  <TrashIcon className="w-5 h-5 text-destructive stroke-2" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              className="h-max w-full p-4 justify-start gap-3.5"
              variant={"secondary"}
              onClick={onAddPropertyKey}
            >
              <PlusIcon className="w-4 h-4" />
              Add property key
            </Button>
            <FormMessage className="px-4">
              {form.formState.errors.categoryPropertyKeys?.message}
            </FormMessage>
          </fieldset>
        )}
      </form>
    </Form>
  );
};

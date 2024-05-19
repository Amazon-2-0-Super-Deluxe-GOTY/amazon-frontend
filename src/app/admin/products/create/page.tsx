"use client";
import {
  Category,
  CategoryOption,
  getCategories,
  getCategoryOptions,
} from "@/api/categories";
import { uploadImage } from "@/api/products";
import { CategorySelect } from "@/components/Admin/Category/CategorySelect";
import { SpecificityForm } from "@/components/forms/CategorySpecificityForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCheckboxArray } from "@/lib/checkboxArray";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InfoIcon, MoreHorizontal, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { type UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/components/Admin/Modal";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const barcodeLenght = 13;
const maxImages = 10;
const productDetailsMaxTextLength = 30;
const aboutProductMaxTextLength = 250;

const attributeSchema = z.object({
  id: z.string(),
  type: z.enum(["color", "text"]),
  key: z.string().min(1, { message: "Key must not be empty." }),
  value: z.string().min(1, { message: "Value must not be empty." }),
});
type AttributeType = z.infer<typeof attributeSchema>;

const formSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty." }),
  code: z.string().length(barcodeLenght, {
    message: "Barcode lenght must be 13 characters.",
  }),
  categoryId: z.string().min(1, {
    message: "Please, select category",
  }),
  images: z
    .array(z.object({ id: z.string(), imageUrl: z.string() }))
    .max(maxImages, { message: `${maxImages} images maximum.` }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  discount: z
    .number()
    .min(0, { message: "Discount must be a positive number." })
    .max(100, {
      message:
        "Enter the discount correctly. Only numbers from 0 to 100 are allowed. Letters and special characters are not allowed.",
    })
    .optional(),
  quantity: z
    .number()
    .min(0, { message: "Quantity must be a positive number." }),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, { message: "Name must not be empty." }),
      appearance: z.enum(["tiles", "rows"]),
      isSelected: z.boolean(),
      attributes: z.array(attributeSchema),
    })
  ),
  subproducts: z.array(
    z.object({
      attributes: z.array(
        z.object({
          optionId: z.string(),
          attributeId: z.string(),
        })
      ),
      quantity: z
        .number()
        .min(0, { message: "Quantity must be a positive number." }),
      price: z.number().min(0, { message: "Price must be a positive number." }),
      discount: z
        .number()
        .min(0, { message: "Discount must be a positive number." })
        .max(100, {
          message:
            "Enter the discount correctly. Only numbers from 0 to 100 are allowed. Letters and special characters are not allowed.",
        })
        .optional(),
    })
  ),
  productDetails: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name must not be empty." }),
        text: z
          .string()
          .min(1, { message: "Text must not be empty." })
          .max(productDetailsMaxTextLength, {
            message: "Text should be no more than 30 characters",
          }),
      })
    )
    .min(3, {
      message:
        "It is necessary to create at least 3 objects. Currently only 1-2 objects or none are created.",
    }),
  aboutProduct: z.array(
    z.object({
      name: z.string().min(1, { message: "Name must not be empty." }),
      text: z
        .string()
        .min(1, { message: "Text must not be empty." })
        .max(aboutProductMaxTextLength, {
          message: "Text should be no more than 250 characters",
        }),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="basis-1/3"></div>
      <div className="basis-2/3">
        <CreateProductForm categories={categoriesQuery.data?.data ?? []} />
      </div>
    </div>
  );
}

interface CreateProductFormProps {
  categories: Category[];
}

function CreateProductForm({ categories }: CreateProductFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      images: [],
      // options: [],
      subproducts: [],
      productDetails: [],
      aboutProduct: [],
    },
  });
  const imagesArray = useFieldArray({
    control: form.control,
    name: "images",
  });
  const optionsArray = useFieldArray({
    control: form.control,
    name: "options.attributes",
  });
  // const subproductsArray = useFieldArray({
  //   control: form.control,
  //   name: "subproducts",
  // });
  const productDetailsArray = useFieldArray({
    control: form.control,
    name: "productDetails",
  });
  const aboutProductArray = useFieldArray({
    control: form.control,
    name: "aboutProduct",
  });
  const categoryId = form.watch("categoryId");

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess(data) {
      imagesArray.append(data);
    },
  });
  const categoryOptionsQuery = useQuery({
    queryKey: ["categoryOptions", categoryId],
    queryFn: () => {
      if (!categoryId) return { data: [] };
      return getCategoryOptions(categoryId);
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const currentImagesCount = imagesArray.fields.length;

    if (currentImagesCount === maxImages) {
      form.setError("images", {
        type: "max",
        message: `${maxImages} images maximum.`,
      });
      return;
    }

    const filesArray = Array.from(files);
    const filesToUpload = filesArray.slice(
      0,
      maxImages - currentImagesCount - filesArray.length
    );

    // TODO: set optimistic loading element, use transition and mutateAsync
    uploadImageMutation.mutate(filesToUpload);
  }

  const onDeleteImage = (index: number) => () => {
    imagesArray.remove(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="space-y-6">
          <div className="space-y-3">
            <h2 className="font-semibold text-3xl">General information</h2>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name..." {...field} />
                </FormControl>
                <FormDescription hidden>
                  This is product public display name.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter product code..." {...field} />
                </FormControl>
                <FormDescription className="absolute right-3 -bottom-2.5 mt-0 font-light bg-white p-0.5">
                  {field.value.length}/{barcodeLenght}
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Category
                </FormLabel>
                <FormControl>
                  <CategorySelect
                    categories={categories}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormDescription hidden>
                  This is product category.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3.5">
                    <FormLabel className="font-semibold text-lg">
                      Product display
                    </FormLabel>
                    <InfoIcon className="w-6 h-6" />
                  </div>
                  <p>
                    {field.value.length}/{maxImages}
                  </p>
                </div>
                <FormControl>
                  <div className="flex flex-wrap gap-4">
                    {field.value.map((img, i) => (
                      <div
                        key={img.id}
                        className="w-28 h-28 rounded-lg relative"
                      >
                        <Image
                          src={img.imageUrl}
                          alt={`Image ${i + 1}`}
                          width={112}
                          height={112}
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          className="absolute inset-0 bg-black/55 flex justify-center items-center opacity-0 hover:opacity-100"
                          onClick={onDeleteImage(i)}
                        >
                          <Trash2Icon className="w-10 h-10 stroke-white" />
                        </button>
                      </div>
                    ))}
                    {field.value.length < maxImages && (
                      <div className="w-28 h-28 flex justify-center items-center bg-gray-200 rounded-lg relative">
                        <PlusIcon className="w-16 h-16" />
                        <Input
                          className="absolute p-0 h-full inset-0 opacity-0 z-10 cursor-pointer"
                          type="file"
                          accept="image/jpg,image/jpeg,image/png"
                          multiple
                          onChange={onUploadImage}
                          disabled={uploadImageMutation.isPending}
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription hidden>
                  This is product photos.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Price, $
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product price..."
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription hidden>
                  Product price in dollars.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                  Discount, % (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product discount..."
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription hidden>
                  Product discount in percents.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="space-y-6">
          <div className="space-y-3">
            <h2 className="font-semibold text-3xl">Product specificity</h2>
            <Separator />
          </div>

          <OptionsFormBlock
            form={form}
            categoryOptions={categoryOptionsQuery.data?.data ?? []}
          />

          {optionsArray.fields.length === 0 && (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the quantity of your product..."
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription hidden>
                    Product discount in percents.
                  </FormDescription>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
          )}
        </fieldset>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function OptionsFormBlock({
  categoryOptions,
  form,
}: {
  categoryOptions: CategoryOption[];
  form: UseFormReturn<FormValues>;
}) {
  const { showModal } = useModal();

  const optionsArray = useFieldArray({
    control: form.control,
    name: "options",
  });
  const subproductsArray = useFieldArray({
    control: form.control,
    name: "subproducts",
  });

  // const selectedOptions = useMemo(
  //   () => [
  //     ...categoryOptionsCheckboxArray.getCheckedElements(),
  //     ...productOptionsCheckboxArray.getCheckedElements(),
  //   ],
  //   [categoryOptionsCheckboxArray, productOptionsCheckboxArray]
  // );

  // useEffect(() => {
  //   if (
  //     categoryOptions.length > 0 &&
  //     categoryOptionsCheckboxArray.array.length === 0
  //   ) {
  //     const existingIds = categoryOptionsCheckboxArray.array.map(
  //       (elem) => elem.value.id
  //     );
  //     categoryOptionsCheckboxArray.appendMany(
  //       categoryOptions.filter((opt) => !existingIds.includes(opt.id))
  //     );
  //   }
  // }, [categoryOptions, categoryOptionsCheckboxArray]);

  function onCreateOption() {
    showModal({
      component: CreateOptionModal,
    }).then((res) => {
      if (res.action === "CONFIRM") {
        // productOptionsCheckboxArray.append(res.option);
        optionsArray.append({
          ...res.option,
          isSelected: false,
          attributes: [],
        });
      }
    });
  }

  // const columns = useMemo<ColumnDef<AttributeType>[]>(
  //   () => [
  //     {
  //       id: "select",
  //       header: ({ table }) => (
  //         <div className="h-full flex items-center">
  //           <Checkbox
  //             size="lg"
  //             checked={
  //               table.getIsAllPageRowsSelected() ||
  //               (table.getIsSomePageRowsSelected() && "indeterminate")
  //             }
  //             onCheckedChange={(value) =>
  //               table.toggleAllPageRowsSelected(!!value)
  //             }
  //             aria-label="Select all"
  //           />
  //         </div>
  //       ),
  //       cell: ({ row }) => (
  //         <Checkbox
  //           size="lg"
  //           checked={row.getIsSelected()}
  //           onCheckedChange={(value) => row.toggleSelected(!!value)}
  //           aria-label="Select row"
  //         />
  //       ),
  //       enableSorting: false,
  //       enableHiding: false,
  //     },
  //     {
  //       id: "attributes",
  //       header: "Attributes",
  //       cell: ({ row }) => {
  //         const attr = row.original;
  //         return (
  //           <div className="flex items-start gap-3.5 text-xl">
  //             <p>{attr.key}</p>
  //             <p>{attr.value}</p>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       id: "actions",
  //       enableHiding: false,
  //       header: ({ table }) => (
  //         <div className="h-full flex justify-end items-center">
  //           <button type="button">
  //             <PlusIcon className="w-6 h-6" />
  //           </button>
  //         </div>
  //       ),
  //       cell: ({ row }) => {
  //         const onEdit = () => {};
  //         const onDelete = () => {};

  //         return (
  //           <DropdownMenu>
  //             <DropdownMenuTrigger asChild>
  //               <div className="h-full flex justify-end items-center">
  //                 <Button variant="ghost" className="h-8 w-8 p-0">
  //                   <span className="sr-only">Open menu</span>
  //                   <MoreHorizontal className="h-4 w-4" />
  //                 </Button>
  //               </div>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent align="end" className="p-4 w-72">
  //               <DropdownMenuItem className="p-4 px-4 py-2.5" onClick={onEdit}>
  //                 Edit
  //               </DropdownMenuItem>
  //               <DropdownMenuItem
  //                 className={"p-4 px-4 py-2.5 text-destructive"}
  //                 onClick={onDelete}
  //               >
  //                 Delete
  //               </DropdownMenuItem>
  //             </DropdownMenuContent>
  //           </DropdownMenu>
  //         );
  //       },
  //     },
  //   ],
  //   []
  // );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border">
        <AccordionTrigger className="p-4 justify-between">
          <div className="flex items-center gap-3.5">
            <PlusIcon className="w-6 h-6" />
            <span className="font-medium text-xl">Create option(s)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0 space-y-4">
          <div className="h-[570px] grid grid-cols-[1fr_auto_1fr] gap-3.5">
            <div className="grow flex flex-col gap-5">
              <div className="border-y-2 p-4 flex items-center gap-4">
                <Checkbox
                  id="category-option-all"
                  size="lg"
                  checked={categoryOptionsCheckboxArray.isAllChecked}
                  onClick={() =>
                    categoryOptionsCheckboxArray.toggleAllChecked()
                  }
                />
                <label
                  className="font-medium text-xl"
                  htmlFor="category-option-all"
                >
                  Category options list
                </label>
              </div>
              <ScrollArea className="only:h-full">
                <div className="space-y-6 px-4">
                  {categoryOptionsCheckboxArray.array.map((elem, i) => {
                    const id = `category-option-${i}`;
                    return (
                      <div className="flex items-center gap-4" key={id}>
                        <Checkbox
                          id={id}
                          size="lg"
                          checked={elem.checked}
                          onClick={() =>
                            categoryOptionsCheckboxArray.toggleChecked(elem)
                          }
                        />
                        <label className="font-medium text-xl" htmlFor={id}>
                          {elem.value.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              {categoryOptionsCheckboxArray.array.length === 0 && (
                <div className="w-full h-full flex justify-center items-center px-6">
                  <div className="w-full p-3 text-lg text-center bg-gray-200 rounded-md">
                    Select category to show options list
                  </div>
                </div>
              )}
            </div>
            {/* <Separator orientation="vertical" />
            <div className="grow flex flex-col gap-5">
              <div className="border-y-2 p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="product-option-all"
                    size="lg"
                    checked={productOptionsCheckboxArray.isAllChecked}
                    onClick={() =>
                      productOptionsCheckboxArray.toggleAllChecked()
                    }
                  />
                  <label
                    className="font-medium text-xl"
                    htmlFor="product-option-all"
                  >
                    Your options list
                  </label>
                </div>
                <button type="button" onClick={onCreateOption}>
                  <PlusIcon className="w-6 h-6" />
                </button>
              </div>
              <ScrollArea className="only:h-full">
                <div className="space-y-6 px-4">
                  {productOptionsCheckboxArray.array.map((elem, i) => {
                    const id = `product-option-${i}`;
                    return (
                      <div className="flex items-center gap-4" key={id}>
                        <Checkbox
                          id={id}
                          size="lg"
                          checked={elem.checked}
                          onClick={() =>
                            productOptionsCheckboxArray.toggleChecked(elem)
                          }
                        />
                        <label className="font-medium text-xl" htmlFor={id}>
                          {elem.value.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              {productOptionsCheckboxArray.array.length === 0 && (
                <div className="w-full h-full flex justify-center items-center px-6">
                  <div className="text-lg">
                    There are no options in your list
                  </div>
                </div>
              )}
            </div> */}
          </div>

          {/* {selectedOptions.length === 0 ? (
            <div className="space-y-5">
              <div className="border-y-2 p-4 flex justify-between items-center">
                <p className="font-medium text-xl">Select option(s) in list</p>
                <button type="button" disabled>
                  <PlusIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="h-96 flex justify-center items-center">
                <p className="text-xl">
                  There are no attributes in this option
                </p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue={selectedOptions[0]?.id} className="space-y-3.5">
              <TabsList className="bg-transparent flex justify-start gap-3.5 overflow-y-auto h-max">
                {selectedOptions.map((opt) => (
                  <TabsTrigger
                    key={opt.id}
                    value={opt.id}
                    className="px-6 py-2 ring-2 ring-border rounded-lg text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:ring-0"
                  >
                    {opt.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="h-96">
                {selectedOptions.map((opt) => (
                  <TabsContent value={opt.id} key={opt.id}>
                    <DataTable
                      data={
                        [
                          {
                            id: "1",
                            type: "text",
                            key: "GB",
                            value: "128GB SSD",
                          },
                          {
                            id: "1",
                            type: "color",
                            key: "#fff",
                            value: "White",
                          },
                        ] as AttributeType[]
                      }
                      columns={columns}
                      header={() => null}
                    />
                  </TabsContent>
                ))}
              </div>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
          )} */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function CreateOptionModal({
  closeModal,
}: {
  closeModal: (
    param?: { action: "CLOSE" } | { action: "CONFIRM"; option: CategoryOption }
  ) => void;
}) {
  const onSubmit = (values: Omit<CategoryOption, "id">) => {
    closeModal({
      action: "CONFIRM",
      option: { id: crypto.randomUUID(), ...values },
    });
  };

  const onCancel = () => closeModal({ action: "CLOSE" });

  return (
    <Dialog open>
      <DialogContent className="p-6 w-[55vw] max-w-full gap-6" hideClose>
        <div className="space-y-3">
          <h2 className="font-semibold text-3xl">Create option</h2>
          <Separator />
        </div>
        <SpecificityForm onSubmit={onSubmit} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

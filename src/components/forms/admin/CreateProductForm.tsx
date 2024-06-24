"use client";
import { Category } from "@/api/categories";
import {
  Product,
  createProduct,
  deleteProductImage,
  updateProduct,
  uploadProductImage,
} from "@/api/products";
import { CategorySelect } from "@/components/Admin/Category/CategorySelect";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/components/Shared/Modal";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog } from "@/components/Admin/AlertDialog";
import { UploadPhotoListFormField } from "./UploadPhotoListFormFields";
import { PlusIcon, TrashIcon } from "../../Shared/Icons";

const barcodeLenght = 13;
const maxImages = 10;
const productDetailsMaxTextLength = 30;
const aboutProductMaxTextLength = 500;

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty." }),
  code: z
    .string()
    .length(barcodeLenght, {
      message: "Barcode lenght must be 13 characters.",
    })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num);
      },
      {
        message: "Barcode is invalid",
      }
    ),
  categoryId: z.number({
    required_error: "Please, select category",
    invalid_type_error: "Please, select category",
  }),
  images: z
    .array(z.object({ id: z.string(), imageUrl: z.string() }))
    .min(1, { message: "Add at least one photo" })
    .max(maxImages, { message: `${maxImages} images maximum.` }),
  price: z
    .number({
      required_error: "Price cannot be empty",
      invalid_type_error: "Price cannot be empty",
    })
    .min(0, { message: "Price must be a positive number." })
    .transform((value) => Math.round(value * 100) / 100),
  discount: z
    .union([
      z
        .number()
        .int({ message: "Discount must be an integer." })
        .min(0, { message: "Discount must be a positive number." })
        .max(100, {
          message:
            "Enter the discount correctly. Only numbers from 0 to 100 are allowed. Letters and special characters are not allowed.",
        }),
      z.nan(),
    ])
    .optional()
    .nullable(),
  quantity: z
    .number({
      required_error: "Quantity cannot be empty",
      invalid_type_error: "Quantity cannot be empty",
    })
    .int({ message: "Quantity must be an integer." })
    .min(0, { message: "Quantity must be a positive number." }),
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
    .refine((value) => value.length >= 3, {
      message:
        "It is necessary to create at least 3 objects. Currently only 1-2 objects or none are created.",
      path: ["root"],
    })
    .superRefine((items, ctx) => {
      const uniqueValues = new Map<string, number>();
      items.forEach((item, idx) => {
        const firstAppearanceIndex = uniqueValues.get(item.name);
        if (firstAppearanceIndex !== undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Value must be unique`,
            path: [idx, "name"],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Value must be unique`,
            path: [firstAppearanceIndex, "name"],
          });
          return;
        }
        uniqueValues.set(item.name, idx);
      });
    }),
  aboutProduct: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name must not be empty." }),
        text: z
          .string()
          .min(1, { message: "Text must not be empty." })
          .max(aboutProductMaxTextLength, {
            message: "Text should be no more than 250 characters",
          }),
      })
    )
    // .min(3, {
    //   message:
    //     "It is necessary to create at least 3 objects. Currently only 1-2 objects or none are created.",
    // })
    .refine((value) => value.length >= 3, {
      message:
        "It is necessary to create at least 3 objects. Currently only 1-2 objects or none are created.",
      path: ["root"],
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateProductFormProps {
  categories: Category[];
  defaultValues?: FormValues & { productId?: string };
  defaultCategoryId?: number;
  onSubmit: (product: Product) => void;
}

export function CreateProductForm({
  categories,
  defaultValues,
  defaultCategoryId,
  onSubmit,
}: CreateProductFormProps) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          name: "",
          code: "",
          price: 0,
          categoryId: defaultCategoryId,
          images: [],
          productDetails: [],
          aboutProduct: [],
        },
    reValidateMode: "onChange",
  });

  const imagesArray = useFieldArray({
    control: form.control,
    name: "images",
    keyName: "key",
  });
  const productDetailsArray = useFieldArray({
    control: form.control,
    name: "productDetails",
  });
  const aboutProductArray = useFieldArray({
    control: form.control,
    name: "aboutProduct",
  });

  const [
    selectedCategoryPropertyKeyNames,
    setSelectedCategoryPropertyKeyNames,
  ] = useState<string[]>([]);
  const categoryId = form.watch("categoryId");

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (!categoryId) return;

    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const currentPropertyKeysNames = productDetailsArray.fields.map(
      (c) => c.name
    );
    const newPropertyKeysNames = category.categoryPropertyKeys.map(
      (c) => c.name
    );
    const newPropertyKeys = category.categoryPropertyKeys
      .filter((c) => !currentPropertyKeysNames.includes(c.name))
      .map((pk) => ({ name: pk.name, text: "" }));

    productDetailsArray.prepend(newPropertyKeys);
    setSelectedCategoryPropertyKeyNames(newPropertyKeysNames);
  }, [categoryId, categories]);

  const { showModal } = useModal();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
  });

  async function onUploadImage(filesToUpload: File[]) {
    const data = await uploadProductImage(filesToUpload);
    if (data.status === 201) {
      imagesArray.append(data.data);
    }
  }

  const onDeleteImage = (index: number) => {
    const image = imagesArray.fields[index];
    deleteProductImage(image.id);
    imagesArray.remove(index);
  };

  function onAddProductDetail() {
    productDetailsArray.append({
      name: "",
      text: "",
    });
  }

  const onRemoveProductDetail = (index: number) => () => {
    productDetailsArray.remove(index);
  };

  function onAddAboutProduct() {
    aboutProductArray.append({
      name: "",
      text: "",
    });
  }

  const onRemoveAboutProduct = (index: number) => () => {
    aboutProductArray.remove(index);
  };

  const onCancel = () => {
    let isDirty = form.formState.isDirty;

    if (!isDirty) {
      for (let key in form.formState.dirtyFields) {
        if (form.formState.dirtyFields[key as keyof FormValues]) {
          isDirty = true;
          break;
        }
      }
    }

    if (
      (!!defaultValues &&
        defaultValues.images.length !== imagesArray.fields.length) ||
      (!defaultValues && imagesArray.fields.length > 0)
    ) {
      isDirty = true;
    }

    if (isDirty) {
      showModal({
        component: AlertDialog,
        props: {
          title: "Are you sure?",
          text: "You will lose all your changes.",
          buttonCloseText: "Back",
          buttonConfirmText: "Continue",
          colorVariant: "destructive",
        },
      }).then(({ action }) => {
        if (action === "CONFIRM") {
          router.push("/products");
        }
      });
    } else {
      router.push("/products");
    }
  };

  const handleSubmit = (values: FormValues) => {
    if (!!defaultValues && defaultValues.productId) {
      updateProductMutation
        .mutateAsync({
          ...values,
          images: values.images.map((img) => img.id),
          productId: defaultValues.productId,
        })
        .then((res) => {
          if (res.status === 200) {
            onSubmit(res.data);
          } else if (res.status === 400) {
            for (let error of res.data) {
              form.setError(error.propertyName as keyof FormValues, {
                message: error.errorMessage,
              });
            }
          }
        });
    } else {
      createProductMutation
        .mutateAsync({ ...values, images: values.images.map((img) => img.id) })
        .then((res) => {
          if (res.status === 201) {
            onSubmit(res.data);
          } else if (res.status === 400) {
            for (let error of res.data) {
              form.setError(error.propertyName as keyof FormValues, {
                message: error.errorMessage,
              });
            }
          }
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 relative pb-16"
      >
        <fieldset className="space-y-6" id="form-general">
          <div className="space-y-3">
            <h2 className="font-semibold text-3xl">General information</h2>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
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
              <FormItem>
                <div className="relative">
                  <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                    Barcode
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product code..." {...field} />
                  </FormControl>
                  <FormDescription className="absolute right-3 -bottom-2.5 mt-0 bg-background p-0.5">
                    {field.value.length}/{barcodeLenght}
                  </FormDescription>
                </div>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                  Category
                </FormLabel>
                <FormControl>
                  <CategorySelect
                    categories={categories}
                    value={field.value}
                    onValueChange={field.onChange}
                    disallowRoots={false}
                  />
                </FormControl>
                <FormDescription hidden>
                  This is product category.
                </FormDescription>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
          <UploadPhotoListFormField
            title="Product display"
            control={form.control as any}
            currentImagesCount={imagesArray.fields.length}
            maxImages={maxImages}
            onDelete={onDeleteImage}
            onUpload={onUploadImage}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
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
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                  Discount, % (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product discount..."
                    {...field}
                    value={field.value ?? undefined}
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
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
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
        </fieldset>

        <fieldset className="space-y-6" id="form-details">
          <div className="space-y-3">
            <Separator />
            <h2 className="font-semibold text-3xl">Product details</h2>
            <Separator />
          </div>
          {productDetailsArray.fields.map((value, i) => (
            <fieldset className="flex items-center gap-3.5" key={value.id}>
              <FormField
                control={form.control}
                name={`productDetails.${i}.name`}
                render={({ field }) => (
                  <FormItem className="relative basis-1/3 space-y-0">
                    <FormControl>
                      <Input
                        className="peer"
                        type="text"
                        placeholder="Enter detail name..."
                        disabled={selectedCategoryPropertyKeyNames.includes(
                          field.value
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5 peer-disabled:text-halftone">
                      Name
                    </FormLabel>
                    <FormMessage className="px-4 pt-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`productDetails.${i}.text`}
                render={({ field }) => (
                  <FormItem className="relative basis-2/3 space-y-0">
                    <div className="relative">
                      <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                        Attribute
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Describe detail about your product..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="absolute right-3 -bottom-2.5 mt-0 bg-background p-0.5">
                        {field.value.length}/{productDetailsMaxTextLength}
                      </FormDescription>
                    </div>
                    <FormMessage className="px-4 pt-2" />
                  </FormItem>
                )}
              />
              {!selectedCategoryPropertyKeyNames.includes(value.name) && (
                <Button
                  type="button"
                  variant={"destructive"}
                  className="h-max p-2 text-destructive"
                  onClick={onRemoveProductDetail(i)}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              )}
            </fieldset>
          ))}
          <Button
            type="button"
            className="h-max w-full p-4 justify-start gap-3.5"
            variant={"secondary"}
            onClick={onAddProductDetail}
          >
            <PlusIcon className="w-4 h-4" />
            Add product detail
          </Button>
          <FormMessage className="px-4">
            {form.formState.errors.productDetails?.root?.message}
          </FormMessage>
        </fieldset>

        <fieldset className="space-y-6" id="form-about">
          <div className="space-y-3">
            <Separator />
            <h2 className="font-semibold text-3xl">About product</h2>
            <Separator />
          </div>
          {aboutProductArray.fields.map((value, i) => (
            <fieldset className="flex items-start gap-3.5" key={value.id}>
              <FormField
                control={form.control}
                name={`aboutProduct.${i}.name`}
                render={({ field }) => (
                  <FormItem className="relative basis-1/3 space-y-0">
                    <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter feature title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="px-4 pt-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`aboutProduct.${i}.text`}
                render={({ field }) => (
                  <FormItem className="basis-2/3 space-y-0">
                    <div className="relative">
                      <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                        Attribute
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-28 resize-none"
                          placeholder="Describe more about feature..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="absolute right-3 -bottom-2.5 mt-0 bg-background p-0.5">
                        {field.value.length}/{aboutProductMaxTextLength}
                      </FormDescription>
                    </div>
                    <FormMessage className="px-4 pt-2" />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={"destructive"}
                className="h-max p-2 text-destructive"
                onClick={onRemoveAboutProduct(i)}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </fieldset>
          ))}
          <Button
            type="button"
            className="h-max w-full p-4 justify-start gap-3.5"
            variant={"secondary"}
            onClick={onAddAboutProduct}
          >
            <PlusIcon className="w-4 h-4" />
            Add product feature
          </Button>
          <FormMessage className="px-4">
            {form.formState.errors.aboutProduct?.root?.message}
          </FormMessage>
        </fieldset>

        <div className="absolute inset-0 -bottom-6 pointer-events-none flex justify-end items-end">
          <div className="sticky bottom-0 py-6 w-full flex justify-end gap-3.5 bg-background pointer-events-auto">
            <Button
              type="button"
              variant={"secondary"}
              onClick={onCancel}
              disabled={createProductMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createProductMutation.isPending}>
              {defaultValues ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

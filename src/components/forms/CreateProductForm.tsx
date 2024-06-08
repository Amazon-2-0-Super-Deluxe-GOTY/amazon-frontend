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
import { InfoIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/components/Shared/Modal";
import { isImageValid } from "@/lib/products";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog } from "@/components/Admin/AlertDialog";

const barcodeLenght = 13;
const maxImages = 10;
const productDetailsMaxTextLength = 30;
const aboutProductMaxTextLength = 250;

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
        return !isNaN(num) && num > 1;
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
    .min(3, {
      message:
        "It is necessary to create at least 3 objects. Currently only 1-2 objects or none are created.",
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
    .min(3, {
      message:
        "It is necessary to create at least 3 objects. Currently only 1-2 objects or none are created.",
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
          quantity: 0,
          categoryId: defaultCategoryId,
          images: [],
          productDetails: [],
          aboutProduct: [],
        },
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

  const [uploadLoadingElements, setUploadLoadingElements] = useOptimistic<
    undefined[]
  >([]);
  const [isUploading, startUploadTransition] = useTransition();

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
    const filesSliced = filesArray.slice(0, maxImages - currentImagesCount);
    const filesToUpload = filesSliced.filter(isImageValid);

    if (filesSliced.length > filesToUpload.length) {
      showModal({
        component: AlertDialog,
        props: {
          title: "Error",
          text: "Your file exceeds 5 MB or does not match any format, namely JPEG or PNG.",
          buttonConfirmText: "Try again",
          buttonCloseText: "Back",
          variant: "default",
        },
      });
      return;
    }

    startUploadTransition(async () => {
      setUploadLoadingElements(Array.from({ length: filesToUpload.length }));
      const data = await uploadProductImage(filesToUpload);
      if (data.status === 201) {
        imagesArray.append(data.data);
      }
    });
  }

  const onDeleteImage = (index: number) => () => {
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
          variant: "default",
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
              <FormItem>
                <div className="relative">
                  <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                    Barcode
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product code..." {...field} />
                  </FormControl>
                  <FormDescription className="absolute right-3 -bottom-2.5 mt-0 font-light bg-white p-0.5">
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
                <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
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

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="relative space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3.5">
                    <FormLabel className="font-semibold text-lg">
                      Product display
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger className="group">
                        <InfoIcon className="w-6 h-6 group-data-[state=closed]:stroke-gray-400" />
                      </PopoverTrigger>
                      <PopoverContent align="start" className="max-w-sm w-full">
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold">Image requirements</p>
                          <div>
                            <p>
                              Please note that the uploaded image must meet the
                              following requirements:
                            </p>
                            <ul className="list-disc pl-4">
                              <li>Maximum file size: 5 MB</li>
                              <li>Acceptable formats: JPEG, PNG</li>
                            </ul>
                            <p>
                              Images exceeding this size or in other formats
                              will not be accepted. Please ensure your files are
                              optimized and comply with the specified
                              parameters.
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
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
                          className="absolute inset-0 bg-black/55 flex justify-center items-center opacity-0 hover:opacity-100 rounded-lg"
                          onClick={onDeleteImage(i)}
                        >
                          <Trash2Icon className="w-10 h-10 stroke-white" />
                        </button>
                      </div>
                    ))}
                    {uploadLoadingElements.map((_, i) => (
                      <Skeleton className="w-28 h-28 rounded-lg" key={i} />
                    ))}
                    {field.value.length < maxImages && (
                      <div className="w-28 h-28 flex justify-center items-center bg-gray-200 rounded-lg relative">
                        <PlusIcon className="w-16 h-16" />
                        <Input
                          className="absolute p-0 h-full inset-0 opacity-0 z-10 cursor-pointer"
                          type="file"
                          accept="image/jpg,image/jpeg,image/png"
                          multiple
                          value={""}
                          onChange={onUploadImage}
                          disabled={isUploading}
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
                    <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5 peer-disabled:text-gray-500">
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
                      <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                        Attribute
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Describe detail about your product..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="absolute right-3 -bottom-2.5 mt-0 font-light bg-white p-0.5">
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
                  variant={"ghost"}
                  className="h-max p-3"
                  onClick={onRemoveProductDetail(i)}
                >
                  <Trash2Icon className="w-6 h-6" />
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
            {form.formState.errors.productDetails?.message}
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
                    <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
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
                      <FormLabel className="absolute left-3 -top-2.5 font-light bg-white p-0.5">
                        Attribute
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-28 resize-none"
                          placeholder="Describe more about feature..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="absolute right-3 -bottom-2.5 mt-0 font-light bg-white p-0.5">
                        {field.value.length}/{aboutProductMaxTextLength}
                      </FormDescription>
                    </div>
                    <FormMessage className="px-4 pt-2" />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={"ghost"}
                className="h-max p-3"
                onClick={onRemoveAboutProduct(i)}
              >
                <Trash2Icon className="w-6 h-6" />
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
            {form.formState.errors.aboutProduct?.message}
          </FormMessage>
        </fieldset>

        <div className="absolute inset-0 -bottom-6 pointer-events-none flex justify-end items-end">
          <div className="sticky bottom-0 py-6 w-full flex justify-end gap-3.5 bg-white pointer-events-auto">
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

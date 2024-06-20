"use client";
import {
  deleteReviewImage,
  uploadReviewImage,
  type ReviewTag,
} from "@/api/review";
import { ApiValidationErrors } from "@/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "../../ui/textarea";
import clsx from "clsx";
import { StarEmptyIcon, StarFullIcon } from "../../Shared/Icons";
import { UploadPhotoListFormField } from "./UploadPhotoListFormFields";

const maxImages = 10;
const titleMaxLenght = 60;
const textMaxLenght = 250;
const minRating = 1;
const maxRating = 5;

const formSchema = z.object({
  rating: z
    .number({
      required_error: "Please, select rating",
      invalid_type_error: "Please, select rating",
    })
    .positive()
    .refine((val) => val >= minRating && val <= maxRating, {
      message: "Invalid rating",
    }),
  title: z
    .string()
    .max(titleMaxLenght, { message: `${titleMaxLenght} characters maximum` })
    .optional(),
  text: z
    .string()
    .max(textMaxLenght, { message: `${textMaxLenght} characters maximum` })
    .optional(),
  images: z
    .array(
      z.object({
        id: z.string(),
        imageUrl: z.string(),
      })
    )
    .max(maxImages, {
      message: `${maxImages} images maximum`,
    })
    .optional(),
  tagsIds: z
    .array(
      z.object({
        id: z.string(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  defaultValues?: FormValues;
  reviewTags: ReviewTag[];
  validationErrors?: ApiValidationErrors;
  onSubmit: (values: FormValues) => void;
}

export function CreateReviewForm({
  onSubmit,
  defaultValues,
  reviewTags,
  validationErrors,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? defaultValues : { images: [], tagsIds: [] },
  });

  const imagesArray = useFieldArray({
    control: form.control,
    name: "images",
    keyName: "key",
  });
  const tagsIdsArray = useFieldArray({
    control: form.control,
    name: "tagsIds",
    keyName: "key",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (!validationErrors?.length) return;
    for (let error of validationErrors) {
      form.setError(error.propertyName as "rating" | "title" | "text", {
        message: error.errorMessage,
      });
    }
  }, [validationErrors]);

  function onSelectTag(id: string) {
    const tagIndex = tagsIdsArray.fields.findIndex((t) => t.id === id);

    if (tagIndex === -1) {
      tagsIdsArray.append({ id });
    } else {
      tagsIdsArray.remove(tagIndex);
    }
  }

  async function onUploadImage(files: File[]) {
    const data = await uploadReviewImage(files);
    if (data.status === 201) {
      imagesArray.append(data.data);
    }
  }

  const onDeleteImage = (index: number) => {
    const image = imagesArray.fields[index];
    deleteReviewImage(image.id);
    imagesArray.remove(index);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-1"
        id="create-review-form"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col justify-center items-center">
                <FormControl>
                  <StarsRatingSelect
                    value={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your opinion in a nutshell..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription className="absolute right-3 -bottom-2.5 mt-0 bg-background p-0.5">
                  {field.value?.length ?? 0}/{titleMaxLenght}
                </FormDescription>
              </div>
              <FormMessage className="px-4" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormLabel className="absolute left-3 -top-2.5 bg-background p-0.5">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe a category"
                    className="resize-none min-h-32"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription className="absolute right-3 -bottom-2.5 mt-0 bg-background p-0.5">
                  {field.value?.length ?? 0}/{textMaxLenght}
                </FormDescription>
              </div>
              <FormMessage className="px-4" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagsIds"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-3.5">
                <FormLabel className="text-lg font-bold">Tags</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {reviewTags.map((tag, i) => (
                    <button
                      type="button"
                      className={clsx(
                        "py-2 px-5 text-sm lg:text-base rounded-sm",
                        field.value?.some((t) => t.id === tag.id)
                          ? "bg-tertiary-press"
                          : "bg-secondary-light"
                      )}
                      onClick={() => onSelectTag(tag.id)}
                      key={tag.id}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              <FormMessage className="px-4" />
            </FormItem>
          )}
        />
        <UploadPhotoListFormField
          title="Photos"
          control={form.control as any}
          currentImagesCount={imagesArray.fields.length}
          maxImages={maxImages}
          onDelete={onDeleteImage}
          onUpload={onUploadImage}
        />
      </form>
    </Form>
  );
}

function StarsRatingSelect({
  value,
  onSelect,
}: {
  value?: number;
  onSelect: (rating: number) => void;
}) {
  const [hoveringOverStar, setHoveringOverStar] = useState<number | undefined>(
    undefined
  );
  const currentStar = hoveringOverStar ?? 0;

  return (
    <div className="flex justify-center">
      {Array.from({ length: maxRating }).map((_, i) => {
        const rating = i + 1;
        const isHovering = currentStar >= rating;
        const isSelected = value !== undefined && value >= rating;
        return (
          <button
            type="button"
            key={i}
            onMouseEnter={() => setHoveringOverStar(rating)}
            onMouseLeave={() => setHoveringOverStar(undefined)}
            onClick={() => onSelect(rating)}
          >
            {/* {hoveringOverStar !== undefined ? (
              isHovering ? (
                <StarFullIcon
                  className={"w-20 h-20 stroke-1 fill-foreground/25"}
                />
              ) : (
                <StarEmptyIcon className={"w-20 h-20 stroke-1"} />
              )
            ) : isSelected ? (
              <StarFullIcon className={"w-20 h-20"} />
            ) : (
              <StarEmptyIcon className={"w-20 h-20 stroke-1"} />
            )} */}
            {isSelected ? (
              <StarFullIcon className={"w-20 h-20"} />
            ) : isHovering ? (
              <StarFullIcon
                className={"w-20 h-20 stroke-1 fill-foreground/25"}
              />
            ) : (
              <StarEmptyIcon className={"w-20 h-20 stroke-1"} />
            )}
          </button>
        );
      })}
    </div>
  );
}

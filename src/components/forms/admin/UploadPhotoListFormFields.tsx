"use client";

import { useOptimistic, useTransition } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../../ui/skeleton";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { InfoIcon, PlusIcon, TrashIcon } from "../../Shared/Icons";
import { isImageValid } from "@/lib/products";
import { AlertDialog } from "../../Admin/AlertDialog";
import { useModal } from "../../Shared/Modal";
import { Button } from "@/components/ui/button";

interface UploadPhotoListFormFieldProps {
  title: string;
  currentImagesCount: number;
  maxImages: number;
  onUpload: (files: File[]) => Promise<void>;
  onDelete: (index: number) => void;
  control: Control<{ images?: { id: string; imageUrl: string }[] | undefined }>;
}

export function UploadPhotoListFormField({
  title,
  currentImagesCount,
  maxImages,
  control,
  onUpload,
  onDelete,
}: UploadPhotoListFormFieldProps) {
  const [uploadLoadingElements, setUploadLoadingElements] = useOptimistic<
    undefined[]
  >([]);
  const [isUploading, startUploadTransition] = useTransition();
  const { showModal } = useModal();

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (currentImagesCount === maxImages) {
      control.setError("images", {
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
          colorVariant: "primary",
        },
      });
      return;
    }

    startUploadTransition(async () => {
      setUploadLoadingElements(Array.from({ length: filesToUpload.length }));
      await onUpload(filesToUpload);
    });
  };
  const onDeleteImage = (index: number) => () => onDelete(index);

  return (
    <FormField
      control={control}
      name="images"
      render={({ field }) => (
        <FormItem className="relative space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <FormLabel className="font-bold text-lg">{title}</FormLabel>
              <Popover>
                <PopoverTrigger className="group">
                  <InfoIcon className="w-6 h-6 group-data-[state=closed]:text-halftone" />
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
                        Images exceeding this size or in other formats will not
                        be accepted. Please ensure your files are optimized and
                        comply with the specified parameters.
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p>
              {field.value?.length}/{maxImages}
            </p>
          </div>
          <FormControl>
            <div className="flex flex-wrap gap-4">
              {field.value?.map((img, i) => (
                <div key={img.id} className="w-28 h-28 rounded-lg relative">
                  <Image
                    src={img.imageUrl}
                    alt={`Image ${i + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/55 flex justify-center items-center opacity-0 hover:opacity-100 rounded-lg">
                    <Button
                      type="button"
                      variant={"destructive"}
                      size={"icon"}
                      onClick={onDeleteImage(i)}
                      className="border-light"
                    >
                      <TrashIcon className="w-6 h-6 text-light stroke-2" />
                    </Button>
                  </div>
                </div>
              ))}
              {uploadLoadingElements.map((_, i) => (
                <Skeleton className="w-28 h-28 rounded-lg" key={i} />
              ))}
              {(field.value?.length ?? 0) < maxImages && (
                <label
                  className="w-28 h-28 flex justify-center items-center bg-secondary-light rounded-lg relative cursor-pointer data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed"
                  data-disabled={isUploading}
                >
                  <PlusIcon className="w-16 h-16" />
                  <Input
                    className="absolute p-0 h-full inset-0 opacity-0 z-10 cursor-pointer invisible"
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    multiple
                    value={""}
                    onChange={onUploadImage}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
          </FormControl>
          <FormDescription hidden>This is product photos.</FormDescription>
          <FormMessage className="px-4" />
        </FormItem>
      )}
    />
  );
}

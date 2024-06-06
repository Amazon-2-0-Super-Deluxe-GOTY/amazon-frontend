"use client";
import { uploadProductImage as uploadImage } from "@/api/products";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useOptimistic, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/components/Shared/Modal";
import { isImageValid } from "@/lib/products";
import { AlertDialog } from "@/components/Admin/AlertDialog";

const maxImages = 1;

const FormSchema = z.object({
  images: z
    .array(z.object({ id: z.string(), imageUrl: z.string() }))
    .min(1, { message: "Add at least one photo" })
    .max(maxImages, { message: `${maxImages} images maximum.` }),
});

type FormValues = z.infer<typeof FormSchema>;

export function ChangePhotoForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      images: [],
    },
  });
  const imagesArray = useFieldArray({
    control: form.control,
    name: "images",
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });
  const { showModal } = useModal();

  const [uploadLoadingElements, setUploadLoadingElements] = useOptimistic<
    undefined[]
  >([]);
  const [isUploading, startUploadTransition] = useTransition();

  function onUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const filesSliced = filesArray.slice(0, maxImages);
    const filesToUpload = filesSliced.filter(isImageValid);

    if (filesSliced.length > filesToUpload.length) {
      showModal({
        component: AlertDialog,
        props: {
          title: "Error",
          text: "Your file exceeds 5 MB or does not match any format, namely JPEG or PNG.",
          buttonConfirmText: "Try again",
          buttonCloseText: "Back",
          variant: "primary",
        },
      });
      return;
    }

    startUploadTransition(async () => {
      setUploadLoadingElements(Array.from({ length: filesToUpload.length }));
      const data = await uploadImageMutation.mutateAsync(filesToUpload);
      if (data.status === 200) {
        imagesArray.append(data.data);
      }
    });
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <fieldset id="form-general">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex justify-center items-center relative">
                      <Button
                        variant={"secondary"}
                        className="text-sm md:text-base"
                      >
                        Change photo
                      </Button>
                      <Input
                        className="absolute p-0 h-full inset-0 opacity-0 z-10 cursor-pointer"
                        type="file"
                        accept="image/jpg,image/jpeg,image/png"
                        multiple
                        value={""}
                        onChange={onUploadImage}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
        </fieldset>
      </form>
    </Form>
  );
}

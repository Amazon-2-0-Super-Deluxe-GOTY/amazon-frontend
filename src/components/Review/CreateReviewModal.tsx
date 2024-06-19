import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  createReview,
  updateReview,
  type Review,
  type ReviewTag,
} from "@/api/review";
import { CreateReviewForm } from "../forms/admin/CreateReviewForm";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

interface Props {
  productId: string;
  review?: Review;
  reviewTags: ReviewTag[];
  closeModal: (param?: { action: "CLOSE" } | { action: "CONFIRM" }) => void;
}

type FormValues = {
  rating: number;
  title?: string | undefined;
  text?: string | undefined;
  images?:
    | {
        id: string;
        imageUrl: string;
      }[]
    | undefined;
  tagsIds?:
    | {
        id: string;
      }[]
    | undefined;
};

export function CreateReviewModal({
  productId,
  review,
  reviewTags,
  closeModal,
}: Props) {
  const createReviewMutation = useMutation({
    mutationFn: createReview,
  });
  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
  });

  const isEdit = !!review;
  const validationErrors = isEdit
    ? updateReviewMutation.data?.status === 400
      ? updateReviewMutation.data.data
      : []
    : createReviewMutation.data?.status === 400
    ? createReviewMutation.data.data
    : [];

  const defaultValues = useMemo(() => {
    if (!review) return undefined;
    return {
      title: review?.title,
      text: review?.text,
      rating: review.mark,
      images: review.reviewImages,
      tagsIds: review.reviewTags,
    };
  }, [review]);

  function onSubmit(values: FormValues) {
    if (isEdit) {
      updateReviewMutation
        .mutateAsync({
          reviewId: review.id,
          productId,
          rating: values.rating,
          title: values.title,
          text: values.text,
          reviewImagesIds: values.images?.map((i) => i.id),
          reviewTagsIds: values.tagsIds?.map((t) => t.id),
        })
        .then(() => closeModal({ action: "CONFIRM" }));
    } else {
      createReviewMutation
        .mutateAsync({
          productId,
          rating: values.rating,
          title: values.title,
          text: values.text,
          reviewImagesIds: values.images?.map((i) => i.id),
          reviewTagsIds: values.tagsIds?.map((t) => t.id),
        })
        .then(() => closeModal({ action: "CONFIRM" }));
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(val) => !val && closeModal({ action: "CLOSE" })}
    >
      <DialogContent className="w-full max-w-[822px] h-[70vh]" hideClose>
        <div className="h-full max-h-full overflow-hidden flex flex-col gap-6">
          <div className="space-y-3.5">
            <h2 className="text-heading-2 font-semibold">
              {isEdit ? "Edit review" : "Create review"}
            </h2>
            <Separator />
          </div>
          <ScrollArea className="grow">
            <CreateReviewForm
              defaultValues={defaultValues}
              reviewTags={reviewTags}
              onSubmit={onSubmit}
              validationErrors={validationErrors}
            />
          </ScrollArea>
          <div className="flex justify-end gap-3.5 bg-background">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => closeModal({ action: "CLOSE" })}
              disabled={
                createReviewMutation.isPending || updateReviewMutation.isPending
              }
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-review-form"
              disabled={
                createReviewMutation.isPending || updateReviewMutation.isPending
              }
            >
              {isEdit ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { textAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import type { Review } from "./types";
import { Separator } from "../ui/separator";
import React from "react";
import { ChevronLeft, ChevronRight, StarIcon, X } from "lucide-react";
import clsx from "clsx";
import { formatReviewDate } from "@/lib/date";
import { Button } from "../ui/button";
import { ReviewTags } from "./ReviewTags";
import { MediaQueryCSS } from "../MediaQuery";
import { getRatesCountString } from "@/lib/review";

export const ReviewCardFull = ({
  isOpen,
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  closeModal,
}: {
  review?: Review;
  isOpen: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  closeModal: () => void;
}) => {
  const starsElements = React.useMemo(() => {
    if (!review) return [];
    const maxRating = 5;
    const elems = [];
    for (let i = 0; i < maxRating; i++) {
      elems.push(
        <StarIcon
          className={clsx("w-4 h-4", i < review.rating && "fill-black")}
          key={i}
        />
      );
    }
    return elems;
  }, [!!review]);

  if (!review) return null;

  return (
    <Sheet open={isOpen} onOpenChange={closeModal}>
      <SheetContent
        className="sm:max-w-2xl w-full flex flex-col"
        hideClose={true}
      >
        <div className="space-y-6 grow">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={review.user.avatar} />
                <AvatarFallback>
                  {textAvatar(review.user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span>{review.user.fullName}</span>
                <MediaQueryCSS minSize="md">
                  <div className="flex items-center gap-1 lg:gap-2 h-5 text-xs lg:text-base">
                    <span>{review.user.location}</span>
                    <Separator orientation="vertical" />
                    <span>{formatReviewDate(review.createdAt)}</span>
                  </div>
                </MediaQueryCSS>
              </div>
            </div>
            <div className="flex items-center gap-6 ml-auto mr-[10%]">
              <button
                className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                disabled={!hasPrev}
                onClick={onPrev}
              >
                <ChevronLeft className="group-disabled:stroke-gray-300" />
              </button>
              <button
                className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                disabled={!hasNext}
                onClick={onNext}
              >
                <ChevronRight className="group-disabled:stroke-gray-300" />
              </button>
            </div>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>

          <Separator orientation="horizontal" />

          <div className="mb-4">
            <div className="flex items-center gap-2 lg:gap-4 h-5 text-xs lg:text-base">
              <div className="flex items-center gap-1 h-full">
                {starsElements}
              </div>
              {review.options.map((opt, i) => (
                <React.Fragment key={i}>
                  <Separator orientation="vertical" />
                  <span>
                    {opt.title}: {opt.value}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <p className="font-semibold">{review.title}</p>
            <p className="whitespace-pre-line">{review.text}</p>
          </div>
          {!!review.tags?.length && <ReviewTags tags={review.tags} />}
        </div>
        <div>
          <Separator orientation="horizontal" />
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 mt-6">
            <div className="flex gap-4">
              <Button variant={review.isRatedByUser ? "default" : "outline"}>
                Helpful
              </Button>
              <Button variant={"outline"}>Report</Button>
            </div>
            <span className="text-sm lg:text-base">
              {getRatesCountString(review)}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

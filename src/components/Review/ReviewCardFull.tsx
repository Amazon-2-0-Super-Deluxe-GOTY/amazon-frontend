import { textAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent } from "../ui/sheet";
import type { Review } from "@/api/review";
import { Separator } from "../ui/separator";
import React, { useState } from "react";
import clsx from "clsx";
import { formatReviewDate } from "@/lib/date";
import { Button } from "../ui/button";
import { ReviewTags } from "./ReviewTags";
import { getRatesCountString } from "@/lib/review";
import { useScreenSize } from "@/lib/media";
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { SheetHeader } from "../Shared/SteetParts";
import { ScrollArea } from "../ui/scroll-area";
import { getReviewTranslation } from "@/api/review";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpIcon,
  StarEmptyIcon,
  StarFullIcon,
  XIcon,
} from "../Shared/Icons";
import { AvatarDefaultFallback } from "../Shared/AvatarDefaultFallback";

interface ReviewCardProps {
  review: Review;
  isOpen: boolean;
  startImageIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  isOwnReview?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onLike: () => void;
  closeModal: () => void;
}

export const ReviewCardFull = ({
  isOpen,
  startImageIndex,
  review,
  hasPrev,
  hasNext,
  isOwnReview = false,
  onPrev,
  onNext,
  onLike,
  closeModal,
}: ReviewCardProps) => {
  const isDesktop = useScreenSize({ minSize: "lg" });
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [translatedReviews, setTranslatedReviews] = useState<string[]>([]);
  const displayTranslationButton =
    !isOwnReview && Boolean(review.title || review.text);

  const translation = useQuery<{ title: string; text: string }>({
    queryKey: ["translation", review.id],
    queryFn: () => getReviewTranslation(review.id, navigator.language),
    enabled: false,
  });

  const onTranslate = async (id: string) => {
    if (translatedReviews.includes(id)) {
      setTranslatedReviews(translatedReviews.filter((i) => i !== id));
    } else {
      if (!translation.isFetched) {
        await translation.refetch();
      }
      setTranslatedReviews([...translatedReviews, id]);
    }
  };

  const onImageExpandToggle = () => setIsImageExpanded((v) => !v);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeModal();
      setIsImageExpanded(false);
    }
  };

  const withImages = !!review.reviewImages?.length;

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          className={clsx(
            "sm:max-w-full w-[40vw] flex flex-col gap-6 transition-transform",
            isImageExpanded && "translate-x-full"
          )}
          hideClose={true}
        >
          <ReviewHeaderDesktop
            review={review}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={onPrev}
            onNext={onNext}
          />
          <ScrollArea className="grow">
            <ReviewBody
              review={review}
              displayTranslationButton={displayTranslationButton}
              isTranslated={translatedReviews.includes(review.id)}
              isLoading={translation.isLoading}
              translation={translation.data}
              onTranslate={onTranslate}
            />
          </ScrollArea>
          <ReviewFooter
            review={review}
            displayLikeButton={!isOwnReview}
            onLike={onLike}
          />
          {withImages && (
            <ReviewImageCarouselDesktop
              images={review.reviewImages.map((i) => i.imageUrl)}
              isImageExpanded={isImageExpanded}
              onToggle={onImageExpandToggle}
              startImageIndex={startImageIndex}
            />
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent
          className={clsx(
            "transition-all",
            withImages ? "h-[45vh]" : "h-[63vh]",
            isImageExpanded && "[translate:0%_100%]"
          )}
        >
          <div className="px-4 py-3 h-full flex flex-col gap-3 overflow-y-auto">
            <ReviewHeaderMobile
              review={review}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onPrev={onPrev}
              onNext={onNext}
            />
            <ReviewBody
              review={review}
              displayTranslationButton={displayTranslationButton}
              isTranslated={translatedReviews.includes(review.id)}
              isLoading={translation.isLoading}
              translation={translation.data}
              onTranslate={onTranslate}
            />
            <ReviewFooter
              review={review}
              displayLikeButton={!isOwnReview}
              onLike={onLike}
            />
          </div>
          {withImages && (
            <ReviewImageCarouselMobile
              images={review.reviewImages.map((i) => i.imageUrl)}
              isImageExpanded={isImageExpanded}
              onToggle={onImageExpandToggle}
              startImageIndex={startImageIndex}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface BasePartProps {
  review: Review;
}

interface HeaderControlsProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface ReviewImageCarouselProps {
  images: string[];
  startImageIndex: number;
  isImageExpanded: boolean;
  onToggle: () => void;
}

interface ReviewHeaderProps extends BasePartProps, HeaderControlsProps {}

interface ReviewBodyProps extends BasePartProps {
  displayTranslationButton: boolean;
  isTranslated: boolean;
  isLoading: boolean;
  translation?: { title: string; text: string };
  onTranslate: (id: string) => void;
}

interface ReviewFooterProps extends BasePartProps {
  displayLikeButton: boolean;
  onLike: () => void;
}

const HeaderControls = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: HeaderControlsProps) => {
  return (
    <div className="flex items-center gap-6">
      <button
        className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <ChevronLeftIcon className="stroke-3 group-disabled:opacity-25" />
      </button>
      <button
        className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasNext}
        onClick={onNext}
      >
        <ChevronRightIcon className="stroke-3 group-disabled:opacity-25" />
      </button>
    </div>
  );
};

const ReviewImageCarouselDesktop = ({
  images,
  isImageExpanded,
  onToggle,
  startImageIndex,
}: ReviewImageCarouselProps) => {
  return (
    // calc(width + parent padding)
    <div
      className={clsx(
        "fixed top-0 bottom-0",
        isImageExpanded
          ? "inset-0 w-screen px-[15%] -translate-x-full"
          : "w-[60vw] -translate-x-[calc(60vw+1.5rem)] px-6"
      )}
    >
      <Carousel
        opts={{
          align: "center",
          startIndex: startImageIndex,
        }}
      >
        <CarouselContent>
          {images.map((img, index) => {
            return (
              <CarouselItem
                className={clsx(
                  "h-screen w-full",
                  isImageExpanded ? "py-6" : "py-[15%]"
                )}
                key={index}
              >
                <div className="h-full w-full mx-auto relative">
                  <Image
                    src={img}
                    alt="Placeholder"
                    fill={true}
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <button
        className="absolute top-6 right-6 w-10 h-10 bg-background rounded-full flex justify-center items-center text-secondary"
        onClick={onToggle}
      >
        {isImageExpanded ? (
          <ChevronsLeftIcon className="stroke-3" />
        ) : (
          <ChevronsRightIcon className="stroke-3" />
        )}
      </button>
    </div>
  );
};

const ReviewImageCarouselMobile = ({
  images,
  startImageIndex,
  isImageExpanded,
  onToggle,
}: ReviewImageCarouselProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 -translate-y-full">
      <Carousel
        opts={{
          align: "center",
          startIndex: startImageIndex,
        }}
      >
        <CarouselContent>
          {images.map((img, index) => {
            return (
              <CarouselItem
                className={clsx(
                  "max-h-[55vh] h-screen py-3 transition-all",
                  isImageExpanded && "max-h-screen py-[13vh]"
                )}
                key={index}
              >
                <div className="h-full relative">
                  <Image
                    src={img}
                    alt="Placeholder"
                    fill={true}
                    className="object-contain"
                    onClick={onToggle}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {isImageExpanded && (
        <button
          className="absolute bottom-[6vh] right-4 w-10 h-10 bg-background text-secondary rounded-full flex justify-center items-center"
          onClick={onToggle}
        >
          <ChevronsUpIcon />
        </button>
      )}
    </div>
  );
};

const ReviewHeaderDesktop = ({
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ReviewHeaderProps) => {
  const fullName = `${review.user.firstName} ${review.user.lastName}`;
  return (
    <SheetHeader
      element={
        <div className="flex items-center gap-2 mr-auto">
          <Avatar className="w-12 h-12">
            <AvatarImage src={review.user.avatarUrl} />
            <AvatarDefaultFallback />
          </Avatar>
          <div>
            <p className="text-lg">{fullName}</p>
            <p className="text-sm">
              {formatReviewDate(new Date(review.createdAt))}
            </p>
          </div>
        </div>
      }
      pageControls={{ hasPrev, hasNext, onPrev, onNext }}
    />
  );
};

const ReviewHeaderMobile = ({
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ReviewHeaderProps) => {
  const fullName = `${review.user.firstName} ${review.user.lastName}`;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full flex justify-between items-center mb-1 text-secondary">
        <HeaderControls
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={onPrev}
          onNext={onNext}
        />
        <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
          <XIcon className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DrawerClose>
      </div>
      <Separator orientation="horizontal" />
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={review.user.avatarUrl} />
            <AvatarDefaultFallback />
          </Avatar>
          <span>{fullName}</span>
        </div>
        <div className="text-xs text-end">
          <p>{formatReviewDate(new Date(review.createdAt))}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewBody = ({
  review,
  displayTranslationButton,
  isLoading,
  isTranslated,
  translation,
  onTranslate,
}: ReviewBodyProps) => {
  const starsElements = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) =>
      index < review.mark ? (
        <StarFullIcon className="w-6 h-6" key={index} />
      ) : (
        <StarEmptyIcon className="w-6 h-6" key={index} />
      )
    );
  }, [review.mark]);

  const handleTranslate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onTranslate(review.id);
  };

  return (
    <div className="grow space-y-3 lg:space-y-4">
      <div className="-mt-0.5 lg:mt-0">
        <div className="flex items-center gap-1 h-full">{starsElements}</div>
      </div>
      <div className="space-y-2">
        <p className="font-bold text-lg">{review.title}</p>
        <p className="whitespace-pre-line">{review.text}</p>
      </div>
      {isTranslated && !!translation && (
        <>
          <Separator orientation="horizontal" />
          <div className="space-y-2">
            <p className="font-semibold">{translation.title}</p>
            <p className="whitespace-pre-line">{translation.text}</p>
          </div>
        </>
      )}
      {displayTranslationButton && (
        <Button
          variant={"secondary"}
          onClick={handleTranslate}
          disabled={isLoading}
        >
          {isTranslated
            ? "Hide translation"
            : isLoading
            ? "Translating..."
            : "Translate"}
        </Button>
      )}
      {!!review.reviewTags?.length && <ReviewTags tags={review.reviewTags} />}
    </div>
  );
};

const ReviewFooter = ({
  review,
  displayLikeButton,
  onLike,
}: ReviewFooterProps) => {
  const ratesString = getRatesCountString(review);

  if (!ratesString && !displayLikeButton) return null;

  return (
    <div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 mt-3 lg:mt-6">
        {displayLikeButton && (
          <Button
            variant={review.currentUserLiked ? "primary" : "secondary"}
            onClick={onLike}
          >
            Helpful
          </Button>
        )}
        <span className="text-sm lg:text-base">{ratesString}</span>
      </div>
    </div>
  );
};

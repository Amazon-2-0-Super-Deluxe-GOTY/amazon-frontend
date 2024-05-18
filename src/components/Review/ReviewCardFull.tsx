import { textAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetClose, SheetContent } from "../ui/sheet";
import type { Review } from "./types";
import { Separator } from "../ui/separator";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpIcon,
  StarIcon,
  X,
} from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { getReviewTranslation } from "@/api/review";

interface ReviewCardProps {
  review: Review;
  isOpen: boolean;
  startImageIndex: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  closeModal: () => void;
}

export const ReviewCardFull = ({
  isOpen,
  startImageIndex,
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  closeModal,
}: ReviewCardProps) => {
  const isDesktop = useScreenSize({ minSize: "lg" });
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isInUserLanguage, setIsInUserLanguage] = useState(true);
  const [translatedReviews, setTrenslatedReviews] = useState<string[]>([]);

  const translation = useQuery<{ title: string; text: string }>({
    queryKey: ["translation", review.id],
    queryFn: () => getReviewTranslation(review.id, navigator.language),
    enabled: false,
  });

  React.useEffect(() => {
    const browserLang = navigator.language;
    setIsInUserLanguage(review.language.startsWith(browserLang));
  }, []);

  const onTranslate = async (id: string) => {
    if (translatedReviews.includes(id)) {
      setTrenslatedReviews(translatedReviews.filter((i) => i !== id));
    } else {
      if (!translation.isFetched) {
        await translation.refetch();
      }
      setTrenslatedReviews([...translatedReviews, id]);
    }
  };

  const onImageExpandToggle = () => setIsImageExpanded((v) => !v);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeModal();
      setIsImageExpanded(false);
    }
  };

  const withImages = !!review.images?.length;

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
              isInUserLanguage={isInUserLanguage}
              isTranslated={translatedReviews.includes(review.id)}
              isLoading={translation.isLoading}
              translation={translation.data}
              onTranslate={onTranslate}
            />
          </ScrollArea>
          <ReviewFooter review={review} />
          {withImages && (
            <ReviewImageCarouselDesktop
              images={review.images!}
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
              isInUserLanguage={isInUserLanguage}
              isTranslated={translatedReviews.includes(review.id)}
              isLoading={translation.isLoading}
              translation={translation.data}
              onTranslate={onTranslate}
            />
            <ReviewFooter review={review} />
          </div>
          {withImages && (
            <ReviewImageCarouselMobile
              images={review.images!}
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
  isInUserLanguage: boolean;
  isTranslated: boolean;
  isLoading: boolean;
  translation?: { title: string; text: string };
  onTranslate: (id: string) => void;
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
                    className="object-cover"
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
        className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex justify-center items-center"
        onClick={onToggle}
      >
        {isImageExpanded ? <ChevronsLeftIcon /> : <ChevronsRightIcon />}
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
                    className="object-cover"
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
          className="absolute bottom-[6vh] right-4 w-10 h-10 bg-white rounded-full flex justify-center items-center"
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
  return (
    <SheetHeader
      element={
        <div className="flex items-center gap-2 mr-auto">
          <Avatar>
            <AvatarImage src={review.user.avatar} />
            <AvatarFallback>{textAvatar(review.user.fullName)}</AvatarFallback>
          </Avatar>
          <div className="text-sm xl:text-base">
            <span>{review.user.fullName}</span>
            <div className="flex items-center gap-2 h-5">
              <span>{review.user.location}</span>
              <Separator orientation="vertical" />
              <span>{formatReviewDate(review.createdAt)}</span>
            </div>
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
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full flex justify-between items-center mb-1">
        <HeaderControls
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={onPrev}
          onNext={onNext}
        />
        <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DrawerClose>
      </div>
      <Separator orientation="horizontal" />
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={review.user.avatar} />
            <AvatarFallback>{textAvatar(review.user.fullName)}</AvatarFallback>
          </Avatar>
          <span>{review.user.fullName}</span>
        </div>
        <div className="text-xs text-end">
          <p>{review.user.location}</p>
          <p>{formatReviewDate(review.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewBody = ({
  review,
  isInUserLanguage,
  isLoading,
  isTranslated,
  translation,
  onTranslate,
}: ReviewBodyProps) => {
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
  }, [review.rating]);

  const handleTranslate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onTranslate(review.id);
  };

  return (
    <div className="grow space-y-3 lg:space-y-4">
      <div className="-mt-0.5 lg:mt-0">
        <div className="flex items-center gap-2 lg:gap-4 h-5 text-xs lg:text-base">
          <div className="flex items-center gap-1 h-full">{starsElements}</div>
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
      <div className="space-y-2">
        <p className="font-semibold">{review.title}</p>
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
      {!isInUserLanguage && (
        <Button
          variant={"outline"}
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
      {!!review.tags?.length && <ReviewTags tags={review.tags} />}
    </div>
  );
};

const ReviewFooter = ({ review }: BasePartProps) => {
  return (
    <div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 mt-3 lg:mt-6">
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
  );
};

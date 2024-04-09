import React from "react";
import type { Review } from "./types";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { formatReviewDate } from "@/lib/date";
import { Button } from "../ui/button";
import clsx from "clsx";
import { textAvatar } from "@/lib/utils";
import Image from "next/image";
import { MediaQueryCSS } from "../MediaQuery";

export const ReviewCard = ({ review }: { review: Review }) => {
  const maxImages = 5;
  const starsElements = React.useMemo(() => {
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
  }, []);

  return (
    <div className="pt-3 lg:pt-10 border-t-2">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={review.user.avatar} />
              <AvatarFallback>
                {textAvatar(review.user.fullName)}
              </AvatarFallback>
            </Avatar>
            <span>{review.user.fullName}</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2 h-5 text-xs lg:text-base">
            <span>{review.user.location}</span>
            <Separator orientation="vertical" />
            <span>{formatReviewDate(review.createdAt)}</span>
          </div>
        </div>
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
      <div className="mb-6">
        <p className="font-semibold">{review.title}</p>
        <p className="whitespace-pre-line">{review.text}</p>
      </div>
      {!!review.images?.length && (
        <ImagesList
          images={review.images.slice(0, maxImages)}
          imagesLeft={review.images.length - maxImages}
        />
      )}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
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

const ImagesList = ({
  images,
  imagesLeft,
}: {
  images: string[];
  imagesLeft?: number;
}) => {
  return (
    <div className="mb-6 flex gap-4 overflow-y-auto">
      {images.map((img, i) => (
        <figure
          className="relative w-full min-w-20 max-w-28 aspect-square rounded-md overflow-hidden"
          key={i}
        >
          <Image
            src={img}
            fill={true}
            alt="Placeholder"
            className="object-cover"
          />
          {!!imagesLeft && imagesLeft > 0 && i + 1 === images.length && (
            <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
              <span className="text-2xl text-white pointer-events-none">
                +{imagesLeft}
              </span>
            </div>
          )}
        </figure>
      ))}
    </div>
  );
};

const getRatesCountString = (review: Review) => {
  if (review.reviewRatesCount === 0) return "";

  if (review.reviewRatesCount === 1) {
    if (review.isRatedByUser) {
      return "You found this helpful";
    }
    return "1 person found this helpful";
  }

  return (
    (review.isRatedByUser ? "You and " : "") +
    `${review.reviewRatesCount} people found this helpful`
  );
};

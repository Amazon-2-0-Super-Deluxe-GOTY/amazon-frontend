import React, { useState } from "react";
import type { Review } from "@/api/review";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { formatReviewDate } from "@/lib/date";
import { Button } from "../ui/button";
import { textAvatar } from "@/lib/utils";
import Image from "next/image";
import { ReviewTags } from "./ReviewTags";
import { getRatesCountString } from "@/lib/review";
import { useQuery } from "@tanstack/react-query";
import { getReviewTranslation } from "@/api/review";
import { MeatballMenuIcon, StarEmptyIcon, StarFullIcon } from "../Shared/Icons";
import { Card } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ReviewCard = ({
  review,
  onClick,
  onImageClick,
  onLike,
}: {
  review: Review;
  onClick: () => void;
  onImageClick: (imageIndex: number) => void;
  onLike: () => void;
}) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const displayTranslationButton = Boolean(review.title || review.text);

  const fullName = `${review.user.firstName} ${review.user.lastName}`;

  const translation = useQuery<{ title: string; text: string }>({
    queryKey: ["translation", review.id],
    queryFn: () => getReviewTranslation(review.id, navigator.language),
    enabled: false,
  });

  const maxImages = 5;
  const starsElements = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) =>
      index < review.mark ? (
        <StarFullIcon className="w-6 h-6" key={index} />
      ) : (
        <StarEmptyIcon className="w-6 h-6" key={index} />
      )
    );
  }, [review.mark]);

  const onTranslate = async () => {
    if (isTranslated) {
      setIsTranslated(false);
    } else {
      if (!translation.isFetched && !translation.isSuccess) {
        await translation.refetch();
      }
      setIsTranslated(true);
    }
  };

  return (
    <div className="pt-3 lg:pt-10 first-of-type:pt-0 border-t-[2.5px] first-of-type:border-none space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={review.user.avatarUrl} />
              <AvatarFallback>{textAvatar(fullName)}</AvatarFallback>
            </Avatar>
            <span className="text-base lg:text-lg">{fullName}</span>
          </div>
          <span className="text-xs lg:text-sm">
            {formatReviewDate(new Date(review.createdAt))}
          </span>
        </div>
      </div>
      <div className="cursor-pointer space-y-4" onClick={onClick}>
        <div className="flex items-center -mt-2">{starsElements}</div>
        {(!!review.title || !!review.text) && (
          <div>
            {!!review.title && (
              <p className="font-bold text-lg mb-2">{review.title}</p>
            )}
            {!!review.text && (
              <p className="whitespace-pre-line">{review.text}</p>
            )}
          </div>
        )}
        {isTranslated && !!translation.data && (
          <>
            <Separator orientation="horizontal" />
            <div>
              <p className="font-semibold">{translation.data.title}</p>
              <p className="whitespace-pre-line">{translation.data.text}</p>
            </div>
          </>
        )}
        {!!review.reviewImages?.length && (
          <ImagesList
            images={review.reviewImages
              .slice(0, maxImages)
              .map((i) => i.imageUrl)}
            imagesLeft={review.reviewImages.length - maxImages}
            onClick={onImageClick}
          />
        )}
        {!!review.reviewTags?.length && (
          <div className="pb-2">
            <ReviewTags tags={review.reviewTags} />
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <div className="flex gap-2 lg:gap-4 items-center h-10">
          <Button
            variant={review.currentUserLiked ? "primary" : "secondary"}
            onClick={onLike}
          >
            Helpful
          </Button>
          {displayTranslationButton && (
            <>
              <Separator orientation="vertical" />
              <Button
                variant={"secondary"}
                onClick={onTranslate}
                disabled={translation.isLoading}
              >
                {isTranslated
                  ? "Hide translation"
                  : translation.isLoading
                  ? "Translating..."
                  : "Translate"}
              </Button>
            </>
          )}
        </div>
        <span className="text-sm">{getRatesCountString(review)}</span>
      </div>
    </div>
  );
};

export const UserReviewCard = ({
  review,
  onClick,
  onEdit,
  onDelete,
  isDeleteInProgress,
}: {
  review: Review;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleteInProgress?: boolean;
}) => {
  const fullName = `${review.user.firstName} ${review.user.lastName}`;
  const ratesCountString = getRatesCountString(review);

  const maxImages = 5;
  const starsElements = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) =>
      index < review.mark ? (
        <StarFullIcon className="w-6 h-6" key={index} />
      ) : (
        <StarEmptyIcon className="w-6 h-6" key={index} />
      )
    );
  }, [review.mark]);

  return (
    <Card className="p-6 space-y-4 relative">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={review.user.avatarUrl} />
              <AvatarFallback>{textAvatar(fullName)}</AvatarFallback>
            </Avatar>
            <span className="text-base lg:text-lg">{fullName}</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-3">
            <span className="text-xs lg:text-sm">
              {formatReviewDate(new Date(review.createdAt))}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="border-1.5 border-foreground/50 rounded-sm w-10 h-10 flex justify-center items-center">
                  <MeatballMenuIcon className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="px-4 py-2.5" onClick={onEdit}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-4 py-2.5 text-destructive"
                  onClick={onDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="cursor-pointer space-y-4" onClick={onClick}>
        <div className="flex items-center -mt-2">{starsElements}</div>
        {(!!review.title || !!review.text) && (
          <div>
            {!!review.title && (
              <p className="font-bold text-lg mb-2">{review.title}</p>
            )}
            {!!review.text && (
              <p className="whitespace-pre-line">{review.text}</p>
            )}
          </div>
        )}
        {!!review.reviewImages?.length && (
          <ImagesList
            images={review.reviewImages
              .slice(0, maxImages)
              .map((i) => i.imageUrl)}
            imagesLeft={review.reviewImages.length - maxImages}
          />
        )}
        {!!review.reviewTags?.length && (
          <div className="pb-2">
            <ReviewTags tags={review.reviewTags} />
          </div>
        )}
      </div>
      {!!ratesCountString && (
        <p className="text-sm text-end">{getRatesCountString(review)}</p>
      )}
      {isDeleteInProgress && <div className="absolute inset-0 bg-card/60" />}
    </Card>
  );
};

const ImagesList = ({
  images,
  imagesLeft,
  onClick,
}: {
  images: string[];
  imagesLeft?: number;
  onClick?: (index: number) => void;
}) => {
  return (
    <div className="mb-6 flex gap-4 overflow-y-auto">
      {images.map((img, i) => (
        <figure
          className="relative w-full min-w-20 max-w-28 aspect-square rounded-md overflow-hidden"
          key={i}
          onClick={() => onClick?.(i)}
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

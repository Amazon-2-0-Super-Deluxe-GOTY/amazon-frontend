import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { ArrowRightIcon } from "../Shared/Icons";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  link: string;
  image: { id: string; imageUrl: string };
}

export function CategoryCard({ title, link, image }: CategoryCardProps) {
  return (
    <Card className="@container border-hover-card group">
      <div className="max-w-44 @md-card:max-w-xs w-full rounded-lg p-3 @md-card:p-4">
        <div className="h-24 @md-card:h-32 w-full relative">
          <Image
            src={image.imageUrl}
            alt="Card image"
            fill
            className="max-w-full max-h-full object-cover rounded-sm"
          />
        </div>
        <div className="mt-2 flex flex-col justify-between gap-6">
          <p className="text-base @md-card:text-lg line-clamp-2">{title}</p>
          <div className="text-end flex justify-end items-center gap-1 @md-card:gap-2 pr-2">
            <span className="text-xs @md-card:text-sm">See all </span>
            <ArrowRightIcon className="ml-2 w-3 h-3 @md-card:w-4 @md-card:h-4 relative transition-[right] right-0 group-hover:-right-2" />
          </div>
        </div>
      </div>
    </Card>
  );
}

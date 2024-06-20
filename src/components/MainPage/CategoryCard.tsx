import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRightIcon } from "../Shared/Icons";
import Link from "next/link";
import type { Category } from "@/api/categories";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.id}`}
      className="@container w-full min-w-44"
    >
      <Card className="max-w-44 @sm-card:max-w-xs @md-card:max-w-full w-full rounded-lg border-hover-card group p-3 @md-card:p-4">
        <div className="h-24 @md-card:h-32 w-full relative">
          <Image
            src={category.image.url}
            alt="Card image"
            fill
            className="max-w-full max-h-full object-cover rounded-sm"
          />
        </div>
        <div className="mt-2 flex flex-col justify-between gap-6">
          <p className="text-base @md-card:text-lg line-clamp-2">
            {category.name}
          </p>
          <div className="text-end flex justify-end items-center gap-1 @md-card:gap-2 pr-2">
            <span className="text-xs @md-card:text-sm">See all</span>
            <ChevronRightIcon className="ml-2 w-3 h-3 @md-card:w-4 @md-card:h-4 relative transition-[right] right-0 group-hover:-right-2 stroke-secondary" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

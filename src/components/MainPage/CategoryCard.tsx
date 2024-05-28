import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { ProductImage } from "@/api/products";
import { cva } from "class-variance-authority";
import { ArrowRightIcon } from "../Shared/Icons";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  link: string;
  images: ProductImage[];
}

const categoryCardImageElement = cva("relative", {
  variants: {
    imagesCount: {
      "1": "",
      "2": "",
      "3": "",
      "4": "",
    } as { [key: string]: string },
    index: {
      "0": "",
      "1": "",
      "2": "",
      "3": "",
    } as { [key: string]: string },
  },
  compoundVariants: [
    {
      imagesCount: "1",
      index: "0",
      class: "col-span-2 row-span-2",
    },
    {
      imagesCount: "2",
      index: "0",
      class: "row-span-2",
    },
    {
      imagesCount: "2",
      index: "1",
      class: "row-span-2",
    },
    {
      imagesCount: "3",
      index: "0",
      class: "row-span-2",
    },
  ],
});

export function CategoryCard({ title, link, images }: CategoryCardProps) {
  const imagesCount = images.length.toString();

  return (
    <Card className="min-w-44 max-w-44 lg:max-w-xs w-full border-2 border-gradient gradient-gray rounded-lg shadow-none p-4 bg-muted group">
      <div className="h-32 w-full grid grid-cols-2 grid-rows-2 gap-1">
        {images.map((img, i) => (
          <div
            className={categoryCardImageElement({
              imagesCount,
              index: i.toString(),
            })}
            key={i}
            data-index={i}
          >
            <Image
              src={img.imageUrl}
              alt="Card image"
              fill
              className="max-w-full max-h-full object-cover rounded-sm"
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-col justify-between gap-6">
        <p className="text-lg line-clamp-2">{title}</p>
        <div className="text-end">
          <Link
            href={link}
            className="flex justify-end items-center gap-2 pr-2"
          >
            See all{" "}
            <ArrowRightIcon className="ml-2 w-4 h-4 relative transition-[right] right-0 group-hover:-right-2" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

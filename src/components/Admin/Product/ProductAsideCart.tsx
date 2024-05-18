import type { ProductShort } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { FilePenLineIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductAsideCardProps {
  product?: ProductShort;
  onDelete: (id: string) => void;
}

const maxImages = 4;

export function ProductAsideCard({ product, onDelete }: ProductAsideCardProps) {
  const displayedImages = product ? product.images.slice(0, maxImages) : [];
  const imagesLeft = (product?.images.length ?? 0) - displayedImages.length;
  const isMoreImages = imagesLeft > 0;

  const handleDelete = () => {
    product && onDelete(product.id);
  };

  return (
    <aside className="lg:basis-1/3 grow bg-gray-200 rounded-lg sticky top-0 max-h-[85vh]">
      {!!product ? (
        <div className="flex flex-col gap-3.5 h-full p-6">
          <div className="grid grid-cols-3 grid-rows-4 gap-2 h-1/2">
            {displayedImages.map((img, i) => (
              <Image
                src={img}
                alt={`Product image ${i + 1}`}
                key={i}
                className={clsx(
                  "object-cover w-full h-full first:col-span-3 first:row-span-3",
                  isMoreImages &&
                    "last-of-type:col-start-3 last-of-type:row-start-4"
                )}
              />
            ))}
            {isMoreImages && (
              <button className="col-start-3 row-start-4 w-full h-full bg-black/55 flex justify-center items-center text-white text-lg">
                +{imagesLeft}
              </button>
            )}
          </div>
          <h2 className="font-semibold text-2xl">{product.name}</h2>
          <Separator className="bg-black" />
          <Button
            variant={"link"}
            className="mt-2.5 text-lg justify-start px-0"
          >
            See all customer reviews
          </Button>
          <div className="mt-auto flex gap-3.5">
            <Link
              href={`/products/create?productId=${product.id}`}
              className="w-full"
            >
              <Button className="w-full flex items-center gap-2 text-base">
                <FilePenLineIcon className={"w-5 h-5"} />
                Edit
              </Button>
            </Link>
            <Button
              className="w-full flex items-center gap-2 text-base"
              onClick={handleDelete}
            >
              <Trash2Icon className={"w-5 h-5"} />
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <p className="px-6 py-3 rounded-sm bg-gray-100 w-max">
            Select a product to see its information
          </p>
        </div>
      )}
    </aside>
  );
}

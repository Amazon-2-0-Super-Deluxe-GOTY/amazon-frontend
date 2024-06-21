import type { ProductShort } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "../../Shared/Modal";
import { ProductImageFullView } from "@/components/Product/ProductImageFullView";
import { EditIcon, TrashIcon } from "@/components/Shared/Icons";

interface ProductAsideCardProps {
  product?: ProductShort;
  isButtonsDisabled?: boolean;
  onDelete: (id: string) => void;
}

const maxImages = 4;

export function ProductAsideCard({
  product,
  isButtonsDisabled,
  onDelete,
}: ProductAsideCardProps) {
  const { showModal } = useModal();
  const displayedImages = product
    ? product.productImages.slice(0, maxImages)
    : [];
  const imagesLeft =
    (product?.productImages.length ?? 0) - displayedImages.length;
  const isMoreImages = imagesLeft > 0;

  const handleDelete = () => {
    product && onDelete(product.id);
  };

  const handlePreview = (startIndex: number) => () => {
    if (!product) return;
    showModal({
      component: ProductImageFullView,
      props: {
        images: product.productImages.map((img) => img.imageUrl),
        startIndex,
      },
    });
  };

  return (
    <aside className="lg:basis-1/3 grow bg-card rounded-lg sticky top-4 max-h-[85vh]">
      {!!product ? (
        <div className="flex flex-col gap-3.5 h-full p-6">
          <div className="grid grid-cols-3 grid-rows-4 gap-2 h-1/2">
            {displayedImages.map((img, i) => (
              <div
                className={clsx(
                  "relative w-full h-full first:col-span-3 first:row-span-3",
                  isMoreImages &&
                    "last-of-type:col-start-3 last-of-type:row-start-4"
                )}
                key={i}
              >
                <Image
                  src={img.imageUrl}
                  alt={`Product image ${i + 1}`}
                  fill
                  className={"object-cover"}
                  onClick={handlePreview(i)}
                />
              </div>
            ))}
            {isMoreImages && (
              <button
                className="col-start-3 row-start-4 w-full h-full bg-black/55 flex justify-center items-center text-white text-lg z-10"
                onClick={handlePreview(maxImages - 1)}
              >
                +{imagesLeft}
              </button>
            )}
          </div>
          <h2 className="font-semibold text-2xl">{product.name}</h2>
          <Separator />
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
              <Button
                variant={"secondary"}
                className="w-full flex items-center gap-2 text-base"
                disabled={isButtonsDisabled}
              >
                <EditIcon className={"w-6 h-6 text-secondary"} />
                Edit
              </Button>
            </Link>
            <Button
              variant={"destructive"}
              className="w-full flex items-center gap-2 text-base"
              onClick={handleDelete}
              disabled={isButtonsDisabled}
            >
              <TrashIcon className={"w-6 h-6 text-destructive"} />
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <p className="px-6 py-3 rounded-sm bg-secondary-light w-max text-lg">
            Select a product to see its information
          </p>
        </div>
      )}
    </aside>
  );
}

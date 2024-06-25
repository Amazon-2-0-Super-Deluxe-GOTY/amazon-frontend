import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { ProductImageFullView } from "../Product/ProductImageFullView";
import { useModal } from "../Shared/Modal";
import Image from "next/image";
import discountShape from "@/../public/Icons/discount-shape.svg";
import { useScreenSize } from "@/lib/media";

export const ProductImagesBlock = ({
  images,
  discountPercent,
}: {
  images: { id: string; imageUrl: string }[];
  discountPercent: number | null;
}) => {
  const [mainCarouselApi, setMainCarouselApi] = React.useState<CarouselApi>();
  const [previewCarouselApi, setPreviewCarouselApi] =
    React.useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const { showModal } = useModal();
  const isDesktop = useScreenSize({ minSize: "lg" });

  React.useEffect(() => {
    if (!mainCarouselApi) return;

    const onSlidesChange = (api: NonNullable<CarouselApi>) => {
      const index = api.selectedScrollSnap();
      setCurrentImageIndex(index);
      previewCarouselApi?.scrollTo(index);
    };

    mainCarouselApi.on("slidesInView", onSlidesChange);

    return () => {
      mainCarouselApi.off("slidesInView", onSlidesChange);
    };
  }, [mainCarouselApi, previewCarouselApi]);

  const onPreviewImageClick = (index: number) => () => {
    setCurrentImageIndex(index);
    mainCarouselApi?.scrollTo(index);
  };

  const openModal = () => {
    showModal({
      component: ProductImageFullView,
      props: {
        images: images.map((i) => i.imageUrl),
        startIndex: currentImageIndex,
      },
    });
  };

  return (
    <>
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          containScroll: "keepSnaps",
        }}
        setApi={setMainCarouselApi}
      >
        <CarouselContent>
          {images.map((image) => {
            return (
              <CarouselItem key={image.id} className="w-full">
                <Image
                  src={image.imageUrl}
                  width={1000}
                  height={700}
                  alt="Product"
                  className="object-cover rounded-lg aspect-square"
                  onClick={openModal}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        {!!discountPercent && (
          <div className="absolute top-4 right-4 w-20 h-12 md:w-24 md:h-16 xl:w-32 xl:h-20">
            <Image
              src={discountShape}
              alt="Discount"
              fill
              style={{
                filter: "drop-shadow(0px 4px 8px hsla(0, 0%, 3%, 0.25))",
              }}
            />
            <span className="absolute left-[18%] top-[20%] font-bold text-sm md:text-lg lg:text-2xl">
              -{discountPercent}%
            </span>
          </div>
        )}
      </Carousel>
      <div className="mt-2 lg:mt-4">
        <Carousel
          className="w-full"
          opts={{
            align: "center",
            containScroll: "keepSnaps",
          }}
          setApi={setPreviewCarouselApi}
        >
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem
                  key={image.id}
                  className={"basis-[unset] pl-2 md:pl-3"}
                >
                  <div className="relative cursor-pointer z-0">
                    <Image
                      src={image.imageUrl}
                      alt="Product"
                      width={isDesktop ? 80 : 60}
                      height={isDesktop ? 80 : 60}
                      className={"object-cover rounded-lg aspect-square"}
                      onClick={onPreviewImageClick(index)}
                    />
                    {currentImageIndex !== index && "brightness-30" && (
                      <div className="absolute inset-0 bg-black/35 rounded-lg pointer-events-none" />
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

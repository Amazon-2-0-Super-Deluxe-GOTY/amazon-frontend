import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import clsx from "clsx";
import { ProductImageFullView } from "../Product/ProductImageFullView";
import { useModal } from "../Shared/Modal";

export const ImagesBlock = ({
  images,
}: {
  images: { id: string; imageUrl: string }[];
}) => {
  const [mainCarouselApi, setMainCarouselApi] = React.useState<CarouselApi>();
  const [previewCarouselApi, setPreviewCarouselApi] =
    React.useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const { showModal } = useModal();

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
              <CarouselItem
                key={image.id}
                className="w-full aspect-square relative"
              >
                <Image
                  src={image.imageUrl}
                  fill
                  alt="Product"
                  className="object-cover rounded-lg"
                  onClick={openModal}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <span className="w-1/5 absolute top-[4%] lg:top-8 left-0 pl-[3%] py-2 bg-gray-50 rounded-e-full text-base lg:text-2xl">
          -24%
        </span>
      </Carousel>
      <div className="mt-2 lg:mt-8">
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
                  className={
                    "basis-[unset] pl-2 first:pl-4 lg:pl-6 md:pl-4 lg:first:pl-4"
                  }
                >
                  <div className="w-14 h-14 lg:w-20 lg:h-20 relative cursor-pointer z-0">
                    <Image
                      src={image.imageUrl}
                      alt="Product"
                      fill
                      className={clsx("object-cover rounded-lg")}
                      onClick={onPreviewImageClick(index)}
                    />
                    {currentImageIndex !== index && "brightness-30" && (
                      <div className="absolute inset-0 bg-black/75 rounded-lg pointer-events-none" />
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

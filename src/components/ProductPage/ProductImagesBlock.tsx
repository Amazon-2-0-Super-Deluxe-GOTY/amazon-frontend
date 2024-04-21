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

export const ImagesBlock = () => {
  const [mainCarouselApi, setMainCarouselApi] = React.useState<CarouselApi>();
  const [previewCarouselApi, setPreviewCarouselApi] =
    React.useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const currentImageIndexRef = React.useRef<number>(currentImageIndex);
  const [isOpen, setIsOpen] = React.useState(false);
  const images = React.useMemo(
    () => Array.from({ length: 10 }).map(() => placeholder),
    []
  );

  React.useEffect(() => {
    currentImageIndexRef.current = currentImageIndex;
  }, [currentImageIndex]);

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
  }, [mainCarouselApi]);

  const onPreviewImageClick = (index: number) => () => {
    setCurrentImageIndex(index);
    mainCarouselApi?.scrollTo(index);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
          {images.map((_, index) => {
            return (
              <CarouselItem key={index}>
                <Image
                  src={placeholder}
                  alt="Placeholder"
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
            {images.map((_, index) => {
              return (
                <CarouselItem
                  key={index}
                  className={
                    "basis-[unset] pl-2 first:pl-4 lg:pl-6 md:pl-4 lg:first:pl-4"
                  }
                >
                  <Image
                    src={placeholder}
                    alt="Placeholder"
                    className={clsx(
                      "w-14 h-14 lg:w-20 lg:h-20 object-cover rounded-lg",
                      currentImageIndex !== index && "brightness-75"
                    )}
                    onClick={onPreviewImageClick(index)}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
      <ProductImageFullView
        images={images}
        isOpen={isOpen}
        closeModal={closeModal}
        startIndex={currentImageIndex}
      />
    </>
  );
};

import { Dialog, DialogContent } from "../ui/dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { XIcon } from "../Shared/Icons";

interface Props {
  images: string[];
  startIndex?: number;
  closeModal: () => void;
}

export const ProductImageFullView = (props: Props) => {
  const apiRef = useRef<CarouselApi | null>(null);
  const onOpenChange = (value: boolean) => {
    if (!value) {
      props.closeModal();
    }
  };

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        apiRef.current?.scrollNext();
      } else if (e.key === "ArrowLeft") {
        apiRef.current?.scrollPrev();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-screen w-screen h-[68vh] lg:w-[83vw] lg:h-[95vh] p-0 bg-transparent border-none shadow-none"
        hideClose
      >
        <div className="w-full h-full relative">
          <Carousel
            className="w-full h-full [&>div]:h-full"
            opts={{ align: "center", startIndex: props.startIndex }}
            setApi={(api) => void (apiRef.current = api)}
          >
            <CarouselContent className="h-full">
              {props.images.map((img, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-full">
                    <Image
                      src={img}
                      alt="Product image"
                      className="object-contain"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="lg:-left-[5%]" />
            <CarouselNext className="lg:-right-[5%]" />
          </Carousel>
        </div>
        <button
          className="absolute -top-[20%] right-4 lg:top-auto lg:-right-[8%] w-10 h-10 bg-card rounded-full flex justify-center items-center"
          onClick={props.closeModal}
        >
          <XIcon />
        </button>
      </DialogContent>
    </Dialog>
  );
};

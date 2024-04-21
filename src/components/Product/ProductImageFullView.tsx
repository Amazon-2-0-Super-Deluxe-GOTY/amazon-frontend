import { Dialog, DialogContent } from "../ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { XIcon } from "lucide-react";

interface Props {
  images: string[];
  startIndex?: number;
  isOpen: boolean;
  closeModal: () => void;
}

export const ProductImageFullView = (props: Props) => {
  const onOpenChange = (value: boolean) => {
    if (!value) {
      props.closeModal();
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-screen w-screen h-[68vh] lg:w-[83vw] lg:h-[95vh] p-0"
        hideClose
      >
        <div className="w-full h-full relative">
          <Carousel
            className="w-full h-full [&>div]:h-full"
            opts={{ align: "center", startIndex: props.startIndex }}
          >
            <CarouselContent className="h-full">
              {props.images.map((img, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-full">
                    <Image
                      src={img}
                      alt="Product image"
                      className="object-cover"
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
          className="absolute -top-[20%] right-4 lg:top-auto lg:-right-[8%] w-10 h-10 bg-white rounded-full flex justify-center items-center"
          onClick={props.closeModal}
        >
          <XIcon />
        </button>
      </DialogContent>
    </Dialog>
  );
};

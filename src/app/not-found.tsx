import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center lg:gap-10 md:gap-7 gap-4 sm:px-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex max-w-[800px] max-h-[550px] min-h-[430px]">
            <Image
              src={placeholder}
              alt="Placeholder"
              className="object-cover"
            />
          </div>
          <span className="lg:text-2xl md:text-xl sm:text-base text-sm mx-3">
            This page has gone fishing...
          </span>
        </div>
        <div className="flex w-full justify-center">
          <Button className="sm:max-w-[400px] max-w-[260px] max-h-14 w-full h-full md:py-4 sm:py-3 py-2 mx-3">
            <a href="/" className="lg:text-xl text-base">
              Return to main page
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import NotFoundDesktop from "@/../public/not-found-desktop.webp";
import NotFoundMobile from "@/../public/not-found-mobile.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#3962A8]">
      <div className="flex flex-col justify-center items-center lg:gap-10 md:gap-7 gap-4 sm:px-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <picture className="block">
            <source media="(max-width: 640px)" srcSet={NotFoundMobile.src} />
            <Image
              src={NotFoundDesktop.src}
              alt="Octopus with text 404"
              width={800}
              height={550}
              className="object-cover"
            />
          </picture>
          <span className="w-full text-sm sm:text-base md:text-xl lg:text-2xl text-secondary-light text-center">
            This page has gone fishing...
          </span>
        </div>
        <div className="flex w-full justify-center items-center">
          <Link href={"/"} className="flex w-full justify-center items-center">
            <Button className="max-w-[260px] sm:max-w-[400px] max-h-14 w-full h-full py-2 px-4 sm:px-8 sm:py-3 md:py-4 text-base lg:text-xl">
              Return to main page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

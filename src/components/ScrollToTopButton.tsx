"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ScrollToTopArrow from "../../public/Icons/ScrollToTopArrow.svg";
import { cn } from "@/lib/utils";
import { useScreenSize } from '@/lib/media';

const ScrollToTopButton = () => {
  //#region isMobile
  const isMobile = useScreenSize({ maxSize: "sm" });
  //#endregion

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "fixed flex justify-center items-center focus:bg-slate-300 bg-gray-300 text-black right-4 bottom-4 lg:right-10 lg:bottom-10 w-12 h-12 rounded-lg transition-all duration-200 ease-in-out opacity-0 pointer-events-none",
          isVisible && "opacity-1 pointer-events-auto", isMobile && "right-[-2px] rounded-r-none lg:right-[-2px]"
        )}
        onClick={scrollToTop}
      >
        <Image src={ScrollToTopArrow} alt="Scroll to top" />
      </Button>
    </div>
  );

}

export default ScrollToTopButton;

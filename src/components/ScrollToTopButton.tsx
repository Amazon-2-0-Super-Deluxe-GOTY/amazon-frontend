"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ScrollToTopArrow from "../../public/Icons/ScrollToTopArrow.svg";
import { cn } from "@/lib/utils";

const ScrollToTopButton = () => {
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
          "fixed flex justify-center items-center bg-gray-200 text-black right-4 bottom-4 lg:right-10 lg:bottom-10 w-12 h-12 rounded-lg transition-all duration-200 ease-in-out opacity-0 pointer-events-none",
          isVisible && "opacity-1 pointer-events-auto"
        )}
        onClick={scrollToTop}
      >
        <Image src={ScrollToTopArrow} alt="Scroll to top" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;

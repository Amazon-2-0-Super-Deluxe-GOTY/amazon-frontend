"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import ScrollToTopArrow from '../../public/Icons/ScrollToTopArrow.svg';
import '../../public/Styles/FooterStyles.css'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <Button variant="ghost" className={`bg-gray-200 color-black justify-center items-center scrollToTopButton ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}>
        <Image src={ScrollToTopArrow} alt="Scroll to top" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowUpIcon,
  BellIcon,
  ChevronRight,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  MenuIcon,
  ShoppingCartIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import placeholderImage from "../../public/placeholder.svg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Banner } from "@/components/MainPage/Banner";
import { SingInUpCard } from "@/components/MainPage/SingInUpCard";
import { CarouselCategory } from "@/components/MainPage/CarouselCategory";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="flex justify-center items-center px-2 py-4 border-b w-full">
        <div className="max-w-screen-xl flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <MenuIcon className="text-gray-700" />
            <span className="font-bold text-xl">Logo</span>
          </div>
          <div className="flex-1 mx-4">
            <Input placeholder="Search..." />
          </div>
          <div className="flex items-center space-x-4">
            <HeartIcon className="text-gray-700" />
            <BellIcon className="text-gray-700" />
            <UserIcon className="text-gray-700" />
            <ShoppingCartIcon className="text-gray-700" />
          </div>
        </div>
      </header>

      <main className="block items-center justify-center p-0 m-0"></main>

      <main className="max-w-screen-xl w-full grow px-2 pt-4">
        <Banner />
        <section className="flex flex-col justify-center lg:flex-row gap-6 my-8">
          <div className="bg-gray-200 rounded-lg h-full p-6 grow min-w-0">
            <CarouselCategory />
          </div>
          <SingInUpCard />
        </section>
        <section className="my-8 bg-gray-200 p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Trending deals</h2>
            <Button variant="ghost">
              See more <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem className="md:basis-1/3 lg:basis-1/5" key={index}>
                  <ProductCard title={`Test ${index + 1}`} price={35.99} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section
          className="flex flex-col items-center w-full"
          style={{ marginTop: "40px" }}
        >
          <div className="block bg-gray-200 rounded-lg p-6 w-full">
            <CarouselCategory />
          </div>
        </section>
        <section className="my-8 bg-gray-200 p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sale</h2>
            <Button variant="ghost">
              See more <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem className="md:basis-1/3 lg:basis-1/5" key={index}>
                  <ProductCard title={`Test ${index + 1}`} price={35.99} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>

      <footer className="py-8 border-t w-full">
        <div className="flex flex-wrap justify-between items-start gap-8 max-w-3xl mx-auto px-2">
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <ul>
              <li className="mb-1">Contact us</li>
              <li className="mb-1">FAQ</li>
              <li className="mb-1">Size guide</li>
              <li className="mb-1">Shipping & returns</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Legal notice</h3>
            <ul>
              <li className="mb-1">Terms and Conditions</li>
              <li className="mb-1">License agreement</li>
              <li className="mb-1">Privacy Policy</li>
              <li className="mb-1">Cookie Settings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Social media</h3>
            <div className="flex space-x-2">
              <FacebookIcon className="text-gray-700" />
              <TwitterIcon className="text-gray-700" />
              <InstagramIcon className="text-gray-700" />
              <YoutubeIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 gap-6">
          <span className="font-bold text-xl">Logo</span>
          <span>© 2024 Do Sell. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

const ProductCard = ({ title, price }: { title: string; price: number }) => {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  return (
    <Card className="w-[220px]">
      <div className="p-2">
        <Image src={placeholderImage} alt="placeholder" className="w-full" />
        <div className="mt-3 flex flex-col">
          <span className="text-lg">{title}</span>
          <div>
            <span className="text-xl">${whole}</span>
            <sup>{fraction}</sup>
          </div>
        </div>
      </div>
    </Card>
  );
};

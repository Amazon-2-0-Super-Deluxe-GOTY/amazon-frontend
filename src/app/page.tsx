import { Button } from "@/components/ui/button";
import {
  ChevronRight,
} from "lucide-react";

import { Banner } from "@/components/MainPage/Banner";
import { SingInUpCard } from "@/components/MainPage/SingInUpCard";
import { CarouselCategory } from "@/components/MainPage/CarouselCategory";
import { CarouselProduct } from "@/components/MainPage/CarouselProduct";

import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
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
          <CarouselProduct />
        </section>
        <div className="bg-gray-200 rounded-lg p-6">
          <CarouselCategory />
        </div>
        <section className="my-8 bg-gray-200 p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sale</h2>
            <Button variant="ghost">
              See more <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
          <CarouselProduct />
        </section>
      </main>

      <div className="absolute">
        <ScrollToTopButton />
      </div>
    </div>
  );
}

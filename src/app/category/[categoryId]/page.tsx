"use client";
import { useEffect } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox"
import ScrollArea from "@/components/ui/scrollarea"

import HouseLine from "../../../../public/Icons/HouseLine.svg";
import FiltersCategoryArrow from "../../../../public/Icons/FiltersCategoryArrow.svg";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  useEffect(() => {
    if (params.categoryId) {
      console.log(`Loading page for category ${params.categoryId}`);
    }
  }, [params.categoryId]);

  return (
    <main className="flex flex-col items-center pl-[160px] pr-[160px] pt-10 pb-10 grow w-full h-full">
      <section className="w-full flex items-left gap-1">
        <Image src={HouseLine} alt="Home" />
        <span>/ Category{params.categoryId} / Subcategory / ProductsType </span>
      </section>
      <section className="w-full flex items-left pt-4">
        <span className="text-[36px] font-semibold">Title</span>
      </section>
      <section className="flex w-full h-full pt-8">
        <div className="gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <FiltersCard key={index} />
          ))}
        </div>
        <div className="">

        </div>
      </section>

    </main>
  );
}

const FiltersCard = () => {
  return (
    <div className="max-w-sm p-4 bg-gray-200 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold">Brand</h2>
        <Button variant="ghost">
          <Image src={FiltersCategoryArrow} alt="filters" />
        </Button>
      </div>
      <div className="pt-3 w-full">
        <Input placeholder="Search..." />
        <ScrollArea className="max-h-[414px] w-full pt-3">
          <ul className="list-none p-0 m-0">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={"brand" + index} />
                <label className="text-sm" htmlFor={"brand" + index}>PUMIEY</label>
              </div>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};

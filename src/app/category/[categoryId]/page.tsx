"use client";
import { useEffect } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

import HouseLine from "@/../public/Icons/HouseLine.svg";
import FiltersCategoryArrow from "@/../public/Icons/FiltersCategoryArrow.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/Product/ProductCard";

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
    <main className="flex flex-col items-center max-w-screen-xl py-10 grow w-full mx-auto">
      <section className="w-full flex items-left gap-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Image src={HouseLine} width={24} height={24} alt="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/clothes">Clothes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/clothes/women">Women</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Tops, Tees & Blouses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="w-full flex items-left pt-4">
        <span className="text-[36px] font-semibold">Title</span>
      </section>
      <section className="flex flex-col lg:flex-row w-full pt-8 gap-6">
        <div className="flex flex-col gap-3 basis-[320px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <FiltersCard key={index} />
          ))}
        </div>
        <div className="grow">
          {/* Filters here */}
          <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-max gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard
                price={29}
                title={"Product " + index}
                quantity={index}
                key={index}
              />
            ))}
          </div>
          {/* Pagination here */}
        </div>
      </section>
    </main>
  );
}

const FiltersCard = () => {
  return (
    <div className="max-w-xs w-full p-4 bg-gray-200 rounded-lg shadow max-h-[414px]">
      <div className="flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold">Brand</h2>
        <Button variant="ghost">
          <Image src={FiltersCategoryArrow} alt="filters" />
        </Button>
      </div>
      <div className="pt-3 w-full">
        <Input placeholder="Search..." className="mb-3" />
        <ScrollArea>
          <ul className="list-none p-0 m-0">
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Checkbox id={"brand" + index} />
                <label className="text-base" htmlFor={"brand" + index}>
                  PUMIEY
                </label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};

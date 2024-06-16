"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, { useMemo } from "react";
import { Slash } from "lucide-react";
import { ProductOrderCard } from "@/components/Product/ProductOrderCard";
import { MediaQueryCSS } from "@/components/Shared/MediaQuery";
import { ProductDetails } from "@/components/Product/ProductDetails";
import { AboutProduct } from "@/components/Product/AboutProduct";
import { ReviewsBlock } from "@/components/Review/ReviewsBlock";
import { ProductImagesBlock } from "@/components/ProductPage/ProductImagesBlock";
import { Product } from "@/api/products";
import {
  HomeIcon,
  StarEmptyIcon,
  StarFullIcon,
} from "@/components/Shared/Icons";
import { Separator } from "../ui/separator";

const maxRating = 5;

export function ProductPage({ product }: { product: Product }) {
  const starElements = useMemo(() => {
    return Array.from({ length: maxRating }).map((_, index) =>
      index < product.generalRate ? (
        <StarFullIcon className="w-6 h-6" key={index} />
      ) : (
        <StarEmptyIcon className="w-6 h-6" key={index} />
      )
    );
  }, [product.generalRate]);

  return (
    <main className="px-4 space-y-6">
      <div className="w-full flex items-left gap-1 mb-3 lg:mb-10">
        <Breadcrumb className="text-sm lg:text-base">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon className="w-6 h-6" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${product.category.id}`}>
                  <BreadcrumbPage>{product.category.name}</BreadcrumbPage>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-between w-full">
        <div className="lg:max-w-2xl w-full">
          <MediaQueryCSS maxSize="lg">
            <h1 className="text-heading-1">{product.name}</h1>
            <span className="text-sm text-gray-400">Code: {product.code}</span>
            <div className="my-3 flex items-center">
              <div className="flex items-center gap-1 h-4">{starElements}</div>
              <span className="text-base font-bold ml-2">
                {product.generalRate}
              </span>
              <span className="text-base ml-2">
                {product.reviewsQuantity} reviews
              </span>
            </div>
          </MediaQueryCSS>
          <div className="sticky top-4">
            <ProductImagesBlock
              images={product.productImages}
              discountPercent={product.discountPercent}
            />
          </div>
        </div>
        <div className="xl:max-w-xl w-full">
          <div className="hidden lg:block">
            <h1 className="text-heading-1">{product.name}</h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center h-4">{starElements}</div>
              <span className="text-lg font-bold ml-2">
                {product.generalRate}
              </span>
              <span className="text-lg ml-6">
                {product.reviewsQuantity} reviews
              </span>
              <span className="text-lg ml-auto">Code: {product.code}</span>
            </div>
          </div>
          <div className="mt-3 mb-6 lg:mt-8 lg:mb-0">
            <h2 className="text-heading-3 font-semibold hidden lg:block mb-4">
              About product
            </h2>
            <AboutProduct items={product.aboutProductItems} variant="list" />
          </div>
        </div>
        <div className="lg:max-w-64 w-full">
          <div className="sticky top-4 space-y-2 lg:space-y-4">
            <ProductOrderCard product={product} />
          </div>
        </div>
      </section>
      <section className="pb-6 pt-6 lg:pt-12 space-y-6">
        <Separator />
        <h2 className="text-heading-3 font-semibold text-center lg:text-start">
          Product details
        </h2>
        <ProductDetails items={product.productProperties} />
      </section>
      <section className="pb-6 space-y-6">
        <Separator />
        <h2 className="text-heading-3 font-semibold text-center lg:text-start">
          Customer reviews
        </h2>
        <ReviewsBlock productId={product.id} />
      </section>
      {/* <div className="py-6 border-t-2">
        <ProductsBlock title="You may also like" maxSizeMobile={6} />
      </div>
      <div className="py-6 border-t-2">
        <ProductsBlock
          title="Best sellers in women's fashion"
          maxSizeMobile={6}
        />
      </div> */}
    </main>
  );
}

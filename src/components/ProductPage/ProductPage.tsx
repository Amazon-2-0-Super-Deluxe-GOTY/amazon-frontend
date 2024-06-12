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
import placeholder from "@/../public/Icons/placeholder.svg";
import { ProductOrderCard } from "@/components/Product/ProductOrderCard";
import { MediaQueryCSS } from "@/components/Shared/MediaQuery";
import { ProductDetails } from "@/components/Product/ProductDetails";
import { AboutProduct } from "@/components/Product/AboutProduct";
import type { Review, ReviewsStatistic } from "@/components/Review/types";
import { ReviewsBlock } from "@/components/Review/ReviewsBlock";
import { ImagesBlock } from "@/components/ProductPage/ProductImagesBlock";
import { Product } from "@/api/products";
import {
  HomeIcon,
  StarEmptyIcon,
  StarFullIcon,
} from "@/components/Shared/Icons";

const reviewsStatistic: ReviewsStatistic = {
  score: 4.3,
  reviewsCount: 228,
  starsStatistic: [
    { stars: 1, percentage: 7 },
    { stars: 2, percentage: 5 },
    { stars: 3, percentage: 8 },
    { stars: 4, percentage: 12 },
    { stars: 5, percentage: 68 },
  ],
  tags: [
    "Actual price",
    "Price/quality",
    "Polite seller",
    "Good service",
    "Fits the description",
  ],
};

const reviews: Review[] = [
  {
    id: "1",
    user: {
      avatar: placeholder,
      fullName: "Jessica Jimenez",
      location: "United States",
    },
    options: [
      {
        title: "Size",
        value: "2X Large",
      },
      {
        title: "Color",
        value: "Black",
      },
    ],
    tags: [
      "Actual price",
      "Price/quality",
      "Polite seller",
      "Good service",
      "Fits the description",
    ],
    title: "Pumiey long sleeve",
    text: "Obsessed with these long sleeves! Definitely big girl friendly, holds everything in but still feels breathable. Very thick material, not see-through.",
    rating: 5,
    reviewRatesCount: 1,
    isRatedByUser: true,
    language: "en",
    createdAt: new Date(),
  },
  {
    id: "2",
    user: {
      avatar: placeholder,
      fullName: "Adrienne O’Brien",
      location: "United States",
    },
    options: [
      {
        title: "Size",
        value: "Small",
      },
      {
        title: "Color",
        value: "Sage",
      },
    ],
    // images: [placeholder, placeholder],
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    title: "Girls, GET. THIS.",
    text: "Ok, I got this in the color sage to try to recreate a Pinterest outfit I saw and omg it’s so good.\nThe fabric is soft and comfy while still being fitted + It’s double lined so you can go braless. The color is so pretty too, this with some low rise baggy jeans would be even cuter but I didn’t have any anyway get this you won’t regret it!!!! I’ll update after a few washes to see if it holds up.",
    rating: 5,
    reviewRatesCount: 25,
    isRatedByUser: true,
    language: "en",
    createdAt: new Date(),
  },
  {
    id: "3",
    user: {
      avatar: placeholder,
      fullName: "Joe Gatto",
      location: "Canada",
    },
    options: [
      {
        title: "Size",
        value: "Large",
      },
      {
        title: "Color",
        value: "White",
      },
    ],
    images: [placeholder],
    title: "Great Shirt, unfortunately returned due to stains",
    text: "Shirt feels amazing, super soft and stretchy. Would love to have kept it if it wasn’t stained.",
    rating: 3,
    reviewRatesCount: 1,
    isRatedByUser: false,
    language: "en",
    createdAt: new Date(),
  },
  {
    id: "4",
    user: {
      avatar: placeholder,
      fullName: "Sylvio",
      location: "United States",
    },
    options: [
      {
        title: "Size",
        value: "Medium",
      },
      {
        title: "Color",
        value: "Black",
      },
    ],
    title: "Love",
    text: "I do love this top and I enjoy wearing it! Although I am going to say something negative about it on a personal level, something that I wasn't thinking about and as you can see it's got nothing to do with how I rated the product. On me the arms are a little tight, or perhaps I should say snug, and I seem to be pulling on the sleeves a lot. Although by doing that the material has a tendency to grab my hair on my arms and give it a discomfort feeling. It doesn't hurt and it does not pitch and I think it's just indicative to any kind of material that fits snug around the arms.\nMaybe I'm just being a big sissy, although I think I'm going to trim my hair on my arms just a little bit before I wear it the next time. Anyhow I had the same problem with a pair of underfarmer compression top that I had. Anyhow just something to think about, all in all I give it a thumbs up, the material is nice and soft and it has a four-way stretch.",
    rating: 5,
    reviewRatesCount: 0,
    isRatedByUser: false,
    language: "en",
    createdAt: new Date(),
  },
  {
    id: "5",
    user: {
      avatar: placeholder,
      fullName: "Sylvio",
      location: "Mexico",
    },
    options: [
      {
        title: "Size",
        value: "Medium",
      },
      {
        title: "Color",
        value: "Marsala",
      },
    ],
    title: "Me encantan",
    text: "Me gusta mucho la calidad de esta marca para sus playeras. La talla es tal cual.",
    rating: 5,
    reviewRatesCount: 0,
    isRatedByUser: false,
    language: "es",
    createdAt: new Date(),
  },
];

const maxRating = 5;

export function ProductPage({ product }: { product: Product }) {
  const starElements = useMemo(() => {
    return Array.from({ length: maxRating }).map((_, index) =>
      index < product.generalRate ? (
        <StarFullIcon className="w-4 h-4" key={index} />
      ) : (
        <StarEmptyIcon className="w-4 h-4" key={index} />
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
            <h1 className="text-2xl">{product.name}</h1>
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
            <ImagesBlock images={product.productImages} />
          </div>
        </div>
        <div className="xl:max-w-xl w-full">
          <div className="hidden lg:block">
            <h1 className="text-3xl">{product.name}</h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center gap-1 h-4">{starElements}</div>
              <span className="text-xl font-bold ml-2">
                {product.generalRate}
              </span>
              <span className="text-xl ml-4">
                {product.reviewsQuantity} reviews
              </span>
              <span className="text-xl ml-auto">Code: {product.code}</span>
            </div>
          </div>
          <div className="mt-3 mb-6 lg:mt-8 lg:mb-0">
            <h2 className="text-xl lg:text-xl font-semibold text-center lg:text-start mb-4">
              About product
            </h2>
            <AboutProduct items={product.aboutProductItems} variant="list" />
          </div>
        </div>
        <div className="lg:max-w-72 w-full">
          <div className="sticky top-4 space-y-2 lg:space-y-4">
            <ProductOrderCard product={product} />
          </div>
        </div>
      </section>
      <section className="py-6 border-t-2 pt-4 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-start">
          Product details
        </h2>
        <ProductDetails items={product.productProperties} />
      </section>
      <section className="py-6 border-t-2 pt-4 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-start">
          Customer reviews
        </h2>
        <ReviewsBlock reviews={reviews} reviewsStatistic={reviewsStatistic} />
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

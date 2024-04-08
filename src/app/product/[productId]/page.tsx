"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Slash, Star, StarHalf } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HouseLine from "@/../public/Icons/HouseLine.svg";
import placeholder from "@/../public/Icons/placeholder.svg";
import type { OptionsComponent } from "@/components/Product/Options/types";
import { ProductOptionsMapper } from "@/components/Product/Options/ProductOptionsMapper";
import { ProductOrderCard } from "@/components/Product/ProductOrderCard";
import { MediaQueryCSS } from "@/components/MediaQuery";
import { SellerInfoCard } from "@/components/Seller/SellerInfoCard";
import { ProductDetails } from "@/components/Product/ProductDetails";
import { AboutProduct } from "@/components/Product/AboutProduct";
import type { DescriptionBlock } from "@/components/Product/Description/types";
import { ProductsBlock } from "@/components/Product/ProductsBlock";
import { ProductDescription } from "@/components/Product/ProductDescription";
import { ReviewsStatisticCard } from "@/components/Review/ReviewsStatisticCard";
import type { ReviewsStatistic } from "@/components/Review/types";

const productOptions: OptionsComponent[] = [
  {
    type: "size",
    data: [
      {
        title: "Extra Small",
        short: "XS",
        isAvailable: true,
      },
      {
        title: "Small",
        short: "S",
        isAvailable: true,
      },
      {
        title: "Medium",
        short: "M",
        isAvailable: true,
      },
      {
        title: "Large",
        short: "L",
        isAvailable: true,
      },
      {
        title: "Extra Large",
        short: "XL",
        isAvailable: true,
      },
      {
        title: "2X Large",
        short: "2XL",
        isAvailable: true,
      },
      {
        title: "3X Large",
        short: "3XL",
        isAvailable: false,
      },
    ],
  },
  {
    type: "color",
    data: [
      {
        title: "Red",
        hex: "#FF0000",
        isAvailable: true,
      },
      {
        title: "Orange",
        hex: "#FF8A00",
        isAvailable: true,
      },
      {
        title: "Yellow",
        hex: "#FFE500",
        isAvailable: true,
      },
      {
        title: "Chartreuse",
        hex: "#80FF00",
        isAvailable: true,
      },
      {
        title: "Green",
        hex: "#00FF47",
        isAvailable: true,
      },
      {
        title: "Aqua",
        hex: "#00FFD1",
        isAvailable: false,
      },
      {
        title: "Light Blue",
        hex: "#00D1FF",
        isAvailable: true,
      },
      {
        title: "Azure",
        hex: "#0094FF",
        isAvailable: true,
      },
      {
        title: "Blue",
        hex: "#0047FF",
        isAvailable: true,
      },
      {
        title: "Purple",
        hex: "#8000FF",
        isAvailable: true,
      },
      {
        title: "Magenta",
        hex: "#FA00FF",
        isAvailable: true,
      },
    ],
  },
];

const productDetails = [
  {
    title: "Brand",
    text: "PUMIEY",
  },
  {
    title: "Sleeve type",
    text: "Long sleeve",
  },
  {
    title: "Fabric type",
    text: "75% Polyamide, 25% Elastane",
  },
  {
    title: "Care instructions",
    text: "Machine Wash",
  },
  {
    title: "Origin",
    text: "Imported",
  },
  {
    title: "Closure type",
    text: "Pull On",
  },
];

const aboutProductData = [
  {
    title: "Classic design",
    text: "This long sleeve tops features a round neck design and a standard T-shirt length. Its adaptability shines as it effortlessly transitions from a tucked-in inner layer to a stylish crop top when stacked at the waist, making it a must-have piece for those seeking to channel the fall fashion trend.",
  },
  {
    title: "Smoke cloud pro collection",
    text: "New colors, new design, new fabric! Hero smoke cloud pro is coming! Different from the usual Smoke Cloud collection products made with C110TM fabric, the new drop's fabric is more smooth, and creamy. With some special tech, even the light colors won't be sheer.",
  },
  {
    title: "Wardrobe essential",
    text: "Are you still struggling to find the perfect fall fashion staple? Look no further! Our Long sleeve shirt is your ultimate choice. This monochromatic approach makes it an ideal choice for versatile pairings, effortlessly complementing various bottoms such as cargo pants, jeans, and more.",
  },
  {
    title: "Occasion",
    text: "Whether you're dressing for a casual outing or a formal event, this basic tee showcases its versatility, allowing you to confidently express your fashion sense in any setting, such as work, a party, a club, travel.",
  },
  {
    title: "Occasion",
    text: "Whether you're dressing for a casual outing or a formal event, this basic tee showcases its versatility, allowing you to confidently express your fashion sense in any setting, such as work, a party, a club, travel.",
  },
];

const productDescriptionBlocks: DescriptionBlock[] = [
  {
    id: "1",
    type: "header",
    data: {
      text: "Lorem ipsum dolor sit amet",
      level: 1,
      align: "center",
    },
  },
  {
    id: "2",
    type: "paragraph",
    data: {
      text: "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      align: "center",
    },
  },
  {
    id: "3",
    type: "horizontalCard",
    data: {
      title: "Cum sociis natoque penatibus",
      text: "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
      image: placeholder,
      direction: "ltr",
    },
  },
  {
    id: "4",
    type: "horizontalCard",
    data: {
      title: "Nullam dictum felis eu pede",
      text: "Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.",
      image: placeholder,
      direction: "rtl",
    },
  },
];

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

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const hasOptions = productOptions.length > 0;

  useEffect(() => {
    if (params.productId) {
      console.log(`Loading page for product ${params.productId}`);
    }
  }, [params.productId]);

  return (
    <main className="grow w-full max-w-[1600px] py-5 lg:py-10 mx-auto space-y-6">
      <div className="w-full flex items-left gap-1 mb-3 lg:mb-10">
        <Breadcrumb className="text-sm lg:text-base">
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
                <Link href="/category">Clothes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category/subcategory">Tops, Tees & Blouses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>T-Shirts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-between w-full">
        <div className="lg:max-w-2xl w-full">
          <MediaQueryCSS maxSize="lg">
            <h1 className="text-2xl">
              PUMIEY Women&apos;s Long Sleeve T-Shirts Crew Neck Slim Fit Tops
              Sexy Basic Tee Smoke Cloud Pro Collection
            </h1>
            <span className="text-sm text-gray-400">Code: B0CHFLT63B</span>
            <div className="my-3 flex items-center">
              <div className="flex items-center gap-1 h-4">
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <StarHalf fill="#000" className="w-4 h-4" />
              </div>
              <span className="text-base font-bold ml-2">4.3</span>
              <span className="text-base ml-2">228 reviews</span>
            </div>
          </MediaQueryCSS>
          <div className="sticky top-4">
            <ImagesBlock />
          </div>
        </div>
        <div className="max-w-xl w-full">
          <div className="hidden lg:block">
            <h1 className="text-3xl">
              PUMIEY Women&apos;s Long Sleeve T-Shirts Crew Neck Slim Fit Tops
              Sexy Basic Tee Smoke Cloud Pro Collection
            </h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center gap-1 h-4">
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <StarHalf fill="#000" className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold ml-2">4.3</span>
              <span className="text-xl ml-4">228 reviews</span>
              <span className="text-xl ml-auto">Code: B0CHFLT63B</span>
            </div>
          </div>
          <div className="mt-3 mb-6 lg:mt-8 lg:mb-0">
            {hasOptions ? (
              <div className="flex flex-col gap-3 lg:gap-8">
                <ProductOptionsMapper options={productOptions} />
              </div>
            ) : (
              <div>
                <h2 className="text-xl lg:text-xl font-semibold text-center lg:text-start mb-4">
                  About product
                </h2>
                <AboutProduct items={aboutProductData} variant="list" />
              </div>
            )}
          </div>
        </div>
        <div className="lg:max-w-72 w-full">
          <div className="sticky top-4 space-y-2 lg:space-y-4">
            <ProductOrderCard />
            <SellerInfoCard />
          </div>
        </div>
      </section>
      <section className="py-6 border-t-2 pt-4 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-start">
          Product details
        </h2>
        <ProductDetails items={productDetails} />
      </section>
      {hasOptions && (
        <section className="py-6 border-t-2 pt-4 space-y-6">
          <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-start">
            About product
          </h2>
          <AboutProduct items={aboutProductData} />
        </section>
      )}
      <section className="py-6 border-t-2 pt-4 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-start">
          Product Description
        </h2>
        <ProductDescription blocks={productDescriptionBlocks} />
      </section>
      <section className="py-6 border-t-2 pt-4 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center lg:text-start">
          Customer reviews
        </h2>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:max-w-xl w-full">
            <ReviewsStatisticCard data={reviewsStatistic} />
          </div>
          <div className="w-full"></div>
        </div>
      </section>
      <div className="py-6 border-t-2">
        <ProductsBlock title="You may also like" />
      </div>
      <div className="py-6 border-t-2">
        <ProductsBlock title="Best sellers in women's fashion" />
      </div>
    </main>
  );
}

const ImagesBlock = () => {
  return (
    <>
      <Carousel
        className="w-full"
        opts={{
          align: "center",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <CarouselItem key={index}>
                <Image
                  src={placeholder}
                  alt="Placeholder"
                  className="object-cover"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <span className="w-1/5 absolute top-[4%] lg:top-8 left-0 pl-[3%] py-2 bg-gray-50 rounded-e-full text-base lg:text-2xl">
          -24%
        </span>
      </Carousel>
      <div className="mt-2 lg:mt-8">
        <Carousel
          className="w-full"
          opts={{
            align: "center",
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <CarouselItem
                  key={index}
                  className={
                    "basis-[unset] pl-2 first:pl-4 lg:pl-6 md:pl-4 lg:first:pl-4"
                  }
                >
                  <Image
                    src={placeholder}
                    alt="Placeholder"
                    className="w-14 h-14 lg:w-20 lg:h-20 object-cover"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

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
import React from "react";
import { Slash, Star, StarHalf, TrophyIcon } from "lucide-react";
import HouseLine from "@/../public/Icons/HouseLine.svg";
import placeholder from "@/../public/Icons/placeholder.svg";
import type { OptionsComponent } from "@/components/Product/Options/types";
import { ProductOptionsMapper } from "@/components/Product/Options/ProductOptionsMapper";
import { ProductOrderCard } from "@/components/Product/ProductOrderCard";
import { MediaQueryCSS } from "@/components/Shared/MediaQuery";
import { SellerInfoCard } from "@/components/Seller/SellerInfoCard";
import { ProductDetails } from "@/components/Product/ProductDetails";
import { AboutProduct } from "@/components/Product/AboutProduct";
import type { DescriptionBlock } from "@/components/Product/Description/types";
import { ProductsBlock } from "@/components/Product/ProductsBlock";
import { ProductDescription } from "@/components/Product/ProductDescription";
import type { Review, ReviewsStatistic } from "@/components/Review/types";
import { ReviewsBlock } from "@/components/Review/ReviewsBlock";
import { SellerInfo } from "@/components/Seller/types";
import { useSearchParams } from "next/navigation";
import { ImagesBlock } from "@/components/ProductPage/ProductImagesBlock";

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

const sellerInfo: SellerInfo = {
  fullName: "Hilary Mason",
  isTopSeller: true,
  byersRatingPercent: 99.7,
  descriptionRating: 5,
  serviceRating: 5,
  registerAt: new Date(),
  complaintsPercent: 0.4,
  ratingsExcluded: 813,
  ratingsRemoved: {
    marketplace: 0,
    byers: 4,
  },
};

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const checkOptionsSelected = (searchParams: URLSearchParams) => {
    let isAllOptionsSelected = true;
    productOptions.forEach((opt) => {
      if (!isAllOptionsSelected) return;

      const value = searchParams.get(opt.type);
      if (!value) {
        isAllOptionsSelected = false;
      }
    });
    return isAllOptionsSelected;
  };

  const searchParams = useSearchParams();
  const [isOptionsSelected, setIsOptionsSelected] = React.useState(() =>
    checkOptionsSelected(searchParams)
  );
  const hasOptions = productOptions.length > 0;

  React.useEffect(() => {
    setIsOptionsSelected(checkOptionsSelected(searchParams));
  }, [searchParams]);

  React.useEffect(() => {
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
            <ProductOrderCard isOptionsSelected={isOptionsSelected} />
            <SellerInfoCard sellerInfo={sellerInfo} />
            <div className="p-4 lg:p-6 bg-gray-200 rounded-lg flex items-center gap-3">
              <TrophyIcon className="w-8 h-8 lg:w-10 lg:h-10" />
              <div>
                <p className="font-semibold">Best seller</p>
                <p className="text-xs">Sold most frequently</p>
              </div>
            </div>
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
        <ReviewsBlock reviews={reviews} reviewsStatistic={reviewsStatistic} />
      </section>
      <div className="py-6 border-t-2">
        <ProductsBlock title="You may also like" maxSizeMobile={6} />
      </div>
      <div className="py-6 border-t-2">
        <ProductsBlock
          title="Best sellers in women's fashion"
          maxSizeMobile={6}
        />
      </div>
    </main>
  );
}

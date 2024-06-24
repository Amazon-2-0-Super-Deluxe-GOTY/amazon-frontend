"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SignInUpButtons } from "@/components/SignInUpModal/SignInUpModals";
import Image from "next/image";

export const SingInUpBanner = () => {
  return (
    <Card className="w-full bg-card overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row justify-between items-center gap-4 w-full banner-signup">
        <div className="basis-1/2 py-4 md:py-8 xl:py-16">
          <div className="banner-signup-text-block lg:text-light lg:pr-6">
            <div className="mb-6 text-center">
              <h2 className="text-[1.75rem] lg:text-[2.25rem] xl:text-[2.5rem] whitespace-nowrap mb-3">
                Abundance of goods
              </h2>
              <p className="text-lg lg:text-2xl">
                Join, choose and buy with confidence!
              </p>
            </div>
            <div className="flex justify-center items-center gap-6">
              <SignInUpButtons variant="banner" />
            </div>
          </div>
        </div>
        <div className="basis-1/2 w-full h-full relative lg:hidden">
          <Image
            src={"/banner-signup-mobile.webp"}
            width={500}
            height={500}
            alt="Treasure chest"
          />
        </div>
      </CardContent>
    </Card>
  );
};

"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { SignInUpButtons } from "@/components/SignInUpModal/SignInUpModals";

export const SingInUpBanner = () => {
  return (
    <Card className="w-full bg-background overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row justify-between items-center gap-4 w-full banner-signup">
        <div
          className="basis-1/2 py-4 md:py-8 xl:py-16"
          // style={{
          //   backgroundImage: "url(/paper-shape.png)",
          //   backgroundSize: "110%",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl whitespace-nowrap font-semibold mb-3">
              Be aware of the variety
            </h2>
            <p className="text-lg lg:text-2xl xl:text-3xl">
              Join, choose and buy with confidence!
            </p>
          </div>
          <div className="flex justify-center items-center gap-6">
            <SignInUpButtons variant="banner" />
          </div>
        </div>
        <div className="basis-1/2 w-full h-full relative lg:hidden">
          <picture className="block h-full">
            <img
              src={"/banner-signup-mobile.avif"}
              alt="Treasure chest"
              className="object-cover"
              loading="lazy"
            />
          </picture>
        </div>
      </CardContent>
    </Card>
  );
};

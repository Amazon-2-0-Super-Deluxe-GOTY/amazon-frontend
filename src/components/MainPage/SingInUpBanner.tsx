import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";

export function SingInUpBanner() {
  return (
    <Card className="w-full bg-gray-100 border-none">
      <CardContent className="p-6 flex flex-col lg:flex-row justify-between items-center gap-4">
        <Image
          src={placeholder}
          alt="Placeholder"
          className="w-full max-w-md object-cover max-h-[260px]"
        />
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl lg:text-4xl whitespace-nowrap font-semibold mb-3">
              Be aware of the variety
            </h2>
            <p className="text-lg lg:text-3xl">
              Join, choose and buy with confidence!
            </p>
          </div>
          <div className="flex justify-center items-center gap-6">
            <Button size={"lg"} className="text-base lg:text-xl">
              Sing in
            </Button>
            <Button
              size={"lg"}
              className="text-base lg:text-xl"
              variant={"outline"}
            >
              Log in
            </Button>
          </div>
        </div>
        <Image
          src={placeholder}
          alt="Placeholder"
          className="w-full max-w-md object-cover max-h-[260px]"
        />
      </CardContent>
    </Card>
  );
}

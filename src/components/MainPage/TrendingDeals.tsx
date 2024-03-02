import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export function TrendingDeals() {
  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5" style={{height:'407px', width:'278px'}}>
            <div className="w-full h-full">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-2xl font-semibold ">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}



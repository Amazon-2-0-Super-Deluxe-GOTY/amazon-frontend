import { Card } from "../ui/card";
import { MediaQueryCSS } from "../Shared/MediaQuery";
import { SellerInfo } from "./types";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SheetHeader } from "../Shared/SteetParts";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { formatAboutSellerDate } from "@/lib/date";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronRightIcon, StarFullIcon, UserIcon } from "../Shared/Icons";

export const SellerInfoCard = ({ sellerInfo }: { sellerInfo: SellerInfo }) => {
  const sellerGrade = getSellerGrade(sellerInfo.byersRatingPercent);

  return (
    <Card className="bg-gray-200 p-6 space-y-3">
      <div className="flex lg:flex-col justify-between lg:justify-start gap-3">
        <div className="flex items-center gap-3">
          <UserIcon className="w-8 h-8 lg:w-10 lg:h-10" />
          <div>
            <p className="text-base font-semibold">{sellerInfo.fullName}</p>
            <p className="text-sm">
              {sellerGrade ? sellerGrade + " " : null}Seller
            </p>
          </div>
        </div>
        <MediaQueryCSS minSize="lg">
          <hr className="border-black" />
        </MediaQueryCSS>
        <div className="flex flex-col lg:flex-row items-end lg:items-center lg:gap-2">
          <span className="text-base font-semibold">
            {sellerInfo.byersRatingPercent.toFixed(1)}%
          </span>
          <MediaQueryCSS maxSize="lg">
            <p className="text-sm">users recommend</p>
          </MediaQueryCSS>
          <MediaQueryCSS minSize="lg">
            <p className="grow text-sm">
              buyers recommended this seller in the last 12 months
            </p>
          </MediaQueryCSS>
        </div>
      </div>
      <hr className="border-black" />
      <p>See another seller&apos;s goods with category [Name]</p>
      <p>All seller&apos;s goods</p>
      <hr className="border-black" />

      <Sheet>
        <SheetTrigger className="w-full">
          <div className="flex justify-between items-center py-1 cursor-pointer">
            <span className="text-base">About seller</span>
            <ChevronRightIcon className="w-4 h-4" />
          </div>
        </SheetTrigger>
        <SheetContent
          className="sm:max-w-full w-screen lg:w-[40vw] flex flex-col"
          hideClose
        >
          <SheetHeader title="About seller" />
          <ScrollArea>
            <div className="space-y-4 lg:space-y-6 pt-2">
              <div className="flex items-center gap-3">
                <UserIcon className="w-10 h-10 lg:w-14 lg:h-14" />
                <div>
                  <h3 className="text-lg lg:text-2xl font-semibold">
                    {sellerInfo.fullName}
                  </h3>
                  <p className="text-xs lg:text-base">
                    {sellerGrade ? sellerGrade + " " : null}Seller
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <p className="flex flex-col basis-1/2">
                  <span className="text-lg lg:text-2xl font-semibold">
                    {sellerInfo.byersRatingPercent.toFixed(1)}%
                  </span>
                  <p className="text-sm max-w-56 xl:text-base">
                    buyers recommended this seller in the last 12 months{" "}
                  </p>
                </p>
                <div className="flex flex-col basis-1/2">
                  <p className="flex items-center gap-3">
                    <span className="text-lg lg:text-2xl font-semibold">
                      {sellerInfo.serviceRating.toFixed(1)}/
                      <span className="text-lg">5</span>
                    </span>
                    <StarFullIcon className="fill-black" />
                  </p>
                  <p className="text-sm xl:text-base">customer service</p>
                </div>
              </div>

              <Accordion
                type="single"
                collapsible
                className="bg-gray-200 rounded-md"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="p-4 font-semibold text-sm sm:text-lg lg:text-xl">
                    All opinions are confirmed by purchase
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-sm sm:text-base">
                    Only registered users who have entered into a transaction
                    with the vendor on the platform are given the form to
                    express their opinion on the progress of such a transaction.
                    We calculate average values based on the unique ratings that
                    the seller received during the last 12 months. Perry checks
                    and removes ratings that do not meet the standards when they
                    are detected.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator orientation="horizontal" />

              <div className="flex justify-between items-center lg:text-lg">
                <h3 className="font-semibold">On Perry</h3>
                <span>from {formatAboutSellerDate(sellerInfo.registerAt)}</span>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </Card>
  );
};

function getSellerGrade(byersRatingPercent: number) {
  if (byersRatingPercent >= 95) return "Excellent";
  else if (byersRatingPercent >= 90) return "Good";
  else if (byersRatingPercent >= 85) return "Fine";
  else if (byersRatingPercent >= 80) return "Fair";
  return null;
}

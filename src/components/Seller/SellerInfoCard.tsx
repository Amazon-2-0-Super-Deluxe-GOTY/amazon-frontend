import { ChevronDownIcon, UserRoundIcon } from "lucide-react";
import { Card } from "../ui/card";
import { MediaQueryCSS } from "../MediaQuery";

export const SellerInfoCard = () => {
  return (
    <Card className="bg-gray-200 p-6 space-y-3">
      <div className="flex lg:flex-col justify-between lg:justify-start gap-3">
        <div className="flex items-center gap-3">
          <UserRoundIcon className="w-8 h-8 lg:w-10 lg:h-10" />
          <div>
            <p className="text-base font-semibold">Hilary Mason</p>
            <p className="text-sm">Top seller</p>
          </div>
        </div>
        <MediaQueryCSS minSize="lg">
          <hr className="border-black" />
        </MediaQueryCSS>
        <div className="flex flex-col lg:flex-row items-end lg:items-center lg:gap-2">
          <span className="text-base font-semibold">95,5%</span>
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
      <div className="flex justify-between items-center py-1 cursor-pointer">
        <span className="text-base">About seller</span>
        <ChevronDownIcon className="w-4 h-4" />
      </div>
    </Card>
  );
};

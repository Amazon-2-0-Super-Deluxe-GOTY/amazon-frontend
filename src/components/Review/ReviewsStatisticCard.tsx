import { useMemo } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ReviewTags } from "./ReviewTags";
import {
  StarFullIcon,
  ConfirmIcon,
  ChevronRightIcon,
  StarEmptyIcon,
} from "../Shared/Icons";
import { Separator } from "../ui/separator";
import Link from "next/link";
import clsx from "clsx";
import type { ReviewsStatistic } from "@/api/review";
import { Skeleton } from "../ui/skeleton";

const maxRate = 5;

export const ReviewsStatisticCard = ({ data }: { data?: ReviewsStatistic }) => {
  const generalRate = data?.generalRate ?? 0;

  const starElements = useMemo(() => {
    return Array.from({ length: maxRate }).map((_, index) =>
      index < Math.floor(generalRate) ? (
        <StarFullIcon className="w-4 h-4" key={index} />
      ) : (
        <StarEmptyIcon className="w-4 h-4" key={index} />
      )
    );
  }, [generalRate]);

  const barsElements = useMemo(() => {
    const elements: ReviewsStatistic["ratingStats"] = [];
    for (let i = maxRate; i > 0; i--) {
      const stat = data?.ratingStats.find((s) => s.mark === i);
      elements.push({
        mark: i,
        percent: stat ? stat.percent : 0,
      });
    }
    return elements;
  }, [data?.ratingStats]);

  return (
    <Card>
      <CardContent className="pt-6 pb-3 lg:pb-6">
        <div className="pb-3 lg:pb-6">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="mb-2 font-semibold">
                <span className="text-5xl lg:text-7xl">{generalRate}</span>
                <span className="text-3xl lg:text-5xl">/5</span>
              </p>
              <div className="inline-flex">{starElements}</div>
              <p className="lg:text-lg">{data?.reviewsQuantity ?? 0} reviews</p>
            </div>
            <table className="w-full lg:max-w-xs">
              <tbody>
                {barsElements.map((s, i) => (
                  <tr
                    key={i}
                    className="text-sm lg:text-base whitespace-nowrap"
                  >
                    <td>
                      <p className="flex items-center gap-1">
                        {s.mark} <StarFullIcon />
                      </p>
                    </td>
                    <td className="w-full">
                      <div className="relative w-full h-4 rounded-full overflow-hidden">
                        {/* fix background bleeding bug */}
                        <div
                          className={clsx(
                            "bg-foreground rounded-full absolute inset-0",
                            s.percent > 0 && "left-[1.5px]",
                            s.percent === 100 && "right-[1.5px]"
                          )}
                        />
                        <div
                          className="absolute left-0 top-0 bottom-0 rounded-e-full bg-primary-press"
                          style={{ width: `${s.percent}%` }}
                        />
                      </div>
                    </td>
                    <td>
                      <span className="ml-3 lg:ml-6">{s.percent}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs lg:text-base">
            <ConfirmIcon className="w-4 h-4 lg:w-6 lg:h-6" />
            <span>All opinions confirmed by purchase.</span>
            <Link
              href={"/"}
              className="font-semibold ml-auto flex items-center gap-2"
            >
              <span className="text-sm">Learn more</span>
              <ChevronRightIcon className="w-4 h-4 stroke-secondary stroke-3" />
            </Link>
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="lg:text-lg font-bold">Frequent tags</p>
        {!!data?.tags && <ReviewTags tags={data.tags} />}
      </CardFooter>
    </Card>
  );
};

export const ReviewsStatisticCardSkeleton = () => {
  const maxElems = 5;
  return (
    <Card>
      <CardContent className="pt-6 pb-3 lg:pb-6">
        <div className="pb-3 lg:pb-6">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="mb-2 font-semibold flex items-end gap-1">
                <Skeleton className="w-10 h-14 lg:h-20" />
                <span className="text-3xl lg:text-5xl">/5</span>
              </div>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-6" />
            </div>
            <table className="w-full lg:max-w-xs">
              <tbody>
                {Array.from({ length: maxElems }).map((_, i) => (
                  <tr
                    key={i}
                    className="text-sm lg:text-base whitespace-nowrap"
                  >
                    <td>
                      <p className="flex items-center gap-1">
                        {maxElems - i} <StarFullIcon />
                      </p>
                    </td>
                    <td className="w-full">
                      <Skeleton className="w-full h-4 rounded-full" />
                    </td>
                    <td>
                      <span className="ml-3 lg:ml-6">0%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Skeleton className="w-full h-6 mt-3" />
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="lg:text-lg font-bold">Frequent tags</p>
        <div className="flex lg:flex-wrap gap-2 mt-2 overflow-x-auto w-full">
          {Array.from({ length: maxElems }).map((_, i) => (
            <Skeleton className="w-20 h-8" key={i} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

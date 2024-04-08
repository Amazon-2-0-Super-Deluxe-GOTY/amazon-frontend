import { useMemo } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import type { ReviewsStatistic } from "./types";
import { CheckCircleIcon } from "lucide-react";

export const ReviewsStatisticCard = ({ data }: { data: ReviewsStatistic }) => {
  const starsDataReversed = useMemo(
    () => [...data.starsStatistic].reverse(),
    []
  );

  return (
    <Card className="bg-gray-200 rounded-md">
      <CardContent className="pt-6">
        <div className="pb-6 border-b-2 border-black">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-center items-center">
              <p className="mb-2 font-semibold">
                <span className="text-5xl lg:text-7xl">{data.score}</span>
                <span className="text-3xl lg:text-5xl">/5</span>
              </p>
              <p className="lg:text-lg">{data.reviewsCount} reviews</p>
            </div>
            <table className="w-full lg:max-w-xs">
              <tbody>
                {starsDataReversed.map((s, i) => (
                  <tr
                    key={i}
                    className="text-sm lg:text-base whitespace-nowrap"
                  >
                    <td>
                      <span className="mr-3">{s.stars} stars</span>
                    </td>
                    <td className="w-full">
                      <div className="grid w-full h-4 bg-gray-400 rounded-sm overflow-hidden">
                        <div
                          className="bg-black"
                          style={{ width: `${s.percentage}%` }}
                        />
                      </div>
                    </td>
                    <td>
                      <span className="ml-3 lg:ml-6">{s.percentage}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm lg:text-base">
            <CheckCircleIcon className="w-5 h-5" />
            <span>All opinions confirmed by purchase.</span>
            <span className="font-semibold">Learn more</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="lg:text-lg">Frequent tags</p>
        <div className="mt-3 flex gap-2 w-full overflow-x-auto whitespace-nowrap">
          {data.tags.map((tag, i) => (
            <div
              className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base bg-gray-300 rounded-full"
              key={i}
            >
              {tag}
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

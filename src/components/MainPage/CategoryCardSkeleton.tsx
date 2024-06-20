import { Card } from "@/components/ui/card";
import { ChevronRightIcon } from "../Shared/Icons";
import { Skeleton } from "../ui/skeleton";

export function CategoryCardSkeleton() {
  return (
    <div className="@container w-full min-w-44">
      <Card className="max-w-44 @sm-card:max-w-xs @md-card:max-w-full w-full rounded-lg border-hover-card group p-3 @md-card:p-4">
        <Skeleton className="h-24 @md-card:h-32 w-full rounded-lg" />
        <div className="mt-2 flex flex-col justify-between gap-6">
          <Skeleton className="w-full h-6 rounded-lg" />
          <div className="text-end flex justify-end items-center gap-1 @md-card:gap-2 pr-2">
            <span className="text-xs @md-card:text-sm">See all</span>
            <ChevronRightIcon className="ml-2 w-3 h-3 @md-card:w-4 @md-card:h-4 relative transition-[right] right-0 group-hover:-right-2 stroke-secondary" />
          </div>
        </div>
      </Card>
    </div>
  );
}

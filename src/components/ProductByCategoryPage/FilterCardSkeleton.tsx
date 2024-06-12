import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function FilterCardSkeleton() {
  return (
    <Card className="w-full rounded-lg p-3">
      <Skeleton className="h-6 rounded-sm" />
      <div className="pt-4 space-y-2">
        <Skeleton className="w-3/4 h-6 rounded-lg" />
        <Skeleton className="w-3/4 h-6 rounded-lg" />
      </div>
    </Card>
  );
}

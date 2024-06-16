import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const pageOffset = 2;

export const Pagination = ({
  page,
  pagesCount,
  setPage,
}: {
  page: number;
  pagesCount: number;
  setPage: (value: number) => void;
}) => {
  const pageStart = Math.max(page - pageOffset, 1);
  const pageEnd = Math.min(page + pageOffset, pagesCount);

  const showFirstPage = pageStart - pageOffset >= 1;
  const showLastPage = pageEnd + pageOffset < pagesCount;

  const hasPrev = page > 1;
  const hasNext = page < pagesCount;

  const pagesArray: number[] = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    pagesArray.push(i);
  }

  const onPrev = () => setPage(page - 1);
  const onNext = () => setPage(page + 1);

  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        variant={"tertiary"}
        size={"icon"}
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      {showFirstPage && (
        <>
          <Button variant={"secondary"} key={1} onClick={() => setPage(1)}>
            1
          </Button>
          <p>...</p>
        </>
      )}
      {pagesArray.map((pageNumber) => {
        return (
          <Button
            variant={pageNumber === page ? "primary" : "secondary"}
            size={"icon"}
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      {showLastPage && (
        <>
          <p>...</p>
          <Button
            variant={"secondary"}
            size={"icon"}
            key={pagesCount}
            onClick={() => setPage(pagesCount)}
          >
            {pagesCount}
          </Button>
        </>
      )}
      <Button
        variant={"tertiary"}
        size={"icon"}
        disabled={!hasNext}
        onClick={onNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

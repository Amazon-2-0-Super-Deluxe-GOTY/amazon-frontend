import { SheetClose, SheetTitle } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PageControlsProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface HeaderProps {
  title: string;
  pageControls?: PageControlsProps;
}

export const SheetHeader = ({ title, pageControls }: HeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <SheetTitle className="mr-auto text-lg sm:text-2xl lg:text-3xl">
        {title}
      </SheetTitle>
      {!!pageControls && <PageControls {...pageControls} />}
      <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </div>
  );
};

const PageControls = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: PageControlsProps) => {
  return (
    <div className="flex items-center gap-6">
      <button
        className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <ChevronLeft className="group-disabled:stroke-gray-300" />
      </button>
      <button
        className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasNext}
        onClick={onNext}
      >
        <ChevronRight className="group-disabled:stroke-gray-300" />
      </button>
    </div>
  );
};

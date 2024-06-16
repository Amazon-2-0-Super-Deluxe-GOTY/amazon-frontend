import { SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { SheetHeader as SheetHeaderBase } from "@/components/ui/sheet";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "./Icons";

interface PageControlsProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

type HeaderProps =
  | {
      title: string;
      pageControls?: PageControlsProps;
    }
  | {
      element: React.ReactNode;
      pageControls?: PageControlsProps;
    };

export const SheetHeader = (props: HeaderProps) => {
  return (
    <SheetHeaderBase className="gap-2 lg:gap-3.5 space-y-0">
      <div className="flex items-center gap-4">
        {"title" in props ? (
          <SheetTitle className="mr-auto text-lg sm:text-2xl lg:text-3xl">
            {props.title}
          </SheetTitle>
        ) : (
          props.element
        )}
        {!!props.pageControls && <PageControls {...props.pageControls} />}
        <SheetClose className="p-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
          <XIcon className="w-6 h-6 stroke-secondary stroke-3" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </div>
      <Separator orientation="horizontal" />
    </SheetHeaderBase>
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
        className="p-1 rounded-sm opacity-70 ring-offset-background transition-opacity disabled:opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <ChevronLeftIcon className="w-6 h-6 stroke-secondary stroke-3" />
      </button>
      <button
        className="p-1 rounded-sm opacity-70 ring-offset-background transition-opacity disabled:opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasNext}
        onClick={onNext}
      >
        <ChevronRightIcon className="w-6 h-6 stroke-secondary stroke-3" />
      </button>
    </div>
  );
};

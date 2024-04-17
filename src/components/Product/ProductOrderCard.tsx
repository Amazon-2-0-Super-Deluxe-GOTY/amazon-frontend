import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaQueryCSS } from "../MediaQuery";
import ClientOnlyPortal from "../ClientOnlyPortal";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { countriesList, getCountry } from "@/lib/location";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

const infoElements = [
  {
    title: "Delivery",
    render: (isOpen: boolean, closeModal: () => void) => (
      <DeliveryContent isOpen={isOpen} closeModal={closeModal} />
    ),
  },
  {
    title: "Payment methods",
    render: () => <></>,
  },
  {
    title: "Guarantee",
    render: () => <></>,
  },
  {
    title: "Returns",
    render: () => <></>,
  },
];

export const ProductOrderCard = () => {
  const [count, setCount] = useState(1);
  const [openedTabIndex, setOpenedTabIndex] = useState<number>();

  const isOpen = openedTabIndex !== undefined;

  const openTab = (index: number) => setOpenedTabIndex(index);
  const closeTab = () => setOpenedTabIndex(undefined);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeTab();
    }
  };

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  const hasPrev = useMemo(() => {
    return openedTabIndex === undefined ? false : openedTabIndex > 0;
  }, [openedTabIndex]);
  const hasNext = useMemo(() => {
    return openedTabIndex === undefined
      ? false
      : openedTabIndex + 1 < infoElements.length;
  }, [openedTabIndex]);

  const toPrev = () => {
    if (hasPrev && openedTabIndex !== undefined) {
      setOpenedTabIndex(openedTabIndex - 1);
    }
  };
  const toNext = () => {
    if (hasNext && openedTabIndex !== undefined) {
      setOpenedTabIndex(openedTabIndex + 1);
    }
  };

  return (
    <Card className="bg-gray-200">
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">
              $24<sup>99</sup>
            </span>
            <sub className="ml-2 line-through text-gray-400 text-lg">
              $39.99
            </sub>
          </div>
          <MediaQueryCSS maxSize="lg">
            <span>In stock</span>
          </MediaQueryCSS>
        </div>
        <MediaQueryCSS minSize="lg">
          <hr className="border-black mb-3" />
          <ul className="space-y-1">
            <li className="flex justify-between text-base">
              <span>Status</span>
              <span>In stock</span>
            </li>
            {infoElements.map((elem, i) => (
              <li
                key={i}
                className="w-full flex justify-between items-center py-1 cursor-pointer"
                onClick={() => openTab(i)}
              >
                <span className="text-base">{elem.title}</span>
                <ChevronRightIcon className="w-4 h-4" />
              </li>
            ))}
          </ul>
        </MediaQueryCSS>
        <hr className="border-black" />
        <div className="flex justify-between items-center py-1">
          <span className="text-base">Quantity</span>
          <div className="flex items-center gap-4">
            <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
            <span className="text-sm select-none">{count}</span>
            <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-1 gap-2 pb-3">
        <Button>Add to cart</Button>
        <Button>Buy now</Button>
        <Button variant={"outline"} className="col-span-2 lg:col-span-1">
          Add to wish list
        </Button>
      </CardContent>
      <MediaQueryCSS maxSize="lg">
        <CardFooter className="justify-center gap-1">
          Details
          <ChevronDownIcon />
        </CardFooter>
      </MediaQueryCSS>

      <MobileQuickActions
        count={count}
        increment={increment}
        decrement={decrement}
      />

      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        {isOpen && (
          <SheetContent
            hideClose
            className="sm:max-w-full w-screen lg:w-[40vw] flex flex-col"
          >
            <HeaderDesktop
              title={infoElements[openedTabIndex].title}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onPrev={toPrev}
              onNext={toNext}
            />
            {infoElements[openedTabIndex].render(isOpen, closeTab)}
          </SheetContent>
        )}
      </Sheet>
    </Card>
  );
};

export const MobileQuickActions = ({
  count,
  increment,
  decrement,
}: {
  count: number;
  increment: () => void;
  decrement: () => void;
}) => {
  return (
    <ClientOnlyPortal selector="body">
      <MediaQueryCSS maxSize="md">
        <Card className="bg-gray-200 fixed bottom-0 left-0 right-0 rounded-t-md z-10">
          <CardHeader className="space-y-3 p-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-3xl font-bold">
                  $24<sup>99</sup>
                </span>
                <sub className="ml-2 line-through text-gray-400 text-lg">
                  $39.99
                </sub>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  <HeartIcon />
                </button>
                <Button variant={"outline"}>To cart</Button>
                <Button>Buy</Button>
              </div>
            </div>
            <hr className="border-black" />
            <div className="flex justify-between items-center py-1">
              <span className="text-base">Quantity</span>
              <div className="flex items-center gap-4">
                <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
                <span className="text-sm select-none">{count}</span>
                <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
              </div>
            </div>
          </CardHeader>
        </Card>
      </MediaQueryCSS>
    </ClientOnlyPortal>
  );
};

const InfoButton = ({
  title,
  render,
}: {
  title: string;
  render: (isOpen: boolean, closeModal: () => void) => React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeModal();
    }
  };

  return (
    <li>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger
          className="w-full flex justify-between items-center py-1 cursor-pointer"
          onClick={openModal}
        >
          <span className="text-base">{title}</span>
          <ChevronRightIcon className="w-4 h-4" />
        </SheetTrigger>

        {render(isOpen, closeModal)}
      </Sheet>
    </li>
  );
};

interface HeaderControlsProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface HeaderProps extends HeaderControlsProps {
  title: string;
}

const HeaderControls = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: HeaderControlsProps) => {
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

const HeaderDesktop = ({
  title,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: HeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <SheetTitle className="mr-auto lg:text-3xl">{title}</SheetTitle>
      <HeaderControls
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={onPrev}
        onNext={onNext}
      />
      <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </div>
  );
};

const DeliveryContent = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  // const [position, setPosition] = useState<GeolocationPosition>();
  // const [isError, setIsError] = useState(false);
  const [location, setLocation] = useState(() => getCountry()?.code);
  const countries = useMemo(() => Object.entries(countriesList), []);

  // useEffect(() => {
  //   if (isOpen) {
  //     navigator.geolocation.getCurrentPosition(setPosition, () =>
  //       setIsError(true)
  //     );
  //   }
  // }, [isOpen]);

  return (
    <div className="space-y-6">
      <Separator orientation="horizontal" />

      <div className="space-y-5">
        <p className="flex justify-between items-center text-base">
          <span className="font-semibold">Delivery from</span>
          <span>New York, United States</span>
        </p>
        <div className="space-y-2">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full relative text-base p-3 h-max">
              <SelectValue placeholder="Country" />
              <label
                className="absolute left-5 bottom-10 bg-white text-sm"
                htmlFor="country-select"
              >
                Country of delivery
              </label>
            </SelectTrigger>
            <SelectContent id="country-select">
              {countries.map(([code, name]) => (
                <SelectItem value={code} key={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator orientation="horizontal" />

      <p className="text-lg font-semibold">Pickup points</p>

      {/* TODO: add real data */}
      <table className="w-full">
        <tbody className="[&>*:nth-child(even)]:bg-gray-200">
          <tr className="flex justify-between items-center p-4">
            <td>
              <p>Pilot Freight Services</p>
              <p className="text-sm">Mar 24 to point</p>
            </td>
            <td>$27.00</td>
          </tr>
          <tr className="flex justify-between items-center p-4">
            <td>
              <p>Pilot Freight Services</p>
              <p className="text-sm">Mar 24 to point</p>
            </td>
            <td>$27.00</td>
          </tr>
        </tbody>
      </table>

      <p className="text-lg font-semibold">Delivery by courier</p>

      {/* TODO: add real data */}
      <table className="w-full">
        <tbody className="[&>*:nth-child(even)]:bg-gray-200">
          <tr className="flex justify-between items-center p-4">
            <td>
              <p>Pilot Freight Services</p>
              <p className="text-sm">Mar 24 to point</p>
            </td>
            <td>$27.00</td>
          </tr>
          <tr className="flex justify-between items-center p-4">
            <td>
              <p>Pilot Freight Services</p>
              <p className="text-sm">Mar 24 to point</p>
            </td>
            <td>$27.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

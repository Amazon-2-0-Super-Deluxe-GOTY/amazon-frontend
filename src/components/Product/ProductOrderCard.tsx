import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  CreditCardIcon,
  HandCoinsIcon,
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
import { type ChangeEventHandler, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaQueryCSS } from "../MediaQuery";
import ClientOnlyPortal from "../ClientOnlyPortal";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { countriesList, getCountry } from "@/lib/location";
import { Separator } from "../ui/separator";
import ReactSelect, { SingleValue } from "react-select";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { it } from "node:test";

const infoElements = [
  {
    title: "Delivery",
    render: () => <DeliveryContent />,
  },
  {
    title: "Payment methods",
    render: () => <PaymentContent />,
  },
  {
    title: "Security",
    render: () => <SecurityContent />,
  },
  {
    title: "Returns",
    render: () => <ReturnsContent />,
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
            <InfoLabelsList openTab={openTab} />
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
        <CardFooter className="justify-center gap-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="flex justify-center items-center gap-1">
                Details
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <InfoLabelsList openTab={openTab} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
            <SheetHeader
              title={infoElements[openedTabIndex].title}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onPrev={toPrev}
              onNext={toNext}
            />
            {infoElements[openedTabIndex].render()}
          </SheetContent>
        )}
      </Sheet>
    </Card>
  );
};

const MobileQuickActions = ({
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

const InfoLabelsList = ({ openTab }: { openTab: (index: number) => void }) => {
  return infoElements.map((elem, i) => (
    <li
      key={i}
      className="w-full flex justify-between items-center py-1 cursor-pointer"
      onClick={() => openTab(i)}
    >
      <span className="text-base">{elem.title}</span>
      <ChevronRightIcon className="w-4 h-4" />
    </li>
  ));
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

const SheetHeader = ({
  title,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: HeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <SheetTitle className="mr-auto text-lg sm:text-2xl lg:text-3xl">
        {title}
      </SheetTitle>
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
      <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </div>
  );
};

const DeliveryContent = () => {
  const [location, setLocation] = useState(() => {
    const country = getCountry();
    if (!country) return undefined;
    return {
      label: country.country,
      value: country.code,
    };
  });
  const countries = useMemo(
    () =>
      Object.entries(countriesList).map(([code, name]) => ({
        label: name,
        value: code,
      })),
    []
  );

  const onSearchQueryChange = (
    value: SingleValue<{ label: string; value: string }>
  ) => {
    if (!value) return;
    setLocation(value);
  };

  return (
    <div className="grow overflow-y-auto">
      <Separator orientation="horizontal" className="mb-4 lg:mb-6" />

      <div className="space-y-4 lg:space-y-6">
        <div className="space-y-5">
          <p className="flex justify-between items-center text-base">
            <span className="font-semibold">Delivery from</span>
            <span>New York, United States</span>
          </p>
          <div className="space-y-2">
            <div className="relative px-0.5">
              <label
                className="absolute left-5 bottom-10 bg-white text-sm z-10 pointer-events-none"
                htmlFor="country-select"
              >
                Country of delivery
              </label>
              <ReactSelect
                name={"Country"}
                unstyled={true}
                isSearchable={true}
                hideSelectedOptions={true}
                placeholder={"Country"}
                id="country-select"
                classNames={{
                  control: (e) =>
                    cn(
                      `rounded-md border`,
                      `border-input p-3 text-base`,
                      e.isFocused ? "ring-1 ring-ring" : ""
                    ),
                  dropdownIndicator: () => "text-gray-400",
                  menu: () =>
                    cn(
                      "absolute top-0 mt-1 text-sm z-10 w-full",
                      "rounded-md border bg-popover shadow-md overflow-x-hidden"
                    ),
                  option: () =>
                    cn(
                      "cursor-default",
                      "rounded-sm py-1.5 my-1 px-2 text-sm outline-none",
                      "focus:bg-gray-200 hover:bg-gray-200 w-auto"
                    ),
                  noOptionsMessage: () => "p-5",
                  multiValue: () => "bg-gray-200 px-2 p-1 rounded mr-2",
                  input: () => "text-sm overflow-x-hidden",
                }}
                options={countries}
                value={location}
                onChange={onSearchQueryChange}
              />
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="space-y-3">
          <p className="sm:text-lg font-semibold">Pickup points</p>
          {/* FIXME: I don't know yet how the data will look like, so I hardcoded here data from design */}
          <table className="w-full">
            <tbody>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <p className="sm:text-lg font-semibold">Delivery by courier</p>
          {/* FIXME: I don't know yet how the data will look like, so I hardcoded here data from design */}
          <table className="w-full">
            <tbody>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
              <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
                <td>
                  <p>Pilot Freight Services</p>
                  <p className="text-xs sm:text-sm">Mar 24 to point</p>
                </td>
                <td>$27.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

type PaymentTypes =
  | "credit_card"
  | "google_pay"
  | "apple_pay"
  | "paypal"
  | "receipt";

const paymentMethodsData: {
  type: PaymentTypes;
  title: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "credit_card",
    title: "Credit card",
    text: "Save your card in your [Marketplace’s name] account to pay faster and more conveniently. After saving your card, you don’t have to login to the bank, enter codes or enter data for subsequent purchases. Lear more",
    icon: <CreditCardIcon />,
  },
  {
    type: "google_pay",
    title: "Google Pay",
    text: "Do you have a device with an Android operating system? In this case, use Google Pay without providing payment data. This is simple and convenient, and importantly - your card data is not stored on the device and not transferred during the transaction.",
    icon: <CreditCardIcon />,
  },
  {
    type: "apple_pay",
    title: "Apple Pay",
    text: "If you are a user of an iOS device, Apple Pay is built-in. This does not require downloading any separate application. In addition, payment with Apple Pay is also possible in the Safari browser.",
    icon: <CreditCardIcon />,
  },
  {
    type: "paypal",
    title: "PayPal",
    text: "PayPal is a global payment method that allows you to pay anywhere in the world without revealing your financial data. Simply top up your PayPal or use your credit or debit card. You can also pay by card once without having to login.Simply top up your PayPal or use a credit or debit card. You can also pay by card once without having to log in.",
    icon: <CreditCardIcon />,
  },
  {
    type: "receipt",
    title: "Pay on delivery",
    text: "If you choose the shipping method, you can choose the payment on receipt. This means that you will pay the goods by cash or payment card to the courier who will deliver the parcel to you or at the point of receipt.",
    icon: <HandCoinsIcon />,
  },
];

const PaymentContent = () => {
  return (
    <div className="grow space-y-4 lg:space-y-6 overflow-y-auto">
      <Separator orientation="horizontal" />
      <p className="text-sm sm:text-base">
        On [Marketplace’s name] you can pay for your purchases in various ways.
        At checkout you will see a list of methods available for your purchase.
      </p>
      <Separator orientation="horizontal" />
      <div>
        {paymentMethodsData.map((item, i) => (
          <Accordion
            type="single"
            collapsible
            className="even:bg-gray-200 rounded-md"
            key={item.type}
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-4">
                <div className="flex items-center gap-4">
                  {item.icon}
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 text-sm sm:text-base">
                {item.text}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const SecurityContent = () => {
  return (
    <div className="grow space-y-4 lg:space-y-6 overflow-y-auto">
      <Separator orientation="horizontal" />
      <p className="text-sm sm:text-base">
        You buy safely in [Marketplace’s name]. Here you will learn about your
        rights after purchase.
      </p>
      <Separator orientation="horizontal" />
      <div className="space-y-3">
        <h3 className="text-lg lg:text-xl font-semibold">Complaint</h3>
        <p className="text-sm sm:text-base">
          Seller is responsible for defective goods within{" "}
          <span className="font-semibold">1 year</span> from the moment of
          delivery.
        </p>
        <h3 className="lg:text-lg font-semibold flex justify-between items-center">
          <span>Complaint deadline</span>
          <span>1 year</span>
        </h3>
        <p className="text-sm sm:text-base">
          Applies to complaints about the guarantee or non-conformity of the
          goods to the contract.
        </p>
      </div>
      <Separator orientation="horizontal" />
      <div className="space-y-3">
        <h3 className="text-lg lg:text-xl font-semibold">Guarantee</h3>
        <p className="text-sm sm:text-base">
          Will apply to the seller’s goods for 1 month from the date of
          purchase.
        </p>
        <h3 className="lg:text-lg font-semibold flex justify-between items-center">
          <span>Guarantee deadline</span>
          <span>1 month</span>
        </h3>
      </div>
    </div>
  );
};

const ReturnsContent = () => {
  return (
    <div className="grow space-y-4 lg:space-y-6 overflow-y-auto">
      <Separator orientation="horizontal" />
      <p className="text-sm sm:text-base">
        You have 14 days to terminate the contract.
      </p>
      <Separator orientation="horizontal" />
      <div>
        <h3 className="text-lg lg:text-xl font-semibold">Cost of returning</h3>
        <p className="text-sm sm:text-base">
          The refund rate depends on the shipping method you choose when
          purchasing.
        </p>
      </div>
      {/* FIXME: I don't know yet how the data will look like, so I hardcoded here data from design */}
      <table className="w-full">
        <tbody>
          <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
            <td>
              <p>Pilot Freight Services</p>
              <p className="text-xs sm:text-sm">Free on purchase from $150</p>
            </td>
            <td>At your expense</td>
          </tr>
          <tr className="text-sm sm:text-base flex justify-between items-center p-4 even:bg-gray-200 rounded-md">
            <td>
              <p>USPS</p>
              <p className="text-xs sm:text-sm">Free on purchase from $100</p>
            </td>
            <td>At your expense</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

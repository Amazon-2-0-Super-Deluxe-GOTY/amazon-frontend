import { CreditCardIcon, HandCoinsIcon } from "lucide-react";
import type { PaymentTypes } from "./types";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export const PaymentContent = () => {
  return (
    <div className="grow space-y-4 lg:space-y-6">
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

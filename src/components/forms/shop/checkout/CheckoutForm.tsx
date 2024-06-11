"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { countriesList, getCountry } from "@/lib/location";
import { useForm } from "react-hook-form";
import { z, RefinementCtx } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuthStore } from "@/lib/storage";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/users";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutProductCard } from "@/components/Checkout/CheckoutProductCard";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MaskedInputCardNumber, MaskedInputCardDate, MaskedInputCardCVV } from "@/components/Checkout/MaskedInput";
import { cn } from "@/lib/utils";
import ReactSelect, { SingleValue } from "react-select";
import { PlaceOrderModal } from "@/components/Checkout/PlaceOrderModal";

const FormSchema = z
  .object({
    firstName: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    lastName: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    email: z.string().email({
      message: "Wrong or Invalid email address",
    }),
    country: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    state: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    city: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    zipCode: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    adress: z.string().min(1, {
        message: "This field is necessary to continue!",
    }),
    paymentType: z.string().min(1, {
        message: "This field is necessary to continue!",
    }).default("cash"),
    cardNumber: z.string().optional(),
    cardDate: z.string().optional(),
    cardCVV: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentType !== "cash") {
    if (!data.cardNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This field is necessary to continue!",
        path: ["cardNumber"],
      });
    }
    if (!data.cardDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This field is necessary to continue!",
        path: ["cardDate"],
      });
    }
    if (!data.cardCVV) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This field is necessary to continue!",
        path: ["cardCVV"],
      });
    }
  }
});

export function CheckoutForm({
  headerData,
  // onSubmit,
}: {
  headerData: {
    firstName: string;
    secondName: string;
    email: string;
    checkout: {
        id: string;
        products: {
            code: string;
            title: string;
            quantity: number;
            price: number;
        }[];
        totalCost: number;
    };
    whole: string;
    fraction: string;
}
  // onSubmit: (token: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        adress: "",
        paymentType: "cash",
        cardNumber: "",
        cardDate: "",
        cardCVV: "",
    },
  });

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
  // const createUserMutation = useMutation({
  //   mutationFn: registerUser,
  // });

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  const [value, setValue] = useState('cash');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid lg:grid-cols-[57.6875fr_40.8125fr] w-full h-full gap-6"
      >
        <section className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-2">
            <span className="text-2xl lg:text-3xl">Logo</span>
            <span className="text-2xl lg:text-3xl">Checkout</span>
          </div>
          <Separator />
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex flex-col gap-6">
              <span className="text-xl lg:text-2xl">Recipient information</span>
              <div className="flex flex-col gap-6">
                <div className="w-full grid lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                            First name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              type="text"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                            Last name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              type="text"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="text"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="max-md:text-xs px-4" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-6">
              <span className="text-xl lg:text-2xl">Delivery address</span>
              <div className="flex flex-col gap-6">
                <div className="w-full grid lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5 z-10">
                            Country
                          </FormLabel>
                          <FormControl>
                            <ReactSelect
                              name={"сountry"}
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
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                            State
                          </FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                            City
                          </FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                            ZIP code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter ZIP code"
                              type="text"
                              autoComplete="code"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage className="max-md:text-xs px-4" />
                    </FormItem>
                  )}
                />
              </div>
              <span className="flex gap-1">Your order will be delivered on <p className="text-blue-400 font-bold">26.05.2024</p></span>
            </div>
            <Separator />
            <div className="flex flex-col gap-6">
              <span className="text-xl lg:text-2xl">Payment method</span>
              <div>
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormControl>
                          <ToggleGroup 
                            value={field.value} 
                            onValueChange={(value) => {
                              if (value) field.onChange(value); setValue(value);
                            }} 
                            type="single" 
                            className="w-full flex max-md:flex-col gap-6"
                          >
                            <ToggleGroupItem className={cn("w-full flex justify-between", field.value==="cash" && "bg-gray-100")} value="cash">Cash</ToggleGroupItem>
                            <ToggleGroupItem className={cn("w-full flex justify-between", field.value==="card" && "bg-gray-100")} value="card">Card</ToggleGroupItem>
                          </ToggleGroup>
                        </FormControl>
                      </div>
                      <FormMessage className="max-md:text-xs px-4" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {value === "card" && <>
              <Separator />
              <div className="flex flex-col gap-6">
                <span className="text-xl lg:text-2xl">Card details</span>
                  <div className="flex max-md:flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div>
                            <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                              Card number
                            </FormLabel>
                            <FormControl>
                              <MaskedInputCardNumber {...field} placeholder="0000-0000-0000-0000" />
                            </FormControl>
                          </div>
                          <FormMessage className="max-md:text-xs px-4" />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex gap-6">
                      <FormField
                        control={form.control}
                        name="cardDate"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div>
                              <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                                Date of expiration
                              </FormLabel>
                              <FormControl>
                                <MaskedInputCardDate {...field} placeholder="01/01" />
                              </FormControl>
                            </div>
                            <FormMessage className="max-md:text-xs px-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cardCVV"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div>
                              <FormLabel className="absolute ml-3 -mt-2.5 font-light bg-white p-0.5">
                                CVV/CVC
                              </FormLabel>
                                <FormControl>
                                  <MaskedInputCardCVV {...field} placeholder="***" />
                              </FormControl>
                            </div>
                            <FormMessage className="max-md:text-xs px-4" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
              </div>
            </>}
          </div>
        </section>
        <section className="w-full">
          <div className="w-full flex flex-col gap-4 rounded-lg bg-gray-100 p-6">
            <span className="text-xl lg:text-2xl">Summary</span>
            <Separator />
            <div>
              <ScrollArea className="mr-[-12px]">
                <div className="max-h-[410px]">
                  {headerData.checkout.products.map((item, i) => {
                    return(
                      <CheckoutProductCard key={i} name={item.title} quantity={item.quantity} price={item.price} />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
            <Separator />
            <div className="w-full flex justify-end items-center gap-6">
              <span className="text-xl lg:text-2xl">Total:</span>
              <div>
                <span className="text-xl lg:text-3xl font-medium text-black">${headerData.whole}</span>
                <sup className="text-xs lg:text-lg font-medium text-black">{headerData.fraction}</sup>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center gap-2">
              <Button type="submit">Place order</Button>
              <span className="w-full text-center text-sm lg:text-base">By clicking “Place order” you agree with <Link href={"/legal-notice?tab=terms-open"} className="text-blue-400 font-semibold">PERRY Terms and Conditions</Link></span>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
}

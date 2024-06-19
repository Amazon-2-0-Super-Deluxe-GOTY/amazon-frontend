"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutProductCard } from "@/components/Checkout/CheckoutProductCard";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  MaskedInputCardNumber,
  MaskedInputCardDate,
  MaskedInputCardCVV,
} from "@/components/Checkout/MaskedInput";
import { cn } from "@/lib/utils";
import { PlaceOrderModal } from "@/components/Checkout/PlaceOrderModal";
import { skipToken, useQuery } from "@tanstack/react-query";

interface IDeliveryData {
  id: number;
  name: string;
  iso2: string;
}

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
    city: z.string().optional(),
    postcode: z.string().min(1, {
      message: "This field is necessary to continue!",
    }),
    paymentType: z
      .string()
      .min(1, {
        message: "This field is necessary to continue!",
      })
      .default("cash"),
    cardNumber: z.string().optional(),
    cardDate: z.string().optional(),
    cardCVV: z.string().optional(),
  })
  .superRefine((data, ctx) => {
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
}: // onSubmit,
{
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
  };
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
      postcode: "",
      paymentType: "cash",
      cardNumber: "",
      cardDate: "",
      cardCVV: "",
    },
  });

  const [value, setValue] = useState("cash");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    setIsOpen(true);
  };

  const selectCountry = form.watch("country");
  const selectState = form.watch("state");
  const countryQuery = GetCountryData();
  const stateQuery = GetStateData(selectCountry);
  const cityQuery = GetCityData(selectCountry, selectState);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid lg:grid-cols-[57.6875fr_40.8125fr] w-full h-full gap-6"
      >
        <section className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-2">
            <span className="text-2xl md:text-3xl">Logo</span>
            <span className="text-2xl md:text-3xl">Checkout</span>
          </div>
          <Separator />
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex flex-col gap-6">
              <span className="text-xl lg:text-2xl">Recipient information</span>
              <div className="flex flex-col gap-6">
                <div className="w-full grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 bg-background p-0.5">
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
                          <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
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
                        <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
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
              <span className="text-xl md:text-2xl">Delivery address</span>
              <div className="flex flex-col gap-6">
                <div className="w-full grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                            Country
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                {countryQuery?.isLoading ? (
                                  <SelectGroup>
                                    <SelectLabel>Loading...</SelectLabel>
                                  </SelectGroup>
                                ) : (
                                  countryQuery?.data?.map((country) => (
                                    <SelectItem
                                      key={country.id}
                                      value={country.iso2}
                                    >
                                      {country.name}
                                    </SelectItem>
                                  ))
                                )}
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                            State
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {form.getValues("country").length !== 0 ? (
                                  stateQuery?.isLoading ? (
                                    <SelectGroup>
                                      <SelectLabel>Loading...</SelectLabel>
                                    </SelectGroup>
                                  ) : (
                                    stateQuery?.data?.map((state) => (
                                      <SelectItem
                                        key={state.id}
                                        value={state.iso2}
                                      >
                                        {state.name}
                                      </SelectItem>
                                    ))
                                  )
                                ) : (
                                  <SelectGroup>
                                    <SelectLabel>
                                      First you need to select a country.
                                    </SelectLabel>
                                  </SelectGroup>
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage className="max-md:text-xs px-4" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                            City
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectCountry.length !== 0 &&
                                selectState.length !== 0 ? (
                                  cityQuery?.isLoading ? (
                                    <SelectGroup>
                                      <SelectLabel>Loading...</SelectLabel>
                                    </SelectGroup>
                                  ) : cityQuery?.data?.length === 0 ? (
                                    <SelectGroup>
                                      <SelectLabel>
                                        There are no cities there.
                                      </SelectLabel>
                                    </SelectGroup>
                                  ) : (
                                    cityQuery?.data?.map((city) => (
                                      <SelectItem
                                        key={city.id}
                                        value={city.name}
                                      >
                                        {city.name}
                                      </SelectItem>
                                    ))
                                  )
                                ) : (
                                  <SelectGroup>
                                    <SelectLabel>
                                      First you need to select country and
                                      state.
                                    </SelectLabel>
                                  </SelectGroup>
                                )}
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
                    name="postcode"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                            Postcode
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter postcode"
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
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-6">
              <span className="text-xl md:text-2xl">Payment method</span>
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
                              if (value) field.onChange(value);
                              setValue(value);
                            }}
                            type="single"
                            className="w-full flex max-md:flex-col gap-6"
                          >
                            <ToggleGroupItem
                              className={cn(
                                "w-full flex justify-between",
                                field.value === "cash" && "bg-gray-100"
                              )}
                              value="cash"
                            >
                              Cash
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              className={cn(
                                "w-full flex justify-between",
                                field.value === "card" && "bg-gray-100"
                              )}
                              value="card"
                            >
                              Card
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </FormControl>
                      </div>
                      <FormMessage className="max-md:text-xs px-4" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {value === "card" && (
              <>
                <Separator />
                <div className="flex flex-col gap-6">
                  <span className="text-xl md:text-2xl">Card details</span>
                  <div className="flex max-md:flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div>
                            <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                              Card number
                            </FormLabel>
                            <FormControl>
                              <MaskedInputCardNumber
                                {...field}
                                placeholder="0000-0000-0000-0000"
                              />
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
                              <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                                Date of expiration
                              </FormLabel>
                              <FormControl>
                                <MaskedInputCardDate
                                  {...field}
                                  placeholder="01/01"
                                />
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
                              <FormLabel className="absolute ml-3 -mt-2.5 bg-white p-0.5">
                                CVV/CVC
                              </FormLabel>
                              <FormControl>
                                <MaskedInputCardCVV
                                  {...field}
                                  placeholder="***"
                                />
                              </FormControl>
                            </div>
                            <FormMessage className="max-md:text-xs px-4" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        <section className="w-full">
          <div className="w-full flex flex-col gap-4 rounded-lg p-6 bg-card">
            <span className="text-xl md:text-2xl">Summary</span>
            <Separator />
            <div>
              <ScrollArea className="mr-[-12px]">
                <div className="max-h-[410px]">
                  {headerData.checkout.products.map((item, i) => {
                    return (
                      <CheckoutProductCard
                        key={i}
                        name={item.title}
                        quantity={item.quantity}
                        price={item.price}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
            <Separator />
            <div className="w-full flex justify-end items-center gap-6">
              <span className="text-xl md:text-2xl">Total:</span>
              <div>
                <span className="text-xl md:text-3xl font-medium text-black">
                  ${headerData.whole}
                </span>
                <sup className="text-xs md:text-lg font-medium text-black">
                  {headerData.fraction}
                </sup>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center gap-2">
              <Button type="submit">Place order</Button>
              <PlaceOrderModal isOpen={isOpen} />
              <span className="w-full text-center text-sm md:text-base">
                By clicking “Place order” you agree with{" "}
                <Link
                  href={"/legal-notice?tab=terms-open"}
                  className="text-blue-400 font-semibold"
                >
                  PERRY Terms and Conditions
                </Link>
              </span>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
}

function GetCountryData() {
  const countryQuery = useQuery<IDeliveryData[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      return await fetch("/api/countries").then((res) => res.json());
    },
    refetchOnWindowFocus: false,
  });

  const res = {
    data: countryQuery.data,
    isLoading: countryQuery.isLoading,
  };

  return res;
}

function GetStateData(stateIso2: string) {
  const stateQuery = useQuery<IDeliveryData[]>({
    queryKey: ["states", stateIso2],
    queryFn: stateIso2
      ? async () => {
          return await fetch(`/api/states?ciso=${stateIso2}`).then((res) =>
            res.json()
          );
        }
      : skipToken,
    refetchOnWindowFocus: false,
  });

  const res = {
    data: stateQuery.data,
    isLoading: stateQuery.isLoading,
  };

  return res;
}

function GetCityData(countryIso2: string, stateIso2: string) {
  const cityQuery = useQuery<IDeliveryData[]>({
    queryKey: ["cities", countryIso2, stateIso2],
    queryFn:
      countryIso2 && stateIso2
        ? async () => {
            return await fetch(
              `/api/cities?ciso=${countryIso2}&siso=${stateIso2}`
            ).then((res) => res.json());
          }
        : skipToken,
    refetchOnWindowFocus: false,
  });

  const res = {
    data: cityQuery.data,
    isLoading: cityQuery.isLoading,
  };

  return res;
}

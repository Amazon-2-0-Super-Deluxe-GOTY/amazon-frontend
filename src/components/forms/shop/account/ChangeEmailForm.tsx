"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FormSchema = z.object({
  email: z.string().email({
    message: "This field is required to be filled first",
  }),
  code: z.string(),
});

export function ChangeEmailForm({ onCancel }: { onCancel: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));

    if (isCodeActive && data.code !== code) {
      form.setError("code", { message: "Incorrect code, try again" });
    } else {
      form.setError("code", {
        message: `Required to click “${buttonText}” and to enter it`,
      });
    }
  }

  const [buttonText, setButtonText] = useState<string>("Send code");
  const [code, setCode] = useState<string | undefined>(undefined);
  const [timer, setTimer] = useState<number>(60);
  const [isCodeActive, setIsCodeActive] = useState<boolean>(false);

  function sendCode() {
    if (!form.getValues().email.match(emailPattern)) {
      form.setError("email", {
        message: "This field is required to be filled first",
      });
      return;
    } else {
      form.clearErrors("email");
    }
    const getCode = Math.floor(Math.random() * 999999)
      .toString()
      .padStart(6, "0");
    setCode(getCode);
    setIsCodeActive(true);
    timerStart();
    console.log("CODE: " + getCode);
  }

  function timerStart() {
    let interval: NodeJS.Timeout | null = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval as NodeJS.Timeout);
          setButtonText("Resend code");
          setCode(undefined);
          setIsCodeActive(false);
          return 60;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="flex flex-col justify-center h-full">
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
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <div className="w-full h-full md:py-6 py-5">
                  <div className="flex justify-center items-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot className="max-md:max-w-9" index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className="max-md:max-w-9" index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className="max-md:max-w-9" index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className="max-md:max-w-9" index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className="max-md:max-w-9" index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className="max-md:max-w-9" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                  <h1 className="text-center mt-2">
                    <FormMessage className="max-md:text-xs" />
                  </h1>
                  <div className="flex justify-center items-center">
                    {!isCodeActive ? (
                      <Button
                        variant={"link"}
                        type="button"
                        className="m-auto"
                        onClick={sendCode}
                      >
                        {buttonText}
                      </Button>
                    ) : (
                      <Button variant={"link"} type="button" className="m-auto">
                        Resend code {parseInt((timer / 60).toString())}:
                        {(timer % 60).toString().padStart(2, "0")}
                      </Button>
                    )}
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center gap-3 md:mt-6">
          <Button
            type="reset"
            variant={"secondary"}
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}

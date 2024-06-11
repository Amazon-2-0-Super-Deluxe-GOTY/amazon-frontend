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
import { useState } from "react";
import type { SignInUpModalVariants } from "../../../SignInUpModal/types";
import { useMutation } from "@tanstack/react-query";
import { confirmEmail, resendConfirmationEmail } from "@/api/users";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const FormSchema = z.object({
  code: z.string().min(1, {
    message: "Incorrect code, try again",
  }),
});

export function SignUpCodeForm({ onSubmit }: { onSubmit: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });
  const resendCodeMutation = useMutation({
    mutationFn: resendConfirmationEmail,
  });
  const confirmEmailMutation = useMutation({
    mutationFn: confirmEmail,
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    confirmEmailMutation.mutateAsync(data.code).then((res) => {
      if (res.status === 200) {
        onSubmit();
      } else {
        form.setError("code", { message: res.message });
      }
    });
  }

  const [buttonText, setButtonText] = useState<string>("Send code");
  const [timer, setTimer] = useState<number>(60);
  const [isCodeActive, setIsCodeActive] = useState<boolean>(false);

  function sendCode() {
    setIsCodeActive(true);
    timerStart();
    resendCodeMutation.mutate();
  }

  function timerStart() {
    let interval: NodeJS.Timeout | null = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval as NodeJS.Timeout);
          setButtonText("Resend code");
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
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="space-y-6 flex flex-col justify-center h-full">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <div className="w-full h-full py-16">
                  <div className="flex justify-center items-center">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                  <h1 className="text-center mt-2">
                    <FormMessage className="max-md:text-xs px-4" />
                  </h1>
                  <div className="flex justify-center items-center">
                    {!isCodeActive ? (
                      <Button
                        variant={"link"}
                        type="button"
                        className="m-auto"
                        onClick={sendCode}
                        disabled={resendCodeMutation.isPending}
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
        <Button
          type="submit"
          className="w-full"
          disabled={confirmEmailMutation.isPending}
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}

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
import { useMutation } from "@tanstack/react-query";
import { confirmEmail, updateUserEmail } from "@/api/users";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const emailSchema = z.string().email({
  message: "This field is required to be filled first",
});

const FormSchema = z.object({
  email: emailSchema,
  code: z.string(),
});

export function ChangeEmailForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const updateEmailMutation = useMutation({ mutationFn: updateUserEmail });
  const confirmEmailMutation = useMutation({ mutationFn: confirmEmail });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    confirmEmailMutation.mutateAsync(data.code).then((res) => {
      if (res.status === 200) {
        onSubmit();
      } else {
        form.setError("code", { message: "Incorrect code, try again" });
      }
    });
  }

  const [buttonText, setButtonText] = useState<string>("Send code");
  const [timer, setTimer] = useState<number>(60);
  const [isCodeActive, setIsCodeActive] = useState<boolean>(false);

  function sendCode() {
    const { email } = form.getValues();
    if (!emailSchema.safeParse(email).success) {
      form.setError("email", {
        message: "This field is required to be filled first",
      });
      return;
    }

    updateEmailMutation.mutate(email);
    setIsCodeActive(true);
    timerStart();
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
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        {...field}
                      >
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
                        disabled={confirmEmailMutation.isPending}
                      >
                        {buttonText}
                      </Button>
                    ) : (
                      <Button
                        variant={"link"}
                        type="button"
                        className="m-auto"
                        disabled={confirmEmailMutation.isPending}
                      >
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
            disabled={confirmEmailMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={confirmEmailMutation.isPending}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}

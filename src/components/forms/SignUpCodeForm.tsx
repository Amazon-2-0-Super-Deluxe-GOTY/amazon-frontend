"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { randomInt } from "crypto"

const FormSchema = z.object({
  code: z.string().min(1, {
    message: "Incorrect code, try again",
  }),
});


export function SignUpCodeForm({ onChangeModal } : { onChangeModal: (modal:string) => void }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Checking data for validity

    console.log("SignUpCode :: You submitted the following values:");
    console.log(JSON.stringify(data, null, 2));

    if(data.code === code)
    {
      onChangeModal("finishing-touches");
    }
    else
    {
      form.setError("code", { message: "Incorrect code, try again" });
    }
  }

  const [buttonText, setButtonText] = useState<string>("Send code");
  const [code, setCode] = useState<string | undefined>(undefined);
  const [timer, setTimer] = useState<number>(60);
  const [isCodeActive, setIsCodeActive] = useState<boolean>(false);

  function sendCode() {
    const getCode = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex flex-col justify-center h-full">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="w-full h-full py-16">
                <div className="flex justify-center items-center">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
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
                <h1 className="text-center mt-2"><FormMessage /></h1>
                <div className="flex justify-center items-center">
                  {!isCodeActive ? <Button variant={"link"} type="button" className="m-auto" onClick={sendCode}>{buttonText}</Button> :
                  <Button variant={"link"} type="button" className="m-auto">Resend code {parseInt((timer/60).toString())}:{(timer%60).toString().padStart(2, '0')}</Button>}
                </div>
              </div>
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  )
}

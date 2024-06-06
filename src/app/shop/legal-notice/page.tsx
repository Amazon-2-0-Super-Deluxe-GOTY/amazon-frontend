import { Button } from "@/components/ui/button";
import { useSearchParamsTools } from "@/lib/router";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import TermsAndConditions from "@/components/LegalNotice/TermsAndConditions";
import LicenseAgreement from "@/components/LegalNotice/LicenseAgreement";
import PrivacyPolicy from "@/components/LegalNotice/PrivacyPolicy";

export default function NotFound() {

  const param = useSearchParamsTools();

  const [isOpenTab, setIsOpenTab] = useState<boolean>(() => {
    const defaultValue = param.get("tab");
    if(defaultValue) {
      const value = defaultValue.split("-")[1];
      if(value && value === "open")
        return true;
    }
    return false;
  });

  const [accountTab, setAccountTab] = useState<string>(() => {
    const defaultValue = param.get("tab");
    if(defaultValue) {
      const value = defaultValue.split("-")[0];
      if(value)
        return value;
    }
    return "";
  });

  const onChangeAccountTab = (name:string) => {
    setAccountTab(name);
    setIsOpenTab(true);
  };

  const onBack = () => {
    setIsOpenTab(false);
  }

  useEffect(() => {
    param.set("tab", accountTab + "-" + (isOpenTab ? "open" : "switch"));
  }, [onChangeAccountTab, onBack]);

  return (
    <main className="flex flex-col items-center w-full px-4">
      <section className="w-full md:pt-5">
        <div className="grid md:grid-cols-[0.5fr_min-content_1fr_1fr] gap-6 w-full p-1 h-full">
          <aside className={cn("flex flex-col gap-6 sticky h-max py-6 px-4 min-h-[582px]", isOpenTab && "max-md:hidden")}>
            <Button
              variant={"ghost"} 
              onClick={() => onChangeAccountTab("terms")}
              className="flex justify-start font-normal text-base"
            >Terms and conditions</Button>
            <Button
              variant={"ghost"} 
              onClick={() => onChangeAccountTab("license")}
              className="flex justify-start font-normal text-base"
            >License agreement</Button>
            <Button
              variant={"ghost"} 
              onClick={() => onChangeAccountTab("privacy")}
              className="flex justify-start font-normal text-base"
            >Privacy policy</Button>
          </aside>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className={cn("col-span-2 relative md:block", !isOpenTab && "max-md:hidden")}>
            <div>
            <Button variant={"ghost"} className="pl-2 mb-3 md:hidden" onClick={onBack} >
              <ChevronLeft />
              <span className="text-base">Back</span>
            </Button>
            {(() => {
              switch (accountTab) {
                case "terms":
                  return <TermsAndConditions />;
                case "license":
                  return <LicenseAgreement />;
                case "privacy":
                  return <PrivacyPolicy />;
                default:
                  return null;
              }
            })()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

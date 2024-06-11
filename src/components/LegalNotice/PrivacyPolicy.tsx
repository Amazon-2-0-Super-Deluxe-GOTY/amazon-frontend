import Link from "next/link";
import { Separator } from "../ui/separator";

export default function PrivacyPolicy() {

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold max-md:w-full text-left">Privacy policy</h1>
        <h3 className="text-xl md:text-2xl font-medium">Last updated: May 7, 2024</h3>
      </div>
      <Separator />
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1 md:gap-2 text-sm md:text-base">
          <span>Perry is committed to protecting your privacy. This privacy policy explains how Perry collects, uses, and discloses your personal information when you visit or make a purchase from <Link href="https://gitlabitstep.pp.ua" className=" text-blue-500">https://gitlabitstep.pp.ua</Link> (the &quot;Site&quot;).</span>
          <span>By using the Site, you agree to the collection and use of information in accordance with this policy.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Information collection and use</h1>
          <span>We collect several types of information to provide and improve our services to you.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Types of data collected</h1>
          <ul className="list-disc pl-5 text-sm md:text-base">
            <li>Personal information: while using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
              <ul className="list-disc pl-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address</li>
              </ul>
            </li>
            <li>Payment information: when you make a purchase, we collect payment details such as credit card numbers or other payment information.</li>
            <li>Log data: we collect information that your browser sends whenever you visit our Site. This Log Data may include information such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Use of data</h1>
          <span>Perry uses the collected data for various purposes:</span>
          <ul className="list-disc pl-5">
            <li>To provide and maintain the Site</li>
            <li>To notify you about changes to our Site</li>
            <li>To allow you to participate in interactive features of our Site when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Site</li>
            <li>To monitor the usage of the Site</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide you with news, special offers, and general information about other goods, services, and events which we offer unless you have opted not to receive such information</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Disclosure of data</h1>
          <span>Perry may disclose your personal information in the good faith belief that such action is necessary to:</span>
          <ul className="list-disc pl-5">
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of Perry</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Site</li>
            <li>Protect the personal safety of users of the Site or the public</li>
            <li>Protect against legal liability</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Security of data</h1>
          <span>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Your data protection rights</h1>
          <span>Depending on your location, you may have the following rights regarding your personal information:</span>
          <ul className="list-disc pl-5">
            <li>The right to access: you have the right to request copies of your personal information.</li>
            <li>The right to rectification: you have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li>The right to erasure: you have the right to request that we erase your personal information, under certain conditions.</li>
            <li>The right to restrict processing: you have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
            <li>The right to object to processing: you have the right to object to our processing of your personal information, under certain conditions.</li>
            <li>The right to data portability: you have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Changes to this privacy policy</h1>
          <span>This privacy policy is effective as of May 7, 2024, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</span>
          <span>We reserve the right to update or change our privacy policy at any time, and you should check this privacy policy periodically. Your continued use of the service after we post any modifications to the privacy policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified privacy policy.</span>
          <span>If we make any material changes to this privacy policy, we will notify you either through the email address you have provided us or by placing a prominent notice on our website.</span>
        </div>
      </div>
    </div>
  );
}
  
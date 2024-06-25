import Link from "next/link";
import { Separator } from "../ui/separator";

export default function TermsAndConditions() {

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold max-md:w-full text-left">Terms and conditions</h1>
        <h3 className="text-xl md:text-2xl font-medium">Last updated: May 7, 2024</h3>
      </div>
      <Separator />
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1 md:gap-2 text-sm md:text-base">
          <span>Welcome to Perry! These terms and conditions (&quot;Agreement&quot;) govern your use of the services and products provided on the website located at <Link href="https://perrymarket.pp.ua/" className=" text-blue-500">https://perrymarket.pp.ua/</Link> (the &quot;Site&quot;). By accessing or using the Site, you agree to be bound by the terms and conditions of this Agreement. If you do not agree to these terms, please do not use the Site.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Use of the site</h1>
          <ul className="list-disc pl-5 text-sm md:text-base">
            <li>Eligibility: by using the Site, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this Agreement.</li>
            <li>Account registration: to access certain features of the Site, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.</li>
            <li>Prohibited activities: you agree not to:
              <ul className="list-disc pl-6">
                <li>Violate any applicable laws or regulations.</li>
                <li>Engage in fraudulent or deceptive practices.</li>
                <li>Infringe on the intellectual property rights of others.</li>
                <li>Upload or transmit viruses or other harmful code.</li>
                <li>Engage in any activity that could damage, disable, or overburden the Site.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Marketplace transactions</h1>
          <ul className="list-disc pl-5">
            <li>Seller obligations: sellers must comply with our seller terms and conditions, which include providing accurate descriptions of products, fulfilling orders promptly, and adhering to all applicable laws and regulations.</li>
            <li>Buyer obligations: buyers must ensure that their payment information is accurate and up-to-date and that they comply with all payment obligations for purchases made through the Site.</li>
            <li>Payment processing: all payments are processed through our secure payment gateway. By submitting your payment information, you authorize us to charge the applicable fees for your purchases.</li>
            <li>Order fulfillment: sellers are responsible for fulfilling orders in a timely manner. Perry is not liable for any issues related to order fulfillment, including delays or non-delivery.</li>
            <li>Returns and refunds: our returns and refunds policy outlines the conditions under which returns and refunds may be granted. Buyers should review this policy before making a purchase.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Intellectual property</h1>
          <ul className="list-disc pl-5">
            <li>Ownership: all content on the Site, including but not limited to text, graphics, logos, images, and software, is the property of Perry or its content suppliers and is protected by international copyright and trademark laws.</li>
            <li>License to use: Perry grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Site for your personal or internal business use, subject to the terms and conditions of this Agreement.</li>
            <li>User contributions: if you post, upload, or otherwise provide any content to the Site (&quot;User Contributions&quot;), you grant Perry a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, adapt, publish, translate, distribute, perform, and display such content in any media.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Prohibited conduct</h1>
          <ul className="list-disc pl-5">
            <li>Misuse of the platform: you agree not to misuse Perry’s platform by engaging in activities such as hacking, fraud, or distribution of illegal products.</li>
            <li>Respectful communication: you agree to communicate respectfully with other users and not engage in harassment, threats, or abuse.</li>
            <li>Accurate information: you agree to provide accurate and truthful information in your interactions on the platform.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Content guidelines</h1>
          <ul className="list-disc pl-5">
            <li>Product listings: sellers must ensure that all product listings are accurate and not misleading. False advertising is strictly prohibited.</li>
            <li>Reviews and feedback: users are encouraged to leave honest and constructive feedback. Manipulating reviews or feedback is prohibited.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Service modifications</h1>
          <span>Perry reserves the right to modify, suspend, or discontinue any aspect of the Site at any time, including the availability of any feature, database, or content. We may also impose limits on certain features and services or restrict your access to parts or all of the Site without notice or liability.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Governing law</h1>
          <span>This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding arising under this Agreement will be brought exclusively in the federal or state courts located in Los Angeles, California, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Severability</h1>
          <span>If any provision of this Agreement is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will continue to be in full force and effect.</span>
        </div>
          
        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Waiver</h1>
          <span>The failure of Perry to enforce any right or provision of this Agreement will not be deemed a waiver of such right or provision.</span>
        </div>
      </div>
    </div>
  );
}
  
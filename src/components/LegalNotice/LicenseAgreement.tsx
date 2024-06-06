import Link from "next/link";
import { Separator } from "../ui/separator";

export default function LicenseAgreement() {

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold max-md:w-full text-left">License agreement</h1>
        <h3 className="text-xl md:text-2xl font-medium">Last updated: May 7, 2024</h3>
      </div>
      <Separator />
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1 md:gap-2 text-sm md:text-base">
          <span>This license agreement (&quot;Agreement&quot;) governs your use of the services and products provided on the website located at <Link href="https://gitlabitstep.pp.ua" className=" text-blue-500">https://gitlabitstep.pp.ua</Link> (the &quot;Site&quot;). By accessing or using the Site, you agree to adhere to the terms and conditions outlined in this Agreement, which are designed to ensure a safe, lawful, and beneficial use of our services. This includes, but is not limited to, compliance with intellectual property laws, user contribution guidelines, and any other policies or rules that may be applicable to the Site.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">License grant</h1>
          <span>Perry grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Site and its services for your personal or internal business use, subject to the terms and conditions of this Agreement.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Marketplace services</h1>
          <ul className="list-disc pl-5">
            <li>Buyer accounts: buyers must create an account to purchase products, ensuring all provided information is accurate and up-to-date.</li>
            <li>Transactions: all transactions between buyers and sellers are facilitated through the Site. Perry may charge transaction fees as outlined in our fee schedule.</li>
            <li>Product listings: sellers are responsible for the accuracy of product listings, including descriptions, pricing, and availability. Listings must not contain misleading or false information.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Restrictions</h1>
          <span>You agree not to:</span>
          <ul className="list-disc pl-5">
            <li>Modify, copy, distribute, or create derivative works based on the Site or its content.</li>
            <li>Use the Site for any unlawful purpose or in any manner that could damage, disable, overburden, or impair the Site.</li>
            <li>Access or attempt to access any systems or servers on which the Site is hosted or modify or alter the Site in any way.</li>
            <li>Use any automated means to access the Site for any purpose without our express written permission.</li>
            <li>Engage in any fraudulent activities, including creating multiple accounts to manipulate the marketplace.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Intellectual property</h1>
          <span>All content on the Site, including but not limited to text, graphics, logos, images, and software, is the property of Perry or its content suppliers and is protected by international copyright and trademark laws. Unauthorized use of any content may violate copyright, trademark, and other laws.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">User contributions</h1>
          <span>If you post, upload, or otherwise provide any content to the Site (&quot;User Contributions&quot;), you grant Perry a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, adapt, publish, translate, distribute, perform, and display such content in any media. You represent and warrant that you own or have the necessary rights to make your User Contributions available and that your User Contributions do not infringe any third-party rights.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Dispute resolution</h1>
          <ul className="list-disc pl-5">
            <li>Between buyers and sellers: any disputes arising between buyers and sellers must be resolved between the parties involved. Perry is not responsible for mediating such disputes but may offer assistance at our discretion.</li>
            <li>With Perry: any disputes arising out of or in connection with your use of the Site or this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Termination</h1>
          <span>Perry may terminate or suspend your license to use the Site and its services at any time, without prior notice or liability, for any reason, including if you breach this Agreement. Upon termination, your right to use the Site will immediately cease.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Disclaimer of warranties</h1>
          <span>The Site and its services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Perry makes no warranties, express or implied, regarding the Site or its content, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or availability.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Limitation of liability</h1>
          <span>In no event shall Perry, its directors, employees, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or other intangible losses, resulting from:</span>
          <ul className="list-disc pl-5">
            <li>Your use or inability to use the Site.</li>
            <li>Any unauthorized access to or alteration of your transmissions or data.</li>
            <li>Any content or conduct of any third party on the Site.</li>
            <li>Any other matter related to the Site.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Indemnification</h1>
          <span>You agree to indemnify, defend, and hold harmless Perry, its officers, directors, employees, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way connected with your access to or use of the Site, your User Contributions, or your breach of this Agreement.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Changes to this agreement</h1>
          <span>Perry reserves the right to modify or replace this Agreement at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. Your continued use of the Site after any such changes constitutes your acceptance of the new terms.</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <h1 className="text-xl md:text-2xl font-medium">Governing law</h1>
          <span>This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding arising under this Agreement will be brought exclusively in the federal or state courts located in Los Angeles, California, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.</span>
        </div>
      </div>
    </div>
  );
}

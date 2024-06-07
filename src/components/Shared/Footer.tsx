import * as React from "react";
import {
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
} from "./Icons";
import { Logo } from "./Logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="pt-8 border-t w-full bg-secondary">
      <div className="flex flex-wrap justify-between items-start gap-8 max-w-3xl mx-auto px-4 text-light">
        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <ul>
            <li className="mb-1">Contact us</li>
            <li className="mb-1">FAQ</li>
            <li className="mb-1">Size guide</li>
            <li className="mb-1">Shipping & returns</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Legal notice</h3>
          <ul>
            <li className="mb-1">
              <Link href="/legal-notice?tab=terms-open">
                Terms and Conditions
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/legal-notice?tab=license-open">
                License agreement
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/legal-notice?tab=privacy-open">Privacy Policy</Link>
            </li>
            <li className="mb-1">Cookie Settings</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Social media</h3>
          <div className="flex space-x-2">
            <FacebookIcon className="w-8 h-8" />
            <TwitterIcon className="w-8 h-8" />
            <InstagramIcon className="w-8 h-8" />
            <GmailIcon className="w-8 h-8" />
            <TelegramIcon className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="flex justify-between lg:justify-center items-center mt-8 gap-8 p-4 bg-[hsl(var(--footer))] text-light">
        <Logo />
        <span>© 2024 Do Sell. All rights reserved.</span>
      </div>
    </footer>
  );
}

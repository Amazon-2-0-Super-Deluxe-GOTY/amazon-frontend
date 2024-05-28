import * as React from "react";
import {
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
} from "./Icons";

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
            <li className="mb-1">Terms and Conditions</li>
            <li className="mb-1">License agreement</li>
            <li className="mb-1">Privacy Policy</li>
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
      <div className="flex justify-between lg:justify-center items-center mt-8 gap-6 p-4 bg-primary text-secondary-foreground">
        <span className="font-bold text-xl">Logo</span>
        <span>© 2024 Do Sell. All rights reserved.</span>
      </div>
    </footer>
  );
}

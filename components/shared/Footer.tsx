
import Image from "next/image";
import Link from "next/link";

import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import DarkFooterLogo from "@/app/assets/dark-logo.png";
import LightFooterLogo from "@/app/assets/light-logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex">
              <Image
                src={DarkFooterLogo}
                alt="EquipRent"
                width={160}
                height={80}
                className="hidden dark:block"
              />
              <Image
                src={LightFooterLogo}
                alt="EquipRent"
                width={160}
                height={80}
                className="dark:hidden"
              />
            </Link>

            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Find the right equipment for every project.
              Rent quality machinery with ease, flexibility,
              and confidence.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment"
                  className="transition-colors hover:text-primary"
                >
                  All Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="transition-colors hover:text-primary"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-primary"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 font-semibold">Equipment Categories</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Construction Equipment</li>
              <li>Power Equipment</li>
              <li>Material Handling</li>
              <li>Agricultural Equipment</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold">Contact Us</h3>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-primary" />
                <a
                  href="mailto:support@equiprent.com"
                  className="transition-colors hover:text-primary"
                >
                  support@equiprent.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-primary" />
                <a
                  href="tel:+8801000000000"
                  className="transition-colors hover:text-primary"
                >
                  +880 1000-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} EquipRent. All rights reserved.
          </p>

          <p>Rent Smart. Work Better.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

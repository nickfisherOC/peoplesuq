"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import CartButton from "./cart/CartButton";
import { mainNav, connectedBrands } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      {/* Blur lives on this inner wrapper (not <header>) so it doesn't create
          a containing block that would trap the fixed mobile menu below. */}
      <div className="border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo className="h-9 w-auto md:h-11" priority />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="mx-auto mt-0.5 block h-0.5 w-4 rounded-full bg-orange-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CartButton />
          <Button href="/podcast" variant="ghost" size="md">
            Watch
          </Button>
          <Button href="/get-involved" size="md">
            Join the Conversation
          </Button>
        </div>

        {/* Mobile: cart + menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
        <CartButton />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
        </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-ink px-5 py-6 md:top-20"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-lg font-semibold ${
                  isActive(item.href)
                    ? "bg-white/10 text-white"
                    : "text-white/75"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Button href="/get-involved" size="lg" className="w-full">
              Join the Conversation
            </Button>
            <Button
              href="/podcast"
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Watch the Podcast
            </Button>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="eyebrow mb-3 text-white/40">Connected with</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={connectedBrands.suqMedia.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
              >
                {connectedBrands.suqMedia.name} ↗
              </a>
              <a
                href={connectedBrands.foundation.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
              >
                {connectedBrands.foundation.name} ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles, Coins, FileText, ChevronDown } from "lucide-react";

import Button from "@/app/components/ui/Button";
import Image from "next/image";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            LOGO
        ===================================================== */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5"
        >
          <div className="flex flex-col">
            {/* < className="text-lg font-bold leading-none tracking-tight text-[#4235CE]"> */}
            <Image src="/logo.png" alt="Logo" width={120} height={12} />
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Home */}
          <Link
            href="/"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#4235CE] transition-colors hover:bg-[#4235CE]/5"
          >
            Home
          </Link>

          {/* Features */}
          <Link
            href="#features"
            className="group flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#4235CE]"
          >
            Features
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
          </Link>

          {/* AI Tools */}
          <Link
            href="#ai-tools"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#4235CE]"
          >
            <Sparkles className="h-4 w-4" />
            AI Tools
          </Link>

          {/* Rewards */}
          <Link
            href="#rewards"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#4235CE]"
          >
            <Coins className="h-4 w-4" />
            Rewards
          </Link>
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ===================================================== */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#4235CE]"
          >
            Log in
          </Link>

          <Link href="/signup">
            <Button className="rounded-xl bg-[#4235CE] px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#362bb5] hover:shadow-md">
              Get Started
            </Button>
          </Link>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl bg-[#4235CE]/5 px-4 py-3 text-sm font-semibold text-[#4235CE]"
            >
              Home
            </Link>

            <Link
              href="#features"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FileText className="h-4 w-4 text-[#4235CE]" />
              Features
            </Link>

            <Link
              href="#ai-tools"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Sparkles className="h-4 w-4 text-[#4235CE]" />
              AI Tools
            </Link>

            <Link
              href="#rewards"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Coins className="h-4 w-4 text-[#4235CE]" />
              Rewards
            </Link>

            <div className="my-2 h-px bg-gray-100" />

            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={closeMenu}
              className="mt-1 rounded-xl bg-[#4235CE] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#362bb5]"
            >
              Get Started — It's Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;

"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { isMobile } = useSidebarContext();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert pathname to page title
  const getPageTitle = (path: string) => {
    if (path === '/') return 'Dashboard';
    
    const segments = path.split('/').filter(Boolean);
    const pageName = segments[0] || 'Dashboard';
    
    // Capitalize first letter and handle special cases
    return pageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      {/* Left side - Logo, Separator, Page Title */}
      <div className="flex items-center gap-4">
        {/* Logo with Text */}
        <Link href={"/"} className="flex items-center gap-3">
          {mounted && (
            <Image
              src={theme === "dark" ? "/images/logo/logo2.png" : "/images/logo/logo.png"} 
              width={32}
              height={32}
              alt="THERAPEIA Logo"
              className="h-8 w-8"
              key={theme} // Force re-render on theme change
            />
          )}
          {!mounted && <div className="h-8 w-8" />}
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            THERAPEIA
          </span>
        </Link>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Page Title */}
        <h1 className="text-lg font-semibold text-black dark:text-white">
          {pageTitle}
        </h1>
      </div>

      {/* Right side - Search, Theme, Notifications, User */}
      <div className="flex items-center gap-2 min-[375px]:gap-4">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>

        <ThemeToggleSwitch />

        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}

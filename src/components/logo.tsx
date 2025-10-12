"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mb-5 h-8 w-12">
        <Image
          src="/images/logo/logo.png"
          alt="Logo"
          width={48}
          height={32}
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
<<<<<<< Updated upstream
    <div className="mb-5">
      <img src="\images\product\icon.png" alt="asdf" />
=======
    <div className="mb-5 h-8 w-15">
      <Image
        src={theme === "dark" ? "/images/logo/logo.png" : "/images/logo/logo.png"}
        alt="Logo"
        width={58}
        height={32}
        className="h-auto w-full"
      />
>>>>>>> Stashed changes
    </div>
  );
}

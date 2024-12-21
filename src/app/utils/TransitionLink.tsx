"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLoader } from "@/app/utils/LoaderContext";
import Link, { LinkProps } from "next/link";
import React from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  className,
  ...props
}) => {
  const router = useRouter();
  const currentPath = usePathname();
  const { setIsVisible } = useLoader();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Print route change 
    console.log(`${currentPath} -> ${href}`);

    if (currentPath === "/" && href !== "/") {
        // Navigate FROM home TO any page
        // PS: Logo transitions (from home to album post and from anywhere back to the homepage) are in NavLogo.tsx
        setIsVisible(true);
        const homeCenter = document.querySelector(".homeCenter");
        const homeBottom = document.querySelector(".homeBottom");
        homeCenter?.classList.add("page-transition");
        homeBottom?.classList.add("page-transition");
        await sleep(500);
        router.push(href);
    }
    else if (currentPath !== href) {
        // Navigate FROM page TO page (not homepage)
        setIsVisible(true);
        const container = document.querySelector("main");
        container?.classList.add("page-transition");
        await sleep(500);
        router.push(href);
        await sleep(500);
        container?.classList.remove("page-transition");
    }
  };

  return (
    <Link {...props} href={href} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
};
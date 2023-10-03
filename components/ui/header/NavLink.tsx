"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: string;
  hover?: string;
  currentNavStyle: string;
}

export default function NavLink({
  href,
  children,
  hover,
  currentNavStyle,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        className={`${hover} ${
          isActive && currentNavStyle
        } px-8 py-4 rounded-lg  `}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { FC, LinkHTMLAttributes } from "react";

interface NavLinkProps extends LinkProps {
  href: string;
  children: string;
  hover?: string;
  currentNavStyle: string;
}

const NavLink: FC<NavLinkProps> = ({
  children,
  hover,
  currentNavStyle,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <li>
      <Link
        className={`${hover} ${
          isActive && currentNavStyle
        } rounded-lg px-8 py-4  `}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;

import { FC, HTMLProps, ReactNode } from "react";
import Nav from "./Nav";
import NavLink from "./NavLink";
import H2 from "../text/H2";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { cn } from "@/utils/utils";

interface HeaderProps {
  children?: ReactNode;
  height: string;
  bgColor?: string;
  logoColor?: string;
  logoType?: string;
  textColor?: string;
  textType?: string;
  mobileTextType?: string;
}

const Header: FC<HeaderProps> = ({
  children,
  height,
  bgColor = "",
  textColor,
  textType = "",
  logoColor,
  logoType = "",
  mobileTextType = "",
}) => {
  const logo = () => {
    return (
      <Link href="/">
        <H2 type={logoType} textColor={logoColor}>
          RODDAT
        </H2>
      </Link>
    );
  };

  const navlink = () => {
    const hover =
      "hover:bg-neutral80 hover:text-primary1 duration-fast ease-in";
    const currentNavStyle = "bg-neutral80 text-primary1";

    return (
      <>
        {/* <NavLink hover={hover} currentNavStyle={currentNavStyle} href="/color">
          Color
        </NavLink> */}
      </>
    );
  };

  return (
    <header
      className={cn(
        height,
        bgColor,
        "flex items-center justify-between gap-small px-extra-small mobile-large:px-medium laptop:gap-0 laptop:px-large",
      )}
    >
      <Nav
        navStyle="flex gap-large items-center justify-between"
        navLinkStyle={`flex laptopL:gap-large laptop:gap-sub-large tablet:gap-small justify-center ${textType} ${textColor}`}
        logo={logo()}
      >
        {navlink()}
      </Nav>
      {children}
    </header>
  );
};

export default Header;

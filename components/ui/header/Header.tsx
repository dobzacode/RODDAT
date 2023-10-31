import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DarkModeButton from "@/components/darkMode/DarkModeButton";
import Login from "@/components/user/Login";
import UserMenu from "@/components/user/UserMenu";
import { cn } from "@/utils/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactNode } from "react";
import H2 from "../text/H2";
import Nav from "./Nav";
import SearchBar from "./SearchBar";

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

async function Header({
  children,
  height,
  bgColor = "",
  textColor,
  textType = "",
  logoColor,
  logoType = "",
}: HeaderProps) {
  const session = await getServerSession(authOptions);

  const logo = () => {
    return (
      <Link href="/">
        <H2 type={logoType} textColor={logoColor}>
          RODDAT
        </H2>
      </Link>
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
      ></Nav>

      <SearchBar></SearchBar>

      {session ? <UserMenu session={session}></UserMenu> : <Login></Login>}
      <DarkModeButton className="absolute right-2 top-2 " />
    </header>
  );
}

export default Header;

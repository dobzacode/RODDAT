"use client";

import { Session, User } from "next-auth";
import Avatar from "../ui/Avatar";
import Icon from "@mdi/react";
import { mdiArrowDown, mdiMenu } from "@mdi/js";
import { FC, HTMLProps, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { signOut } from "next-auth/react";
import NavLink from "../ui/header/NavLink";
import Link from "next/link";
import P from "../ui/text/P";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import useBetterMediaQuery from "../hooks/useBetterMediaQuery";

interface UserMenuProps {
  session: Session;
}

const UserMenu: FC<UserMenuProps> = ({ session }) => {
  const [isShown, setIsShown] = useState<Boolean>(false);

  const router = useRouter();

  const modalRef = useRef<HTMLUListElement | null>(null);
  null;

  const isLaptopScreen = useBetterMediaQuery("(min-width: 1024px)");

  console.log(isLaptopScreen);

  const laptopShowMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsShown(!isShown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsShown(false);
      }
    };

    if (isShown) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isShown]);

  console.log(isLaptopScreen);

  return (
    <div className="laptop:small z-20 flex items-center justify-between gap-small laptop:relative laptop:justify-start">
      <button
        onClick={(e) => {
          isLaptopScreen ? laptopShowMenu(e) : router.push("/profile");
        }}
        className="brutalism-border relative z-20 flex h-[50px] w-[50px] items-center justify-center rounded-full border-primary80 bg-white px-extra-small text-body font-medium laptop:h-auto laptop:w-auto laptop:gap-small laptop:px-sub-medium laptop:py-1"
      >
        <div className="flex min-w-full items-center ">
          <Avatar className="" src={session?.user?.image}></Avatar>
          <P className="text-truncate hidden w-full whitespace-nowrap laptop:block">
            {session?.user?.name}
          </P>
          {isLaptopScreen || isLaptopScreen === null ? (
            <Icon
              className="ml-extra-small"
              path={mdiArrowDown}
              size={2}
            ></Icon>
          ) : null}
        </div>
      </button>
      {isLaptopScreen || isLaptopScreen === null ? null : (
        <button
          onClick={(e) => {
            laptopShowMenu(e);
          }}
        >
          <Icon path={mdiMenu} size={2}></Icon>
        </button>
      )}

      {isLaptopScreen ? (
        <CSSTransition
          in={isShown as boolean}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ul
            ref={modalRef}
            onClick={() => setIsShown(false)}
            className="fade-enter-done brutalism-border absolute top-12 z-10 flex w-full cursor-pointer flex-col items-center gap-small rounded-b-sub-large border-primary80  bg-white pb-small pt-sub-large text-body font-medium text-primary90"
          >
            <li className="group w-full ">
              <Link
                href="/profile"
                className=" mt-extra-small block text-center opacity-90 group-hover:scale-[103%] group-hover:opacity-100"
              >
                Profile
              </Link>
            </li>
            <hr className="w-full border border-primary80 opacity-20"></hr>
            <li onClick={() => signOut()} className="group w-full text-center">
              <button className="w-full opacity-90 group-hover:scale-[103%] group-hover:opacity-100">
                Sign-out
              </button>
            </li>
          </ul>
        </CSSTransition>
      ) : (
        <div
          className={cn(
            "brutalism-border absolute top-[100px]  -z-10  h-fit w-fit rounded-bl-large border-primary80 bg-white pb-medium pl-medium pr-extra-small pt-extra-small duration-700",
            isShown ? "-right-2" : "-right-[200px] ",
          )}
        >
          <ul
            ref={modalRef}
            className={`flex flex-col justify-center gap-small  text-body font-medium text-primary90`}
          >
            <li className="group w-full ">
              <Link
                href="/profile"
                className=" block opacity-90 group-hover:scale-[103%] group-hover:opacity-100"
              >
                Profile
              </Link>
            </li>
            <hr className="w-full border border-primary80 opacity-20"></hr>
            <li onClick={() => signOut()} className="group w-full ">
              <button className="opacity-90 group-hover:scale-[103%] group-hover:opacity-100">
                Sign-out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

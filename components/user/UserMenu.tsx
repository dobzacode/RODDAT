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

  isLaptopScreen;

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

  const navLink = (isMobile: boolean) => {
    const MOBILELINK_STYLING =
      "block opacity-90 group-hover:scale-[103%] group-hover:opacity-100";
    const LAPTOPLINK_CENTER = "mt-extra-small w-full text-center";

    return (
      <>
        <li className="group w-full ">
          <Link
            onClick={() => setIsShown(false)}
            href="/profile"
            className={`${
              !isMobile && LAPTOPLINK_CENTER
            } ${MOBILELINK_STYLING}`}
          >
            Profile
          </Link>
        </li>
        <hr className="w-full border border-primary80 opacity-20 dark:border-primary10"></hr>
        <li onClick={() => signOut()} className="group w-full ">
          <button
            className={`${
              !isMobile && LAPTOPLINK_CENTER
            } ${MOBILELINK_STYLING}`}
          >
            Sign-out
          </button>
        </li>

        <hr className="w-full border border-primary80 opacity-20 dark:border-primary10"></hr>
        <li className="group w-full ">
          <Link
            onClick={() => setIsShown(false)}
            href="/create/post"
            className={`${
              !isMobile && LAPTOPLINK_CENTER
            } ${MOBILELINK_STYLING}`}
          >
            New Post
          </Link>
        </li>
        <hr className="w-full border border-primary80 opacity-20 dark:border-primary10"></hr>
        <li className="group w-full ">
          <Link
            onClick={() => setIsShown(false)}
            href="/create/community"
            className={`${
              !isMobile && LAPTOPLINK_CENTER
            } ${MOBILELINK_STYLING}`}
          >
            New Community
          </Link>
        </li>
      </>
    );
  };

  return (
    <div className="laptop:small z-20 flex items-center justify-between gap-small laptop:relative laptop:justify-start">
      <button
        onClick={(e) => {
          isLaptopScreen ? laptopShowMenu(e) : router.push("/profile");
        }}
        className="brutalism-border relative z-20 flex h-[50px] w-[50px] items-center justify-center rounded-full border-primary80 bg-white px-extra-small text-body font-medium dark:border-primary20 dark:bg-primary90 dark:text-primary1 laptop:h-auto laptop:w-auto laptop:gap-small laptop:px-sub-medium laptop:py-1"
      >
        <div className="flex min-w-full items-center ">
          <Avatar
            className="my-extra-small mr-4 rounded-full"
            src={session?.user?.image}
          ></Avatar>
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
          <Icon className="dark:text-primary1" path={mdiMenu} size={2}></Icon>
        </button>
      )}

      {isLaptopScreen || isLaptopScreen === null ? (
        <CSSTransition
          in={isShown as boolean}
          timeout={400}
          classNames="fade"
          unmountOnExit
        >
          <ul
            ref={modalRef}
            onClick={() => setIsShown(false)}
            className="fade-enter-done brutalism-border absolute top-12 z-10 flex w-full cursor-pointer flex-col items-center justify-center gap-small rounded-b-sub-large border-primary80 bg-white  pb-small pt-sub-large text-body font-medium text-primary90 dark:border-primary20 dark:bg-primary90 dark:text-primary1 "
          >
            {navLink(false)}
          </ul>
        </CSSTransition>
      ) : (
        <div
          className={cn(
            "brutalism-border absolute top-[100px]  -z-10  h-fit w-fit rounded-bl-large border-primary80 bg-white pb-medium pl-medium pr-extra-small pt-extra-small duration-700 dark:border-primary20 dark:bg-primary90",
            isShown ? "-right-2" : "-right-[200px] ",
          )}
        >
          <ul
            ref={modalRef}
            className={`flex flex-col justify-center gap-small  text-body font-medium text-primary90 dark:text-primary1`}
          >
            {navLink(true)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

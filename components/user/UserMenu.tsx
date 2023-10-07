"use client";

import { Session, User } from "next-auth";
import Avatar from "../ui/Avatar";
import Icon from "@mdi/react";
import { mdiArrowDown } from "@mdi/js";
import { FC, HTMLProps, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { signOut } from "next-auth/react";
import NavLink from "../ui/header/NavLink";
import Link from "next/link";

interface UserMenuProps extends HTMLProps<HTMLElement> {
  session: Session;
}

const UserMenu: FC<UserMenuProps> = ({ session }) => {
  const [isShown, setIsShown] = useState<Boolean>(false);

  return (
    <div className="relative flex flex-col">
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          setIsShown(!isShown);
        }}
        className="brutalism-border relative z-20 flex items-center justify-center gap-small rounded-full border-primary80 bg-white px-sub-medium py-1 text-body font-medium"
      >
        <div className="flex items-center">
          <Avatar src={session?.user?.image}></Avatar>
          <p>{session?.user?.name}</p>
        </div>
        <Icon path={mdiArrowDown} size={1.5}></Icon>
      </button>
      <CSSTransition
        in={isShown as boolean}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <ul
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
    </div>
  );
};

export default UserMenu;

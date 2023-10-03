"use client";

import { Session } from "next-auth";
import Avatar from "../ui/Avatar";
import Icon from "@mdi/react";
import { mdiArrowDown } from "@mdi/js";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { signOut } from "next-auth/react";
import NavLink from "../ui/header/NavLink";
import Link from "next/link";

export default function UserSnippet({ session }: { session: Session }) {
  const [isShown, setIsShown] = useState<Boolean>(false);

  return (
    <div className="flex flex-col relative">
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          setIsShown(!isShown);
        }}
        className="bg-white gap-small text-body font-medium rounded-full flex justify-center items-center px-sub-medium brutalism-border py-1 border-primary80 relative z-20"
      >
        <div className="flex items-center">
          <Avatar></Avatar>
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
        <ul className="text-primary90 fade-enter-done absolute top-12 bg-white gap-small text-body font-medium rounded-b-sub-large flex flex-col items-center px-sub-medium brutalism-border  border-primary80 w-full z-10 pb-small pt-sub-large cursor-pointer">
          <Link
            href="/profile"
            className="opacity-90 hover:scale-[103%] hover:opacity-100"
          >
            Profile
          </Link>
          <hr className="border-primary80 border opacity-20 w-full"></hr>
          <li
            className="opacity-90 hover:scale-[103%] hover:opacity-100"
            onClick={() => signOut()}
          >
            Sign-out
          </li>
        </ul>
      </CSSTransition>
    </div>
  );
}

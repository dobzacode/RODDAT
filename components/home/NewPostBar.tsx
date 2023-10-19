"use client";

import Link from "next/link";
import Avatar from "../ui/Avatar";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "../ui/button/Button";
import { useState } from "react";
import LoginModal from "../user/LoginModal";

export default function NewPostBar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {session ? (
        <Link
          href="/post/create"
          className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary20 dark:bg-primary80"
        >
          <div className="rounded-small bg-white p-extra-small dark:bg-primary90">
            <Avatar
              className="rounded-small dark:text-primary1"
              src={session?.user?.image}
            ></Avatar>
          </div>
          <input
            className="body w-full cursor-pointer rounded-small bg-white px-small placeholder:text-neutral80 focus:outline-none dark:bg-primary90 dark:placeholder:text-primary1"
            type="text"
            placeholder="New publication"
          />
        </Link>
      ) : (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary20 dark:bg-primary80"
          >
            <div className="rounded-small bg-white p-extra-small dark:bg-primary90">
              <Avatar className="rounded-small dark:text-primary1"></Avatar>
            </div>
            <input
              className="body h-full w-full cursor-pointer rounded-small bg-white px-small placeholder:text-neutral80 focus:outline-none dark:bg-primary90 dark:placeholder:text-primary1"
              type="text"
              placeholder="New publication"
            />
          </Button>
          <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}></LoginModal>
        </>
      )}
    </>
  );
}

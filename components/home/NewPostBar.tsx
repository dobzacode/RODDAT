"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/button/Button";
import LoginModal from "../user/LoginModal";

export default function NewPostBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <>
      {status === "authenticated" ? (
        <Link
          href="/post/create"
          className="brutalism-border primary-hover flex w-full cursor-pointer gap-extra-small rounded-small border-primary80 bg-primary10 p-extra-small dark:border-primary20 dark:bg-primary80"
        >
          <div className="rounded-small bg-white p-[1.3rem] dark:bg-primary90">
            <Avatar
              className="rounded-[1.2rem]  dark:text-primary1"
              src={session?.user?.image}
              size={4}
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

"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import Button, { buttonVariants } from "../ui/button/Button";
import LoginModal from "../user/LoginModal";

export default function NewPost({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {session ? (
        <Link
          href="/post/create"
          // className="brutalism-border border-primary80 rounded-extra-small button--small text-center bg-primary10 text-primary80 primary-hover"
          className={buttonVariants({
            intent: "pastelPrimary",
            size: "small",
            modifier: "brutalism",
            rounded: "small",
            hover: true,
          })}
        >
          Create a post
        </Link>
      ) : (
        <>
          <Button
            size="small"
            intent="pastelPrimary"
            modifier="brutalism"
            hover={true}
            rounded="small"
            onClick={() => setIsOpen(true)}
          >
            Create a post
          </Button>
          <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}></LoginModal>
        </>
      )}
    </>
  );
}

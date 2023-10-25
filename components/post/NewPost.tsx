"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import Button, { buttonVariants } from "../ui/button/Button";
import LogInModal from "../user/LogInModal";
import { useSession } from "next-auth/react";

export default function NewPost() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {session ? (
        <Link
          href="/create/post"
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
          <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}></LogInModal>
        </>
      )}
    </>
  );
}

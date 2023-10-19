"use client";

import { Session } from "next-auth";
import Link from "next/link";
import Button, { buttonVariants } from "../ui/button/Button";
import { useState } from "react";
import Modal from "../ui/div/Modal";
import { signIn } from "next-auth/react";

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
          <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Button
              onClick={() => signIn("google")}
              hover={true}
              className="sub-heading brutalism-border flex items-center justify-center gap-extra-small rounded-small border-secondary80 bg-secondary20  px-sub-medium py-small font-medium text-secondary80"
            >
              Sign in with Google
            </Button>
          </Modal>
        </>
      )}
    </>
  );
}

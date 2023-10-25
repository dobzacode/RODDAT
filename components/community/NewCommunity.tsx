"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Button, { buttonVariants } from "../ui/button/Button";

import Link from "next/link";
import LogInModal from "../user/LogInModal";

const NewCommunity = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {session ? (
        <Link
          href="/create/community"
          className={buttonVariants({
            size: "small",
            intent: "primary",
            modifier: "brutalism",
            transparent: true,
            hover: true,
            rounded: "small",
          })}
        >
          Create a community
        </Link>
      ) : (
        <>
          <Button
            size="small"
            intent="primary"
            modifier="brutalism"
            transparent={true}
            hover={true}
            rounded="small"
            onClick={() => setIsOpen(true)}
          >
            Create a community
          </Button>
          <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}></LogInModal>
        </>
      )}
    </>
  );
};

export default NewCommunity;

"use client";

import { signIn } from "next-auth/react";
import Button from "../ui/button/Button";
import Modal from "../ui/div/Modal";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/utils/utils";

export default function LogInModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}) {
  const path = usePathname();
  return (
    <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${BASE_URL}${path}?popup=true&login=true`,
          })
        }
        hover={true}
        intent={"pastelPrimary"}
        size={"small"}
        modifier={"brutalism"}
        rounded={"medium"}
      >
        Sign in with Google
      </Button>
    </Modal>
  );
}

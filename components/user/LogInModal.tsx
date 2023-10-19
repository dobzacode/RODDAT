"use client";

import { signIn } from "next-auth/react";
import Button from "../ui/button/Button";
import Modal from "../ui/div/Modal";

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Function;
}) {
  return (
    <Modal title="Login" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Button
        onClick={() => signIn("google")}
        hover={true}
        className="sub-heading brutalism-border flex items-center justify-center gap-extra-small rounded-small border-secondary80 bg-secondary20  px-sub-medium py-small font-medium text-secondary80"
      >
        Sign in with Google
      </Button>
    </Modal>
  );
}

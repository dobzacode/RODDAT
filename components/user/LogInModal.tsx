"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen) {
        const modal = document.querySelector(".modal-container");
        if (modal && modal.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <CSSTransition
      in={isOpen as boolean}
      timeout={300} // Durée de l'animation en millisecondes
      classNames="modal"
      unmountOnExit // Retirer le composant de l'arbre DOM lorsque `in` est à `false`
    >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className=" absolute inset-0 bg-black opacity-50 modal-container"></div>
        <div className=" bg-secondary1 w-1/5 md:max-w-md mx-auto shadow-lg z-50 overflow-y-auto brutalism-border border-secondary80 rounded-sub-large p-medium relative">
          <div className="py-4 text-left px-6 flex flex-col gap-sub-large">
            <div className="pb-3">
              <h2 className="heading">Login</h2>
              <Button
                customCSS="absolute top-2 right-4 p-3 m-3"
                onClick={onClose}
              >
                <Icon size={2} path={mdiClose}></Icon>
              </Button>
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default function LoginModal({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button
        onClick={() => openModal()}
        customCSS="bg-white gap-extra-small sub-heading font-medium rounded-full flex justify-center items-center  brutalism-border px-sub-medium py-small border-primary80"
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Button
          onClick={() => signIn("google")}
          customCSS="bg-secondary20 text-secondary80 gap-extra-small sub-heading font-medium rounded-small flex justify-center items-center  brutalism-border px-sub-medium py-small border-secondary80"
        >
          Sign in with Google
        </Button>
      </Modal>
    </>
  );
}

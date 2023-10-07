"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  titleCSS?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  titleCSS,
}: ModalProps) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <div className=" modal-container absolute inset-0 bg-black opacity-50"></div>
        <div className=" max-w-1/5 brutalism-border relative z-50 mx-auto overflow-y-auto rounded-sub-large border-secondary80 bg-secondary1 p-medium shadow-lg">
          <div className="flex flex-col gap-sub-large px-6 py-4 text-left">
            <div className="pb-3">
              <h2 className={`heading ${titleCSS}`}>{title}</h2>
              <Button
                className="absolute right-4 top-2 m-3 p-3 text-secondary80"
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

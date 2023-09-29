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
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className=" absolute inset-0 bg-black opacity-50 modal-container"></div>
        <div className=" bg-secondary1 max-w-1/5 mx-auto shadow-lg z-50 overflow-y-auto brutalism-border border-secondary80 rounded-sub-large p-medium relative">
          <div className="py-4 text-left px-6 flex flex-col gap-sub-large">
            <div className="pb-3">
              <h2 className="heading">{title}</h2>
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

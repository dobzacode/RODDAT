"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  titleCSS?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  titleCSS,
}) => {
  const ref = useRef(null);

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
      nodeRef={ref}
      in={isOpen as boolean}
      timeout={300}
      classNames="modal"
      unmountOnExit
    >
      <div
        ref={ref}
        className="fixed inset-0 z-[60] flex items-center justify-center "
      >
        <div className=" modal-container absolute inset-0 bg-black opacity-50 "></div>
        <div className="max-w-1/5 brutalism-border relative z-50 mx-auto my-auto overflow-y-auto rounded-sub-large border-primary80 bg-primary1 p-medium shadow-lg dark:border-primary10 dark:bg-primary80">
          <div className="flex flex-col gap-sub-large px-6 py-4 text-left">
            <div className="pb-3">
              {title && <h2 className={`heading ${titleCSS}`}>{title}</h2>}
              <Button
                className="absolute right-4 top-2 m-3 p-3 text-primary80 dark:text-primary10 "
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
};

export default Modal;

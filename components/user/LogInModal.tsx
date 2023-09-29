"use client";

import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen) {
        const modal = document.querySelector(".modal-container");
        if (modal && !modal.contains(event.target as Node)) {
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
        <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="modal-header pb-3">
              <h2 className="text-lg font-semibold">Modal Title</h2>
              <button
                onClick={onClose}
                className="modal-close absolute top-0 right-0 p-3 m-3"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

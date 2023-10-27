"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC, HTMLProps, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import H2 from "../text/H2";

interface PopUpProps {
  children?: JSX.Element;
  isSuccess?: boolean;
}

const PopUp: FC<PopUpProps> = ({ children, isSuccess = false }) => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<boolean>(
    !searchParams.get("popup") ? isSuccess : Boolean(searchParams.get("popup")),
  );
  const ref = useRef(null);
  const communityName: string | null = searchParams.get("name");

  useEffect(() => {
    setSuccess(false);
  }, []);

  return (
    <CSSTransition
      nodeRef={ref}
      in={success as boolean}
      timeout={10000} // Durée de l'animation en millisecondes
      classNames="popup"
      unmountOnExit // Retirer le composant de l'arbre DOM lorsque `in` est à `false`
    >
      <div
        ref={ref}
        className="fixed bottom-10 right-10 z-50 flex items-center justify-center"
      >
        <div className=" brutalism-border relative z-50 mx-auto w-auto overflow-y-auto rounded-sub-large border-success80 bg-success1 p-medium shadow-lg">
          <div className="flex flex-col gap-sub-large px-6 py-4 text-left">
            {children}
            <H2 type="sub-heading" textColor="text-success90">
              <>
                {communityName && (
                  <>{`${
                    communityName
                      ? `${communityName
                          .charAt(0)
                          .toUpperCase()}${communityName.slice(1)}`
                      : "Your community"
                  } was successfully ${searchParams.get("type")}`}</>
                )}
                {searchParams.get("login") && (
                  <>{`You are successfully logged in`}</>
                )}
                {searchParams.get("content") && (
                  <>{`You have successfully ${
                    searchParams.get("type") === "modified"
                      ? `modified your ${searchParams.get("content")}`
                      : "added a comment"
                  }`}</>
                )}
              </>
            </H2>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PopUp;

import { FC, HTMLProps } from "react";
import { CSSTransition } from "react-transition-group";

interface PopUpProps extends HTMLProps<HTMLElement> {
  children: JSX.Element;
  isSuccess: boolean;
}

const PopUp: FC<PopUpProps> = ({ children, isSuccess }) => {
  return (
    <CSSTransition
      in={isSuccess as boolean}
      timeout={10000} // Durée de l'animation en millisecondes
      classNames="popup"
      unmountOnExit // Retirer le composant de l'arbre DOM lorsque `in` est à `false`
    >
      <div className="fixed bottom-10 right-10 z-50 flex items-center justify-center">
        <div className=" brutalism-border relative z-50 mx-auto w-auto overflow-y-auto rounded-sub-large border-success80 bg-success1 p-medium shadow-lg">
          <div className="flex flex-col gap-sub-large px-6 py-4 text-left">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PopUp;

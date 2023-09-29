import { CSSTransition } from "react-transition-group";

type PopUpProps = {
  children: JSX.Element;
  isSuccess: boolean;
};

export default function PopUp({ children, isSuccess }: PopUpProps) {
  return (
    <CSSTransition
      in={isSuccess as boolean}
      timeout={10000} // Durée de l'animation en millisecondes
      classNames="popup"
      unmountOnExit // Retirer le composant de l'arbre DOM lorsque `in` est à `false`
    >
      <div className="fixed bottom-10 right-10 flex items-center justify-center z-50">
        <div className=" bg-success1 w-auto mx-auto shadow-lg z-50 overflow-y-auto brutalism-border border-success80 rounded-sub-large p-medium relative">
          <div className="py-4 text-left px-6 flex flex-col gap-sub-large">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

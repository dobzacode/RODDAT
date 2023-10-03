// GenericForm.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import H3 from "../text/H3";
import Button from "../button/Button";
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";

interface FormData {
  name?: string;
  communityType?: string;
  isNsfw?: boolean;
  title?: string;
  content?: string;
  community?: string;
}

interface GenericFormProps {
  theme: "primary" | "secondary" | "tertiary" | "neutral";
  setIsOpen: Function;
  setIsSuccess: Function;
  title: string;
  formData: FormData;
  onSubmit: (formData: FormData) => Promise<void>;
  children: React.ReactNode; // Ajoutez cette prop pour inclure les champs spécifiques
}

const GenericForm: React.FC<GenericFormProps> = ({
  theme,
  setIsOpen,
  setIsSuccess,
  title,
  formData,
  onSubmit,
  children, // Récupérez les enfants pour inclure les champs spécifiques
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      await onSubmit(formData);
      setIsOpen();
      setIsSuccess();
    } catch (error: any) {
      error.message === "404" ? "" : setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  //bg-primary5
  //bg-secondary5
  //bg-tertiary5
  //bg-neutral5
  //text-primary1
  //text-secondary1
  //text-tertiary1
  //text-neutral1
  //border-primary10
  //border-secondary10
  //border-tertiary10
  //border-neutral10

  return (
    <div
      className={`flex flex-col gap-medium items-center text-${theme}80 bg-${theme}1 rounded-extra-small h-auto `}
    >
      <form
        className={`body flex flex-col gap-sub-large`}
        onSubmit={handleSubmit}
      >
        {/* Rendre les champs spécifiques ici */}
        {children}

        {isError && (
          <p className="text-error40">Something went wrong, try again</p>
        )}
        <div className="flex gap-small mt-small items-center">
          <Button
            type="button"
            size="small"
            margin=""
            customCSS="brutalism-border border-secondary80"
            onClick={() => setIsOpen()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="small"
            color={theme}
            customCSS="brutalism-border border-secondary80"
            margin=""
          >
            {title}
          </Button>
          <ClipLoader
            loading={isSubmitting}
            className="text-secondary80 ml-small"
          />
        </div>
      </form>
    </div>
  );
};

export default GenericForm;

// GenericForm.tsx
import React, {
  ChangeEvent,
  FormEvent,
  FormHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import Input from "./Input";
import H3 from "../text/H3";
import Button from "../button/Button";
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { redirect, useRouter } from "next/navigation";
import NewCommunityModal from "@/components/community/NewCommunityModal";

interface FormData {
  name?: string;
  communityType?: string;
  isNsfw?: boolean;
  title?: string;
  content?: string;
  community?: string;
}

interface GenericFormProps<T> {
  theme: "primary" | "secondary" | "tertiary" | "neutral";
  setIsOpen?: Function;
  setIsSuccess: Function;
  title: string;
  formData: T; // Utilisez le type générique ici
  onSubmit: (formData: T) => Promise<void>;
  children: ReactNode;
}

const GenericForm = <T extends FormData>({
  theme,
  setIsOpen,
  setIsSuccess,
  title,
  formData,
  onSubmit,
  children,
}: GenericFormProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      const data: any = await onSubmit(formData);
      setIsOpen ? setIsOpen() : "";
      if (data.post) {
        router.push("/");
        return setIsSuccess();
      } else {
        setIsSuccess();
      }
    } catch (error: any) {
      console.log(error);
      switch (error.message) {
        case "404":
          break;
        case "400":
          break;
        default:
          setIsError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-medium text-${theme}80 bg-${theme}1 h-auto rounded-extra-small `}
    >
      <form
        className={`body flex flex-col gap-sub-large`}
        onSubmit={handleSubmit}
      >
        {children}

        {isError && (
          <p className="text-error40">Something went wrong, try again</p>
        )}
        <div className="mt-small flex items-center gap-small">
          <Button
            type="button"
            size="small"
            modifier="brutalism"
            intent={theme}
            rounded="small"
            onClick={() => {
              setIsOpen ? setIsOpen() : router.push("/");
            }}
            hover={true}
            transparent={true}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="small"
            intent={theme}
            modifier="brutalism"
            rounded="small"
            hover={true}
          >
            {title}
          </Button>

          <ClipLoader
            loading={isSubmitting}
            className="ml-small text-secondary80"
          />
        </div>
      </form>
    </div>
  );
};

export default GenericForm;

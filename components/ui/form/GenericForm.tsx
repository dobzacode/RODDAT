// GenericForm.tsx
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../button/Button";

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
  isSpecialCharacter?: boolean;
  className?: string;
}

const GenericForm = <T extends FormData>({
  theme,
  setIsOpen,
  setIsSuccess,
  title,
  formData,
  onSubmit,
  children,
  isSpecialCharacter,
  className,
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
      if (!data) return setIsSubmitting(false);

      setIsOpen ? setIsOpen() : "";
      if (data.post) {
        router.push("/");
        return setIsSuccess(true);
      } else {
        setIsSuccess(true);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      switch (error.message) {
        case "404":
          break;
        case "400":
          break;
        case "409":
          break;
        default:
          setIsError(true);
      }
    }
  };

  console.log(isSubmitting);

  return (
    <div
      className={cn(
        `flex flex-col items-center gap-medium text-${theme}80 h-auto rounded-extra-small dark:text-${theme}1`,
        className,
      )}
    >
      <form
        className={cn(`body flex flex-col gap-sub-large`, className)}
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
            intent={`${theme}`}
            rounded="small"
            onClick={() => {
              setIsOpen ? setIsOpen() : router.push("/");
            }}
            hover={true}
            transparent={true}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="small"
            intent={isSpecialCharacter || isSubmitting ? "neutral" : theme}
            modifier="brutalism"
            rounded="small"
            hover={!Boolean(isSpecialCharacter || isSubmitting)}
            disabled={Boolean(isSpecialCharacter || isSubmitting)}
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

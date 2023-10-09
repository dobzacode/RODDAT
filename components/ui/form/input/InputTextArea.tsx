import { cn } from "@/utils/utils";
import { FC, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
}

const InputTextArea: FC<TextAreaProps> = ({
  className,
  id,

  ...props
}) => {
  return (
    <textarea
      className={cn(
        " body placeholder:body box-border  h-auto w-full rounded-lg border p-extra-small leading-9 shadow-inner",
        className,
      )}
      name={id}
      id={id}
      {...props}
    ></textarea>
  );
};

export default InputTextArea;

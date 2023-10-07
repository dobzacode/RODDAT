import { cn } from "@/utils/utils";
import { FC, HTMLProps } from "react";

interface PProps extends HTMLProps<HTMLParagraphElement> {
  children: string | number | JSX.Element;
  type?: string;
  textColor?: string;
  bgColor?: string;
  padding?: string;
  rounded?: string;
}

const P: FC<PProps> = ({
  className,
  children,
  type = "body",
  textColor = "",
  bgColor = "",
  padding = "",
  rounded = "",
}) => {
  return (
    <p className={cn(className, type, textColor, bgColor, padding, rounded)}>
      {children}
    </p>
  );
};

export default P;

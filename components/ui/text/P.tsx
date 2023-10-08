import { cn } from "@/utils/utils";
import { FC, HTMLProps } from "react";

interface PProps extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
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
  textColor,
  bgColor,
  padding,
  rounded,
  ...props
}) => {
  return (
    <p
      className={cn(type, textColor, bgColor, padding, rounded, className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default P;

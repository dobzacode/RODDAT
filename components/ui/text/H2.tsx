import { cn } from "@/utils/utils";
import { FC, HTMLProps, ReactNode } from "react";

interface H2Props extends HTMLProps<HTMLHeadingElement> {
  children: string | ReactNode | ReactNode[];
  type: string;
  textColor?: string;
  bgColor?: string;
  padding?: string;
  rounded?: string;
}

const H2: FC<H2Props> = ({
  children,
  type,
  textColor = "",
  bgColor = "",
  padding = "",
  rounded = "",
  ...props
}) => {
  return (
    <h2 className={cn(type, textColor, bgColor, padding, rounded)} {...props}>
      {children}
    </h2>
  );
};

export default H2;

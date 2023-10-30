import { cn } from "@/utils/utils";
import { FC, HTMLProps, ReactNode } from "react";

interface H3Props extends HTMLProps<HTMLHeadingElement> {
  children: string | ReactNode;
  type?: string;
  textColor?: string;
  bgColor?: string;
  padding?: string;
  rounded?: string;
}

const H3: FC<H3Props> = ({
  children,
  type,
  textColor = "",
  bgColor = "",
  padding = "",
  rounded = "",
  ...props
}) => {
  return (
    <h3 {...props} className={cn(textColor, bgColor, padding, rounded, type)}>
      {children}
    </h3>
  );
};

export default H3;

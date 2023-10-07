import { cn } from "@/utils/utils";
import { FC, HTMLProps } from "react";

interface H1Props extends HTMLProps<HTMLHeadingElement> {
  children: string | JSX.Element;
  type: string;
  textColor?: string;
  bgColor?: string;
  padding?: string;
  rounded?: string;
}

const H1: FC<H1Props> = ({
  children,
  type,
  textColor = "",
  bgColor = "",
  padding = "",
  rounded = "",
}) => {
  return (
    <h1 className={cn(type, textColor, bgColor, padding, rounded)}>
      {children}
    </h1>
  );
};

export default H1;

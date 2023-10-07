import { cn } from "@/utils/utils";
import { FC, HTMLProps } from "react";

interface H2Props extends HTMLProps<HTMLHeadingElement> {
  children: string | JSX.Element;
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
}) => {
  return (
    <h2 className={cn(type, textColor, bgColor, padding, rounded)}>
      {children}
    </h2>
  );
};

export default H2;

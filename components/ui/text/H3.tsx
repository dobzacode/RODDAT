import { cn } from "@/utils/utils";
import { FC, HTMLProps } from "react";

interface H3Props extends HTMLProps<HTMLHeadingElement> {
  children: string | JSX.Element;
  type: string;
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
    <h3 className={cn(type, textColor, bgColor, padding, rounded)} {...props}>
      {children}
    </h3>
  );
};

export default H3;

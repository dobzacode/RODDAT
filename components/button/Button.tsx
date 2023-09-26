"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps {
  hover?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: string | JSX.Element;
  type?: "button" | "submit" | "reset";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "neutral";
  transparent?: boolean;
  size: "small" | "medium" | "large";
  margin?: string;
  shadow?: "small" | "medium" | "high" | "clay" | "";
  rounded?: string;
}

export default function Button({
  onClick = () => console.log("empty"),
  children,
  color,
  type = "button",
  margin = "",
  shadow = "",
  size,
  transparent,
  rounded = "rounded-extra-small",
}: ButtonProps) {
  const finalcolor = () => {
    if (transparent) {
      return color
        ? `border-2 border-${color}40 text-${color}40 `
        : "border border-black text-black";
    } else if (shadow !== "clay") {
      switch (color) {
        case "primary":
          return "bg-primary40 text-primary1";
        case "secondary":
          return "bg-secondary40 text-secondary1";
        case "tertiary":
          return "bg-tertiary40 text-tertiary1";
        case "success":
          return "bg-success40 text-success1";
        case "error":
          return "bg-error40 text-error1";
        case "warning":
          return "bg-warning40 text-warning1";
        case "info":
          return "bg-info40 text-info1";
        case "neutral":
          return "bg-neutral40 text-neutral1";
      }
    }
    // text-primary90
    // text-secondary90
    // text-tertiary90
    // text-neutral90
    else return `text-${color}90`;
  };

  const finalShadow = () => {
    // shadow-primary-clay
    // shadow-primary-high
    // shadow-primary-medium
    // shadow-primary-low
    // shadow-secondary-clay
    // shadow-secondary-high
    // shadow-secondary-medium
    // shadow-secondary-low
    // shadow-tertiary-clay
    // shadow-tertiary-high
    // shadow-tertiary-medium
    // shadow-tertiary-low
    // shadow-info-high
    // shadow-info-medium
    // shadow-info-low
    // shadow-success-high
    // shadow-success-medium
    // shadow-success-low
    // shadow-error-high
    // shadow-error-medium
    // shadow-error-low
    // shadow-warning-high
    // shadow-warning-medium
    // shadow-warning-low
    // shadow-neutral-high
    // shadow-neutral-medium
    // shadow-neutral-low
    // shadow-neutral-clay
    return `shadow-${color}-${shadow}`;
  };

  //button--clay
  //button--small
  //button--medium
  //button--large

  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={`${rounded} ${finalcolor()} button--${
        shadow === "clay" ? "clay" : size
      } ${margin} ${finalShadow()} `}
    >
      {children}
    </button>
  );
}

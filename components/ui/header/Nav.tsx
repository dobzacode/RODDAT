"use client";
import React, { FC, HTMLProps } from "react";

interface NavProps {
  children: React.ReactNode;
  logo?: JSX.Element;
  navStyle?: string;
  navLinkStyle?: string;
}

const Nav: FC<NavProps> = ({
  logo,
  navStyle = "",
  navLinkStyle = "",
  children,
}) => {
  return (
    <nav className={navStyle}>
      {logo ? logo : ""}
      <ul className={`${navLinkStyle}`}>{children}</ul>
    </nav>
  );
};

export default Nav;

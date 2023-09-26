"use client";
import React from "react";

interface NavProps {
  children: React.ReactNode;
  logo?: JSX.Element;
  navStyle?: string;
  navLinkStyle?: string;
}

export default function Nav({
  logo,
  navStyle = "",
  navLinkStyle = "",
  children,
}: NavProps) {
  return (
    <nav className={navStyle}>
      {logo ? logo : ""}
      <ul className={`${navLinkStyle}`}>{children}</ul>
    </nav>
  );
}

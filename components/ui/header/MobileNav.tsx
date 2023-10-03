"use client";
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

interface NavProps {
  children: React.ReactNode;
  logo?: JSX.Element;
  navStyle?: string;
  navLinkStyle?: string;
  modalStyle: string;
  height: string;
}

export default function MobileNav({
  logo,
  navStyle = "",
  navLinkStyle = "",
  children,
  modalStyle,
  height,
}: NavProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <nav className={navStyle}>
      {logo ? logo : ""}
      <button onClick={() => setShowMenu(!showMenu)}>
        <Icon path={mdiMenu} size={3.5}></Icon>
      </button>
      <div
        className={`${modalStyle} absolute z-10 ${
          showMenu ? "left-0" : "-left-[768px] "
        } top-${height.slice(2)}`}
      >
        <ul className={`${navLinkStyle}`}>{children}</ul>
      </div>
    </nav>
  );
}

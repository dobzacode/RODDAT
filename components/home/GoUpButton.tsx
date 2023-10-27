"use client";
import { mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoUpButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const pageHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    setIsVisible(windowHeight < pageHeight - 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  return (
    <button
      className={`primary-hover brutalism-border fixed bottom-4 right-8 mb-4 flex h-sub-large w-sub-large items-center justify-center self-end rounded-[0.8rem] border-primary90 bg-primary10 dark:border-primary1  dark:bg-primary30 tablet:mb-0 laptop:bottom-8 laptop:right-16 ${
        isVisible ? "" : "hidden"
      } max-tablet:hidden`}
      onClick={scrollToTop}
    >
      <Icon
        path={mdiChevronUp}
        size={4}
        className="  text-primary99 dark:text-primary1"
      ></Icon>
    </button>
  );
}

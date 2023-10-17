"use client";
import { useState, useEffect, FC } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import Button from "../ui/button/Button";

interface DarkModeButtonProps {
  className: string;
}

const DarkModeButton: FC<DarkModeButtonProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className={className}
      onClick={(e) => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? <FaMoon size={15} /> : <FaSun size={15} />}
    </Button>
  );
};

export default DarkModeButton;

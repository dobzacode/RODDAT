import { useEffect, useState } from "react";

export default function useSibling(id: string) {
  const [isSibling, setIsSibling] = useState<boolean>(false);

  useEffect(() => {
    const divElement = document.getElementById(id);

    const parentElement = divElement?.parentElement;

    if (!parentElement) return;
    const descendants = Array.from(parentElement.children);

    const index = descendants.indexOf(divElement);

    if (index !== -1 && index < descendants.length - 1) {
      setIsSibling(true);
    } else {
      setIsSibling(false);
    }
  });

  return { isSibling };
}

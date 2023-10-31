"use client";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/button/Button";

export default function MobileSearchBar() {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      router.replace(`/search?term=${query}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="heading brutalism-border relative   h-fit w-full  gap-extra-small rounded-large border-primary80 bg-neutral1 p-extra-small  dark:border-primary1 dark:bg-primary80 max-[600px]:flex min-[600px]:hidden">
      <Button
        onClick={() => {
          query.length > 0 ? router.replace(`/search?term=${query}`) : "";
        }}
        className="dark:text-primary1"
      >
        <Icon path={mdiMagnify} size={2}></Icon>
      </Button>
      <input
        id="searchbar"
        className="body relative  w-full bg-neutral1 focus:outline-none dark:bg-primary80 dark:text-primary1 laptop-large:w-[600px] "
        type="text"
        placeholder="Search in Roddat"
        value={query}
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}

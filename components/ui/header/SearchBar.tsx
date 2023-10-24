// SearchBar.js
"use client";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { FC, useState } from "react";
import Button from "../button/Button";
import { usePathname, useRouter } from "next/navigation";

const SearchBar: FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    router.push(`${pathName}?name=${query}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="heading brutalism-border  left-0 right-0 flex  h-fit gap-extra-small rounded-large border-primary80 bg-neutral1  p-extra-small dark:border-primary1 dark:bg-primary80 laptop:absolute laptop:m-auto laptop:w-fit">
      <Button className="dark:text-primary1" onClick={handleSearch}>
        <Icon path={mdiMagnify} size={2}></Icon>
      </Button>
      <input
        className="body w-full bg-neutral1 focus:outline-none dark:bg-primary80 dark:text-primary1 laptop:w-auto"
        type="text"
        placeholder=""
        value={query}
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;

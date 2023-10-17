// SearchBar.js
"use client";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { FC, useState } from "react";
import Button from "../button/Button";

const SearchBar: FC = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {};

  return (
    <div className="heading brutalism-border l left-0 right-0 flex  h-fit gap-extra-small rounded-large border-primary80 bg-neutral1 p-extra-small dark:border-primary20 dark:bg-primary90 laptop:absolute laptop:m-auto laptop:w-fit">
      <Button className="dark:text-primary1" onClick={handleSearch}>
        <Icon path={mdiMagnify} size={2}></Icon>
      </Button>
      <input
        className="body w-full focus:outline-none dark:bg-primary90 dark:text-primary1 laptop:w-auto"
        type="text"
        placeholder=""
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

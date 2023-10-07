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
    <div className="heading brutalism-border absolute left-0 right-0  m-auto flex h-fit w-fit gap-extra-small rounded-large border-primary80 bg-neutral1 p-extra-small">
      <Button onClick={handleSearch}>
        <Icon path={mdiMagnify} size={2}></Icon>
      </Button>
      <input
        className="body focus:outline-none "
        type="text"
        placeholder=""
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

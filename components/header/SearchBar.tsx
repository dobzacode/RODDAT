// SearchBar.js
"use client";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {};

  return (
    <div className="heading flex gap-extra-small bg-neutral1 rounded-large  p-extra-small brutalism-border border-primary80 absolute h-fit m-auto left-0 right-0 w-fit">
      <button onClick={handleSearch}>
        <Icon path={mdiMagnify} size={2}></Icon>
      </button>
      <input
        className="body focus:outline-none "
        type="text"
        placeholder=""
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}

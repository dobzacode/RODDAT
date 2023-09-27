// SearchBar.js
"use client";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {};

  return (
    <div className="heading flex gap-extra-small bg-neutral1 rounded-large h-1/2 p-extra-small brutalism-border border-primary80 ">
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

"use client";

import Button from "../button/Button";

export default function NewPostModal({}) {
  return (
    <Button
      size="small"
      color={"primary"}
      margin=""
      customCSS="brutalism-border border-primary80"
      rounded="rounded-small"
      onClick={() => console.log("empty")}
    >
      Create a post
    </Button>
  );
}

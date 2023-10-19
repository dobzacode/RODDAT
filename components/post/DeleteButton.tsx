"use client";

import { mdiClose } from "@mdi/js";
import Button from "../ui/button/Button";
import Icon from "@mdi/react";

export default function DeleteButton({
  post_id,
  className,
}: {
  post_id: string;
  className: string;
}) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts?post_id=${post_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button onClick={() => handleDelete()} className={className}>
      <Icon path={mdiClose} size={1.5} />
    </Button>
  );
}

"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  post_id,
  comment_id,
  className,
  to,
}: {
  post_id?: string;
  comment_id?: string;
  className: string;
  to: "post" | "comment";
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const url =
        to === "post"
          ? `/api/posts?post_id=${post_id}`
          : `/api/comments?comment_id=${comment_id}`;
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      router.refresh();
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

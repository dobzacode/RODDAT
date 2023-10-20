"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  post_id,
  className,
}: {
  post_id: string;
  className: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts?post_id=${post_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
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

"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";
import Modal from "../ui/div/Modal";
import { useState } from "react";
import P from "../ui/text/P";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <>
      <Button onClick={() => setIsOpen(true)} className={className}>
        <Icon path={mdiClose} size={1.5} />
      </Button>
      <Modal
        titleCSS="text-primary80"
        title="Are you sure ?"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="body flex flex-col gap-sub-large text-primary80">
          <P>{`Once your post is deleted you cannot recover it !`}</P>
          <div className="mt-small flex items-center gap-small">
            <Button
              type="button"
              size="small"
              modifier="brutalism"
              intent={`primary`}
              rounded="small"
              onClick={() => {
                setIsOpen(false);
              }}
              hover={true}
              transparent={true}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="small"
              intent={"error"}
              modifier="brutalism"
              rounded="small"
              hover={true}
              onClick={async () => {
                await handleDelete();
                setIsOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

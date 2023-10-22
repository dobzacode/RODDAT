"use client";

import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/button/Button";
import Modal from "../ui/div/Modal";
import P from "../ui/text/P";

export default function DeleteButton({
  post_id,
  comment_id,
  className,
  to,
  setStatus,
}: {
  post_id?: string;
  comment_id?: string;
  className: string;
  to: "post" | "comment";
  setStatus?: Function;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    try {
      const url =
        to === "post"
          ? `/api/posts?post_id=${post_id}`
          : `/api/comments?comment_id=${comment_id}`;
      const res = await fetch(url, {
        method: "DELETE",
      });
      to === "comment" && setStatus ? setStatus("deleted") : "";
      router.push(`${pathname}?deleted=true`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {to === "post" ? (
        <>
          <Button onClick={() => setIsOpen(true)} className={className}>
            <Icon path={mdiClose} size={1.5} />
          </Button>
          <Modal
            titleCSS="text-primary80 dark:text-primary1"
            title="Are you sure ?"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div className="body flex flex-col gap-sub-large text-primary80 dark:text-primary1">
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
      ) : (
        <Button onClick={() => handleDelete()} className={className}>
          <Icon path={mdiClose} size={1.5} />
        </Button>
      )}
    </>
  );
}

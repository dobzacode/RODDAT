"use client";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/Input";
import LogInModal from "@/components/user/LogInModal";
import { CommentDetail } from "@/interface/interface";
import { cn } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { BarLoader } from "react-spinners";
import CommentFormSkeleton from "../../skeleton/CommentFormSkeleton";
import { usePathname, useRouter } from "next/navigation";

export function CommentForm({
  post_id,
  isReplying,
  parent_comment_id,
  className,
  addNewComment,
  setIsReplying,
  isLoading,
  userId,
}: {
  post_id: string;
  isReplying?: boolean;
  parent_comment_id?: string;
  className?: string;
  addNewComment: (newComment: CommentDetail) => void;
  setIsReplying?: (isReplying: boolean) => void;
  isLoading?: boolean | 0;
  userId?: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();

    try {
      if (content.trim() === "") {
        return;
      }
      const commentData = {
        post_id,
        content,
        email: session?.user?.email,
        parent_comment_id,
      };

      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      const { createdComment: newComment }: { createdComment: CommentDetail } =
        await res.json();

      addNewComment(newComment);

      setContent("");
      if (setIsReplying) setIsReplying(false);
      setIsSubmitting(false);
      return router.push(`${pathname}?popup=true&type=created&content=comment`);
    } catch (err) {}
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  if (isLoading) return <CommentFormSkeleton></CommentFormSkeleton>;

  return (
    <>
      <div onClick={() => (!userId ? setIsOpen(true) : "")}>
        <form
          onSubmit={handleSubmit}
          className={cn(
            `brutalism-border primary-hover flex h-full ${
              !isReplying && "w-full"
            } relative flex-col overflow-hidden rounded-small border-primary80 dark:border-primary1 dark:bg-primary90`,
            className,
          )}
        >
          <Input
            placeholder="What are your throughts ? "
            required
            type="textarea"
            hiddenLabel={true}
            className="dark:border-primary10/[.2] dark:bg-primary80 dark:text-primary1 dark:outline-primary10/[.2] dark:placeholder:text-primary10/[.4]"
            id="content"
            value={content}
            onChange={handleContentChange}
            rows={3}
            cols={50}
          />
          <Button
            className="border-primary80 bg-primary10 text-primary80 dark:border-primary10 dark:bg-primary90 dark:text-primary1"
            size="small"
            type={userId ? "submit" : "button"}
          >
            {isReplying ? "Reply" : "Comment"}
          </Button>
          <BarLoader
            cssOverride={{
              position: "absolute",
              right: "0",
              bottom: "0",
              width: "100%",
              marginTop: "2px",
            }}
            loading={isSubmitting}
            color={"white"}
          ></BarLoader>
        </form>
      </div>
      {!userId && (
        <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}></LogInModal>
      )}
    </>
  );
}

"use client";

import Button from "@/components/ui/button/Button";
import PopUp from "@/components/ui/div/PopUp";
import Input from "@/components/ui/form/Input";
import { CommentDetail } from "@/interface/interface";
import { cn } from "@/utils/utils";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import CommentFormSkeleton from "./CommentFormSkeleton";
import PostSkeleton from "../PostSkeleton";
import { BarLoader } from "react-spinners";

export function CommentForm({
  post_id,
  isReplying,
  parent_comment_id,
  className,
  addNewComment,
  setIsReplying,
  isLoading,
}: {
  post_id: string;
  isReplying?: boolean;
  parent_comment_id?: string;
  className?: string;
  addNewComment: (newComment: CommentDetail) => void;
  setIsReplying?: (isReplying: boolean) => void;
  isLoading?: boolean | 0;
}) {
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();

    const session: Session | null = await getSession();

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  if (isLoading) return <CommentFormSkeleton></CommentFormSkeleton>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={cn(
          `brutalism-border primary-hover flex h-full ${
            !isReplying && "w-full"
          } relative flex-col overflow-hidden rounded-small border-primary80 dark:border-primary20 dark:bg-primary90`,
          className,
        )}
      >
        <Input
          placeholder="What are your throughts ? "
          required
          type="textarea"
          hiddenLabel={true}
          intent="neutral"
          id="content"
          value={content}
          onChange={handleContentChange}
          rows={3}
          cols={50}
        />
        <Button
          className="border-primary80 bg-primary10 text-primary80 dark:border-primary10 dark:bg-primary80 dark:text-primary1"
          size="small"
          type="submit"
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
  );
}

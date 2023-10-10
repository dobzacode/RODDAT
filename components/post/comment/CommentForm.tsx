"use client";

import Button from "@/components/ui/button/Button";
import PopUp from "@/components/ui/div/PopUp";
import Input from "@/components/ui/form/Input";
import { cn } from "@/utils/utils";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

export function CommentForm({
  post_id,
  isReplying,
  parent_comment_id,
  className,
}: {
  post_id: string;
  isReplying?: boolean;
  parent_comment_id?: string;
  className?: string;
}) {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const session: Session | null = await getSession();
    console.log(e);
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
      const data = await res.json();

      console.log(data);

      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        `brutalism-border primary-hover flex h-full ${
          !isReplying && "w-full"
        } flex-col overflow-hidden rounded-small border-primary80`,
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
      <Button intent={"pastelPrimary"} size="small" type="submit">
        {isReplying ? "Reply" : "Comment"}
      </Button>
    </form>
  );
}

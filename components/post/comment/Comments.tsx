"use client";

import { useMemo, useState } from "react";
import CommentBar from "./CommentBar";
import { v4 as uuid } from "uuid";
import { Comment } from "@prisma/client";
import { CommentForm } from "./CommentForm";

export default function Comments({ comments }: { comments: Comment[] }) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReplyClick = (comment_id: string) => {
    setReplyingTo(comment_id);
  };

  const memoizedComments = useMemo(() => {
    return comments.map((comment) => {
      return (
        <div
          className="flex w-full flex-col gap-sub-large laptop:w-[600px]"
          key={comment.comment_id}
        >
          <CommentBar
            content={comment.content}
            comment_id={comment.comment_id}
            handleReplyClick={handleReplyClick}
          />
          {replyingTo === comment.comment_id && (
            <CommentForm key={comment.comment_id} post_id={comment.post_id} />
          )}
        </div>
      );
    });
  }, [comments, replyingTo]);

  return <>{memoizedComments}</>;
}

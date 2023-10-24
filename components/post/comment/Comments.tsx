"use client";

import { Comment } from "@prisma/client";
import { Suspense, useEffect } from "react";
import PostSkeleton from "../../skeleton/PostSkeleton";
import CommentBar from "./CommentBar";

export default function Comments({
  comments,
  setIsLoading,
  userId,
}: {
  comments: Comment[];
  setIsLoading: Function;
  userId: string | null;
}) {
  useEffect(() => {
    setIsLoading();
  });

  return (
    <Suspense fallback={<PostSkeleton></PostSkeleton>}>
      {comments.map((comment) => {
        if (comment.parent_comment_id) return;

        return (
          <CommentBar
            userId={userId ? userId : ""}
            key={comment.comment_id}
            content={comment.content}
            comment_id={comment.comment_id}
          ></CommentBar>
        );
      })}
    </Suspense>
  );
}

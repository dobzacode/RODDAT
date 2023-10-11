"use client";

import { Suspense, useMemo, useState } from "react";
import CommentBar from "./CommentBar";
import { v4 as uuid } from "uuid";
import { Comment } from "@prisma/client";
import { CommentForm } from "./CommentForm";
import PostSkeleton from "../PostSkeleton";

export default function Comments({
  comments,
  setIsLoading,
}: {
  comments: Comment[];
  setIsLoading: Function;
}) {
  return (
    <Suspense fallback={<PostSkeleton></PostSkeleton>}>
      {comments.map((comment) => {
        if (comment.parent_comment_id) return;

        return (
          <CommentBar
            setIsLoading={() => setIsLoading()}
            key={comment.comment_id}
            sibling={
              comments.filter((comment) => !comment.parent_comment_id).length
            }
            content={comment.content}
            comment_id={comment.comment_id}
          ></CommentBar>
        );
      })}
    </Suspense>
  );
}

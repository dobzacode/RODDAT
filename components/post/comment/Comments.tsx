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
  userId,
}: {
  comments: Comment[];
  setIsLoading: Function;
  userId: string | null;
}) {
  

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

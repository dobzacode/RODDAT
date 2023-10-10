"use client";

import { useMemo, useState } from "react";
import CommentBar from "./CommentBar";
import { v4 as uuid } from "uuid";
import { Comment } from "@prisma/client";
import { CommentForm } from "./CommentForm";

export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <>
      {comments.map((comment) => {
        if (comment.parent_comment_id) return;
        return (
          <div
            className="flex h-fit w-full flex-col gap-sub-large laptop:w-[600px]"
            key={comment.comment_id}
          >
            <CommentBar
              sibling={
                comments.filter((comment) => !comment.parent_comment_id).length
              }
              content={comment.content}
              comment_id={comment.comment_id}
            ></CommentBar>
          </div>
        );
      })}
    </>
  );
}

"use client";

import { PostDetailProps } from "@/interface/interface";
import PostBar from "../PostBar";
import { CommentForm } from "./CommentForm";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { Comment } from "@prisma/client";

export default function CommentSection({
  postDetails,
}: {
  postDetails: PostDetailProps;
}) {
  const [comments, setComments] = useState<Comment[]>(postDetails?.comments);

  const addNewComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <>
      <PostBar
        isPagePost={true}
        post_id={postDetails?.post_id}
        createdAt={postDetails?.createdAt}
        author={postDetails?.author}
        community={postDetails?.community}
        title={postDetails?.title}
        content={postDetails?.content}
        votes={postDetails?.votes}
        comments={postDetails?.comments}
      >
        <CommentForm
          addNewComment={addNewComment}
          post_id={postDetails?.post_id}
        ></CommentForm>
      </PostBar>

      <Comments comments={comments}></Comments>
    </>
  );
}

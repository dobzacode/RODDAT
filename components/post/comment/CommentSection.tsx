"use client";

import { PostDetailProps } from "@/interface/interface";
import PostBar from "../PostBar";
import { CommentForm } from "./CommentForm";
import Comments from "./Comments";
import { Suspense, useEffect, useState } from "react";
import { Comment, Session } from "@prisma/client";
import { getSession } from "next-auth/react";
import { getUserInformation } from "@/utils/utils";

export default function CommentSection({
  postDetails,
}: {
  postDetails: PostDetailProps;
}) {
  const [comments, setComments] = useState<Comment[]>(postDetails?.comments);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>();

  const addNewComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(() => {
    const getId = async () => {
      const user = await getUserInformation();
      if (!user) return;
      setUserId(user.id);
    };
    getId();
  });

  console.log(postDetails?.comments.length);

  return (
    <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
      <PostBar
        isPagePost={true}
        post_id={postDetails?.post_id}
        createdAt={postDetails?.createdAt}
        author={postDetails?.author}
        community={postDetails?.community}
        title={postDetails?.title}
        content={postDetails?.content}
        votes={postDetails?.votes}
        comments={comments}
        isLoading={isLoading}
        userId={userId ? userId : null}
      >
        <CommentForm
          userId={userId ? userId : null}
          addNewComment={addNewComment}
          post_id={postDetails?.post_id}
          isLoading={0}
        ></CommentForm>
      </PostBar>

      <Comments
        setIsLoading={() => setIsLoading(false)}
        comments={comments}
        userId={userId ? userId : null}
      ></Comments>
    </section>
  );
}

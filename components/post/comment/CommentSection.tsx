"use client";

import { PostDetailProps } from "@/interface/interface";
import { getUserInformation } from "@/utils/utils";
import { Comment } from "@prisma/client";
import { useEffect, useState } from "react";
import PostBar from "../PostBar";
import { CommentForm } from "./CommentForm";
import Comments from "./Comments";

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

  return (
    <section className="flex w-full flex-col gap-sub-large laptop:w-[600px]">
      <PostBar
        isPagePost={true}
        positivity={postDetails?.positivity}
        post_id={postDetails?.post_id}
        author_id={postDetails.author_id}
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

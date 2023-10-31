"use client";

import { PostDetailProps } from "@/interface/interface";
import { getUserInformation } from "@/utils/utils";
import { Comment, CommunityUser } from "@prisma/client";
import { useEffect, useState } from "react";
import PostBar from "../PostBar";
import { CommentForm } from "./CommentForm";
import Comments from "./Comments";

export default function CommentSection({
  postDetails,
  communityVisibility,
  communityUsers,
}: {
  postDetails: PostDetailProps;
  communityVisibility: "PRIVATE" | "PUBLIC" | "RESTRICTED";
  communityUsers: CommunityUser[];
}) {
  const [comments, setComments] = useState<Comment[]>(postDetails?.comments);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>();
  const [isInCommunity, setIsInCommunity] = useState<boolean>(false);

  const addNewComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(() => {
    const getId = async () => {
      const user = await getUserInformation();
      if (!user) return;
      setUserId(user.id);
      const isUserInCommunity = communityUsers.some((comUser) => {
        return comUser.user_id === user.id;
      });
      setIsInCommunity(isUserInCommunity);
    };
    getId();
  }, []);

  return (
    <section className="-mt-extra-small flex w-full flex-col gap-small tablet:-mt-0 tablet:gap-sub-large laptop:-mt-medium laptop:w-1/2">
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
        {isInCommunity || communityVisibility !== "RESTRICTED" ? (
          <CommentForm
            userId={userId ? userId : null}
            addNewComment={addNewComment}
            post_id={postDetails?.post_id}
            isLoading={0}
          ></CommentForm>
        ) : null}
      </PostBar>

      <Comments
        isAuthorized={isInCommunity || communityVisibility !== "RESTRICTED"}
        setIsLoading={() => setIsLoading(false)}
        comments={comments}
        userId={userId ? userId : null}
      ></Comments>
    </section>
  );
}

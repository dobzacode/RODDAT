"use client";

import { PostDetailProps } from "@/interface/interface";
import PostBar from "../post/PostBar";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { getUserInformation } from "@/utils/utils";

export default function PostSection({ posts }: { posts: PostDetailProps[] }) {
  const [userId, setUserId] = useState<string | null>();

  useEffect(() => {
    const getId = async () => {
      const user = await getUserInformation();
      if (!user) return;
      setUserId(user.id);
    };
    getId();
  });

  return (
    <>
      {posts.map((post: PostDetailProps) => {
        return (
          <PostBar
            key={uuidv4()}
            positivity={post.positivity}
            post_id={post.post_id}
            author_id={post.author_id}
            createdAt={post.createdAt}
            author={post.author}
            community={post.community}
            title={post.title}
            content={post.content}
            votes={post.votes}
            comments={post.comments}
            userId={userId ? userId : null}
          ></PostBar>
        );
      })}
    </>
  );
}

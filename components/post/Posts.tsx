import PostBar from "./PostBar";
import prisma from "@/prisma/client";
import { Comment, Post, Vote } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import PostSkeleton from "./PostSkeleton";
import postMock from "@/mocks/POST_MOCK.json";

import getUserPosts from "@/utils/postUtils/getUserPosts";
import { Session } from "next-auth";
import { PostDetailProps } from "@/interface/interface";

export const revalidate = 0;

export default async function Posts({ userid }: { userid?: string }) {
  const url: string = userid
    ? `http://localhost:3000/api/posts/details?user=${userid}`
    : "http://localhost:3000/api/posts/details";

  const res = await fetch(url, {
    cache: "no-store",
  });

  const { posts }: { posts: PostDetailProps[] } = await res.json();

  return (
    <>
      {posts.map((post) => {
        return (
          <PostBar
            userId={userid ? userid : ""}
            post_id={post.post_id}
            createdAt={post.createdAt}
            author={post.author}
            community={post.community}
            title={post.title}
            content={post.content}
            votes={post.votes}
            comments={post.comments}
            key={uuidv4()}
          ></PostBar>
        );
      })}
    </>
  );
}

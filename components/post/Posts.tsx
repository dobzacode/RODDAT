import PostBar from "./PostBar";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import PostSkeleton from "./PostSkeleton";
import postMock from "@/mocks/POST_MOCK.json";

import getUserPosts from "@/utils/postUtils/getUserPosts";
import { Session } from "next-auth";

export default async function Posts({ session }: { session?: Session | null }) {
  const posts: Post[] = session
    ? await getUserPosts(session)
    : await prisma.post.findMany();

  if (process.env.NODE_ENV !== "production")
    return (
      <>
        {posts.map((post) => {
          return <PostBar post={post} key={uuidv4()}></PostBar>;
        })}
      </>
    );

  return (
    <>
      {postMock.map((post) => {
        return <PostBar post={post as any} key={uuidv4()}></PostBar>;
      })}
    </>
  );
}

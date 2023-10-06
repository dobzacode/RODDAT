import PostBar from "../post/PostBar";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import PostSkeleton from "../post/PostSkeleton";
import postMock from "@/mocks/POST_MOCK.json";

export default async function HomePosts({}) {
  const posts: Post[] =
    process.env.NODE_ENV !== "production"
      ? await prisma.post.findMany()
      : (postMock as any);

  return (
    <>
      {posts.map((post) => {
        return <PostBar post={post} key={uuidv4()}></PostBar>;
      })}
    </>
  );
}

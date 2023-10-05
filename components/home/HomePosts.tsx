import PostBar from "../post/PostBar";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import PostSkeleton from "../post/PostSkeleton";

export default async function HomePosts({}) {
  const data: Post[] = await prisma.post.findMany();

  return (
    <>
      {data.map((post) => {
        return <PostBar post={post} key={uuidv4()}></PostBar>;
      })}
    </>
  );
}

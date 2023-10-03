import PostBar from "./PostBar";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export default async function HomePosts({}) {
  const data: Post[] = await prisma.post.findMany();

  return (
    <div className="flex flex-col justify-center items-center gap-sub-large">
      {data.map((post) => {
        return <PostBar post={post} key={uuidv4()}></PostBar>;
      })}
    </div>
  );
}

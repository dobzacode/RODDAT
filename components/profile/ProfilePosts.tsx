import getUserPosts from "@/utils/postUtils/getUserPosts";
import { Post } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import PostBar from "../post/PostBar";
import { Session } from "next-auth";

export default async function ProfilePosts({
  session,
}: {
  session: Session | null;
}) {
  const { posts }: { posts: Post[] } = await getUserPosts(session);

  return (
    <>
      {posts.map((post) => {
        return <PostBar post={post} key={uuidv4()}></PostBar>;
      })}
    </>
  );
}

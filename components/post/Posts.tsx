import { v4 as uuidv4 } from "uuid";
import PostBar from "./PostBar";

import { PostDetailProps } from "@/interface/interface";
import { BASE_URL } from "@/utils/utils";
import { Session, User } from "next-auth";

export const revalidate = 0;

export default async function Posts({ session }: { session?: Session | null }) {
  const res = await fetch(`${BASE_URL}/api/posts/details`, {
    cache: "no-store",
  });

  const { posts }: { posts: PostDetailProps[] } = await res.json();

  if (!posts) return null;

  const data = await fetch(
    `${BASE_URL}/api/user?email=${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const { userInfo }: { userInfo: User } = await data.json();

  return (
    <>
      {posts.map((post) => {
        return post.community.visibility !== "PRIVATE" ? (
          <PostBar
            picture={post.picture}
            userId={userInfo?.id}
            positivity={post.positivity}
            post_id={post.post_id}
            createdAt={post.createdAt}
            author_id={post.author_id}
            author={post.author}
            community={post.community}
            title={post.title}
            content={post.content}
            votes={post.votes}
            comments={post.comments}
            key={uuidv4()}
          ></PostBar>
        ) : null;
      })}
    </>
  );
}

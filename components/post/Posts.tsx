import { v4 as uuidv4 } from "uuid";
import PostBar from "./PostBar";

import { PostDetailProps } from "@/interface/interface";
import { Session, User } from "next-auth";

export const revalidate = 0;

export default async function Posts({
  userid,
  session,
}: {
  userid?: string;
  session?: Session | null;
}) {
  const url: string = userid
    ? `http://localhost:3000/api/posts/details?user=${userid}`
    : "http://localhost:3000/api/posts/details";

  const res = await fetch(url, {
    cache: "no-store",
  });

  const { posts }: { posts: PostDetailProps[] } = await res.json();

  console.log(posts);

  if (!posts) return null;

  const data = await fetch(
    `http://localhost:3000/api/user?email=${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const { userInfo }: { userInfo: User } = await data.json();

  return (
    <>
      {posts.map((post) => {
        return (
          <PostBar
            userId={userid ? userid : userInfo.id}
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
        );
      })}
    </>
  );
}

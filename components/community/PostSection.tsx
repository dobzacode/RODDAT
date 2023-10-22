import { PostDetailProps } from "@/interface/interface";
import PostBar from "../post/PostBar";
import { v4 as uuidv4 } from "uuid";

import { Session, User, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export default async function PostSection({
  posts,
}: {
  posts: PostDetailProps[];
}) {
  const session: Session | null = await getServerSession(authOptions);

  const user: User | null = session
    ? await prisma.user.findUnique({
        where: {
          email: session?.user?.email || undefined,
        },
      })
    : null;

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
            userId={user?.id ? user.id : null}
          ></PostBar>
        );
      })}
    </>
  );
}

import prisma from "@/prisma/client";
import { Post, User } from "@prisma/client";
import { Session } from "next-auth";

export default async function getUserPosts(session: Session | null) {
  const user: User | null = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  const posts: Post | Post[] | null = await prisma.post.findMany({
    where: { author_id: user?.id },
  });

  return posts;
}

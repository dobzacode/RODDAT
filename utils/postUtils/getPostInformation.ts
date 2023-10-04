import prisma from "@/prisma/client";
import { Post } from "@prisma/client";

export default async function getPostInformation(post: Post) {
  const author = await prisma.user.findUnique({
    where: {
      id: post.author_id,
    },
  });

  const commentCount = await prisma.comment.count({
    where: {
      post_id: post.post_id,
    },
  });

  const votes = await prisma.vote.findMany({
    where: {
      post_id: post.post_id,
    },
  });

  return { author, commentCount, votes };
}

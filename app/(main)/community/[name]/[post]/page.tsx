import prisma from "@/prisma/client";
import { Post } from "@prisma/client";

export async function generateStaticParams() {
  const posts: Post[] = await prisma.post.findMany();
  return posts.map((post) => ({
    post: post.title,
  }));
}

export default function PostPage({
  params,
}: {
  params: { post: string; name: string };
}) {
  return (
    <div>
      <p>
        {params.post} {params.name}
      </p>
    </div>
  );
}

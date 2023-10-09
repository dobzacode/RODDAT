import prisma from "@/prisma/client";
import { Post, User, Vote } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = request.nextUrl.searchParams.get("user");

    const DetailedArrayPosts: any[] = [];

    if (user) {
      const posts: Post | Post[] | null = await prisma.post.findMany({
        where: { author_id: user },
      });

      await Promise.all(
        posts.map(async (post) => {
          const detailedPost = await prisma.post.findUnique({
            where: { post_id: post.post_id },
            include: {
              votes: true,
              comments: true,
              author: {
                select: {
                  name: true,
                },
              },
              community: {
                select: {
                  name: true,
                },
              },
            },
          });
          DetailedArrayPosts.push(detailedPost);
        }),
      );

      const message = "All the detailed publications of the user are returned";
      return NextResponse.json({
        message,
        posts: DetailedArrayPosts,
      });
    }

    const posts = await prisma.post.findMany();

    await Promise.all(
      posts.map(async (post) => {
        const detailedPost = await prisma.post.findUnique({
          where: { post_id: post.post_id },
          include: {
            votes: true,
            comments: true,
            author: {
              select: {
                name: true,
              },
            },
            community: {
              select: {
                name: true,
              },
            },
          },
        });
        DetailedArrayPosts.push(detailedPost);
      }),
    );

    const message = "All the detailed publications are returned";
    return NextResponse.json({
      message,
      posts: DetailedArrayPosts,
    });
  } catch (e) {
    const message = "Can't return all the detailed publications";

    return NextResponse.json(
      {
        message: message,
        data: e,
      },
      {
        status: 500,
      },
    );
  }
}

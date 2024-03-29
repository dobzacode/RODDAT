import prisma from "@/prisma/client";
import { Community, Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const post = request.nextUrl.searchParams.get("post");
    const community = request.nextUrl.searchParams.get("community");

    if (post && community) {
      const communityInfo: Community | null = await prisma.community.findUnique(
        {
          where: { name: community as string },
        },
      );

      if (!communityInfo) {
        const message = `No community has been found with ${community} name`;
        return NextResponse.json(
          {
            message,
          },
          { status: 404 },
        );
      }

      const postDetails = await prisma.post.findFirst({
        where: { title: post, community_id: communityInfo.community_id },
        include: {
          votes: true,
          comments: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          community: {
            select: {
              name: true,
              community_id: true,
            },
          },
        },
      });

      const message = "Post informations are returned";
      return NextResponse.json({
        message,
        postDetails,
      });
    }

    const postDetailsArray: any[] = [];

    const user = request.nextUrl.searchParams.get("user");

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
                  image: true,
                },
              },
              community: {
                select: {
                  name: true,
                },
              },
            },
          });
          postDetailsArray.push(detailedPost);
        }),
      );

      const message = "All the detailed publications of the user are returned";
      return NextResponse.json({
        message,
        posts: postDetailsArray,
      });
    }

    const communityInfo = community
      ? await prisma.community.findUnique({ where: { name: community } })
      : "";

    const posts = !communityInfo
      ? await prisma.post.findMany()
      : await prisma.post.findMany({
          where: { community_id: communityInfo.community_id },
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
                image: true,
              },
            },
            community: {
              select: {
                visibility: true,
                name: true,
              },
            },
          },
        });
        postDetailsArray.push(detailedPost);
      }),
    );

    const message = "All the detailed publications are returned";
    return NextResponse.json({
      message,
      posts: postDetailsArray,

      community: communityInfo ? communityInfo : null,
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

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const term = req.nextUrl.searchParams.get("term");
  const type = req.nextUrl.searchParams.get("type");
  const snippet = req.nextUrl.searchParams.get("snippet");
  if (!term) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
          votes: true,
          community: true,
          author: true,
        },
      });

      const communities = await prisma.community.findMany({
        include: {
          communityUsers: {
            select: {
              user_id: true,
            },
          },
          posts: {
            select: {
              post_id: true,
            },
          },
        },
      });
      const communitiesWithCounts = communities.map((community) => {
        const userAmount = community.communityUsers.length;
        const postAmount = community.posts.length;
        return {
          ...community,
          userAmount,
          postAmount,
        };
      });

      const users = await prisma.user.findMany({});
      return NextResponse.json({
        message: `Research without term was successfull`,
        content: { users, communities: communitiesWithCounts, posts },
      });
    } catch (e) {
      const message = `Something went wrong while researching without term`;
      return NextResponse.json({ message }, { status: 500 });
    }
  }
  if (snippet) {
    try {
      const community = await prisma.community.findMany({
        where: {
          name: {
            startsWith: term,
            mode: "insensitive",
          },
        },
        take: 3,
      });

      const communityWithUserCount = await Promise.all(
        community.map(async (community) => {
          const userCount = await prisma.communityUser.count({
            where: {
              community_id: community.community_id,
            },
          });
          return {
            ...community,
            userCount,
          };
        }),
      );

      const user = await prisma.user.findMany({
        where: {
          name: {
            startsWith: term,
            mode: "insensitive",
          },
        },
        take: 3,
      });
      const message = `The research was successfull`;
      return NextResponse.json({
        message,
        user,
        community: communityWithUserCount,
      });
    } catch (e) {
      const message = `Can't return research with ${term}`;
      return NextResponse.json({ message }, { status: 500 });
    }
  }
  if (type === "post" || "community" || "user") {
    try {
      const posts = await prisma.post.findMany({
        where: {
          title: {
            startsWith: term,
            mode: "insensitive",
          },
        },
        include: {
          comments: true,
          votes: true,
          community: true,
          author: true,
        },
      });

      const communities = await prisma.community.findMany({
        where: {
          name: {
            startsWith: term,
            mode: "insensitive",
          },
        },
        include: {
          communityUsers: {
            select: {
              user_id: true,
            },
          },
          posts: {
            select: {
              post_id: true,
            },
          },
        },
      });
      const communitiesWithCounts = communities.map((community) => {
        const userAmount = community.communityUsers.length;
        const postAmount = community.posts.length;
        return {
          ...community,
          userAmount,
          postAmount,
        };
      });

      const users = await prisma.user.findMany({
        where: {
          name: {
            startsWith: term,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json({
        message: `Research with ${term} was successfull`,
        content: { users, communities: communitiesWithCounts, posts },
      });
    } catch (e) {
      const message = `Something went wrong while researching ${term} in ${type}`;
      return NextResponse.json({ message }, { status: 500 });
    }
  }
}

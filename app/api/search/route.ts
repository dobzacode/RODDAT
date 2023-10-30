import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const term = req.nextUrl.searchParams.get("term");
  const type = req.nextUrl.searchParams.get("type");
  if (!term) {
    const message = `You must specify a research term`;
    return NextResponse.json({ message }, { status: 400 });
  }
  if (type === "post" || "community" || "user") {
    try {
      switch (type) {
        case "post":
          const posts = await prisma.post.findMany({
            where: {
              title: {
                startsWith: term,
                mode: "insensitive",
              },
            },
          });
          return NextResponse.json({
            message: `Research with ${term} in posts was successfull`,
            content: posts,
          });
        case "community":
          const communities = await prisma.community.findMany({
            where: {
              name: {
                startsWith: term,
                mode: "insensitive",
              },
            },
          });
          return NextResponse.json({
            message: `Research with ${term} in communities was successfull`,
            content: communities,
          });
        case "user":
          const users = await prisma.user.findMany({
            where: {
              name: {
                startsWith: term,
                mode: "insensitive",
              },
            },
          });
          return NextResponse.json({
            message: `Research with ${term} in users was successfull`,
            content: users,
          });
      }
    } catch (e) {
      const message = `Something went wrong while researching ${term} in ${type}`;
      return NextResponse.json({ message }, { status: 500 });
    }
  }
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

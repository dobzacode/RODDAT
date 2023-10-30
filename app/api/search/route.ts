import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const term = req.nextUrl.searchParams.get("term");
  if (!term) {
    const message = `You must specify a research term`;
    return NextResponse.json({ message }, { status: 400 });
  }
  try {
    const community = await prisma.community.findMany({
      where: {
        name: {
          startsWith: term,
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

import prisma from "@/prisma/client";
import { Community, Post, User, Vote } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      const message = "No community id was specified";
      return NextResponse.json(
        {
          message,
        },
        { status: 400 },
      );
    }

    const community = await prisma.community.findUnique({
      where: {
        community_id: id,
      },
    });

    if (!community) {
      const message = `No community was found with the ${id} ID`;
      return NextResponse.json(
        {
          message,
        },
        {
          status: 404,
        },
      );
    }

    const userAmount = await prisma.communityUser.count({
      where: {
        community_id: id,
      },
    });

    const postAmount = await prisma.post.count({
      where: {
        community_id: id,
      },
    });

    const message = "Community details are returned";
    return NextResponse.json({
      message,
      community,
      userAmount,
      postAmount,
    });
  } catch (e) {
    const message = "Can't return community details";

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

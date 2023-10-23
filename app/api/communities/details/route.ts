import prisma from "@/prisma/client";
import { Community, Post, User, Vote } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const userid = request.nextUrl.searchParams.get("user");

    if (userid) {
      const user = await prisma.user.findUnique({
        where: { id: userid },
        include: {
          communities: { include: { community: true } },
        },
      });
      if (!user) {
        const message = `No user was found with the following id : ${userid}`;
        return NextResponse.json({ message }, { status: 404 });
      }

      const communitiesDetails = await Promise.all(
        user.communities.map(async (community: any) => {
          const userAmount = await prisma.communityUser.count({
            where: {
              community_id: community.community_id,
            },
          });

          const postAmount = await prisma.post.count({
            where: {
              community_id: community.community_id,
            },
          });

          return {
            community: community.community,
            userAmount,
            postAmount,
          };
        }),
      );

      console.log(communitiesDetails);

      const message = "Community details are returned";
      return NextResponse.json({
        message,
        communitiesDetails,
      });
    }

    if (!id) {
      const message = "No community id or user id was specified";
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

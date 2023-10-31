import prisma from "@/prisma/client";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      const message = "You need an ID in order to join a community";
      return NextResponse.json({ message }, { status: 400 });
    }

    const community = await prisma.community.findUnique({
      where: { community_id: id },
    });
    if (!community) {
      const message = `No community was found with the following ID : ${id}`;
      return NextResponse.json({ message }, { status: 404 });
    }

    const session: Session | null = await getServerSession(authOptions);
    if (!session) {
      const message = "You need to be logged-in in order to join a community";
      return NextResponse.json({ message }, { status: 400 });
    }

    const user = session?.user?.email
      ? await prisma.user.findUnique({
          where: {
            email: session?.user?.email,
          },
        })
      : "";

    if (!user) {
      const message = `No user was found with the following email : ${session?.user?.email}`;
      return NextResponse.json({ message }, { status: 404 });
    }

    const existingCommunityUser = await prisma.communityUser.findFirst({
      where: {
        user_id: user.id,
        community_id: community.community_id,
      },
    });

    if (existingCommunityUser) {
      const message = `The user ${user.name} is already a member of ${community.name}`;
      return NextResponse.json({ message }, { status: 409 });
    }
    try {
      const newCommunityUser = await prisma.communityUser.create({
        data: {
          user_id: user.id,
          community_id: community.community_id,
          role: "GUEST",
        },
      });
      const message = `The user ${user.name} was successfully add as a member of ${community.name}`;
      return NextResponse.json({ message, newCommunityUser });
    } catch (e) {
      const message = `Something went wrong when trying to add ${user.name} as a member of ${community.name}`;
      return NextResponse.json({ message }, { status: 500 });
    }
  } catch (e) {
    const message = "Something went wrong";
    return NextResponse.json(
      { message },
      {
        status: 500,
      },
    );
  }
}

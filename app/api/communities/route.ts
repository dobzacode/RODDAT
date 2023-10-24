import prisma from "@/prisma/client";
import { Community, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to create a community",
        },
        { status: 403 },
      );

    const email = req.nextUrl.searchParams.get("email");
    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : "";

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const community = await req.json();

    try {
      const newCommunity = await prisma.community.create({
        data: {
          name: community.name.toLowerCase(),
          isNsfw: community.isNsfw,
          visibility: community.visibility.toUpperCase(),
          description: community.description.toLowerCase(),
          communityUsers: {
            create: {
              role: "ADMIN",
              user_id: user.id,
            },
          },
        },
      });
      const message = "The community is created";
      return NextResponse.json({
        message: message,
        status: 200,
        community: newCommunity,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const message = "Community name is already taken";
        return NextResponse.json({
          message: message,
          communityName: community.name,
          status: 400,
        });
      }
      console.error(error);
      const message = "An error occured during the creation";
      return NextResponse.json({ message: message, status: 500 });
    }
  } catch (e) {
    const message = "The community can't be added";
    return NextResponse.json({ message: message, status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const nameParam = req.nextUrl.searchParams.get("name");
    const communityParam = req.nextUrl.searchParams.get("community");

    if (communityParam) {
      const community = await prisma.community.findUnique({
        where: {
          name: communityParam,
        },
        include: {
          communityUsers: true,
        },
      });
      if (community) {
        const message = `${communityParam} informations are successfully returned`;
        return NextResponse.json({ message, community });
      }
      const message = `${communityParam} don't exist`;
      return NextResponse.json({ message }, { status: 404 });
    }

    let communities;

    if (nameParam) {
      communities = await prisma.community.findMany({
        where: {
          name: {
            startsWith: nameParam,
          },
        },
      });

      if (communities.length === 0) {
        const message = `No communities matching with ${nameParam} has been found`;
        return NextResponse.json({
          message: message,
          status: 404,
        });
      }

      const message = `The communities matching with ${nameParam} has been found`;

      return NextResponse.json({
        message: message,
        status: 200,
        communities: communities,
      });
    }

    if (email) {
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (!user) {
        const message = "User not found";
        return NextResponse.json({ message: message, status: 404 });
      }

      communities = await prisma.communityUser.findMany({
        where: {
          user_id: user.id,
          OR: [{ role: "ADMIN" }, { role: "GUEST" }],
        },
        include: {
          community: true,
        },
      });

      const userCommunities: Community[] = communities.map(
        (cu) => cu.community,
      );

      const message = "The user communities has been found";

      return NextResponse.json({
        message: message,
        status: 200,
        communities: userCommunities,
      });
    } else {
      const communities = await prisma.community.findMany();
      const message = "All communities are returned";
      return NextResponse.json({ message: message, communities });
    }
  } catch (e) {
    const message = "An error occurred during the research";
    return NextResponse.json({ message: message, status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to update a community",
        },
        { status: 403 },
      );

    const user = session?.user?.email
      ? await prisma.user.findUnique({
          where: {
            email: session?.user?.email,
          },
        })
      : null;

    if (!user) {
      const message = `No user was found with the following email ${session?.user?.email}`;
      return NextResponse.json({ message }, { status: 404 });
    }

    const community_id = req.nextUrl.searchParams.get("community");

    if (!community_id) {
      const message = "You need to specify a community id";
      return NextResponse.json({ message }, { status: 403 });
    }

    const community = await prisma.community.findUnique({
      where: { community_id },
      include: {
        communityUsers: true,
      },
    });

    if (!community) {
      const message = `No community was found with the following ID ${community_id}`;
      return NextResponse.json({ message }, { status: 404 });
    }

    if (
      !community.communityUsers.some(
        (communityUsers) =>
          communityUsers.role === "ADMIN" && communityUsers.user_id === user.id,
      )
    ) {
      const message = `User ${user.id} is not an admin of ${community.name}`;
      return NextResponse.json({ message }, { status: 401 });
    }

    const updatedCommunityData = await req.json();

    try {
      const updatedCommunity = await prisma.community.update({
        where: { community_id },
        data: {
          name: updatedCommunityData.name.toLowerCase(),
          isNsfw: updatedCommunityData.isNsfw,
          visibility: updatedCommunityData.visibility.toUpperCase(),
          description: updatedCommunityData.description.toLowerCase(),
        },
      });

      const message = "The community is updated";
      return NextResponse.json({
        message: message,
        status: 200,
        community: updatedCommunity,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const message = "Community name is already taken";
        return NextResponse.json({
          message: message,
          communityName: updatedCommunityData.name,
          status: 400,
        });
      }
      console.error(error);
      const message = "An error occurred during the update";
      return NextResponse.json({ message: message, status: 500 });
    }
  } catch (e) {
    const message = "The community can't be updated";
    return NextResponse.json({ message: message, status: 500 });
  }
}

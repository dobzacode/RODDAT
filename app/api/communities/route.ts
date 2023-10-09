import prisma from "@/prisma/client";
import { Community, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : "";

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const community = await req.json();

    community;

    try {
      const newCommunity = await prisma.community.create({
        data: {
          name: community.name.toLowerCase(),
          isNsfw: community.isNsfw,
          visibility: community.visibility.toUpperCase(),
          admin: {
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
      const message = "Both email and name parameters are missing";
      return NextResponse.json({ message: message, status: 400 });
    }
  } catch (e) {
    const message = "An error occurred during the research";
    return NextResponse.json({ message: message, status: 500 });
  }
}

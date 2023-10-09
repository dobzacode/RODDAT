import prisma from "@/prisma/client";
import { User } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      const message = "No user email was specified";
      return NextResponse.json(
        {
          message: message,
        },
        {
          status: 400,
        },
      );
    }

    const userInfo = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
      include: {
        posts: true,
        comments: true,
        communities: true,
        votes: true,
      },
    });

    const message = "All the user informations are returned";
    return NextResponse.json({
      message,
      userInfo: userInfo,
    });
  } catch (e) {
    const message = "Can't return user informations";

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

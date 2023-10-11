import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      const message = "No user email was specified";
      return NextResponse.json(
        {
          message,
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const message = `No user was found with the following email : ${email}`;
      return NextResponse.json(
        {
          message,
          user,
        },
        { status: 404 },
      );
    }

    const message = `The user was found with the following email : ${email}`;
    return NextResponse.json({
      message,
      user,
    });
  } catch (e) {
    const message = "The user id cannot be returned";
    return NextResponse.json(
      {
        message,
      },
      { status: 500 },
    );
  }
}

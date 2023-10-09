import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { post_id, content, email } = await request.json();

    console.log("fdsfdsfdsfdsfdsf");

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      const message = `No user was found with the followind email : ${email}`;
      return NextResponse.json(
        {
          message,
        },
        {
          status: 404,
        },
      );
    }

    const createdComment = await prisma.comment.create({
      data: {
        post_id,
        content,
        author_id: user.id,
      },
    });

    const message = "The comment has been added";
    return NextResponse.json(
      {
        message,
      },
      {
        status: 201,
      },
    );
  } catch (e) {
    const message = "The comment can't be added";
    return NextResponse.json(
      {
        message,
      },
      { status: 500 },
    );
  }
}

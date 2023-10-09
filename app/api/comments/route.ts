import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  try {
    const { post_id, content, author_id, parent_comment_id } =
      await request.json();

    const createdComment = await prisma.comment.create({
      data: {
        post_id,
        content,
        author_id,
        parent_comment_id,
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

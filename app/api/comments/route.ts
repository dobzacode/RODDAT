import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { post_id, content, email } = await request.json();

    console.log("fdsfdsfdsfdsfdsf");

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      const message = `No user was found with the following email : ${email}`;
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
        createdComment,
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

export async function GET(request: NextRequest) {
  try {
    const comment_id = request.nextUrl.searchParams.get("comment_id");

    if (!comment_id) {
      const message = "No comment ID was provided";
      return NextResponse.json(
        {
          message,
        },
        {
          status: 400,
        },
      );
    }

    const commentDetails = await prisma.comment.findUnique({
      where: { comment_id: comment_id },
      include: {
        votes: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!commentDetails) {
      const message = `No comment was founded with the following ID: ${comment_id}`;
      return NextResponse.json(
        {
          message,
        },
        {
          status: 404,
        },
      );
    }

    const message = "The comment has been founded";
    return NextResponse.json({
      message,
      comment: commentDetails,
    });
  } catch (e) {
    const message = "The comment can't be returned";
    return NextResponse.json(
      {
        message,
      },
      { status: 500 },
    );
  }
}

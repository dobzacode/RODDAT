import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    const message = "All the publications are returned";
    return NextResponse.json({
      message,
      posts: posts,
    });
  } catch (e) {
    const message = "Can't return all the publcations";

    return NextResponse.json(
      {
        message: message,
        data: e,
      },
      {
        status: 500,
      }
    );
  }
}

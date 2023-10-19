import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to vote",
        },
        { status: 403 },
      );

    const email = req.nextUrl.searchParams.get("email");
    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : null;

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message }, { status: 404 });
    }

    const type = req.nextUrl.searchParams.get("type");

    if (type !== "UPVOTE" && type !== "DOWNVOTE") {
      const message = `${type} is not a valid type of vote or no type was specified`;
      return NextResponse.json({ message }, { status: 400 });
    }

    const comment_id = req.nextUrl.searchParams.get("comment_id");
    const post_id = req.nextUrl.searchParams.get("post_id");

    if (!comment_id && !post_id) {
      const message = "Bad request, you must specify a post or a comment id";
      return NextResponse.json({ message }, { status: 400 });
    }

    if (comment_id) {
      const comment = await prisma.comment.findUnique({
        where: { comment_id },
      });

      if (!comment) {
        const message = `No comment was found with the following id: ${comment_id}`;
        return NextResponse.json({ message }, { status: 404 });
      }

      const existingVote = await prisma.vote.findFirst({
        where: {
          comment_id,
          user_id: user.id,
        },
      });

      if (existingVote) {
        const data = await prisma.vote.update({
          where: {
            vote_id: existingVote.vote_id,
          },
          data: {
            type,
          },
        });
        console.log(data);
        const message = `The past vote was replaced by a${
          type === "UPVOTE" ? "n" : ""
        } ${type}`;
        return NextResponse.json({ message, data }, { status: 202 });
      } else {
        try {
          const data = await prisma.vote.create({
            data: {
              type,
              comment_id,
              user_id: user.id,
            },
          });
          const message = `The ${type} for the comment ${comment_id} has been added`;
          return NextResponse.json({ message, data }, { status: 201 });
        } catch (e) {
          const message = `The ${type} for the comment ${comment_id} could not be added`;
          return NextResponse.json({ message }, { status: 500 });
        }
      }
    }

    if (post_id) {
      const post = await prisma.post.findUnique({ where: { post_id } });

      if (!post) {
        const message = `No post was found with the following id: ${post_id}`;
        return NextResponse.json({ message }, { status: 404 });
      }

      const existingVote = await prisma.vote.findFirst({
        where: {
          post_id,
          user_id: user.id,
        },
      });

      if (existingVote) {
        const data = await prisma.vote.update({
          where: {
            vote_id: existingVote.vote_id,
          },
          data: {
            type,
          },
        });

        const message = `The past vote was replaced by a${
          type === "UPVOTE" ? "n" : ""
        } ${type}`;
        return NextResponse.json({ message, data }, { status: 202 });
      } else {
        try {
          const data = await prisma.vote.create({
            data: {
              type,
              post_id,
              user_id: user.id,
            },
          });
          const message = `The ${type} for the post ${post_id} has been added`;
          return NextResponse.json({ message, data }, { status: 201 });
        } catch (e) {
          const message = `The ${type} for the post ${post_id} could not be added`;
          return NextResponse.json({ message }, { status: 500 });
        }
      }
    }

    const message = "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  } catch (e) {
    const message = "The vote can't be added";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : null;

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message }, { status: 404 });
    }

    const type = req.nextUrl.searchParams.get("type");

    if (type !== "UPVOTE" && type !== "DOWNVOTE") {
      const message = `${type} is not a valid type of vote or no type was specified`;
      return NextResponse.json({ message }, { status: 400 });
    }

    const comment_id = req.nextUrl.searchParams.get("comment_id");
    const post_id = req.nextUrl.searchParams.get("post_id");

    if (!comment_id && !post_id) {
      const message = "Bad request, you must specify a post or a comment id";
      return NextResponse.json({ message }, { status: 400 });
    }

    if (comment_id) {
      const comment = await prisma.comment.findUnique({
        where: { comment_id },
      });

      if (!comment) {
        const message = `No comment was found with the following id: ${comment_id}`;
        return NextResponse.json({ message }, { status: 404 });
      }

      const existingVote = await prisma.vote.findFirst({
        where: {
          comment_id,
          user_id: user.id,
        },
      });

      if (!existingVote) {
        const message = `No existing vote was founded`;
        return NextResponse.json({ message }, { status: 404 });
      }
      await prisma.vote.delete({
        where: {
          vote_id: existingVote.vote_id,
        },
      });

      const message = `The past ${type} was deleted`;
      return NextResponse.json({ message });
    }

    if (post_id) {
      const post = await prisma.post.findUnique({ where: { post_id } });

      if (!post) {
        const message = `No post was found with the following id: ${post_id}`;
        return NextResponse.json({ message }, { status: 404 });
      }

      const existingVote = await prisma.vote.findFirst({
        where: {
          post_id,
          user_id: user.id,
        },
      });

      if (!existingVote) {
        const message = `No existing vote was founded`;
        return NextResponse.json({ message }, { status: 404 });
      }
      await prisma.vote.delete({
        where: {
          vote_id: existingVote.vote_id,
        },
      });

      const message = `The past ${type} was deleted`;
      return NextResponse.json({ message });
    }

    const message = "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  } catch (e) {
    const message = "The vote can't be added";
    console.log(e);
    return NextResponse.json({ message }, { status: 500 });
  }
}

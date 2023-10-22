import prisma from "@/prisma/client";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { zeroShotClassify } from "@/utils/utils";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to post a comment",
        },
        { status: 403 },
      );

    const { post_id, content, email, parent_comment_id } = await request.json();

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

    const zsc = await zeroShotClassify([content], ["positivity"]);
    const { scores } = zsc[0];
    const positivity = scores[0];

    if (parent_comment_id) {
      const createdComment = await prisma.comment.create({
        data: {
          post_id,
          content,
          positivity,
          author_id: user.id,
          parent_comment_id,
        },
      });
      const message = "The child comment has been added";
      return NextResponse.json(
        {
          createdComment,
          message,
        },
        {
          status: 201,
        },
      );
    }

    const createdComment = await prisma.comment.create({
      data: {
        post_id,
        content,
        positivity,
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
        child_comments: true,
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

async function deleteCommentAndChildren(commentId: string) {
  // Récupérez le commentaire et ses commentaires enfants
  const comment = await prisma.comment.findUnique({
    where: { comment_id: commentId },
    include: { child_comments: true, votes: true }, // Inclure les votes
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Supprimez les votes associés au commentaire
  for (const vote of comment.votes) {
    await prisma.vote.delete({
      where: { vote_id: vote.vote_id },
    });
  }

  // Supprimez les commentaires enfants récursivement
  for (const childComment of comment.child_comments) {
    await deleteCommentAndChildren(childComment.comment_id);
  }

  // Supprimez le commentaire lui-même
  await prisma.comment.delete({
    where: { comment_id: comment.comment_id },
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to delete a comment",
        },
        { status: 403 },
      );
    }

    const user = session?.user?.email
      ? await prisma.user.findUnique({ where: { email: session?.user?.email } })
      : null;

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const commentId = req.nextUrl.searchParams.get("comment_id");
    if (!commentId) {
      const message = "Comment ID not provided";
      return NextResponse.json({ message: message, status: 400 });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        comment_id: commentId,
      },
      include: {
        post: { include: { community: true } },
      },
    });

    if (!comment) {
      const message = "Comment not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    if (comment.author_id !== user.id) {
      const message = `${user.email} is not the author of the comment`;
      return NextResponse.json({ message: message, status: 403 });
    }

    await prisma.$transaction(async (prisma) => {
      // Supprimez récursivement le commentaire et ses commentaires enfants
      await deleteCommentAndChildren(comment.comment_id);
    });

    const message =
      "The comments and his children has been successfully deleted";
    return NextResponse.json({ message });
  } catch (e) {
    const message = "The comment can't be deleted";
    console.error(e);
    return NextResponse.json({ message: message, status: 500, error: e });
  }
}

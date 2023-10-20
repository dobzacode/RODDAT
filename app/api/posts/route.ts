import prisma from "@/prisma/client";
import { Session, getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { zeroShotClassify } from "@/utils/utils";

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
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to create a post",
        },
        { status: 403 },
      );

    const email = req.nextUrl.searchParams.get("email");
    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : "";

    if (!user) {
      // Gérer le cas où l'utilisateur n'a pas été trouvé
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const post = await req.json();

    const zsc = await zeroShotClassify([post.content], ["positivity"]);
    const { scores } = zsc[0];
    const positivity = scores[0];

    const data: {
      title: string;
      content: string;
      author_id: string;
      positivity: number;
      community_id?: string;
    } = {
      title: post.title.toLowerCase(),
      content: post.content,
      positivity,
      author_id: user.id,
    };

    if (post.community) {
      const community = await prisma.community.findUnique({
        where: { name: post.community },
      });

      if (!community) {
        // Gérer le cas où la communauté n'a pas été trouvée
        const message = "Community not found";
        return NextResponse.json({
          message: message,
          status: 404,
          community: post.community,
        });
      }

      data.community_id = community.community_id;

      const existingPost = await prisma.post.findFirst({
        where: {
          title: post.title.toLowerCase(),
          community_id: community.community_id,
        },
      });

      if (existingPost) {
        const message =
          "A post with the same title already exists in this community";
        return NextResponse.json({
          message,
          status: 409,
        });
      }
    }

    try {
      const newPost = await prisma.post.create({
        data: data,
      });
      const message = "The post is created";
      return NextResponse.json({
        message: message,
        status: 200,
        post: newPost,
      });
    } catch (error) {
      // Gérer d'autres erreurs Prisma
      console.error(error);
      const message = "An error occured during the creation";
      return NextResponse.json({ message: message, status: 500 });
    }
  } catch (e) {
    const message = "The post can't be added";
    return NextResponse.json({ message: message, status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to delete a post",
        },
        { status: 403 },
      );

    const user = session?.user?.email
      ? await prisma.user.findUnique({ where: { email: session?.user?.email } })
      : "";

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const post_id = req.nextUrl.searchParams.get("post_id");
    const post = post_id
      ? await prisma.post.findUnique({ where: { post_id } })
      : "";

    if (!post) {
      const message = "Post not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    if (post.author_id !== user.id) {
      const message = `${session?.user?.email} is not the author of ${post.title}`;
      return NextResponse.json({ message: message, status: 403 });
    }

    const commentsToDelete = await prisma.comment.findMany({
      where: { post_id: post.post_id },
    });

    const votesToDelete = await prisma.vote.findMany({
      where: { post_id: post.post_id },
    });

    await prisma.$transaction(
      async (prisma) => {
        for (const comment of commentsToDelete) {
          await prisma.comment.delete({
            where: { comment_id: comment.comment_id },
          });
        }

        for (const vote of votesToDelete) {
          await prisma.vote.delete({
            where: { vote_id: vote.vote_id },
          });
        }

        await prisma.post.delete({
          where: { post_id: post.post_id },
        });
      },
      { timeout: 20000 },
    );

    const message = `${post.title} is successfully deleted`;
    return NextResponse.json({ message });
  } catch (e) {
    const message = "The post can't be deleted";
    console.log(e);
    return NextResponse.json({ message: message, status: 500, error: e });
  }
}

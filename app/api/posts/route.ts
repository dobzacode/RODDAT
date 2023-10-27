import prisma from "@/prisma/client";
import { Session, getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { zeroShotClassify } from "@/utils/utils";
import { Prisma } from "@prisma/client";

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

    const community = await prisma.community.findUnique({
      where: { name: post.community },
    });

    if (!community) {
      const message = "Community not found";
      return NextResponse.json({
        message: message,
        status: 404,
        community: post.community,
      });
    }

    const data: {
      title: string;
      content: string;
      author_id: string;
      positivity: number;
      community_id: string;
    } = {
      title: post.title.toLowerCase(),
      content: post.content,
      positivity,
      author_id: user.id,
      community_id: community.community_id,
    };

    data.community_id = community.community_id;

    const existingCommunityUser = await prisma.communityUser.findFirst({
      where: {
        user_id: user.id,
        community_id: community.community_id,
      },
    });

    if (!existingCommunityUser) {
      const newCommunityUser = await prisma.communityUser.create({
        data: {
          user_id: user.id,
          community_id: community.community_id,
          role: "GUEST",
        },
      });
    }

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

    try {
      const newPost = await prisma.post.create({
        data: data,
      });

      const message = `The post is created`;
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

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json(
        {
          message: "You must be logged in to create a post",
        },
        { status: 403 },
      );

    const { title, content, post_id, email } = await req.json();

    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : "";

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const post = await prisma.post.findUnique({ where: { post_id } });

    if (!post) {
      const message = `No post was found with the following ID : ${post_id}`;
      return NextResponse.json({ message: message, status: 404 });
    }

    if (post.author_id !== user.id) {
      const message = `${user.id} is not authorized to modify ${post.title} post`;
      return NextResponse.json({ message }, { status: 401 });
    }

    const zsc = await zeroShotClassify([content], ["positivity"]);
    const { scores } = zsc[0];
    const positivity = scores[0];

    try {
      const updatedPost = await prisma.post.update({
        where: { post_id },
        data: {
          title: title.toLowerCase(),
          positivity,
          content,
        },
      });

      const message = `The post ${post_id} was successfully modified`;
      return NextResponse.json({ message, updatedPost });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const message = `A post with the title : ${title.toLowerCase()} already exist in the community`;
        return NextResponse.json({
          message: message,
          title: title.toLowerCase,
          status: 409,
        });
      }
      const message = `An error occured during the modification`;
      return NextResponse.json({ message: message, error, status: 500 });
    }
  } catch (e) {
    const message = "The post can't be modified";
    return NextResponse.json({ message: message, status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "You must be logged in to delete a post",
        },
        { status: 403 },
      );
    }

    const user = session?.user?.email
      ? await prisma.user.findUnique({ where: { email: session?.user?.email } })
      : null; // Utilisez null au lieu de chaîne vide

    if (!user) {
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const post_id = req.nextUrl.searchParams.get("post_id");
    if (!post_id) {
      const message = "Post ID not provided";
      return NextResponse.json({ message: message, status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { post_id } });

    if (!post) {
      const message = "Post not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    if (post.author_id !== user.id) {
      const message = `${user.email} is not the author of ${post.title}`;
      return NextResponse.json({ message: message, status: 403 });
    }

    await prisma.$transaction(async (prisma) => {
      // Supprimez tous les commentaires associés au post
      const commentsToDelete = await prisma.comment.findMany({
        where: { post_id: post.post_id },
        include: { votes: true }, // Inclure les votes des commentaires
      });

      for (const commentToDelete of commentsToDelete) {
        // Supprimez les votes des commentaires
        for (const vote of commentToDelete.votes) {
          await prisma.vote.delete({
            where: { vote_id: vote.vote_id },
          });
        }

        // Supprimez le commentaire
        await prisma.comment.delete({
          where: { comment_id: commentToDelete.comment_id },
        });
      }

      // Supprimez les votes liés au post
      const postVotesToDelete = await prisma.vote.findMany({
        where: { post_id: post.post_id },
      });

      for (const vote of postVotesToDelete) {
        await prisma.vote.delete({
          where: { vote_id: vote.vote_id },
        });
      }

      // Supprimez le post lui-même
      await prisma.post.delete({
        where: { post_id: post.post_id },
      });
    });

    const message = `${post.title} and associated comments are successfully deleted`;
    return NextResponse.json({ message });
  } catch (e) {
    const message = "The post and associated comments can't be deleted";
    console.error(e);
    return NextResponse.json({ message: message, status: 500, error: e });
  }
}

// Relevant imports
import prisma from "@/prisma/client";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const client = new S3Client({
      region: process.env.PERSONNAL_REGION as string,
      credentials: {
        accessKeyId: process.env.PERSONNAL_ACCESS_KEY as string,
        secretAccessKey: process.env.PERSONNAL_SECRET_ACCESS_KEY as string,
      },
    });
    const session = await getServerSession(authOptions);
    const user = session?.user?.email
      ? await prisma.user.findUnique({ where: { email: session?.user?.email } })
      : null;
    if (!user) {
      const message = "Unauthorized";
      return NextResponse.json({ message }, { status: 401 });
    }

    const { fileName, fileType, fileSize } = await req.json();
    if (!fileType || !fileName || !fileSize) {
      throw new Error("There was a problem with the file!");
    }

    const id = req.nextUrl.searchParams.get("id");

    const key = v4();

    if (!id) {
      const message = "No id was provided";
      return NextResponse.json(message, { status: 400 });
    }

    const putCommand = new PutObjectCommand({
      Key: key,
      ContentType: fileType,
      Bucket: process.env.BUCKET_NAME,
    });

    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 });

    const getCommand = new GetObjectCommand({
      Key: key,
      Bucket: process.env.BUCKET_NAME,
    });

    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 });

    const to = req.nextUrl.searchParams.get("to");

    if (!to) {
      const message = "No to query was provided";
      return NextResponse.json(message, { status: 400 });
    }

    if (to === "community") {
      const community = await prisma.community.update({
        where: { community_id: id },
        data: {
          picture: "http://d1qxcfelrfueco.cloudfront.net/" + key,
        },
      });
      if (!community) {
        const message = `No community was found with the following ID : ${id}`;
        return NextResponse.json(message, { status: 404 });
      }
      const message = `The url picture was successfully added on ${community.name}`;
      return NextResponse.json({ putUrl, getUrl, message }, { status: 200 });
    }

    if (to === "post") {
      const post = await prisma.post.update({
        where: { post_id: id },
        data: {
          picture: "http://d1qxcfelrfueco.cloudfront.net/" + key,
        },
      });
      if (!post) {
        const message = `No post was found with the following ID : ${id}`;
        return NextResponse.json(message, { status: 404 });
      }
      const message = `The url picture was successfully added on ${post.title}`;
      return NextResponse.json({ putUrl, getUrl, message }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

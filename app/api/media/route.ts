// Relevant imports
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";

// Initialize S3Client instance
const client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: NextRequest) {
  try {
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

    if (!id) {
      const message = "No id was provided";
      return NextResponse.json(message, { status: 400 });
    }

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: id,
      ContentType: fileType,
      Bucket: process.env.BUCKET_NAME,
    });

    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 });

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: id,
      Bucket: process.env.BUCKET_NAME,
    });
    // Generate pre-signed URL for GET request
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
          picture: "http://d8129lgm8xiaf.cloudfront.net/" + id,
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
          picture: "http://d8129lgm8xiaf.cloudfront.net/" + id,
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
    throw error;
  }
}

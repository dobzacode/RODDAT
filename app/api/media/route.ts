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

// Initialize S3Client instance
const client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIAYDAREFP2BQMXKU7R",
    secretAccessKey: "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",
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

    // Create a new media entry in database.
    // The uploaded media file will be stored in the S3 bucket
    // with a name (Key) matching the id (PK) of the newMedia/photo.
    const newMedia = await prisma.photo.create({
      data: {
        fileSize: fileSize,
        fileName: fileName,
        mimeType: fileType,
        user_id: user.id,
        authorName: `${user.email}`,
      },
    });

    if (!newMedia) {
      throw new Error("Something went wrong!");
    }

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: newMedia.photo_id,
      ContentType: fileType,
      Bucket: process.env.BUCKET_NAME,
    });

    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 });

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: newMedia.photo_id,
      Bucket: process.env.BUCKET_NAME,
    });
    // Generate pre-signed URL for GET request
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 });

    return NextResponse.json({ putUrl, getUrl }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

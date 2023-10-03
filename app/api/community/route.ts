import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const user = email
      ? await prisma.user.findUnique({ where: { email: email } })
      : "";

    if (!user) {
      // Gérer le cas où l'utilisateur n'a pas été trouvé
      const message = "User not found";
      return NextResponse.json({ message: message, status: 404 });
    }

    const community = await req.json();

    try {
      const newCommunity = await prisma.community.create({
        data: {
          name: community.name,
          admin: {
            create: {
              role: "ADMIN",
              user_id: user.id, // Utilisez l'ID de l'utilisateur trouvé
            },
          },
        },
      });
      const message = "The community is created";
      return NextResponse.json({
        message: message,
        status: 200,
        community: newCommunity,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // Gérer le cas où le nom de la communauté est en double (violant la contrainte d'unicité)
        const message = "Community name is already taken";
        return NextResponse.json({
          message: message,
          communityName: community.name,
          status: 400,
        });
      }
      // Gérer d'autres erreurs Prisma
      console.error(error);
      const message = "An error occured during the creation";
      return NextResponse.json({ message: message, status: 500 });
    }
  } catch (e) {
    const message = "The community can't be added";
    return NextResponse.json({ message: message, status: 500 });
  }
}

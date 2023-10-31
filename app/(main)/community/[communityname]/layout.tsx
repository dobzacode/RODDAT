import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CommunityDetailsProps } from "@/interface/interface";
import { BASE_URL } from "@/utils/utils";
import { Community, CommunityUser, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  params,
  children,
}: {
  params: { communityname: string };
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const resUser = await fetch(
    `${BASE_URL}/api/user/getuserinformation?email=${session?.user?.email}`,
  );
  const { user }: { user: User } = await resUser.json();

  const resCom = await fetch(
    `${BASE_URL}/api/communities?community=${params.communityname}`,
    {
      cache: "no-store",
    },
  );
  const {
    community,
  }: { community: Community & { communityUsers: CommunityUser[] } } =
    await resCom.json();

  community;

  if (
    community.visibility === "PRIVATE" &&
    community.communityUsers.some((comUser) => comUser.user_id !== user.id)
  ) {
    redirect("/api/auth/signin");
  }

  return <>{children}</>;
}

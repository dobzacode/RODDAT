import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommunityForm from "@/components/community/CommunityForm";
import prisma from "@/prisma/client";
import { BASE_URL } from "@/utils/utils";
import { Community, CommunityUser, User } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ModifyCommunityRes extends Community {
  communityUsers: CommunityUser[];
}

export async function generateStaticParams() {
  const communities: Community[] = await prisma.community.findMany();
  return communities.map((community) => ({
    name: community.name,
  }));
}

export const revalidate = 0;

export default async function ModifyCommunity({
  params,
}: {
  params: { communityname: string };
}) {
  const communityRes = await fetch(
    `${BASE_URL}/api/communities?community=${params.communityname}`,
    {
      cache: "no-store",
    },
  );
  const { community }: { community: ModifyCommunityRes } =
    await communityRes.json();

  if (!community) {
    return redirect("/");
  }

  const session: Session | null = await getServerSession(authOptions);

  const userRes = await fetch(
    `${BASE_URL}/api/user/getuserinformation?email=${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const { user }: { user: User } = await userRes.json();

  console.log(community.communityUsers);

  if (
    !community.communityUsers.some((communityUser) => {
      return (
        communityUser.user_id === user.id && communityUser.role === "ADMIN"
      );
    })
  ) {
    return redirect("/");
  }

  return (
    <>
      <main className="mx-extra-small flex justify-center gap-medium mobile-large:mx-small laptop-large:mx-extra-large ">
        <CommunityForm
          community={community}
          theme="primary"
          title={
            <p>
              Create
              <span className="hidden mobile-large:block">community</span>
            </p>
          }
        ></CommunityForm>
      </main>
    </>
  );
}

import NewCommunityModal from "@/components/community/NewCommunityModal";
import P from "../ui/text/P";
import H2 from "../ui/text/H1";

import Link from "next/link";
import { buttonVariants } from "../ui/button/Button";
import { FC } from "react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewPost from "../post/NewPost";

async function UserInfo() {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <>
      <H2 type="heading">Home</H2>
      <P>
        Your personal Roddat frontpage. Come here to check in with your favorite
        communities.
      </P>
      <hr className=" border border-primary80 opacity-20 dark:border-primary10"></hr>
      <NewPost session={session}></NewPost>
      <NewCommunityModal session={session}></NewCommunityModal>
    </>
  );
}

export default UserInfo;

"use client";

import NewCommunityModal from "@/components/community/NewCommunityModal";
import P from "../ui/text/P";
import H2 from "../ui/text/H1";

import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button/Button";
import { Session } from "next-auth";
import Avatar from "../ui/Avatar";

interface UserInfoProfileProps {
  session: Session | null;
}

const UserInfoProfile: FC<UserInfoProfileProps> = ({ session }) => {
  console.log(session);

  return (
    <>
      <div className="flex items-end gap-small">
        <Avatar
          size={5}
          className="rounded-small"
          src={session?.user?.image}
        ></Avatar>
        <P className="w-full whitespace-nowrap laptop:block">
          u/{session?.user?.name as string}
        </P>
      </div>
      <hr className=" border border-primary80 opacity-20"></hr>
      <Link
        href="/post/create"
        // className="brutalism-border border-primary80 rounded-extra-small button--small text-center bg-primary10 text-primary80 primary-hover"
        className={buttonVariants({
          intent: "pastelPrimary",
          size: "small",
          modifier: "brutalism",
          rounded: "small",
          hover: true,
        })}
      >
        Create a post
      </Link>
      <NewCommunityModal></NewCommunityModal>
    </>
  );
};

export default UserInfoProfile;

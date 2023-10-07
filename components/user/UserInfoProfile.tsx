"use client";

import NewCommunityModal from "@/components/community/NewCommunityModal";
import P from "../ui/text/P";
import H2 from "../ui/text/H1";

import Link from "next/link";
import { FC } from "react";

const UserInfoProfile: FC = () => {
  return (
    <>
      <H2 type="heading">Home</H2>
      <P>
        Your personal Roddat frontpage. Come here to check in with your favorite
        communities.
      </P>
      <hr className=" border border-primary80 opacity-20"></hr>
      <Link
        href="/post/create"
        className="brutalism-border button--small primary-hover rounded-extra-small border-primary80 bg-primary10 text-center text-primary80"
      >
        Create a post
      </Link>
      <NewCommunityModal></NewCommunityModal>
    </>
  );
};

export default UserInfoProfile;

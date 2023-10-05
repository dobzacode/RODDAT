"use client";

import NewCommunityModal from "@/components/community/NewCommunityModal";
import P from "../ui/text/P";
import H2 from "../ui/text/H1";

import Link from "next/link";

export default function UserInfoProfile({}) {
  return (
    <>
      <H2 type="heading">Home</H2>
      <P>
        Your personal Roddat frontpage. Come here to check in with your favorite
        communities.
      </P>
      <hr className=" border-primary80 border opacity-20"></hr>
      <Link
        href="/post/create"
        className="brutalism-border border-primary80 rounded-extra-small button--small text-center bg-primary10 text-primary80 primary-hover"
      >
        Create a post
      </Link>
      <NewCommunityModal></NewCommunityModal>
    </>
  );
}

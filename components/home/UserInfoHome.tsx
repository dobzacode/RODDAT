"use client";

import P from "../ui/text/P";

import H2 from "../ui/text/H1";

import NewCommunity from "../community/NewCommunity";
import NewPost from "../post/NewPost";

function UserInfo() {
  return (
    <>
      <H2 type="heading">Home</H2>
      <P>
        Your personal Roddat frontpage. Come here to check in with your favorite
        communities.
      </P>
      <hr className=" border border-primary80 opacity-20 dark:border-primary10"></hr>
      <NewPost></NewPost>
      <NewCommunity></NewCommunity>
    </>
  );
}

export default UserInfo;

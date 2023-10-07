import NewCommunityModal from "@/components/community/NewCommunityModal";
import P from "../ui/text/P";
import H2 from "../ui/text/H1";

import Link from "next/link";
import { buttonVariants } from "../ui/button/Button";

export default function UserInfo({}) {
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
}

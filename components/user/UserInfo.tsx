import NewCommunityModal from "@/components/community/NewCommunityModal";
import P from "../text/P";
import H2 from "../text/H1";
import NewPostModal from "../post/NewPostModal";

export default function UserInfo({}) {
  return (
    <>
      <H2 type="heading">Home</H2>
      <P>
        Your personal Roddat frontpage. Come here to check in with your favorite
        communities.
      </P>
      <hr className=" border-primary80 border opacity-20"></hr>
      <NewPostModal></NewPostModal>
      <NewCommunityModal></NewCommunityModal>
    </>
  );
}

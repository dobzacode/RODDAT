import {
  mdiArrowDown,
  mdiArrowUp,
  mdiCommentOutline,
  mdiShareOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Avatar from "./Avatar";
import H2 from "./text/H2";
import P from "./text/P";

export default function PublicationBar({}) {
  return (
    <section className="flex brutalism-border border-primary80 rounded-small w-1/3">
      <div className="flex gap-extra-small flex-col  bg-primary10 rounded-l-small p-small">
        <Icon path={mdiArrowUp} size={1}></Icon>
        <P>17</P>
        <Icon path={mdiArrowDown} size={1}></Icon>
      </div>
      <div className="flex flex-col gap-small p-small">
        <div className="flex gap-extra-small caption">
          <Avatar size={1}></Avatar>
          <P type="caption">r/nextjs</P>
          <P type="caption">Posted by u/deleted</P>
          <P type="caption">2 days ago</P>
        </div>
        <div className="flex flex-col gap-extra-small">
          <H2 type="sub-heading">Title</H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </P>
        </div>
        <div className="flex gap-small">
          <div className="flex gap-extra-small">
            <Icon path={mdiCommentOutline} size={1.4}></Icon>
            <P>109 comments</P>
          </div>
          <div className="flex gap-extra-small">
            <Icon path={mdiShareOutline} size={1.4}></Icon>
            <P>Share</P>
          </div>
        </div>
      </div>
    </section>
  );
}

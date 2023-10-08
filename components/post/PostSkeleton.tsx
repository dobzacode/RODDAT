import { FC, HTMLProps } from "react";
import Avatar from "../ui/Avatar";

const PostSkeleton: FC = () => {
  return (
    <section className="brutalism-border flex h-[14rem] w-full animate-pulse rounded-small border-primary80">
      <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small"></div>
      <div className="flex w-full flex-col gap-small rounded-r-small p-small"></div>
    </section>
  );
};

export default PostSkeleton;

import { FC, HTMLProps } from "react";
import Avatar from "../ui/Avatar";
import { cn } from "@/utils/utils";

const PostSkeleton = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        `brutalism-border pointer-events-none flex h-[15.7rem] w-full animate-pulse rounded-small border-primary80`,
        className,
      )}
    >
      <div className="flex flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small"></div>
      <div className="flex w-full flex-col gap-small rounded-r-small p-small"></div>
    </section>
  );
};

export default PostSkeleton;

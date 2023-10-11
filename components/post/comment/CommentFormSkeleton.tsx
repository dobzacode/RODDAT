import { cn } from "@/utils/utils";
import { FC, HTMLProps } from "react";

const CommentFormSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "brutalism-border flex h-[14rem] animate-pulse flex-col-reverse rounded-small border-primary80",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-extra-small  rounded-b-small bg-primary10 p-medium"></div>
      <div className="flex w-full flex-col gap-small rounded-r-small p-small"></div>
    </div>
  );
};

export default CommentFormSkeleton;

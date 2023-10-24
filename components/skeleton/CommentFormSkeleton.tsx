import { cn } from "@/utils/utils";

const CommentFormSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "brutalism-border flex h-[14rem] animate-pulse flex-col-reverse rounded-small border-primary80 dark:border-primary1 dark:bg-primary80",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-extra-small  rounded-b-small bg-primary10 p-medium dark:bg-primary90"></div>
      <div className="flex w-full flex-col gap-small rounded-r-small p-small dark:bg-primary80"></div>
    </div>
  );
};

export default CommentFormSkeleton;

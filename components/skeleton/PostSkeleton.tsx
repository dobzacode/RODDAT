import { cn } from "@/utils/utils";

const PostSkeleton = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        `brutalism-border pointer-events-none flex h-[15.7rem] w-full animate-pulse rounded-small border-primary80 dark:border-primary1 dark:bg-primary80`,
        className,
      )}
    >
      <div className="flex w-[50px] flex-col items-center gap-extra-small  rounded-l-small bg-primary10 p-small dark:bg-primary90  "></div>
      <div className="flex w-full flex-col gap-small rounded-r-small p-small dark:bg-primary80"></div>
    </section>
  );
};

export default PostSkeleton;

import { cn } from "@/utils/utils";

export default function SnippetSkeleton({ isUser }: { isUser?: boolean }) {
  return (
    <li className=" w-full animate-pulse">
      <div
        className={cn(
          "brutalism-border peer  relative flex  w-full  rounded-small border-primary80 dark:border-primary1",
          !isUser ? "h-[100px]" : "h-[60px]",
        )}
      >
        {!isUser && (
          <div className="flex w-[47px] flex-col items-center  gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90"></div>
        )}

        <div className="my-small ml-small flex w-full flex-col gap-extra-small dark:text-primary1"></div>
      </div>
    </li>
  );
}

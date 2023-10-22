import { cn } from "@/utils/utils";

export default function CommunitySkeleton() {
  return (
    <div
      className={`brutalism-border primary-hover dark:primary-hover-dark peer flex h-[8.2rem] w-full animate-pulse  items-center justify-between rounded-small border-primary80  dark:border-primary20 dark:bg-primary90 `}
    >
      <div className="flex h-full w-[7.8rem]  flex-col items-center gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90"></div>

      <div className="flex flex-col gap-extra-small p-small"></div>
      <div className="flex flex-col justify-between gap-extra-small p-small">
        <div className="flex flex-col gap-extra-small"></div>
        <div className="flex flex-col gap-extra-small "></div>
      </div>
    </div>
  );
}

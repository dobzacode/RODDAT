export default function SnippetSkeleton({}) {
  return (
    <li className=" w-full animate-pulse">
      <div className="brutalism-border peer  relative flex h-[100px] w-full  rounded-small border-primary80 dark:border-primary1">
        <div className="flex w-[47px] flex-col items-center  gap-extra-small rounded-l-small bg-primary10 p-small dark:bg-primary90"></div>

        <div className=" my-small ml-small flex flex-col gap-extra-small dark:text-primary1"></div>
      </div>
    </li>
  );
}

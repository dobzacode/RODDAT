import Avatar from "../ui/Avatar";

export default function PostSkeleton({}) {
  return (
    <section className="flex brutalism-border border-primary80 rounded-small w-full h-[14rem] animate-pulse">
      <div className="flex gap-extra-small flex-col items-center  bg-primary10 rounded-l-small p-small"></div>
      <div className="flex flex-col gap-small p-small w-full rounded-r-small"></div>
    </section>
  );
}

import { FC, HTMLProps } from "react";

const CommentFormSkeleton: FC = () => {
  return (
    <section className="brutalism-border flex h-[14rem] w-full animate-pulse flex-col-reverse rounded-small border-primary80">
      <div className="flex flex-col items-center gap-extra-small  rounded-b-small bg-primary10 p-medium"></div>
      <div className="flex w-full flex-col gap-small rounded-r-small p-small"></div>
    </section>
  );
};

export default CommentFormSkeleton;

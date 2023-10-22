"use client";

import useSibling from "../hooks/useIsSibling";

export default function ThreadLine({
  post_id,
  comments_length,
  isLoading,
}: {
  post_id: string;
  comments_length: number;
  isLoading?: Boolean;
}) {
  const { isSibling } = useSibling(post_id);
  console.log(isSibling);
  {
    return (
      <>
        {isSibling && !isLoading ? (
          <div className="-mb-20 h-full w-[1px] border border-primary20"></div>
        ) : null}
        ;
      </>
    );
  }
}

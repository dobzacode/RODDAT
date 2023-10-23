"use client";

import useSibling from "../hooks/useIsSibling";

export default function ThreadLine({
  id,
  comments_length,
  isLoading,
}: {
  id: string;
  comments_length: number;
  isLoading?: Boolean;
}) {
  const { isSibling } = useSibling(id);

  return (
    <>
      {isSibling && !isLoading ? (
        <div className="-mb-20 h-full w-[1px] border border-primary20"></div>
      ) : null}
    </>
  );
}

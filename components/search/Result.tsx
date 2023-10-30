import { Community, Post, User } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Result() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Community[] | User[] | Post[] | null>(
    null,
  );

  useEffect(() => {}, [pathName]);

  useEffect(() => {
    const contentType = searchParams.get("type")
      ? searchParams.get("type")
      : "post";
    const term = searchParams.get("term");
    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/search?term=${term}&type=${contentType}`);
        const { content }: { content: Community[] | User[] | Post[] } =
          await res.json();
        setResult(content);
      } catch (e) {
        console.log(e);
      }
    };
    fetchResult();
  });

  if (!result) return;

  return (
    <ul className="flex w-full flex-col items-center justify-center gap-sub-large ">
      {searchParams.get("type") === "post" && (
        <>
          {result.map((post) => {
            return <li key={uuidv4()}></li>;
          })}
        </>
      )}
    </ul>
  );
}

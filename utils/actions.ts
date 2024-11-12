"use server";

import { revalidateTag } from "next/cache";

export default async function revalidate(id: string) {
  revalidateTag(id);
}

"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { data: session } = useSession();

  return { isLoggedIn, session, isFetching };
}

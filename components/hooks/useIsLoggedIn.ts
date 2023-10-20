"use client";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const sessionFetch = async () => {
      const session: Session | null = await getSession();
      if (session) {
        setSession(session);
        setIsLoggedIn(true);
      }
      setIsFetching(false);
    };
    sessionFetch();
  }, []);

  return { isLoggedIn, session, isFetching };
}

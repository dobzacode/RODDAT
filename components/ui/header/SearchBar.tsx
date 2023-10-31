// SearchBar.js
"use client";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { Community, User } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../Avatar";
import Button from "../button/Button";
import H3 from "../text/H3";
import P from "../text/P";

interface SearchResult {
  community?: (Community & { userCount: number })[];
  user?: User[];
}

const SearchBar: FC = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [searchResult, setSearchResult] = useState<null | SearchResult>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !isSearching ? setIsSearching(true) : "";
    !e.target.value ? setIsSearching(false) : "";
    setSearchResult(null);
    setQuery(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        handleSearch(e.target.value);
      }, 300),
    );
  };

  const handleSearch = async (term: string) => {
    try {
      const res = await fetch(`/api/search?term=${term}&snippet=true`);
      const data = await res.json();
      setSearchResult({ community: data.community, user: data.user });
    } catch (e) {}
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      router.replace(`/search?term=${query}`);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(e.target as Node) &&
      e.target !== document.getElementById("searchbar")
    ) {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (isSearching) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSearching]);

  useEffect(() => {
    setIsSearching(false);
    setQuery("");
    setSearchResult(null);
  }, [pathName, searchParams]);

  return (
    <div className="relative left-0 right-0 z-40 w-fit max-[600px]:hidden laptop:absolute laptop:m-auto">
      <div className="heading brutalism-border relative   z-[70] flex  h-fit gap-extra-small rounded-large border-primary80 bg-neutral1  p-extra-small dark:border-primary1 dark:bg-primary80 ">
        <Button
          onClick={() => {
            query.length > 0 ? router.replace(`/search?term=${query}`) : "";
          }}
          className="dark:text-primary1"
        >
          <Icon path={mdiMagnify} size={2}></Icon>
        </Button>
        <input
          id="searchbar"
          className="body relative z-[70] w-full bg-neutral1 focus:outline-none dark:bg-primary80 dark:text-primary1 laptop-large:w-[600px] "
          type="text"
          placeholder="Search in Roddat"
          value={query}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
      </div>
      <CSSTransition
        in={isSearching}
        timeout={400}
        classNames="fade"
        unmountOnExit
        nodeRef={ref}
      >
        <div
          ref={ref}
          className="brutalism-border absolute top-12 z-50 flex w-full cursor-pointer flex-col gap-small overflow-x-clip rounded-b-sub-large border-primary80 bg-white pb-small  pt-sub-large text-body font-medium text-primary90 dark:border-primary1 dark:bg-primary80  dark:text-primary1 "
        >
          {searchResult?.community && searchResult?.community.length > 0 ? (
            <>
              <div className="flex flex-col gap-small pl-medium">
                <H3 className="body font-bold">Communities</H3>
                {searchResult.community.map((community) => {
                  return (
                    <Link
                      href={`/community/${community.name}`}
                      key={uuidv4()}
                      className="flex items-center gap-extra-small"
                    >
                      <Avatar
                        alt={`${community.name} picture`}
                        src={
                          community.picture
                            ? community.picture
                            : "http://dummyimage.com/912x809.png/dddddd/000000"
                        }
                        size={3}
                        className="mt-[7px] h-[30px] rounded-full"
                      ></Avatar>

                      <div className="flex flex-col items-start">
                        <P>r/{community.name}</P>
                        <P className="caption">
                          Community with {community.userCount}{" "}
                          {community.userCount > 1 ? "members" : "member"}
                        </P>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <hr className="w-full border border-primary80 opacity-20 dark:border-primary10"></hr>
            </>
          ) : null}

          {searchResult?.user && searchResult?.user.length > 0 ? (
            <>
              <div className="flex flex-col gap-small pl-medium">
                <H3 className="body font-bold">User</H3>
                {searchResult.user.map((user) => {
                  return (
                    <Link
                      href={`/user/${user.name}`}
                      key={uuidv4()}
                      className="flex items-center gap-extra-small"
                    >
                      <Avatar
                        alt={`${user.name} picture`}
                        src={
                          user.image
                            ? user.image
                            : "http://dummyimage.com/912x809.png/dddddd/000000"
                        }
                        size={3}
                        className="mt-[7px] h-[30px] rounded-full"
                      ></Avatar>

                      <div className="flex flex-col items-start">
                        <p>u/{user.name}</p>
                        <caption className="caption">User</caption>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <hr className="w-full border border-primary80 opacity-20 dark:border-primary10"></hr>
            </>
          ) : null}

          {query && (
            <Link
              href={`/search?term=${query}`}
              className="flex gap-extra-small pl-medium"
            >
              <Icon path={mdiMagnify} size={1.4}></Icon>
              <H3 type="body">Search for {query.toLowerCase()}</H3>
            </Link>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default SearchBar;

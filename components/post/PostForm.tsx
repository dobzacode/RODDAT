"use client";

import getUserCommunities from "@/utils/utils";
import { handleInputChange } from "@/utils/formUtils/handleInputChange";
import { Community } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import GenericForm from "../ui/form/GenericForm";
import Input from "../ui/form/Input";
import H3 from "../ui/text/H3";

interface PostFormData {
  title: string;
  content: string;
  community: string;
}

interface PostFormProps {
  title: string;
  theme: "primary" | "secondary" | "tertiary" | "neutral";
  setIsSuccess: Function;
}

const regex = /^[a-zA-Z0-9\s]+$/;

const PostForm: FC<PostFormProps> = ({ theme, setIsSuccess, title }) => {
  const [communities, setCommunities] = useState<string[]>([""]);

  const { data: session } = useSession();

  const [searchValue, setSearchValue] = useState<string>("");

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [showCommunity, setShowCommunity] = useState<boolean>(false);
  const [userCommunities, setUserCommunities] = useState<string[] | null>(null);

  const [noCommunity, setNoCommunity] = useState<boolean>(false);

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    community: "",
  });

  const [isNotFound, setIsNotFound] = useState<string | null>(null);

  const [postAlreadyExist, setPostAlreadyExist] = useState<boolean>(false);

  const [isSpecialCharacter, setIsSpecialCharacter] = useState<boolean>(false);

  const communityResearchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCommunity) {
        const communityInput = document.getElementById("community");

        if (
          communityInput &&
          !communityInput.contains(event.target as Node) &&
          event.target !== communityResearchInputRef.current
        ) {
          setShowCommunity(false);
          setSearchValue(formData.community);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCommunity]);

  useEffect(() => {
    const fetchUserCommunities = async () => {
      try {
        const userCommunities = await getUserCommunities();
        setUserCommunities(userCommunities);
        setCommunities(userCommunities);
      } catch (e) {
        e;
      }
    };
    fetchUserCommunities();
  }, []);

  const handleSearch = async () => {
    try {
      const email = session?.user?.email;

      const queryParams = new URLSearchParams();
      queryParams.append("name", searchValue);

      if (email) {
        queryParams.append("email", email);
      }

      const searchResult = await fetch(
        `/api/communities?${queryParams.toString()}`,
      );

      const communities: { communities: Community[]; status: number } =
        await searchResult.json();

      if (communities.status === 404) {
        setFormData((prevData) => ({
          ...prevData,
          community: "",
        }));
        setCommunities([`No community is matching`]);
      }

      const filteredCommunities = communities.communities.filter(
        (community) => {
          if (community.visibility === "PRIVATE") {
            return userCommunities?.some(
              (userCommunity) => userCommunity === community.name,
            );
          }
          return true;
        },
      );

      const communityNames: string[] = filteredCommunities.map(
        (community) => community.name,
      );

      if (communityNames.length === 0) {
        setFormData((prevData) => ({
          ...prevData,
          community: "",
        }));
        return setCommunities([`No community is matching`]);
      }

      setCommunities(communityNames);

      communityNames;

      setFormData((prevData) => ({
        ...prevData,
        community: communityNames[0],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchCommunityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    searchValue;
    setCommunities([""]);
    setFormData((prevData) => ({
      ...prevData,
      community: "",
    }));
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (newSearchValue === "") {
      if (userCommunities !== null) {
        setCommunities(userCommunities);
      }
      return;
    }
    setSearchTimeout(
      setTimeout(() => {
        handleSearch();
      }, 500),
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === "title") {
      if (e.target.value === "") {
        setIsSpecialCharacter(false);
      } else if (!regex.test(e.target.value)) {
        setIsSpecialCharacter(true);
      } else {
        setIsSpecialCharacter(false);
      }
    }
    handleInputChange(e, formData, setFormData);
    if (e.target.type === "select-one") {
      setShowCommunity(false);
      setSearchValue(e.target.value);
    }
    if (formData.community !== "" && noCommunity) {
      setNoCommunity(false);
    }
  };

  const handleSubmit = async () => {
    if (isSpecialCharacter) {
      return;
    }

    if (formData.community === "") {
      return setNoCommunity(true);
    }

    const res = await fetch(`/api/posts?email=${session?.user?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    data;

    if (data.status === 404) {
      setIsNotFound(data.community);
      throw new Error("404");
    }

    if (data.status === 409) {
      setPostAlreadyExist(true);
      throw new Error("409");
    }

    setIsNotFound(null);

    return data;
  };

  return (
    <div className=" rounded-sub-large p-sub-large ">
      <GenericForm
        theme={theme}
        title={title}
        formData={formData}
        onSubmit={handleSubmit}
        setIsSuccess={setIsSuccess}
        isSpecialCharacter={isSpecialCharacter}
      >
        <div className="flex flex-col gap-sub-medium">
          <H3 className="dark:text-primary1" type="sub-heading">
            Community
          </H3>
          <div className="relative flex flex-col justify-between">
            <span onClick={() => !showCommunity && setShowCommunity(true)}>
              <Input
                hiddenLabel={true}
                intent={theme}
                type="search"
                id="communityResearch"
                value={searchValue}
                onChange={handleSearchCommunityChange}
                ref={communityResearchInputRef}
                placeholder="Search a community"
                required
              ></Input>
            </span>
            {isNotFound && (
              <p className="text-error40">{`r/${isNotFound} is not found`}</p>
            )}
            <CSSTransition
              in={showCommunity}
              timeout={500} // Durée de l'animation en millisecondes
              classNames="fade"
              unmountOnExit
            >
              <Input
                loader={
                  <BarLoader
                    className="absolute -right-[45%] "
                    loading={communities[0] === ""}
                  />
                }
                required
                hiddenLabel={true}
                intent={theme}
                type="select"
                id="community"
                placeholder={communities[0] === "" ? "" : "Select a community"}
                value={formData.community}
                onChange={handleChange}
                choices={communities}
              ></Input>
            </CSSTransition>
          </div>
          {noCommunity && (
            <p className="text-error40">You should chose a community</p>
          )}
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 className="dark:text-primary1" type="sub-heading">
            Title
          </H3>
          <Input
            required
            hiddenLabel={true}
            intent={theme}
            type="text"
            className="flex flex-col gap-small"
            id="title"
            value={formData.title}
            onChange={handleChange}
          ></Input>
          {postAlreadyExist && (
            <p className="text-error40">
              A post with this title already exist in the community
            </p>
          )}
          {isSpecialCharacter && (
            <p className="text-error40">
              Special characters are not allowed in post title
            </p>
          )}
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 className="dark:text-primary1" type="sub-heading">
            Content
          </H3>
          <Input
            required
            type="textarea"
            rows={3}
            cols={50}
            hiddenLabel={true}
            intent={theme}
            id="content"
            value={formData.content}
            onChange={handleChange}
          ></Input>
        </div>
      </GenericForm>
    </div>
  );
};

export default PostForm;

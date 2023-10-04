"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../ui/form/Input";
import Label from "../ui/form/Label";

import H1 from "../ui/text/H1";

import Button from "../ui/button/Button";
import H2 from "../ui/text/H2";
import H3 from "../ui/text/H3";
import ColorDiv from "../ui/div/colorDiv";
import P from "../ui/text/P";
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import GenericForm from "../ui/form/GenericForm";
import { handleInputChange } from "@/utils/formUtils/handleInputChange";
import { Community } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { Session } from "next-auth";

interface PostFormData {
  title: string;
  content: string;
  community: string;
}

export default function PostForm({
  theme,
  setIsSuccess,
  title,
}: {
  title: string;
  theme: "primary" | "secondary" | "tertiary" | "neutral";

  setIsSuccess: Function;
}) {
  const [communities, setCommunities] = useState<string[] | null>(null);

  const [searchResults, setSearchResults] = useState<
    Community[] | Community | null
  >(null);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    community: "",
  });

  const [isNotFound, setIsNotFound] = useState<string | null>(null);

  useEffect(() => {
    const getUserCommunities = async () => {
      const session: Session | null = await getSession();
      const data = await fetch(
        `/api/communities?email=${session?.user?.email}`
      );
      const userCommunities: { communities: Community[] } = await data.json();

      const communityNames: string[] = userCommunities.communities.map(
        (community) => community.name
      );

      setCommunities(communityNames);
    };
    getUserCommunities();
  }, []);

  const handleSearch = async (searchValue: string) => {
    if (searchValue.trim() === "") {
      return;
    }

    try {
      const searchResult = await fetch(`/api/communities?name=${searchValue}`);
      const communities = await searchResult.json();
      console.log(communities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommunityInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const searchValue = e.target.value;
    setFormData({ ...formData, community: searchValue });
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        handleSearch(searchValue);
      }, 500)
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    handleInputChange(e, formData, setFormData);
    console.log(formData);
  };

  const handleSubmit = async () => {
    const session: Session | null = await getSession();
    const res = await fetch(`/api/posts?email=${session?.user?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { data } = await res.json();

    if (data.status === 404) {
      setIsNotFound(data.community);
      throw new Error("404");
    }
    setIsNotFound(null);
    return data;
  };

  return (
    <div className=" p-sub-large rounded-sub-large">
      <GenericForm
        theme={theme}
        title={title}
        formData={formData}
        onSubmit={handleSubmit}
        setIsSuccess={setIsSuccess}
      >
        {/* Incluez les champs spécifiques à CommunityForm ici */}
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Community</H3>
          <div className="flex flex-col gap-extra-small justify-between">
            <Input
              required
              hiddenLabel={true}
              color={theme}
              type="text"
              id="community"
              value={formData.community}
              onChange={handleCommunityInputChange} // Utilisez le gestionnaire d'événements spécifique
            ></Input>
            {isNotFound && (
              <p className="text-error40">{`r/${isNotFound} is not found`}</p>
            )}
            {communities && (
              <Input
                required
                hiddenLabel={true}
                color={theme}
                type="select"
                id="community"
                value={formData.community}
                onChange={handleChange}
                choices={communities}
              ></Input>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Title</H3>
          <Input
            required
            hiddenLabel={true}
            color={theme}
            type="text"
            flex="flex flex-col gap-small"
            id="title"
            value={formData.title}
            onChange={handleChange}
          ></Input>
        </div>
        <div className="flex flex-col gap-sub-medium">
          <H3 type="sub-heading">Content</H3>
          <Input
            required
            type="textarea"
            hiddenLabel={true}
            color={theme}
            id="content"
            value={formData.content}
            onChange={handleChange}
          ></Input>
        </div>
      </GenericForm>
    </div>
  );
}
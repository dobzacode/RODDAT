"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import Label from "./Label";

import H1 from "../text/H1";

import Button from "../button/Button";
import H2 from "../text/H2";
import H3 from "../text/H3";
import ColorDiv from "../div/colorDiv";
import P from "../text/P";
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import GenericForm from "./GenericForm";
import { handleInputChange } from "@/utils/formUtils/handleInputChange";

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
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    community: "",
  });

  const [isNotFound, setIsNotFound] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    handleInputChange(e, formData, setFormData);
  };

  const handleSubmit = async () => {
    const session = await getSession();
    const res = await fetch(`/api/posts?email=${session?.user?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.status === 404) {
      setIsNotFound(data.community);
      throw new Error("404");
    }
    setIsNotFound(null);
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
          <Input
            required
            hiddenLabel={true}
            color={theme}
            type="text"
            flex="flex flex-col gap-small"
            id="community"
            value={formData.community}
            onChange={handleChange}
          ></Input>
          {isNotFound && (
            <p className="text-error40">{`r/${isNotFound} is not found`}</p>
          )}
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

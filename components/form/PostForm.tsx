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

interface FormData {
  title: string;
  content: string;
  community: string;
}

export default function PostForm({
  theme,
  setIsOpen,
  setIsSuccess,
  title,
}: {
  title?: string;
  theme: "primary" | "secondary" | "tertiary" | "neutral";
  setIsOpen: Function;
  setIsSuccess: Function;
}) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    community: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isNotFound, setIsNotFound] = useState<string | null>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.stopPropagation;

    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    setIsError(false);
    console.log(formData);
    e.preventDefault();
    try {
      const session = await getSession();
      console.log(session);
      const res = await fetch(`/api/posts?email=${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.status === 404) {
        setIsSubmitting(false);
        console.log(isNotFound);
        return setIsNotFound(data.community);
      }
      setIsNotFound(null);

      if (data.status === 500) {
        setIsSubmitting(false);
        return setIsError(true);
      }

      setIsSubmitting(false);
      setIsSuccess();

      setIsOpen();

      console.log(data);
    } catch (e) {
      setIsError(true);
      setIsSubmitting(false);
    }
  };

  //bg-primary5
  //bg-secondary5
  //bg-tertiary5
  //bg-neutral5
  //text-primary1
  //text-secondary1
  //text-tertiary1
  //text-neutral1
  //border-primary10
  //border-secondary10
  //border-tertiary10
  //border-neutral10

  console.log(isNotFound);

  return (
    <div
      className={`flex flex-col gap-medium items-center text-${theme}80 bg-${theme}1 rounded-extra-small h-auto `}
    >
      <form
        className={`body flex flex-col gap-sub-large`}
        onSubmit={handleSubmit}
      >
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

        {isError && (
          <p className="text-error40">{`Something went wrong, try again`}</p>
        )}
        <div className="flex gap-small mt-small items-center">
          <Button
            type="submit"
            size="small"
            margin=""
            customCSS="brutalism-border border-secondary80"
            onClick={() => setIsOpen()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="small"
            color={theme}
            customCSS="brutalism-border border-secondary80"
            margin=""
          >
            Create post
          </Button>
          <ClipLoader
            loading={isSubmitting}
            className="text-secondary80 ml-small"
          ></ClipLoader>
        </div>
      </form>
    </div>
  );
}

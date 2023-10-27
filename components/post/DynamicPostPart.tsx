"use client";

import { ChangeEvent, useState } from "react";
import Button from "../ui/button/Button";
import Icon from "@mdi/react";
import P from "../ui/text/P";
import {
  mdiCancel,
  mdiCheck,
  mdiCommentOutline,
  mdiPencilOutline,
} from "@mdi/js";
import H2 from "../ui/text/H2";
import Input from "../ui/form/Input";
import { useSession } from "next-auth/react";
import { Post } from "@prisma/client";

export default function DynamicPostPart({
  content: propsContent,
  title: propsTitle,
  commentAmount,
  post_id,
  userId,
  author_id,
}: {
  content: string;
  title: string;
  commentAmount: number;
  post_id: string;
  userId: string | null;
  author_id: string;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [content, setContent] = useState<string>(propsContent);
  const [title, setTitle] = useState<string>(propsTitle);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === "title") {
      setAlreadyExist(false);
      return setTitle(e.target.value);
    }
    setContent(e.target.value);
  };

  const submitEdittedPost = async () => {
    setIsSubmitting(true);

    if (title === propsTitle && content === propsContent) {
      setIsEditing(false);
      return setIsSubmitting(false);
    }
    try {
      const res = await fetch(`/api/posts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          post_id,
          email: session?.user?.email,
        }),
      });

      const data = await res.json();
      if (data.status === 409) {
        console.log(data);
        setAlreadyExist(true);
        return setIsSubmitting(false);
      }
      console.log(data);

      setIsEditing(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className=" flex h-fit flex-col gap-extra-small">
        {!isEditing ? (
          <H2 type="sub-heading">
            {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
          </H2>
        ) : (
          <Input
            placeholder={title}
            required
            disabled={isSubmitting}
            type="textarea"
            hiddenLabel={true}
            className={`dark:border-primary10/[.2] dark:bg-primary80  dark:outline-primary10/[.2] 
                      dark:placeholder:text-primary10/[.4] ${
                        alreadyExist
                          ? "text-error40 dark:text-error40"
                          : "dark:text-primary1"
                      }`}
            id="title"
            value={title as string}
            onChange={handleContentChange}
            rows={1}
            cols={50}
          />
        )}
        {!isEditing ? (
          <P className="break-words">{content}</P>
        ) : (
          <Input
            placeholder={content}
            required
            disabled={isSubmitting}
            type="textarea"
            hiddenLabel={true}
            className={`} dark:border-primary10/[.2] dark:bg-primary80 dark:text-primary1 dark:outline-primary10/[.2] 
                      dark:placeholder:text-primary10/[.4]`}
            id="content"
            value={content as string}
            onChange={handleContentChange}
            rows={3}
            cols={50}
          />
        )}
      </div>
      <div className="flex justify-between dark:text-primary1">
        <div className="flex gap-extra-small">
          <Icon path={mdiCommentOutline} size={1.4}></Icon>
          <P>
            {commentAmount > 1
              ? `${commentAmount} comments`
              : `${commentAmount} comment`}
          </P>
          {!isEditing && userId === author_id ? (
            <Button
              className="flex w-fit items-start gap-extra-small"
              onClick={() => {
                setAlreadyExist(false);
                setIsEditing(!isEditing);
              }}
            >
              <Icon path={mdiPencilOutline} size={1.4}></Icon>
              <P>Edit</P>
            </Button>
          ) : null}
        </div>
        {isEditing && (
          <div className="flex gap-sub-medium">
            <Button
              disabled={isSubmitting}
              className="flex w-fit items-start gap-extra-small"
              onClick={() => submitEdittedPost()}
            >
              <Icon path={mdiCheck} size={1.4}></Icon>
              <P>Validate</P>
            </Button>
            <Button
              disabled={isSubmitting}
              className="flex w-fit items-start gap-extra-small "
              onClick={() => {
                setTitle(propsTitle);
                setContent(propsContent);
                setIsEditing(false);
              }}
            >
              <Icon path={mdiCancel} size={1.4}></Icon>
              <P>Cancel</P>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

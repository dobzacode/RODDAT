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

export default function DynamicPostPart({
  content: propsContent,
  title: propsTitle,
  commentAmount,
}: {
  content: string;
  title: string;
  commentAmount: number;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [content, setContent] = useState<string>(propsContent);
  const [title, setTitle] = useState<string>(propsTitle);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === "title") {
      return setTitle(e.target.value);
    }
    setContent(e.target.value);
  };

  const submitEdittedPost = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/comments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          edittedContent,
          comment_id: comment?.comment_id,
          email: session?.user?.email,
        }),
      });

      const { updatedComment }: { updatedComment: Comment } = await res.json();
      setComment((prevComment) => {
        if (prevComment) {
          return {
            ...prevComment,
            content: updatedComment.content,
            positivity: updatedComment.positivity,
          };
        }
        return null;
      });
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
            className={`} dark:border-primary10/[.2] dark:bg-primary80 dark:text-primary1 dark:outline-primary10/[.2] 
                      dark:placeholder:text-primary10/[.4]`}
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
          {!isEditing && (
            <Button
              className="flex w-fit items-start gap-extra-small"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Icon path={mdiPencilOutline} size={1.4}></Icon>
              <P>Edit</P>
            </Button>
          )}
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

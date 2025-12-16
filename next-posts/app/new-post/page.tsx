"use client";

import { ReactElement, useActionState } from "react";

import { createPost } from "@/actions/create-post.ts";
import { formStateInit } from "@/types/form-state.ts";
import FormButtons from "@/components/new-post/form-buttons.tsx";

const NewPost = (): ReactElement => {
  const [{ valid, stage, title, image, content }, formAction] = useActionState(createPost, formStateInit);
  console.log({ valid, stage, title, image, content });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input className={stage !== 'initial' && !title.valid ? 'error' : undefined} type="text" id="title" name="title" />
        </p>
        {!title.valid && (
          <ul className="form-errors">
            <li>{title.error}</li>
          </ul>
        )}
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            className={stage !== 'initial' && !image.valid ? 'error' : undefined}
            type="file"
            accept="image/*"
            id="image"
            name="image"
          />
        </p>
        {!image.valid && (
          <ul className="form-errors">
            <li>{image.error}</li>
          </ul>
        )}
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea className={stage !== 'initial' && !content.valid ? 'error' : undefined} id="content" name="content" rows={5} />
        </p>
        {!content.valid && (
          <ul className="form-errors">
            <li>{content.error}</li>
          </ul>
        )}
        <p className="form-actions">
          <FormButtons />
        </p>
      </form>
    </>
  );
};

export default NewPost;

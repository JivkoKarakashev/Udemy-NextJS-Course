import { ReactElement } from "react";

import { createPost } from "@/actions/create-post.ts";
import FormButtons from "@/components/new-post/form-buttons";

const NewPost = (): ReactElement => {
  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          <FormButtons />
        </p>
      </form>
    </>
  );
};

export default NewPost;

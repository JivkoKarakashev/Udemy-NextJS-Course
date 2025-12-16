"use client";

import { ReactElement } from "react";
import { useFormStatus } from "react-dom";

const FormButtons = (): ReactElement => {
  const { pending } = useFormStatus();
  const content = (pending)
    ? 'Creating post...'
    : 'Create Post';

  return (
    <>
      <button type="reset">Reset</button>
      <button disabled={pending}>{content}</button>
    </>
  );
};

export default FormButtons;
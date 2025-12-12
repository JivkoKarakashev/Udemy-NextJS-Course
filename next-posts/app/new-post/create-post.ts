"use server";

import { extractFormData } from "@/utils/extract-form-data.ts";

const createPost = async (formData: FormData) => {
    const { image, title, content } = extractFormData(formData);
    console.log({ image, title, content });
};

export {
    createPost
}
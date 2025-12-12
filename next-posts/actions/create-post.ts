"use server";

import { redirect } from "next/navigation";

import { extractFormData } from "@/utils/extract-form-data.ts";
import { uploadImage } from "@/lib/upload-image.ts";
import { insertPost } from "@/lib/api.ts";

async function createPost(formData: FormData) {
    const { image, title, content } = extractFormData(formData);
    // console.log({ image, title, content });
    const { imageUrl, imageFileName, imageFileId } = await uploadImage(image);
    // console.log({ imageUrl, imageFileName, imageFileId });
    await insertPost({ imageUrl, imageFileName, imageFileId, title, content, userId: 1 });
    redirect('/feed');
}

export {
    createPost
}
"use server";

import { redirect } from "next/navigation";

import { extractFormData } from "@/utils/extract-form-data.ts";
import { uploadImage } from "@/lib/upload-image.ts";
import { insertPost } from "@/lib/api.ts";
import { FormState } from "@/types/form-state.ts";

async function createPost(_prevState: FormState, formData: FormData): Promise<FormState> {
    const { valid, stage, image, title, content } = extractFormData(formData);
    // console.log({ image, title, content });
    if (!valid) {
        return {
            valid,
            stage,
            image,
            title,
            content
        };
    }
    const { imageUrl, imageFileName, imageFileId } = await uploadImage(image.value!);
    // console.log({ imageUrl, imageFileName, imageFileId });
    await insertPost({ imageUrl, imageFileName, imageFileId, title: title.value, content: content.value, userId: 1 });
    redirect('/feed');
}

export {
    createPost
}
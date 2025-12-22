"use server";

import { revalidatePath } from "next/cache";

import { updateLikeStatusByPost } from "@/lib/api.ts";
import { UpdateLikeStatusParams } from "@/types/like";

async function togglePostLikeStatus(params: UpdateLikeStatusParams) {
    const { userId, postId } = params;
    await updateLikeStatusByPost({ userId, postId });
    revalidatePath('/', 'layout');
}

export {
    togglePostLikeStatus
}
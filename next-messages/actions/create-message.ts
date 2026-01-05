"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

import { addMessage } from "@/lib/api.ts";
import { NewMessage } from "@/types/message.ts";

async function createMessage(formData: FormData) {
    const text = formData.get('message');
    if (!text) {
        throw new Error('Empty message not allowed!');
    }

    if (typeof text !== 'string') {
        throw new Error('Message must be a string!');
    }

    const message: NewMessage = {
        text
    }
    addMessage(message);
    // revalidatePath('/messages', 'layout');
    updateTag('msgs');
    redirect('/messages');
}

export {
    createMessage
}
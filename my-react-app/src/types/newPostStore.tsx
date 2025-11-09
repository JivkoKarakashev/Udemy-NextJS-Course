import type { PostDate } from "./post.tsx";

type NewPostFieldType = 'title' | 'text' | 'author';

interface NewPostData {
    formState: {
        title: string,
        text: string,
        author: string,
        date: PostDate
    },
    onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    clearForm: () => void
}

export {
    type NewPostData,
    type NewPostFieldType
}
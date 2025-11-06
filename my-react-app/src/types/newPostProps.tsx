import type { NewPostData } from "./postProps.tsx";

type NewPostFieldType = 'title' | 'text' | 'author';

interface NewPostProps {
    onCancel: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void,
    onAddPost: (postData: NewPostData) => void
}

export {
    type NewPostProps,
    type NewPostFieldType
}
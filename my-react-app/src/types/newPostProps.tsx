import type { ChangeEvent } from "react";

type OnFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

type NewPostFieldType = 'title' | 'text' | 'author';

interface NewPostProps {
    onFieldChange: OnFieldChange
}

export {
    type NewPostProps,
    type NewPostFieldType
}
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import type { NewPostFieldType, NewPostData } from "../types/newPostStore.tsx";
import type { AddPostData } from "../types/post.tsx";

const formStateInit: AddPostData = {
    title: '',
    text: '',
    date: {
        iso: '',
        long: ''
    },
    author: ''
}

const store: StateCreator<NewPostData> = (set) => ({
    formState: { ...formStateInit },
    onFieldChange: (e) => {
        const fieldType: NewPostFieldType = e.currentTarget.dataset.field as NewPostFieldType;
        const fieldValue = e.currentTarget.value;
        // console.log(field);
        // console.log(e.target.value);
        set((state) => ({ formState: { ...state.formState, [fieldType]: fieldValue } }));
    },
    clearForm: () => {
        set(() => ({ formState: { ...formStateInit } }));
    }
});

const useNewPostStore =
    import.meta.env.DEV
        ? create(devtools(store, { name: 'NewPostStore' }))
        : create(store);

export {
    useNewPostStore
}
import { FormState, ImageFieldState, TextFieldState, formStateInit, imageFieldStateInit, textFieldStateInit } from "@/types/form-state.ts";

function extractFormData(formData: FormData): FormState {
    let formState: FormState = { ...formStateInit, stage: 'updated' };

    const getString = (key: 'title' | 'content'): TextFieldState => {
        // console.log('getString Invoked!');
        const value = formData.get(key);
        let fieldState: TextFieldState = { ...textFieldStateInit };
        if (typeof value !== 'string') {
            // throw new Error(`${key} must be a string`);
            const error = `${key} must be a string!`;
            return fieldState = { ...fieldState, error };
        } else if (!value) {
            const error = `${key} is required!`;
            return fieldState = { ...fieldState, error };
        } else {
            return { ...fieldState, valid: true, value: value.trim() };
        }
    };

    // const getNumber = (key: string): number => {
    //     const value = Number(formData.get(key));
    //     if (typeof value !== 'number') {
    //         throw new Error(`${key} must be a number`);
    //     }
    //     return value;
    // };

    const getFile = (key: 'image'): ImageFieldState => {
        // console.log('getFile Invoked!');
        const value = formData.get(key);
        let fieldState: ImageFieldState = { ...imageFieldStateInit };
        if (value instanceof File === false) {
            // throw new Error(`${key} must be a File`);
            const error = `${key} must be a File!`;
            return fieldState = { ...fieldState, error };
        } else if (value.size === 0) {
            const error = `A valid ${key} is required!`;
            return fieldState = { ...fieldState, error };
        } else {
            return fieldState = { ...fieldState, valid: true, value };
        }
    };

    formState = { ...formState, title: getString('title') };
    formState = { ...formState, image: getFile('image') };
    formState = { ...formState, content: getString('content') };
    const valid = [formState.content, formState.image, formState.title].every(field => field.valid);

    return formState = { ...formState, valid };
}

export {
    extractFormData
}
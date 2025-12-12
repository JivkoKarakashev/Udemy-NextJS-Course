import { NewPostFormData } from "@/types/post.ts";

function extractFormData(formData: FormData): NewPostFormData {
    const getString = (key: string): string => {
        const value = formData.get(key);
        if (typeof value !== 'string') {
            throw new Error(`${key} must be a string`);
        }
        return value.trim();
    };

    // const getNumber = (key: string): number => {
    //     const value = Number(formData.get(key));
    //     if (typeof value !== 'number') {
    //         throw new Error(`${key} must be a number`);
    //     }
    //     return value;
    // };

    const getFile = (key: string): File => {
        const value = formData.get(key);
        if (value instanceof File === false) {
            throw new Error(`${key} must be a File`);
        }
        return value;
    };

    return {
        image: getFile('image'),
        title: getString('title'),
        content: getString('content')
    };
}

export {
    extractFormData
}
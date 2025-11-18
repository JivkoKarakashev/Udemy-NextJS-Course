import { MealShare } from "../types/meal.ts";

function extractFormData(formData: FormData): MealShare {
    const getString = (key: string): string => {
        const value = formData.get(key);
        if (typeof value !== 'string') {
            throw new Error(`${key} must be a string`);
        }
        return value.trim();
    };

    const getFile = (key: string): File => {
        const value = formData.get(key);
        if (value instanceof File === false) {
            throw new Error(`${key} must be a File`);
        }
        return value;
    };

    return {
        get slug() {
            return this.title.toLowerCase().split(' ').join('-');
        },
        title: getString('title'),
        image: getFile('image'),
        summary: getString('summary'),
        instructions: getString('instructions'),
        creator: getString('creator'),
        creator_email: getString('creator_email')
    }
}

export {
    extractFormData
}
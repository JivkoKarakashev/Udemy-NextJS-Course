'use server';

import { PersistState } from "../types/shareMeal-formState.ts";
import { extractFormData } from "../utils/extractShareMealData.ts";
import { validateForm } from "../utils/validateShareMealForm.ts";
import { createMeal } from "./api.ts";

const shareMeal = async (formData: FormData): Promise<PersistState> => {
    // console.log(nextState);
    const meal = extractFormData(formData);
    // console.log(meal);
    // const { slug, title, image, summary, instructions, creator, creator_email } = meal;
    // console.log(slug, title, image, summary, instructions, creator, creator_email);
    const { validState, formState } = validateForm(meal);
    // console.log({ validState, formState });
    if (validState) {
        await createMeal(meal);
    }
    return {
        validState,
        formState
    };
};

export {
    shareMeal
}
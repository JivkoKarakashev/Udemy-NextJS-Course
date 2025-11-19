'use server';

import { redirect } from "next/navigation";

import { extractFormData } from "../utils/extractShareMealData.ts";
import { createMeal } from "./api.ts";
import { ShareMealFormState } from "../types/shareMeal-formState.ts";
import { validateForm } from "../utils/validateShareMealForm.ts";

const onShareMeal = async (_prevState: ShareMealFormState, formData: FormData) => {
    // console.log(formData);
    const meal = extractFormData(formData);
    // console.log(meal);
    // const { slug, title, image, summary, instructions, creator, creator_email } = meal;
    // console.log(slug, title, image, summary, instructions, creator, creator_email);
    const formState = validateForm(meal);
    const invalidForm: Boolean = Object.values(formState).some((props) => props.valid === false);
    if (invalidForm) {
        console.log(formState);
        return formState;
    }
    console.log('NOT HERE!!!');
    await createMeal(meal);
    redirect('/meals');
};

export {
    onShareMeal
}
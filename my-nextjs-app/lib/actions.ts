'use server';

import { redirect } from "next/navigation";

import { extractFormData } from "../utils/extractShareMealData.ts";
import { createMeal } from "./api.ts";

const onShareMeal = async (formData: FormData) => {
    // console.log(formData);
    const meal = extractFormData(formData);
    console.log(meal);
    const { slug, title, image, summary, instructions, creator, creator_email } = meal;
    // console.log(slug, title, image, summary, instructions, creator, creator_email);
    await createMeal(meal);
    redirect('/meals');
};

export {
    onShareMeal
}
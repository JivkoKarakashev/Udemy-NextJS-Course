'use server';

import { redirect } from "next/navigation";

import { FormDataEntries } from "@/types/form-data-entries.ts";
import { FormState } from "@/types/form-state";
import { formValidator } from "@/utils/form-validator";

const register = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const { email, password } = Object.fromEntries(formData) as unknown as FormDataEntries;
    // console.log(email, password);
    const formState = formValidator(email.trim(), password.trim());
    if (formState.valid === false) {
        return formState;
    }
    redirect('/training');
};

export {
    register
}
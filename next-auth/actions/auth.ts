'use server';

import { FormDataEntries } from "@/types/form-data-entries.ts";
import { FormError, formValidator } from "@/utils/form-validator";

const signup = async (formData: FormData) => {
    const { email, password } = Object.fromEntries(formData) as unknown as FormDataEntries;
    // console.log(email, password);
    const formState = formValidator(email.trim(), password.trim());
    if (formState instanceof FormError ) {
        // console.log(`Form is valid: ${formState.valid}`);
        // console.log(`Email error: ${formState.email}`);
        // console.log(`Pass error: ${formState.password}`);
    } else {
        // console.log(formState);
    }
};

export {
    signup
}
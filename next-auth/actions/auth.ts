'use server';

import { redirect } from "next/navigation";
import { SqliteError } from "better-sqlite3";

import { FormDataEntries } from "@/types/form-data-entries.ts";
import { FormState } from "@/types/form-state.ts";
import { formValidator } from "@/utils/form-validator.ts";
import { createUser } from "@/lib/api.ts";
import { RegisterUser } from "@/types/user.ts";
import { hashPassword } from "@/utils/hash.ts";
import { createSession } from "@/lib/sessions.ts";
import { createCookie } from "@/utils/create-cookie";

const register = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const { email, password } = Object.fromEntries(formData) as unknown as FormDataEntries;
    // console.log(email, password);
    let formState = formValidator(email.trim(), password.trim());
    if (formState.valid === false) {
        return formState;
    }

    const hash = await hashPassword(formState.password.value);

    const regUser: RegisterUser = {
        email: formState.email.value,
        hash
    };

    try {
        const userId = createUser(regUser);
        const { id, expiresAt } = createSession(userId);
        await createCookie(id, expiresAt);
        redirect('/training');
    } catch (error) {
        if (error instanceof SqliteError) {
            const { code } = error;
            // console.log(`Code: ${code}`);
            if (code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return formState = {
                    ...formState,
                    valid: false,
                    email: {
                        ...formState.email,
                        valid: false,
                        error: 'An account with the same email already exists!'
                    }
                };
            }
        }
        throw error;
    }
};

export {
    register
}
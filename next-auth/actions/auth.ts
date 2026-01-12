'use server';

import { redirect } from "next/navigation";
import { SqliteError } from "better-sqlite3";

import { FormDataEntries } from "@/types/form-data-entries.ts";
import { FormState } from "@/types/form-state.ts";
import { formValidator } from "@/utils/form-validator.ts";
import { createUser, getUserByEmail } from "@/lib/api.ts";
import { RegisterUser } from "@/types/user.ts";
import { hashPassword, verifyPassword } from "@/utils/hash.ts";
import { createSession } from "@/lib/sessions.ts";
import { createCookie } from "@/utils/create-cookie.ts";
import { AuthMode } from "@/types/home-page-params.ts";

const register = async (authmode: AuthMode, _prevState: FormState, formData: FormData): Promise<FormState> => {
    const { email, password } = Object.fromEntries(formData) as unknown as FormDataEntries;
    // console.log(email, password);
    let formState = formValidator(authmode, email.trim(), password.trim());
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

const login = async (authmode: AuthMode, _prevState: FormState, formData: FormData): Promise<FormState> => {
    const { email, password } = Object.fromEntries(formData) as unknown as FormDataEntries;
    const authUser = getUserByEmail(email);
    const isValidPass = await verifyPassword(password.trim(), authUser?.password ?? '');
    const passArg = isValidPass ? authUser?.password ?? '' : '';
    const formState = formValidator(authmode, authUser?.email ?? '', passArg);

    if (!formState.valid || !authUser || !isValidPass) {
        return formState;
    }

    const { id, expiresAt } = createSession(authUser.id);
    await createCookie(id, expiresAt);
    redirect('/training');
};

async function auth(authmode: AuthMode, prevState: FormState, formData: FormData) {
    // console.log(`Auth mode:${authmode}`);
    if (authmode === 'login') {
        return login(authmode, prevState, formData);
    }
    return register(authmode, prevState, formData);
}

export {
    auth
}
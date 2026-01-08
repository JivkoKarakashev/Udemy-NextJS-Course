import { FormDataEntries } from "./form-data-entries.ts";

interface FieldState {
    valid: boolean,
    value: string,
    error: string
}

interface FormState extends Omit<FormDataEntries, 'email' | 'password'> {
    valid: boolean,
    stage: 'initial' | 'updated',
    email: FieldState,
    password: FieldState
}

interface EmailError {
    required: string,
    invalid: string
}

type PassError = EmailError;

const emailError: EmailError = {
    required: 'Email is required!',
    invalid: 'A valid email is required!'
}

const fieldStateInit: FieldState = {
    valid: false,
    value: '',
    error: ''
}

const formStateInit: FormState = {
    email: { ...fieldStateInit },
    password: { ...fieldStateInit },
    stage: 'initial',
    valid: false
}

const passError: PassError = {
    required: 'Password is required!',
    invalid: 'Password must be at least 4 characters long!'
}

export {
    type FormState,
    formStateInit,
    emailError,
    passError
}
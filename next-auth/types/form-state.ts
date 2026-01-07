import { FormDataEntries } from "./form-data-entries.ts";

interface FormState extends FormDataEntries {
    valid: boolean
}

interface EmailError {
    required: string,
    invalid: string
}

type PassError = EmailError;

interface ValidEmail extends Omit<EmailError, 'required' | 'invalid'> {
    valid: ''
}

type ValidPass = ValidEmail;

const emailError: EmailError = {
    required: 'Email is required!',
    invalid: 'A valid email is required!'
}

const validEmail: ValidEmail = { valid: '' };
const validPass: ValidPass = { valid: '' };

const passError: PassError = {
    required: 'Password is required!',
    invalid: 'Password must be at least 4 characters long!'
}

export {
    type FormState,
    emailError,
    validEmail,
    passError,
    validPass
}
import { FormState, emailError, passError, validEmail, validPass } from "@/types/form-state.ts";

const formValidator = (email: string, password: string): FormState | FormError => {
    const regExp = new RegExp('^[a-z0-9]+([._-]?[a-z0-9]+)+@[a-z0-9]+([._-]?[a-z0-9]+)+\\.[a-z]{2,3}$');

    const isEmailValid = regExp.test(email);
    const isPassValid = password && password.length > 3;

    if (!isEmailValid || !isPassValid) {
        if (!isEmailValid && isPassValid) {
            if (!email) {
                return new FormError(emailError.required, validPass.valid);
            } else {
                return new FormError(emailError.invalid, validPass.valid);
            }
        } else if (isEmailValid && !isPassValid) {
            if (!password) {
                return new FormError(validEmail.valid, passError.required);
            } else {
                return new FormError(validEmail.valid, passError.invalid);
            }
        } else {
            if (!email && !password) {
                return new FormError(emailError.required, passError.required);
            } else if (email && !password) {
                return new FormError(emailError.invalid, passError.required);
            } else if (!email && password) {
                return new FormError(emailError.required, passError.invalid);
            } else {
                return new FormError(emailError.invalid, passError.invalid);
            }
        }
    }

    return {
        email: '',
        password: '',
        valid: true
    }
};


class FormError implements FormState {
    email: string;
    password: string;
    valid: boolean;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.valid = false;
    }
}

export {
    formValidator,
    FormError
}
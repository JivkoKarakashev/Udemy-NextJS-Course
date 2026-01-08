import { FormState, emailError, formStateInit, passError } from "@/types/form-state.ts";

const formValidator = (email: string, password: string): FormState => {
    const regExp = new RegExp('^[a-z0-9]+([._-]?[a-z0-9]+)+@[a-z0-9]+([._-]?[a-z0-9]+)+\\.[a-z]{2,3}$');

    const isEmailValid = regExp.test(email);
    const isPassValid = !!password && password.length > 3;
    let formState: FormState = {
        ...formStateInit,
        stage: 'updated',
        email: {
            ...formStateInit.email,
            value: email
        },
        password: {
            ...formStateInit.password,
            value: password
        }
    };

    if (!isEmailValid || !isPassValid) {
        if (!isEmailValid && isPassValid) {
            formState = {
                ...formState,
                password: {
                    ...formState.password,
                    valid: true
                }
            }
            if (!email) {
                formState = {
                    ...formState,
                    email: {
                        ...formState.email,
                        error: emailError.required
                    }
                }
            } else {
                formState = {
                    ...formState,
                    email: {
                        ...formState.email,
                        error: emailError.invalid
                    }
                }
            }
        } else if (isEmailValid && !isPassValid) {
            formState = {
                ...formState,
                email: {
                    ...formState.email,
                    valid: true
                }
            }
            if (!password) {
                formState = {
                    ...formState,
                    password: {
                        ...formState.password,
                        error: passError.required
                    }
                };
            } else {
                formState = {
                    ...formState,
                    password: {
                        ...formState.password,
                        error: passError.invalid
                    }
                };
            }
        } else {
            if (!email && !password) {
                formState = {
                    ...formState,
                    email: {
                        ...formState.email,
                        error: emailError.required
                    },
                    password: {
                        ...formState.password,
                        error: passError.required
                    }
                };
            } else if (email && !password) {
                formState = {
                    ...formState,
                    email: {
                        ...formState.email,
                        error: emailError.invalid
                    },
                    password: {
                        ...formState.password,
                        error: passError.required
                    }
                }
            } else if (!email && password) {
                formState = {
                    ...formState,
                    email: {
                        ...formState.email,
                        error: emailError.required
                    },
                    password: {
                        ...formState.password,
                        error: passError.invalid
                    }
                }
            } else {
                formState = {
                    ...formState,
                    email: {
                        ...formState.email,
                        error: emailError.invalid
                    },
                    password: {
                        ...formState.password,
                        error: passError.invalid
                    }
                }
            }
        }
    }
    
    return formState = {
        ...formState,
        valid: isEmailValid && isPassValid,
        email: {
            ...formState.email,
            valid: isEmailValid
        },
        password: {
            ...formState.password,
            valid: isPassValid
        }
    };
};

export {
    formValidator
}
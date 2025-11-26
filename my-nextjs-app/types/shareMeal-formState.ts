interface FieldState {
    valid: boolean,
    value: string,
    error_message: string
}

interface FormState {
    title: FieldState,
    image: Omit<FieldState, 'value'>,
    summary: FieldState,
    instructions: FieldState,
    creator: FieldState,
    creator_email: FieldState
}

interface PersistState {
    validState: 'initial' | boolean,
    formState: FormState
}

type FieldType = keyof FormState;

const fieldStateInit: FieldState = {
    valid: true,
    value: '',
    error_message: ''
}

const formStateInit: FormState = {
    title: { ...fieldStateInit },
    image: { ...fieldStateInit },
    summary: { ...fieldStateInit },
    instructions: { ...fieldStateInit },
    creator: { ...fieldStateInit },
    creator_email: { ...fieldStateInit }
}

export {
    type FieldState,
    type FormState,
    type FieldType,
    type PersistState,
    formStateInit
}
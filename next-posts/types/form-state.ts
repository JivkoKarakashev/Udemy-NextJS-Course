type FormStage = 'initial' | 'updated';

interface TextFieldState {
    valid: boolean,
    value: string,
    error: string
}

interface ImageFieldState extends Omit<TextFieldState, 'value'> {
    value: File | null
}

interface FormState {
    valid: boolean,
    stage: FormStage,
    title: TextFieldState,
    image: ImageFieldState,
    content: TextFieldState,
}

const textFieldStateInit: TextFieldState = {
    valid: false,
    value: '',
    error: ''
}

const imageFieldStateInit: ImageFieldState = {
    valid: false,
    value: null,
    error: ''
}

const formStateInit: FormState = {
    valid: false,
    stage: 'initial',
    title: { ...textFieldStateInit },
    image: { ...imageFieldStateInit },
    content: { ...textFieldStateInit }
}

export {
    type FormStage,
    type TextFieldState,
    type ImageFieldState,
    type FormState,
    textFieldStateInit,
    imageFieldStateInit,
    formStateInit
}
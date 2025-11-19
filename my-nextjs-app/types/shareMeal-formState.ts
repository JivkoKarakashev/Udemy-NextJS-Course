type ShareMealFieldName = 'title' | 'image' | 'summary' | 'instructions' | 'creator' | 'creator_email';

interface ShareMealFieldState {
    valid: boolean,
    error_message: string
}

type ShareMealFormState = {
    [K in ShareMealFieldName]: ShareMealFieldState
}

const shareMealFormStateInit: ShareMealFormState = {
    title: {
        valid: true,
        error_message: ''
    },
    image: {
        valid: true,
        error_message: ''
    },
    summary: {
        valid: true,
        error_message: '',
    },
    instructions: {
        valid: true,
        error_message: ''
    },
    creator: {
        valid: true,
        error_message: ''
    },
    creator_email: {
        valid: true,
        error_message: ''
    }
}

export {
    type ShareMealFieldName,
    type ShareMealFieldState,
    type ShareMealFormState,
    shareMealFormStateInit
}
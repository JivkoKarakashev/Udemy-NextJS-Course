import { MealShare } from "../types/meal.ts";
import { ShareMealFormState, shareMealFormStateInit } from "../types/shareMeal-formState.ts";

function validateForm(meal: MealShare): ShareMealFormState {
    const formState: ShareMealFormState = { ...shareMealFormStateInit };
    const { title, image, summary, instructions, creator, creator_email } = meal;
    console.log(formState);

    // console.log({ title, image, summary, instructions, creator, creator_email });
    (() => {
        if (!title) {
            formState.title = { ...formState.title, valid: false, error_message: 'Title is required!' };
        }
        if (title && title.length < 5) {
            formState.title = { ...formState.title, valid: false, error_message: 'The title length must be at least 5 characters long!' };
        }
    });

    ((): void => {
        if (image.size === 0) {
            formState.image = { ...formState.image, valid: false, error_message: 'Meal image attach is required!' };
        }
    })();

    ((): void => {
        if (!summary) {
            formState.summary = { ...formState.summary, valid: false, error_message: 'Short summary is required!' };
        }
        if (summary && summary.length < 10) {
            formState.summary = { ...formState.summary, valid: false, error_message: 'The short summary length must be at least 10 characters long!' };
        }
    })();

    (() => {
        if (!instructions) {
            formState.instructions = { ...formState.instructions, valid: false, error_message: 'Instructions are required!' };
        }
        if (instructions && summary.length < 50) {
            formState.instructions = { ...formState.instructions, valid: false, error_message: 'The instructions length must be at least 50 characters long!' };
        }
    })();

    (() => {
        if (!creator) {
            formState.creator = { ...formState.creator, valid: false, error_message: 'Your name is required!' };
        }
        if (creator && creator.length < 3) {
            formState.creator = { ...formState.creator, valid: false, error_message: 'The name length must be at least 3 characters long!' };
        }
    })();

    (() => {
        const validEmail: RegExp = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        if (!creator_email) {
            formState.creator_email = { ...formState.creator_email, valid: false, error_message: 'An email address is required!' };
        }
        if (creator_email && validEmail.test(creator_email) === false) {
            formState.creator_email = { ...formState.creator_email, valid: false, error_message: 'A valid email address is required!' };
        }
    })();

    // const isNotValid = Object.values(formState).some((props) => props.valid === false);

    // if (isNotValid) {
    //     throw new Error('Ivalid Share Meal Form!');
    // }

    return formState;
};

export {
    validateForm
}
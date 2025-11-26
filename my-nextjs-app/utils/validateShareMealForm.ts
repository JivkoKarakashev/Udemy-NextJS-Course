import { MealShare } from "../types/meal.ts";
import { FieldState, FormState, PersistState, formStateInit } from "../types/shareMeal-formState.ts";

function validateForm(meal: MealShare): PersistState {
    const formState: FormState = { ...formStateInit };
    const { title, image, summary, instructions, creator, creator_email } = meal;
    // console.log(formState);
    // console.log({ title, image, summary, instructions, creator, creator_email });
    // console.log(image);
    ((): void => {
        formState.title = { ...formState.title, value: title };
        if (!title || title.length < 5) {
            formState.title = {
                ...formState.title,
                valid: false,
                error_message: !title
                    ? 'Title is required!'
                    : 'The title length must be at least 5 characters long!'
            };
        }
    })();

    ((): void => {
        formState.image = { ...formState.image };
        if (image.size === 0) {
            formState.image = {
                ...formState.image,
                valid: false,
                error_message: 'Meal image attach is required!'
            };
        }
    })();

    ((): void => {
        formState.summary = { ...formState.summary, value: summary };
        if (!summary || summary.length < 10) {
            formState.summary = {
                ...formState.summary,
                valid: false,
                error_message: !summary
                    ? 'Short summary is required!'
                    : 'The short summary length must be at least 10 characters long!'
            }
        }
    })();

    ((): void => {
        formState.instructions = { ...formState.instructions, value: instructions };
        if (!instructions || instructions.length < 10) {
            formState.instructions = {
                ...formState.instructions,
                valid: false,
                error_message: !instructions
                    ? 'Instructions are required!'
                    : 'The instructions length must be at least 10 characters long!'
            }
        }
    })();

    ((): void => {
        formState.creator = { ...formState.creator, value: creator };
        if (!creator || creator.length < 3) {
            formState.creator = {
                ...formState.creator,
                valid: false,
                error_message: !creator
                    ? 'Your name is required!'
                    : 'The name length must be at least 3 characters long!'
            }
        }
    })();

    ((): void => {
        const invalidEmail: boolean = (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(creator_email)) === false;
        formState.creator_email = { ...formState.creator_email, value: creator_email };
        if (!creator_email || invalidEmail) {
            formState.creator_email = {
                ...formState.creator_email,
                valid: false,
                error_message: !creator_email
                    ? 'A valid email address is required!'
                    : 'Invalid email!'
            }
        }
    })();

    const validState = Object.values(formState).filter((v: boolean | FieldState) => typeof v !== "boolean").every((v: FieldState) => v.valid);

    return {
        validState,
        formState
    };
};

export {
    validateForm
}
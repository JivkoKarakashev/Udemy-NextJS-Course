interface Meal {
    id: number,
    slug: string,
    title: string,
    image: string,
    summary: string,
    instructions: string,
    creator: string,
    creator_email: string
}

type MealInsert = Omit<Meal, 'id'>;

export {
    type Meal,
    type MealInsert
}
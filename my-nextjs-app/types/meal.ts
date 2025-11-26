interface DBMeal {
    id: number,
    slug: string,
    title: string,
    image: string,
    summary: string,
    instructions: string,
    creator: string,
    creator_email: string
}

type MealInsert = Omit<DBMeal, 'id'>;

interface MealShare extends Omit<MealInsert, 'image'> {
    image: File
}

interface ImagePersistState {
    imgUrl: string | null,
    imgFile: File | null
}


export {
    type DBMeal,
    type MealInsert,
    type MealShare,
    type ImagePersistState
}
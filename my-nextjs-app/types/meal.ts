interface DBMeal {
    id: number,
    slug: string,
    title: string,
    imageUrl: string,
    imageFileName: string,
    imageFileId: string,
    summary: string,
    instructions: string,
    creator: string,
    creator_email: string
}

type MealInsert = Omit<DBMeal, 'id'>;

interface MealShare extends Omit<MealInsert, 'imageUrl' | 'imageFileName' | 'imageFileId'> {
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
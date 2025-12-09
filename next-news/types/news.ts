interface News {
    id: string,
    slug: string,
    title: string,
    imageUrl: string,
    date: string,
    content: string,
}

type NewsInsert = Omit<News, 'id'>;

export {
    type News,
    type NewsInsert
}
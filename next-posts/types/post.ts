interface Post {
    id: number,
    imageUrl: string,
    title: string,
    content: string,
    createdAt: string,
    userId: number,
}

interface GetPost extends Post {
    userFirstName: string;
    userLastName: string;
    likes: number;
    isLiked: 0 | 1;
}

type NewPost = Omit<Post, 'id' | 'createdAt'>

interface NewPostFormData extends Omit<NewPost, 'imageUrl' | 'userId'> {
    image: File
}

export {
    type Post,
    type GetPost,
    type NewPost,
    type NewPostFormData
}
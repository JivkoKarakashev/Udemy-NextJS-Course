interface Like {
    userId: number,
    postId: number,
}

type UpdateLikeStatusParams = Like;

export {
    type Like,
    type UpdateLikeStatusParams
}
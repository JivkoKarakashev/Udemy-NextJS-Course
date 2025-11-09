type PostDate = Record<'iso' | 'long', string>;

interface AddPostData {
    title: string,
    text: string,
    date: PostDate,
    author: string
}

interface DBPost extends AddPostData {
    _id: string
};

interface CreatePostResponse {
    message: string,
    post: DBPost
}

// const postsInitState: PostProps[] = [
//     {
//         "_id": "aee28df9-46e4-4efa-8071-2c69b64b805e",
//         "title": "React.js",
//         "text": "React.js is Awesome!",
//         "date": {
//             "iso": "2025-11-04",
//             "long": "November 4, 2025"
//         },
//         "author": "John"
//     },
//     {
//         "_id": "6220a1fe-f461-41a4-b4bf-5719550c6a3d",
//         "title": "Next.js",
//         "text": "Next.js is Awesome!",
//         "date": {
//             "iso": "2025-11-04",
//             "long": "November 4, 2025"
//         },
//         "author": "Peter"
//     }
// ];

export {
    type PostDate,
    type AddPostData,
    type DBPost,
    type CreatePostResponse
}
type PostDate = Record<'iso' | 'long', string>;

interface PostProps {
    title: string,
    text: string,
    date: PostDate,
    author: string
}

interface NewPostData extends PostProps {};

const postsInitState: PostProps[] = [
    {
        title: 'React.js',
        text: 'React.js is Awesome!',
        date: {
            iso: '2025-11-04',
            long: 'November 4, 2025'
        },
        author: 'John'
    },
    {
        title: 'Next.js',
        text: 'Next.js is Awesome!',
        date: {
            iso: '2025-11-04',
            long: 'November 4, 2025'
        },
        author: 'Peter'
    }
];

export {
    type PostDate,
    type PostProps,
    type NewPostData,
    postsInitState
}
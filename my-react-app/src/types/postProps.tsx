type PostDate = Record<'iso' | 'long', string>;

interface PostProps {
    title: string,
    text: string,
    date: PostDate,
    author: string
}

export {
    type PostDate,
    type PostProps
}
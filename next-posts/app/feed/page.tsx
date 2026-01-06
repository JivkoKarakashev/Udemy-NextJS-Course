import { ReactElement, Suspense } from 'react';
import { Metadata } from 'next';

import Posts from '@/components/posts.tsx';
import { getPosts } from '@/lib/api.ts';
import Loader from '@/components/loader/loading.tsx';

export const generateMetadata = async (): Promise<Metadata> => {
  const posts = await getPosts();
  const postsNumber = posts.length;

  return {
    title: `Browse all our ${postsNumber} posts.`,
    description: 'Browse all our posts.'
  };
};

const FeedPosts = async (): Promise<ReactElement> => {
  const posts = await getPosts();
  return (
    <Posts posts={posts} />
  );
};

const Feed = (): ReactElement => {
  return (
    <>
      <h1>All posts by all users</h1>
      <Suspense fallback={<Loader content='Loading feed...' />}>
        <FeedPosts />
      </Suspense>
    </>
  );
};

export default Feed;
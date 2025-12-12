import { ReactElement, Suspense } from 'react';

import Posts from '@/components/posts.tsx';
import { getPosts } from '@/lib/api.ts';
import Loader from '@/components/loader/loading.tsx';

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
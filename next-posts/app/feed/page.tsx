import { ReactElement } from 'react';

import Posts from '@/components/posts.tsx';
import { getPosts } from '@/lib/api.ts';

const Feed = async (): Promise<ReactElement> => {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
};

export default Feed;
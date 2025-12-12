import { ReactElement } from 'react';

import { GetPost } from '@/types/post.ts';
import { formatTimeStamp } from '@/utils/format.ts';
import LikeButton from './like-icon.tsx';

const Post = ({ post }: { post: GetPost }) => {
  const { imageUrl, title, userFirstName, createdAt, content } = post;
  const formatedTimeStamp = formatTimeStamp(createdAt);

  return (
    <article className="post">
      <div className="post-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{title}</h2>
            <p>
              Shared by {userFirstName} on{' '}
              <time dateTime={createdAt}>
                {formatedTimeStamp}
              </time>
            </p>
          </div>
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{content}</p>
      </div>
    </article>
  );
};

const Posts = ({ posts }: { posts: GetPost[] }): ReactElement => {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map(post => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};

export default Posts;
"use client";

import { ReactElement, useOptimistic } from 'react';
import Image from 'next/image';

import { GetPost } from '@/types/post.ts';
import { formatTimeStamp } from '@/utils/format-time-stamp.ts';
import LikeButton from './like-icon.tsx';
import { togglePostLikeStatus } from '@/actions/toggle-post-like-status.ts';

const Post = ({ post, action }: { post: GetPost, action: () => void }) => {
  const { imageUrl, title, userFirstName, createdAt, content, isLiked } = post;
  const formatedTimeStamp = formatTimeStamp(createdAt);

  return (
    <article className="post">
      <div className="img-wrapper">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='max-width: 128px'
        />
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
          <div className={Boolean(isLiked) ? 'liked' : undefined}>
            <form action={action}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{content}</p>
      </div>
    </article>
  );
};

const Posts = ({ posts }: { posts: GetPost[] }): ReactElement => {

  const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts, optimisticPostsReducer);

  function optimisticPostsReducer(prevState: GetPost[], postId: number) {
    const idx = prevState.findIndex(post => post.id === postId);
    if (idx === -1) {
      return prevState;
    }
    const { likes, isLiked } = prevState[idx];
    const newLikes = isLiked ? likes - 1 : likes + 1;
    const newIsLiked = isLiked ? 0 : 1;
    const updatedPost: GetPost = { ...prevState[idx], likes: newLikes, isLiked: newIsLiked };
    const newPosts = [...prevState];
    newPosts[idx] = { ...updatedPost };
    return newPosts;
  }

  const updatePostById = async (postId: number): Promise<void> => {
    setOptimisticPosts(postId);
    try {
      await togglePostLikeStatus({ userId: 2, postId });
    } catch (err) {
      console.warn('Post liking failed, like status was reverted!');
      setOptimisticPosts(postId);
      const { message } = err as Error;
      throw new Error(message);
    }
  };

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map(post => (
        <li key={post.id}>
          <Post post={post} action={() => updatePostById(post.id)} />
        </li>
      ))}
    </ul>
  );
};

export default Posts;
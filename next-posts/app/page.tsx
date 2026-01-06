import { ReactElement, Suspense } from "react";
import { Metadata } from "next";

import { getPosts } from "@/lib/api.ts";
import Posts from "@/components/posts.tsx";
import Loader from "@/components/loader/loading.tsx";

export const metadata: Metadata = {
  title: 'Latest Posts',
  description: 'Browse our latest posts!'
};

const LatestPosts = async (): Promise<ReactElement> => {
  const latestPosts = await getPosts(2);
  return (
    <Posts posts={latestPosts} />
  );
};

const Home = (): ReactElement => {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here&#39;s what you might&#39;ve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<Loader content="Loading recent posts..." />}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
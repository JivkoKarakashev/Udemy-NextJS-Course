import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import styles from "./Posts.module.scss";
import PostsList from "../components/Posts-list.tsx";

const Posts = (): ReactElement => {
  return (
    <>
      <Outlet />
      <main className={styles.main}>
        <PostsList />
      </main>
    </>
  );
}

export default Posts

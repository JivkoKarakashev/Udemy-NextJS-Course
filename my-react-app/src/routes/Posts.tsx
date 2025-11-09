import { Outlet } from "react-router-dom";

import styles from "./Posts.module.scss";
import PostsList from "../components/Posts-list.tsx";

const Posts = () => {
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

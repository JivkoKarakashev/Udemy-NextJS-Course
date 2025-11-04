import styles from "./App.module.scss";
import PostsList from "./components/Posts-list";

function App() {

  return (
    <main className={styles.main}>
      <PostsList />
    </main>
  );
}

export default App

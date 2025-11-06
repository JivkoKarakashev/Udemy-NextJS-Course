import { useState } from "react";

import styles from "./App.module.scss";
import Header from "./components/Header.tsx";
import PostsList from "./components/Posts-list.tsx";

function App() {
  const [modalOpenState, setModalOpenState] = useState(false);

  const toggleModalHandler = (_e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    // console.log(e);
    setModalOpenState(!modalOpenState);
  }

  return (
    <>
      <Header modalIsOpen onCreatePost={toggleModalHandler} />
      <main className={styles.main}>
        <PostsList isOpen={modalOpenState} onCloseModal={toggleModalHandler} />
      </main>
    </>
  );
}

export default App

import { ReactElement } from 'react';
import Link from 'next/link';

import styles from './page.module.scss';
import Slideshow from '../components/images/slideshow.tsx';

export default function Home(): ReactElement {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.slideshow}>
          <Slideshow />
        </div>
        <div>
          <div className={styles.hero}>
            <h1>NextLevel Food for nextLevel Foodies</h1>
            <p>Test & share food</p>
          </div>
          <div className={styles.actions}>
            <Link href='/community'>Join the Community</Link>
            <Link href='/meals'>Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}

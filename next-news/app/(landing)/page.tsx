import Link from 'next/link';
import Image from 'next/image';

import styles from './page.module.scss';

import logo from '@/assets/logo.jpg';

export default function Home() {
  return (
    <div id="home" className={styles.home}>
      <div className={styles["img-wrapper"]}>
        <Image
          src={logo.src}
          alt="A newspaper"
          fill
          sizes="(min-width: 768px) 100vw, (min-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h1>A News Site For The Next Generation</h1>
      <p>
        Next News is here to deliver you all the latest news - concise &
        unbiased!
      </p>

      <p>
        NextNews aims to provide you with the latest news in a concise and
        unbiased manner. We strive to deliver the news in a way that is easy to
        understand and to the point. We want to keep you informed without
        overwhelming you with unnecessary information.
      </p>

      <p>
        We employ a team of dedicated journalists who are committed to
        delivering the news in a fair and unbiased manner. Our team is
        passionate about keeping you informed and up to date with the latest
        news.
      </p>

      <p>
        <Link href="/news">Read the latest news</Link>
      </p>
    </div>
  );
}

import { ReactElement } from "react";
import Image from "next/image";

import styles from './page.module.scss';
import { communityPageMedia } from "../../constants/communityPageMedia";

const Community = (): ReactElement => {

    const { mealIcon, communityIcon, eventsIcon } = { ...communityPageMedia };

    return (
        <>
            <header className={styles.header}>
                <h1>
                    One shared passion: <span className={styles.highlight}>Food</span>
                </h1>
                <p>Join our community and share your favorite recipes!</p>
            </header>
            <main className={styles.main}>
                <h2>Community Perks</h2>

                <ul className={styles.perks}>
                    <li>
                        <Image
                            src={mealIcon.imgUrl}
                            alt={mealIcon.alt}
                            unoptimized
                            width={128}
                            height={128}
                        />
                        <p>Share & discover recipes</p>
                    </li>
                    <li>
                        <Image
                            src={communityIcon.imgUrl}
                            alt={communityIcon.alt}
                            unoptimized
                            width={128}
                            height={128}
                        />
                        <p>Find new friends & like-minded people</p>
                    </li>
                    <li>
                        <Image
                            src={eventsIcon.imgUrl}
                            alt={eventsIcon.alt}
                            unoptimized
                            width={128}
                            height={128}
                        />
                        <p>Participate in exclusive events</p>
                    </li>
                </ul>
            </main>
        </>
    );
}

export default Community;

import Link from "next/link";
import { ReactElement } from "react";

import styles from "../components/Navigation.module.scss";

const Navigation = (): ReactElement => {
    return (
        <nav>
            <ul className={styles['ul-navbar']}>
                <Link className={styles.link} href='/meals'><li>Meals</li></Link>
                <Link className={styles.link} href='/meals/share'><li>Share</li></Link>
                <Link className={styles.link} href='/community'><li>Community</li></Link>
            </ul>
        </nav>
    )
};

export default Navigation;
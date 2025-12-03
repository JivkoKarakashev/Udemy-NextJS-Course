import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.scss";

import HeaderBackground from "./header-background.tsx";
import NavLink from "./nav-link.tsx";

const Header = (): ReactElement => {
    return (
        <>
            <HeaderBackground />
            <header className={styles.header}>
                <Link className={styles.logo} href='/'>
                    <Image
                        className={styles.img}
                        src='https://cdn-bucket.jivkokarakashev.work/file/next-level-food/public/images/logo.png'
                        width={120}
                        height={120}
                        alt="Plate with food"
                        unoptimized
                        loading="eager"
                    />
                    NextLevel Food
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <NavLink href='/meals'>Browse Meals</NavLink>
                        <NavLink href='/community'>Foodies Community</NavLink>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
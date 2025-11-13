'use client';

import { ReactElement, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from './nav-link.module.scss';

const NavLink = ({ href, children }: { href: string, children: ReactNode }): ReactElement => {
    const path = usePathname();
    return (
        <Link href={href} className={path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link}><li>{children}</li></Link>
    );
};

export default NavLink;
import Link from "next/link";
import { ReactElement, ReactNode } from "react";

const NavLink = ({ href, props: { children } }: { href: string, props: { children: ReactNode } }): ReactElement => {
    return (
        <Link href={href}><li>{children}</li></Link>
    );
};

export default NavLink;
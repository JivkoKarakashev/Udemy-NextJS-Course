import Link from "next/link";
import { ReactElement, ReactNode } from "react";

const NavLink = ({ href, children }: { href: string, children: ReactNode }): ReactElement => {
    return (
        <Link href={href}><li>{children}</li></Link>
    );
};

export default NavLink;
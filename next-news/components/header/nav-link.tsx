import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode } from "react";

const NavLink = ({ href, props: { children } }: { href: string, props: { children: ReactNode } }): ReactElement => {
    const path = usePathname();

    return (
        <Link href={href} className={path.startsWith(href) ? 'active' : undefined}><li>{children}</li></Link>
    );
};

export default NavLink;
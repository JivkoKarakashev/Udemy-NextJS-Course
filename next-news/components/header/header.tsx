import { ReactElement } from "react";
import Link from "next/link";

import NavLink from "./nav-link.tsx";

const Header = (): ReactElement => {
    return (
        <header id="main-header">
            <div id="logo">
                <Link href="/">NextNews</Link>
            </div>
            <nav>
                <ul>
                    <NavLink href='/news' children='News' />
                </ul>
            </nav>
        </header>
    );
};

export default Header;
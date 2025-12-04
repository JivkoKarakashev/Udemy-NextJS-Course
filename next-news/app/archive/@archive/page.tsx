import { ReactElement } from "react";

import { getAvailableNewsYears } from "../../../lib/api.ts";
import Link from "next/link";

const ArchiveNews = (): ReactElement => {
    const yearsArr = getAvailableNewsYears();

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {yearsArr.map(year => {
                        return (
                            <li key={year}>
                                <Link href={`/archive/${year}`}>{year}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default ArchiveNews;
import { ReactElement, Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import styles from './page.module.scss';

import { getMealBySlug } from "../../../lib/meals.ts";
import MealInstructions from "../../../components/meal-details/meal-instructions.tsx";
import Loader from "../../../components/loader/loading.tsx";

const Details = async ({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> => {
    const { slug } = await params;
    const meal = await getMealBySlug(slug);
    if (meal === undefined) {
        notFound();
    }
    const { image, title, creator_email, creator, summary, instructions } = meal;

    return (
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image src={image} alt={title} fill />
                </div>
                <div className={styles.headerText}>
                    <h1>{title}</h1>
                    <p className={styles.creator}>
                        by <a href={`mailto:${creator_email}`}>{creator}</a>
                    </p>
                    <p className={styles.summary}>{summary}</p>
                </div>
            </header>
            <main>
                <div className={styles.instructions}>
                    <MealInstructions instructions={instructions} />
                </div>
            </main>
        </>
    );
}

const DetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    return (
        <Suspense fallback={<Loader content='Loading details...' />}>
            <Details params={params} />
        </Suspense>
    );
};

export default DetailsPage;

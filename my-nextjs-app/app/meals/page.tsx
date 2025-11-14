import { ReactElement } from "react";
import Link from "next/link";

import styles from './page.module.scss';
import MealsGrid from "../../components/meals/meals-grid";
import { getAllMeals } from "../../lib/meals.ts";

const Meals = async (): Promise<ReactElement> => {
    const meals = await getAllMeals();

    return (
        <>
            <header className={styles.header}>
                <h1>Delicious meals, created <span className={styles.highlight}>by you</span></h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={styles.actions}>
                    <Link href='/meals/share'>Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={styles.main}>
                <MealsGrid meals={meals} />
            </main>
        </>
    );
}

export default Meals;
